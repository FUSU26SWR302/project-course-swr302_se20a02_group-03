using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProSport.Application.DTOs;
using ProSport.Application.Interfaces;
using System.Security.Claims;

namespace ProSport.API.Controllers;

[Route("api/payment")]
[ApiController]
public class PaymentController : ControllerBase
{
    private readonly IVnPayService _vnPayService;
    private readonly IEscrowService _escrowService;
    private readonly IBookingService _bookingService;
    private readonly ILogger<PaymentController> _logger;

    public PaymentController(IVnPayService vnPayService, IEscrowService escrowService,
        IBookingService bookingService, ILogger<PaymentController> logger)
    {
        _vnPayService = vnPayService;
        _escrowService = escrowService;
        _bookingService = bookingService;
        _logger = logger;
    }

    [Authorize]
    [HttpPost("vnpay/create-url")]
    public async Task<IActionResult> CreatePaymentUrl([FromQuery] decimal amount, [FromQuery] string orderType, [FromQuery] string referenceId)
    {
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1";
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized(new ApiResponseDto<object>(401, "Unauthorized"));
        }

        // Bảo mật: Lấy số tiền thực tế từ DB nếu là Booking + check ownership
        if (orderType == "Booking")
        {
            if (int.TryParse(referenceId, out int bookingId))
            {
                var bookingRes = await _bookingService.GetBookingByIdAsync(bookingId);
                if (bookingRes.StatusCode != 200 || bookingRes.Data == null)
                {
                    return BadRequest(bookingRes);
                }

                // Security: Kiểm tra booking thuộc user hiện tại
                if (bookingRes.Data.UserId != userId)
                {
                    return Forbid();
                }

                // Kiểm tra booking đã thanh toán chưa
                if (bookingRes.Data.PaymentStatus == "Paid")
                {
                    return BadRequest(new ApiResponseDto<object>(400, "Booking đã được thanh toán"));
                }

                // Lấy số tiền từ DB, không tin FE gửi lên
                amount = bookingRes.Data.TotalAmount;
            }
            else
            {
                return BadRequest(new ApiResponseDto<object>(400, "ReferenceId không hợp lệ"));
            }
        }

