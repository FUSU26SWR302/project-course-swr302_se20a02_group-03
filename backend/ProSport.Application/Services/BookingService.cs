using Microsoft.Extensions.Logging;
using ProSport.Application.DTOs;
using ProSport.Application.Interfaces;
using ProSport.Domain.Constants;
using ProSport.Domain.Entities;

namespace ProSport.Application.Services;

public class BookingService : IBookingService
{
    private readonly IBookingRepository _bookingRepository;
    private readonly ICourtRepository _courtRepository;
    private readonly IEscrowRepository _escrowRepository;
    private readonly IEmailService _emailService;
    private readonly ILogger<BookingService> _logger;

    /// <summary>
    /// Thời gian chờ thanh toán tối đa (15 phút). Quá hạn sẽ tự hủy booking.
    /// </summary>
    private static readonly TimeSpan PaymentTimeout = TimeSpan.FromMinutes(15);

    public BookingService(
        IBookingRepository bookingRepository,
        ICourtRepository courtRepository,
        IEscrowRepository escrowRepository,
        IEmailService emailService,
        ILogger<BookingService> logger)
    {
        _bookingRepository = bookingRepository;
        _courtRepository = courtRepository;
        _escrowRepository = escrowRepository;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<ApiResponseDto<IEnumerable<BookingDto>>> GetAllBookingsAsync()
    {
        try
        {
            var bookings = await _bookingRepository.GetAllAsync();
            return new ApiResponseDto<IEnumerable<BookingDto>>(200, "Success", MapToDtos(bookings));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all bookings");
            return new ApiResponseDto<IEnumerable<BookingDto>>(500, "An unexpected error occurred.");
        }
    }

    public async Task<ApiResponseDto<BookingDto>> GetBookingByIdAsync(int bookingId)
    {
        try
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null) return new ApiResponseDto<BookingDto>(404, "Booking not found");

            return new ApiResponseDto<BookingDto>(200, "Success", MapToDto(booking));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting booking by id: {BookingId}", bookingId);
            return new ApiResponseDto<BookingDto>(500, "An unexpected error occurred.");
        }
    }

    public async Task<ApiResponseDto<IEnumerable<BookingDto>>> GetUserBookingsAsync(int userId)
    {
        try
        {
            var bookings = await _bookingRepository.GetByUserIdAsync(userId);
            return new ApiResponseDto<IEnumerable<BookingDto>>(200, "Success", MapToDtos(bookings));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting bookings for user: {UserId}", userId);
            return new ApiResponseDto<IEnumerable<BookingDto>>(500, "An unexpected error occurred.");
        }
    }

    public async Task<ApiResponseDto<BookingDto>> CreateBookingAsync(CreateBookingDto dto)
    {
        try
        {
            // === VALIDATION: Kiểm tra input hợp lệ ===
            if (dto.Details == null || !dto.Details.Any())
                return new ApiResponseDto<BookingDto>(400, "Phải có ít nhất 1 chi tiết đặt sân.");

            // Anti-spam: Giới hạn tối đa 3 booking Pending chưa thanh toán
            var userBookings = await _bookingRepository.GetByUserIdAsync(dto.UserId);
            var pendingCount = userBookings.Count(b => b.Status == BookingStatus.Pending
                && b.PaymentDeadline.HasValue && b.PaymentDeadline.Value > DateTime.UtcNow);
            if (pendingCount >= 3)
                return new ApiResponseDto<BookingDto>(400, "Bạn đang có 3 đơn đặt sân chưa thanh toán. Vui lòng thanh toán hoặc hủy trước khi đặt thêm.");

            decimal totalAmount = 0;
            var details = new List<BookingDetail>();

            // Sử dụng UTC+7 (timezone Việt Nam) để so sánh ngày/giờ cho chính xác
            var vnNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,
                TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time"));

            foreach (var d in dto.Details)
            {
                // Validate: Ngày đặt sân không được trong quá khứ
                if (d.BookingDate.Date < vnNow.Date)
                    return new ApiResponseDto<BookingDto>(400, "Không thể đặt sân cho ngày trong quá khứ.");

                // Validate: Giờ bắt đầu phải trước giờ kết thúc
                if (d.EndTime <= d.StartTime)
                    return new ApiResponseDto<BookingDto>(400, "Giờ kết thúc phải sau giờ bắt đầu.");

                // Validate: Thời lượng tối thiểu 1 giờ, tối đa 4 giờ
                var duration = d.EndTime - d.StartTime;
                if (duration < TimeSpan.FromHours(1))
                    return new ApiResponseDto<BookingDto>(400, "Thời lượng đặt sân tối thiểu là 1 giờ.");
                if (duration > TimeSpan.FromHours(4))
                    return new ApiResponseDto<BookingDto>(400, "Thời lượng đặt sân tối đa là 4 giờ.");

                // Validate: Nếu book ngày hôm nay, giờ bắt đầu phải lớn hơn giờ hiện tại
                if (d.BookingDate.Date == vnNow.Date && d.StartTime <= vnNow.TimeOfDay)
                    return new ApiResponseDto<BookingDto>(400, "Giờ đặt sân phải lớn hơn giờ hiện tại.");

                var court = await _courtRepository.GetByIdAsync(d.CourtId);
                if (court == null || court.Status != "Available")
                    return new ApiResponseDto<BookingDto>(400, $"Sân {d.CourtId} không khả dụng.");

                // Kiểm tra trùng lịch (bao gồm bỏ qua booking Pending đã hết hạn thanh toán)
                var availableCourts = await _courtRepository.GetAvailableCourtsAsync(d.BookingDate, d.StartTime, d.EndTime);
                var isAvailable = availableCourts.Any(c => c.CourtId == d.CourtId);

                if (!isAvailable)
                    return new ApiResponseDto<BookingDto>(400, $"Sân {d.CourtId} đã được đặt trong khung giờ {d.StartTime:hh\\:mm} - {d.EndTime:hh\\:mm}.");

                // Tính giá dựa trên PricingRule (đã fix logic cross-slot)
                var price = CalculatePrice(court, d.BookingDate, d.StartTime, d.EndTime);
                totalAmount += price;

                details.Add(new BookingDetail
                {
                    CourtId = d.CourtId,
                    BookingDate = d.BookingDate,
                    StartTime = d.StartTime,
                    EndTime = d.EndTime,
                    Price = price
                });
            }

            var booking = new Booking
            {
                UserId = dto.UserId,
                TotalAmount = totalAmount,
                Status = BookingStatus.Pending,
                PaymentMethod = PaymentMethod.VNPay,
                PaymentStatus = Domain.Constants.PaymentStatus.Pending,
                PaymentDeadline = DateTime.UtcNow.Add(PaymentTimeout),
                BookingDetails = details
            };

            // Sử dụng CreateWithTransactionAsync để đảm bảo atomic operation
            // tránh race condition double-booking
            var created = await _bookingRepository.CreateWithTransactionAsync(booking);
            return new ApiResponseDto<BookingDto>(201, "Đặt sân thành công. Vui lòng thanh toán trong 15 phút.", MapToDto(created));
        }
        catch (InvalidOperationException ex) when (ex.Message.Contains("đã được đặt"))
        {
            // Race condition: sân đã bị người khác đặt giữa lúc check và create
            return new ApiResponseDto<BookingDto>(409, ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating booking for user: {UserId}", dto.UserId);
            return new ApiResponseDto<BookingDto>(500, "An unexpected error occurred.");
        }
    }

    /// <summary>
    /// Tính giá sân dựa trên PricingRule. Hỗ trợ booking span giữa 2 khung giá khác nhau.
    /// Nếu không có rule phù hợp, fallback về 100.000đ/giờ.
    /// </summary>
    private static decimal CalculatePrice(Court court, DateTime bookingDate, TimeSpan startTime, TimeSpan endTime)
    {
        bool isWeekend = bookingDate.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday;

        var rules = court.PricingRules?
            .Where(r => r.IsWeekend == isWeekend && !r.IsDeleted)
            .OrderBy(r => r.StartTime)
            .ToList();

        if (rules == null || !rules.Any())
        {
            // Fallback: 100.000đ/giờ nếu chưa cấu hình PricingRule
            return (decimal)(endTime - startTime).TotalHours * 100000m;
        }

        // Tính giá theo từng khung giờ (split calculation)
        // VD: Book 10:00-12:00, Rule A: 08:00-11:00 (100k/h), Rule B: 11:00-14:00 (150k/h)
        // → 1h * 100k + 1h * 150k = 250k
        decimal totalPrice = 0;
        var current = startTime;

        while (current < endTime)
        {
            var rule = rules.FirstOrDefault(r => r.StartTime <= current && r.EndTime > current);
            var ratePerHour = rule?.PricePerHour ?? 100000m;

            // Xác định điểm kết thúc của segment hiện tại
            var segmentEnd = endTime;
            if (rule != null && rule.EndTime < endTime)
            {
                segmentEnd = rule.EndTime;
            }

            var hours = (decimal)(segmentEnd - current).TotalHours;
            totalPrice += hours * ratePerHour;
            current = segmentEnd;
        }

        return totalPrice;
    }

    public async Task<ApiResponseDto<BookingDto>> ConfirmBookingPaymentAsync(int bookingId, string vnpayTransactionId, decimal paidAmount)
    {
        try
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null) return new ApiResponseDto<BookingDto>(404, "Booking not found");

            if (booking.PaymentStatus == Domain.Constants.PaymentStatus.Paid)
                return new ApiResponseDto<BookingDto>(400, "Booking đã được thanh toán.");

            // Kiểm tra booking đã hết hạn thanh toán chưa
            if (booking.PaymentDeadline.HasValue && DateTime.UtcNow > booking.PaymentDeadline.Value)
            {
                booking.Status = BookingStatus.Cancelled;
                booking.PaymentStatus = Domain.Constants.PaymentStatus.Pending;
                await _bookingRepository.UpdateAsync(booking);
                return new ApiResponseDto<BookingDto>(400, "Booking đã hết hạn thanh toán. Vui lòng đặt lại.");
            }

            // Bảo mật: Kiểm tra xem số tiền trả qua VNPay có đúng bằng số tiền hóa đơn không
            if (booking.TotalAmount != paidAmount)
            {
                _logger.LogWarning(
                    "Payment amount mismatch for booking {BookingId}: expected {Expected}, got {Actual}",
                    bookingId, booking.TotalAmount, paidAmount);
                return new ApiResponseDto<BookingDto>(400, $"Số tiền thanh toán ({paidAmount:N0}) không khớp với hóa đơn ({booking.TotalAmount:N0})");
            }

            booking.PaymentStatus = Domain.Constants.PaymentStatus.Paid;
            booking.Status = BookingStatus.Confirmed;
            booking.PaymentMethod = PaymentMethod.VNPay;
            booking.CheckInCode = $"QR-{booking.BookingId}-{Guid.NewGuid().ToString()[..8]}";

            await _bookingRepository.UpdateAsync(booking);

            // Tạo Transaction record để audit trail
            await CreatePaymentTransactionAsync(booking, vnpayTransactionId);

            // Gửi Email xác nhận Booking kèm QR code
            if (booking.User != null && !string.IsNullOrEmpty(booking.User.Email))
            {
                var courtNames = string.Join(", ", booking.BookingDetails.Select(bd => bd.Court?.Name ?? $"Court {bd.CourtId}"));
                var firstDetail = booking.BookingDetails.FirstOrDefault();
                var bookingDate = firstDetail?.BookingDate.ToString("dd/MM/yyyy");
                var timeRange = $"{firstDetail?.StartTime:hh\\:mm} - {firstDetail?.EndTime:hh\\:mm}";

                var detailsHtml = $@"
                    <p><b>Booking ID:</b> #{booking.BookingId}</p>
                    <p><b>Courts:</b> {courtNames}</p>
                    <p><b>Date:</b> {bookingDate}</p>
                    <p><b>Time:</b> {timeRange}</p>
                    <p><b>Total Paid:</b> {booking.TotalAmount:N0} VND</p>
                ";

                try
                {
                    await _emailService.SendBookingConfirmationEmailAsync(
                        booking.User.Email,
                        booking.User.FullName,
                        detailsHtml,
                        booking.CheckInCode);
                }
                catch (Exception emailEx)
                {
                    _logger.LogError(emailEx, "Failed to send booking confirmation email to {Email}", booking.User.Email);
                }
            }

            return new ApiResponseDto<BookingDto>(200, "Thanh toán thành công", MapToDto(booking));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error confirming payment for booking {BookingId}", bookingId);
            return new ApiResponseDto<BookingDto>(500, "An unexpected error occurred.");
        }
    }

    /// <summary>
    /// Tạo Transaction record cho VNPay payment để giữ audit trail.
    /// Idempotent: Nếu transaction với vnpayTransactionId đã tồn tại, bỏ qua.
    /// </summary>
    private async Task CreatePaymentTransactionAsync(Booking booking, string vnpayTransactionId)
    {
        try
        {
            // Tìm escrow wallet của user để gắn transaction
            var wallet = await _escrowRepository.GetWalletByUserIdAsync(booking.UserId);
            if (wallet == null)
            {
                // Auto-create wallet nếu chưa có
                wallet = new EscrowWallet { UserId = booking.UserId, Balance = 0, LockedBalance = 0 };
                await _escrowRepository.CreateWalletAsync(wallet);
            }

            // Idempotency check: Không tạo duplicate transaction
            var existingTransactions = await _escrowRepository.GetTransactionsByWalletIdAsync(wallet.EscrowWalletId);
            if (existingTransactions.Any(t => t.ReferenceId == vnpayTransactionId))
            {
                _logger.LogInformation("Transaction with ReferenceId {VnPayTxnId} already exists, skipping duplicate.", vnpayTransactionId);
                return;
            }

            var transaction = new Transaction
            {
                EscrowWalletId = wallet.EscrowWalletId,
                BookingId = booking.BookingId,
                Amount = booking.TotalAmount,
                Type = TransactionType.Payment,
                Status = TransactionStatus.Completed,
                ReferenceId = vnpayTransactionId,
                Description = $"Thanh toán VNPay đặt sân mã #{booking.BookingId}"
            };

            await _escrowRepository.AddTransactionAsync(transaction);
        }
        catch (Exception ex)
        {
            // Log nhưng không throw — payment đã thành công, chỉ thiếu audit record
            _logger.LogError(ex, "Failed to create transaction record for booking {BookingId}", booking.BookingId);
        }
    }

    public async Task<ApiResponseDto<bool>> CancelBookingAsync(int userId, int bookingId)
    {
        try
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null) return new ApiResponseDto<bool>(404, "Booking not found");

            if (booking.UserId != userId) return new ApiResponseDto<bool>(403, "Forbidden");

            if (booking.Status == BookingStatus.Cancelled || booking.Status == BookingStatus.Completed)
                return new ApiResponseDto<bool>(400, $"Không thể hủy booking ở trạng thái {booking.Status}");

            string cancelMessage;

            // Chỉ tính phí phạt nếu booking ĐÃ THANH TOÁN
            if (booking.PaymentStatus == Domain.Constants.PaymentStatus.Paid)
            {
                booking.CancellationFee = booking.TotalAmount * 0.2m; // Phạt 20%
                var refundAmount = booking.TotalAmount - booking.CancellationFee;

                // Refund 80% vào ví Escrow
                if (refundAmount > 0)
                {
                    var refundResult = await _escrowRepository.DepositToWalletAsync(
                        booking.UserId, refundAmount);

                    if (refundResult)
                    {
                        // Tạo transaction record cho refund
                        var wallet = await _escrowRepository.GetWalletByUserIdAsync(booking.UserId);
                        if (wallet != null)
                        {
                            var transaction = new Transaction
                            {
                                EscrowWalletId = wallet.EscrowWalletId,
                                BookingId = booking.BookingId,
                                Amount = refundAmount,
                                Type = TransactionType.Refund,
                                Status = TransactionStatus.Completed,
                                Description = $"Hoàn tiền hủy sân mã #{booking.BookingId} (trừ 20% phí phạt)"
                            };
                            await _escrowRepository.AddTransactionAsync(transaction);
                        }

                        booking.PaymentStatus = Domain.Constants.PaymentStatus.Refunded;
                    }
                    else
                    {
                        _logger.LogError("Failed to refund {Amount} for booking {BookingId}", refundAmount, bookingId);
                    }
                }

                cancelMessage = $"Hủy đặt sân thành công. Tiền hoàn {refundAmount:N0} VNĐ (trừ 20% phí phạt) đã được chuyển vào Ví PRO-SPORT của bạn.";
            }
            else
            {
                // Booking Pending chưa thanh toán → hủy miễn phí, không phạt
                booking.CancellationFee = 0;
                cancelMessage = "Hủy đặt sân thành công. Không phát sinh phí phạt do chưa thanh toán.";
            }

            booking.Status = BookingStatus.Cancelled;
            await _bookingRepository.UpdateAsync(booking);

            return new ApiResponseDto<bool>(200, cancelMessage, true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error cancelling booking {BookingId} for user {UserId}", bookingId, userId);
            return new ApiResponseDto<bool>(500, "An unexpected error occurred.");
        }
    }

    public async Task<ApiResponseDto<BookingDto>> ProcessCheckInAsync(string checkInCode, int staffId)
    {
        try
        {
            var booking = await _bookingRepository.GetByCheckInCodeAsync(checkInCode);
            if (booking == null) return new ApiResponseDto<BookingDto>(404, "Mã Check-in không hợp lệ hoặc không tồn tại.");

            if (booking.Status != BookingStatus.Confirmed && booking.Status != BookingStatus.Completed)
                return new ApiResponseDto<BookingDto>(400, $"Booking đang ở trạng thái {booking.Status}, không thể check-in.");

            if (booking.CheckIn != null)
                return new ApiResponseDto<BookingDto>(400, $"Sân đã được check-in vào lúc {booking.CheckIn.CheckInTime:HH:mm dd/MM/yyyy}.");

            var firstDetail = booking.BookingDetails.FirstOrDefault();
            if (firstDetail != null)
            {
                // Sử dụng UTC+7 (timezone Việt Nam) để so sánh chính xác
                var vnNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,
                    TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time"));
                var startTime = firstDetail.BookingDate.Date.Add(firstDetail.StartTime);
                var endTime = firstDetail.BookingDate.Date.Add(firstDetail.EndTime);

                if (vnNow < startTime.AddMinutes(-30))
                    return new ApiResponseDto<BookingDto>(400, $"Chưa đến giờ check-in. Chỉ cho phép check-in từ {startTime.AddMinutes(-30):HH:mm} trở đi.");

                if (vnNow > endTime)
                    return new ApiResponseDto<BookingDto>(400, "Đã quá giờ thuê sân, không thể check-in.");
            }

            booking.CheckIn = new CheckIn
            {
                BookingId = booking.BookingId,
                StaffId = staffId,
                CheckInTime = DateTime.UtcNow,
                Notes = "Checked in via QR Code Scanner"
            };

            await _bookingRepository.UpdateAsync(booking);

            return new ApiResponseDto<BookingDto>(200, "Check-in thành công!", MapToDto(booking));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing check in for code {CheckInCode}", checkInCode);
            return new ApiResponseDto<BookingDto>(500, "An unexpected error occurred.");
        }
    }

    private static IEnumerable<BookingDto> MapToDtos(IEnumerable<Booking> bookings)
    {
        return bookings.Select(MapToDto);
    }

    private static BookingDto MapToDto(Booking booking)
    {
        return new BookingDto
        {
            BookingId = booking.BookingId,
            UserId = booking.UserId,
            TotalAmount = booking.TotalAmount,
            Status = booking.Status,
            PaymentMethod = booking.PaymentMethod,
            PaymentStatus = booking.PaymentStatus,
            CheckInCode = booking.CheckInCode,
            PaymentDeadline = booking.PaymentDeadline,
            Details = booking.BookingDetails.Select(bd => new BookingDetailDto
            {
                CourtId = bd.CourtId,
                CourtName = bd.Court?.Name ?? "Unknown",
                BookingDate = bd.BookingDate,
                StartTime = bd.StartTime,
                EndTime = bd.EndTime,
                Price = bd.Price
            }).ToList()
        };
    }
}
