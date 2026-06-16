namespace ProSport.Domain.Entities;

public class Transaction : BaseEntity
{
    public int TransactionId { get; set; }
    public int EscrowWalletId { get; set; }
    public int? BookingId { get; set; }
    public int? MatchId { get; set; } // Liên kết giao dịch escrow với kèo cụ thể
    public decimal Amount { get; set; }
    public string Type { get; set; } = null!; // Deposit, Withdraw, Payment, Refund, EscrowLock, EscrowRelease
    public string Status { get; set; } = "Pending"; // Pending, Completed, Failed
    public string? ReferenceId { get; set; } // Mã GD VNPAY
    public string? Description { get; set; }

    // Navigation properties
    public EscrowWallet EscrowWallet { get; set; } = null!;
    public Booking? Booking { get; set; }
    public Match? Match { get; set; }
}
