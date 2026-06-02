namespace ProSport.Domain.Entities;

public class User
{
    public int UserId { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? PasswordHash { get; set; }
    public string? PhoneNumber { get; set; }
    public string Role { get; set; } = null!;
    public string EKycStatus { get; set; } = null!;
    public string? AvatarUrl { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    
    // Auth specific fields
    public string? GoogleId { get; set; }
    public bool IsPhoneVerified { get; set; }
    
    // Navigation properties
    public ICollection<OtpCode> OtpCodes { get; set; } = new List<OtpCode>();
}
