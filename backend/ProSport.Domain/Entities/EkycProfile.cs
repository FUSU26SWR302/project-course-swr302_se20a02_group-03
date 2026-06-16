namespace ProSport.Domain.Entities;

public class EkycProfile : BaseEntity
{
    public int EkycProfileId { get; set; }
    public int UserId { get; set; }
    public string FullName { get; set; } = null!;
    public string IdentityNumber { get; set; } = null!; // CMND/CCCD
    public string FrontImageUrl { get; set; } = null!;
    public string BackImageUrl { get; set; } = null!;
    public string FaceImageUrl { get; set; } = null!;
    public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
    public string? RejectionReason { get; set; }

    // Navigation properties
    public User User { get; set; } = null!;
}
