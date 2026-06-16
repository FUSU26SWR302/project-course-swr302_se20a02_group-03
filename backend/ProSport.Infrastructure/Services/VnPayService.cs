
using Microsoft.Extensions.Configuration;
using ProSport.Application.DTOs;
using ProSport.Application.Interfaces;
using ProSport.Infrastructure.Services.Payment;

namespace ProSport.Infrastructure.Services;

public class VnPayService : IVnPayService
{
    private readonly IConfiguration _configuration;

    public VnPayService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string CreatePaymentUrl(string ipAddress, int userId, decimal amount, string orderType, string referenceId)
    {
        // Sử dụng referenceId + GUID để đảm bảo unique (thay vì DateTime.Ticks có thể trùng)
        var txnRef = $"{referenceId}-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N")[..8]}";

        var vnpay = new VnPayLibrary();
        
        var tmnCode = _configuration["VnPay:TmnCode"];
        var hashSecret = _configuration["VnPay:HashSecret"];
        var baseUrl = _configuration["VnPay:BaseUrl"];
        var returnUrl = _configuration["VnPay:ReturnUrl"];

        // VNPay sử dụng timezone GMT+7 (SE Asia Standard Time)
        var vnTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,
            TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time"));

        vnpay.AddRequestData("vnp_Version", "2.1.0");
        vnpay.AddRequestData("vnp_Command", "pay");
        vnpay.AddRequestData("vnp_TmnCode", tmnCode!);
        // Amount phải là integer (VND * 100), dùng decimal math để tránh floating-point error
        vnpay.AddRequestData("vnp_Amount", (amount * 100m).ToString("0"));
        vnpay.AddRequestData("vnp_CreateDate", vnTime.ToString("yyyyMMddHHmmss"));
        vnpay.AddRequestData("vnp_ExpireDate", vnTime.AddMinutes(15).ToString("yyyyMMddHHmmss"));
        vnpay.AddRequestData("vnp_CurrCode", "VND");
        vnpay.AddRequestData("vnp_IpAddr", ipAddress);
        vnpay.AddRequestData("vnp_Locale", "vn");
        
        // Dùng pipe separator thay vì underscore để tránh lỗi parse khi referenceId chứa '_'
        // Format: {OrderType}|{ReferenceId}|{UserId}
        var orderInfo = $"{orderType}|{referenceId}|{userId}";
        vnpay.AddRequestData("vnp_OrderInfo", orderInfo);
        vnpay.AddRequestData("vnp_OrderType", "other");
        vnpay.AddRequestData("vnp_ReturnUrl", returnUrl!);
        vnpay.AddRequestData("vnp_TxnRef", txnRef);

        var paymentUrl = vnpay.CreateRequestUrl(baseUrl!, hashSecret!);
        return paymentUrl;
    }

    public VnPayResponseDto GetPaymentResult(IEnumerable<KeyValuePair<string, string>> collections)
    {
        var vnpay = new VnPayLibrary();
        foreach (var (key, value) in collections)
        {
            if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
            {
                vnpay.AddResponseData(key, value.ToString());
            }
        }

        var vnp_orderInfo = vnpay.GetResponseData("vnp_OrderInfo");
        var vnp_TransactionId = vnpay.GetResponseData("vnp_TransactionNo");
        var vnp_SecureHash = collections.FirstOrDefault(p => p.Key == "vnp_SecureHash").Value?.ToString() ?? "";
        var vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
        var vnp_Amount = Convert.ToInt64(vnpay.GetResponseData("vnp_Amount")) / 100;

        bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, _configuration["VnPay:HashSecret"]!);
        if (!checkSignature)
        {
            return new VnPayResponseDto { Success = false };
        }

        // Parse OrderInfo với pipe separator: {OrderType}|{ReferenceId}|{UserId}
        var parts = vnp_orderInfo.Split('|');
        var orderType = parts.Length > 0 ? parts[0] : "";
        var refId = parts.Length > 1 ? parts[1] : "";
        var userId = 0;
        if (parts.Length > 2)
        {
            int.TryParse(parts[2], out userId);
        }

        return new VnPayResponseDto
        {
            Success = vnp_ResponseCode == "00", // 00 là giao dịch thành công
            OrderType = orderType,
            ReferenceId = refId,
            UserId = userId,
            Amount = vnp_Amount,
            VnPayTransactionId = vnp_TransactionId,
            VnPayResponseCode = vnp_ResponseCode
        };
    }
}
