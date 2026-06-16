using Microsoft.EntityFrameworkCore;
using ProSport.Application.Interfaces;
using ProSport.Domain.Entities;
using ProSport.Infrastructure.Data;

namespace ProSport.Infrastructure.Repositories;

public class EscrowRepository : IEscrowRepository
{
    private readonly ProSportDbContext _context;

    public EscrowRepository(ProSportDbContext context)
    {
        _context = context;
    }

    public async Task<EscrowWallet?> GetWalletByUserIdAsync(int userId)
    {
        return await _context.EscrowWallets.FirstOrDefaultAsync(w => w.UserId == userId);
    }

    public async Task<EscrowWallet> CreateWalletAsync(EscrowWallet wallet)
    {
        _context.EscrowWallets.Add(wallet);
        await _context.SaveChangesAsync();
        return wallet;
    }

    public async Task UpdateWalletAsync(EscrowWallet wallet)
    {
        _context.EscrowWallets.Update(wallet);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Transaction>> GetTransactionsByWalletIdAsync(int walletId)
    {
        return await _context.Transactions
            .Where(t => t.EscrowWalletId == walletId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task AddTransactionAsync(Transaction transaction)
    {
        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Nạp tiền vào ví (dùng cho refund khi hủy sân).
    /// </summary>
    public async Task<bool> DepositToWalletAsync(int userId, decimal amount)
    {
        var wallet = await _context.EscrowWallets.FirstOrDefaultAsync(w => w.UserId == userId);
        if (wallet == null) return false;

        wallet.Balance += amount;
        await _context.SaveChangesAsync();
        return true;
    }

    /// <summary>
    /// Trừ tiền ví atomic trong Serializable Transaction.
    /// Tạo Transaction record trong cùng 1 DB transaction để đảm bảo consistency.
    /// </summary>
    public async Task<bool> PayFromWalletAtomicAsync(int userId, decimal amount, int bookingId)
    {
        await using var dbTransaction = await _context.Database.BeginTransactionAsync(
            System.Data.IsolationLevel.Serializable);
        try
        {
            var wallet = await _context.EscrowWallets.FirstOrDefaultAsync(w => w.UserId == userId);
            if (wallet == null || wallet.Balance < amount)
            {
                await dbTransaction.RollbackAsync();
                return false;
            }

            wallet.Balance -= amount;

            var transaction = new Transaction
            {
                EscrowWalletId = wallet.EscrowWalletId,
                BookingId = bookingId,
                Amount = amount,
                Type = "Payment",
                Status = "Completed",
                ReferenceId = $"Booking_{bookingId}",
                Description = $"Thanh toán đặt sân mã #{bookingId}"
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            await dbTransaction.CommitAsync();
            return true;
        }
        catch
        {
            await dbTransaction.RollbackAsync();
            return false;
        }
    }
}