        var url = _vnPayService.CreatePaymentUrl(ipAddress, userId, amount, orderType, referenceId);
        return Ok(new ApiResponseDto<string>(200, "Tạo URL thanh toán thành công", url));
    }

    /// <summary>
    /// IPN endpoint — VNPay server gọi trực tiếp (server-to-server).
    /// Đây là nơi CẬP NHẬT trạng thái booking/ví. Idempotent.
    /// Trả về RspCode theo đúng format VNPay yêu cầu.
    /// </summary>
    [HttpGet("vnpay/ipn")]
    public async Task<IActionResult> VnPayIpn()
    {
        try
        {
            var queryDictionary = Request.Query
                .Select(k => new KeyValuePair<string, string>(k.Key, k.Value.ToString()!))
                .ToList();
            var response = _vnPayService.GetPaymentResult(queryDictionary);

            _logger.LogInformation(
                "VNPay IPN received: OrderType={OrderType}, ReferenceId={RefId}, Amount={Amount}, ResponseCode={Code}, TxnId={TxnId}",
                response.OrderType, response.ReferenceId, response.Amount, response.VnPayResponseCode, response.VnPayTransactionId);

            if (!response.Success)
            {
                _logger.LogWarning("VNPay IPN: Invalid signature or failed transaction. ResponseCode: {Code}", response.VnPayResponseCode);
                return Ok(new { RspCode = "97", Message = "Invalid signature" });
            }

            // Xử lý nạp tiền ví Escrow
            if (response.OrderType == "Deposit")
            {
                if (response.UserId > 0)
                {
                    var depositRes = await _escrowService.DepositAsync(
                        response.UserId, response.Amount, response.VnPayTransactionId, "Nạp tiền VNPAY");
                    if (depositRes.StatusCode == 200)
                    {
                        return Ok(new { RspCode = "00", Message = "Confirm Success" });
                    }
                }
                return Ok(new { RspCode = "99", Message = "Error processing deposit" });
            }
            // Xử lý thanh toán booking
            else if (response.OrderType == "Booking")
            {
                if (int.TryParse(response.ReferenceId, out int bookingId))
                {
                    var confirmRes = await _bookingService.ConfirmBookingPaymentAsync(
                        bookingId, response.VnPayTransactionId, response.Amount);

                    _logger.LogInformation("IPN ConfirmBookingPayment result: BookingId={BookingId}, StatusCode={StatusCode}, Message={Message}",
                        bookingId, confirmRes.StatusCode, confirmRes.Message);

                    if (confirmRes.StatusCode == 200)
                    {
                        return Ok(new { RspCode = "00", Message = "Confirm Success" });
                    }
                    // Booking đã thanh toán rồi (idempotent) → vẫn trả 00
                    if (confirmRes.StatusCode == 400 && confirmRes.Message?.Contains("đã được thanh toán") == true)
                    {
                        return Ok(new { RspCode = "00", Message = "Already confirmed" });
                    }
                    return Ok(new { RspCode = "99", Message = confirmRes.Message });
                }
                return Ok(new { RspCode = "99", Message = "Invalid Booking ReferenceId" });
            }

            return Ok(new { RspCode = "99", Message = "Unknown order type" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "VNPay IPN processing error");
            return Ok(new { RspCode = "99", Message = "Internal error" });
        }
    }

    /// <summary>
    /// Return URL — User được redirect về đây sau khi thanh toán trên VNPay.
    /// CHỈ ĐỌC trạng thái và trả về kết quả cho frontend hiển thị.
    /// DB đã được cập nhật bởi IPN endpoint (hoặc sẽ cập nhật ngay sau).
    /// Nếu IPN chưa kịp xử lý, gọi ConfirmBookingPaymentAsync như fallback (idempotent).
    /// </summary>
    [HttpGet("vnpay/return")]
    public async Task<IActionResult> VnPayReturn()
    {
        var queryDictionary = Request.Query
            .Select(k => new KeyValuePair<string, string>(k.Key, k.Value.ToString()!))
            .ToList();
        var response = _vnPayService.GetPaymentResult(queryDictionary);

        if (!response.Success)
        {
            return BadRequest(new ApiResponseDto<object>(400, "Thanh toán thất bại hoặc chữ ký không hợp lệ", response));
        }

        // Fallback: Nếu IPN chưa kịp xử lý (network delay), Return URL sẽ cố gắng xử lý (idempotent)
        if (response.OrderType == "Deposit")
        {
            if (response.UserId > 0)
            {
                await _escrowService.DepositAsync(
                    response.UserId, response.Amount, response.VnPayTransactionId, "Nạp tiền VNPAY");
            }
            return Ok(new ApiResponseDto<object>(200, "Nạp tiền ví thành công", response));
        }
        else if (response.OrderType == "Booking")
        {
            if (int.TryParse(response.ReferenceId, out int bookingId))
            {
                // ConfirmBookingPaymentAsync đã idempotent: nếu đã thanh toán sẽ trả 400 "đã thanh toán"
                var confirmRes = await _bookingService.ConfirmBookingPaymentAsync(
                    bookingId, response.VnPayTransactionId, response.Amount);

                // Cả 200 (vừa confirm) và 400 "đã thanh toán" đều coi là thành công cho user
                if (confirmRes.StatusCode == 200 ||
                    (confirmRes.StatusCode == 400 && confirmRes.Message?.Contains("đã được thanh toán") == true))
                {
                    // Lấy booking mới nhất để trả về chi tiết cho frontend
                    var bookingDetail = await _bookingService.GetBookingByIdAsync(bookingId);
                    return Ok(new ApiResponseDto<object>(200, "Thanh toán sân thành công", new
                    {
                        vnpay = response,
                        booking = bookingDetail.Data
                    }));
                }
                return BadRequest(confirmRes);
            }
            return BadRequest(new ApiResponseDto<object>(400, "Lỗi cập nhật trạng thái Booking", response));
        }

        return BadRequest(new ApiResponseDto<object>(400, "Loại thanh toán không được hỗ trợ", response));
    }
}
