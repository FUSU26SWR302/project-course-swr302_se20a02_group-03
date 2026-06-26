using ProSport.Domain.Entities;

namespace ProSport.Application.Interfaces;

public interface IEscrowRepository
{
    Task<EscrowWallet?> GetWalletByUserIdAsync(int userId);
    Task<EscrowWallet> CreateWalletAsync(EscrowWallet wallet);
    Task UpdateWalletAsync(EscrowWallet wallet);
    Task<IEnumerable<Transaction>> GetTransactionsByWalletIdAsync(int walletId);
    Task AddTransactionAsync(Transaction transaction);

    /// <summary>
    /// Nạp tiền vào ví (dùng cho refund khi hủy sân). Trả về true nếu thành công.
    /// </summary>
    Task<bool> DepositToWalletAsync(int userId, decimal amount);

    /// <summary>
    /// Trừ tiền ví atomic (dùng cho thanh toán booking bằng Escrow).
    /// Sử dụng DB Transaction để tránh race condition trừ tiền 2 lần.
    /// </summary>
    Task<bool> PayFromWalletAtomicAsync(int userId, decimal amount, int bookingId);
}
