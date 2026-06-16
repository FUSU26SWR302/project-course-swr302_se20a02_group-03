namespace ProSport.Domain.Entities;

public class Equipment : BaseEntity
{
    public int EquipmentId { get; set; }
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!; // Racket, Ball, Shoes, etc.
    public int TotalQuantity { get; set; }
    public int AvailableQuantity { get; set; }
    public decimal RentalPrice { get; set; } // Giá thuê
    public string? ImageUrl { get; set; }
    public string Condition { get; set; } = "Good"; // New, Good, Damaged
    public string? Description { get; set; }

    // Navigation properties
    public ICollection<EquipmentRental> Rentals { get; set; } = new List<EquipmentRental>();
}
