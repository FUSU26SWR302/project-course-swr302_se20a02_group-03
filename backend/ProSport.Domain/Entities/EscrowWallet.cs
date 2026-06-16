namespace ProSport.Domain.Entities;

public class EscrowWallet : BaseEntity
{
    public int EscrowWalletId { get; set; }
    public int UserId { get; set; }
    public decimal Balance { get; set; } = 0; // Số dư khả dụng
    public decimal LockedBalance { get; set; } = 0; // Số dư đang bị đóng băng cho các kèo

    // Navigation properties
    public User User { get; set; } = null!;
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
