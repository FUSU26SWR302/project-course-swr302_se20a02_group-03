namespace ProSport.Domain.Entities;

public class EquipmentRental : BaseEntity
{
    public int EquipmentRentalId { get; set; }
    public int EquipmentId { get; set; }
    public int BookingId { get; set; }
    public int Quantity { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = "Rented"; // Rented, Returned, Damaged
    public decimal? DamageFee { get; set; } // Phụ thu nếu hỏng hóc

    // Navigation properties
    public Equipment Equipment { get; set; } = null!;
    public Booking Booking { get; set; } = null!;
}
