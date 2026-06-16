namespace ProSport.Application.DTOs;

public class CourtDto
{
    public int CourtId { get; set; }
    public string Name { get; set; } = null!;
    public string CourtTypeName { get; set; } = null!;
    public string Status { get; set; } = null!;
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
    public decimal PricePerHour { get; set; }
}

public class CreateCourtDto
{
    public string Name { get; set; } = null!;
    public int CourtTypeId { get; set; }
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
}
