using ProSport.Application.DTOs;

namespace ProSport.Application.Interfaces;

public interface IEscrowService
{
    Task<ApiResponseDto<EscrowWalletDto>> GetWalletAsync(int userId);
    Task<ApiResponseDto<IEnumerable<TransactionDto>>> GetTransactionHistoryAsync(int userId);
    
    // Nạp tiền vào ví (thường gọi từ Webhook của VNPay)
    Task<ApiResponseDto<bool>> DepositAsync(int userId, decimal amount, string referenceId, string description);
    
    // Khóa tiền ký quỹ (khi xin join kèo)
    Task<ApiResponseDto<bool>> LockFundsAsync(int userId, decimal amount, int matchId, string description);
    
    // Mở khóa tiền (khi rời kèo hợp lệ hoặc kèo hủy)
    Task<ApiResponseDto<bool>> ReleaseFundsAsync(int userId, decimal amount, int matchId, string description);
    
    // Trừ thẳng tiền bị khóa (khi đánh xong trừ tiền sân, hoặc phạt bùng kèo)
    Task<ApiResponseDto<bool>> DeductLockedFundsAsync(int userId, decimal amount, int matchId, string description);
    
    // Thanh toán Booking bằng ví Escrow
    Task<ApiResponseDto<bool>> PayForBookingAsync(int userId, int bookingId);
}
