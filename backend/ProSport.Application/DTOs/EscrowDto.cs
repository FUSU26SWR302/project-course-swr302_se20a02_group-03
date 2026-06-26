namespace ProSport.Application.DTOs;

public class EscrowWalletDto
{
    public int EscrowWalletId { get; set; }
    public int UserId { get; set; }
    public decimal Balance { get; set; }
    public decimal LockedBalance { get; set; }
    public decimal TotalBalance => Balance + LockedBalance;
}

public class TransactionDto
{
    public int TransactionId { get; set; }
    public decimal Amount { get; set; }
    public string Type { get; set; } = null!;
    public string Status { get; set; } = null!;
    public string? ReferenceId { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
}
