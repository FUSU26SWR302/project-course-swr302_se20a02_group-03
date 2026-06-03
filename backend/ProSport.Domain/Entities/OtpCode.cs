namespace ProSport.Domain.Entities;

public class OtpCode
{
    public int OtpId { get; set; }
    public int UserId { get; set; }
    public string Code { get; set; } = null!;
    public string Type { get; set; } = null!; // "Register", "ResetPassword"
    public DateTime ExpiryTime { get; set; }
    public bool IsUsed { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation properties
    public User User { get; set; } = null!;
}
