namespace ProSport.Domain.Entities;

public class Court : BaseEntity
{
    public int CourtId { get; set; }
    public string Name { get; set; } = null!;
    public int CourtTypeId { get; set; }
    public string Status { get; set; } = "Available"; // Available, Maintenance
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }

    // Navigation properties
    public CourtType CourtType { get; set; } = null!;
    public ICollection<PricingRule> PricingRules { get; set; } = new List<PricingRule>();
    public ICollection<BookingDetail> BookingDetails { get; set; } = new List<BookingDetail>();
}
