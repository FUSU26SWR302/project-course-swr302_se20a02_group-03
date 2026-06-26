namespace ProSport.Domain.Entities;

public class User : BaseEntity
{
    public int UserId { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? PasswordHash { get; set; }
    public string? PhoneNumber { get; set; }
    public string Role { get; set; } = null!;
    public string EKycStatus { get; set; } = null!;
    public string? AvatarUrl { get; set; }

    // Auth specific fields
    public string? GoogleId { get; set; }
    public bool IsPhoneVerified { get; set; }

    // Navigation properties
    public EkycProfile? EkycProfile { get; set; }
    public EscrowWallet? EscrowWallet { get; set; }
    public ICollection<OtpCode> OtpCodes { get; set; } = new List<OtpCode>();
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    public ICollection<Match> HostedMatches { get; set; } = new List<Match>();
}
