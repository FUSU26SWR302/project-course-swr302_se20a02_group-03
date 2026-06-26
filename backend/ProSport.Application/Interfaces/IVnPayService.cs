using ProSport.Application.DTOs;

namespace ProSport.Application.Interfaces;

public interface IVnPayService
{
    // Tạo link thanh toán VNPAY
    string CreatePaymentUrl(string ipAddress, int userId, decimal amount, string orderType, string referenceId);

    // Xác thực IPN/Return từ VNPAY
    VnPayResponseDto GetPaymentResult(IEnumerable<KeyValuePair<string, string>> collections);
}

public class VnPayResponseDto
{
    public bool Success { get; set; }
    public string OrderType { get; set; } = null!;
    public string ReferenceId { get; set; } = null!; // Có thể là BookingId hoặc EscrowDepositId
    public int UserId { get; set; } // UserId parse từ OrderInfo
    public decimal Amount { get; set; }
    public string VnPayTransactionId { get; set; } = null!;
    public string VnPayResponseCode { get; set; } = null!;
}
