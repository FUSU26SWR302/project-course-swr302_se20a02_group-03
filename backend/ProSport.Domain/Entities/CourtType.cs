namespace ProSport.Domain.Entities;

public class CourtType : BaseEntity
{
    public int CourtTypeId { get; set; }
    public string Name { get; set; } = null!; // Badminton, Pickleball, etc.
    public string? Description { get; set; }

    // Navigation properties
    public ICollection<Court> Courts { get; set; } = new List<Court>();
}
