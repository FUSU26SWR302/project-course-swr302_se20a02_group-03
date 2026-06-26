namespace ProSport.Domain.Entities;

public class BookingDetail : BaseEntity
{
    public int BookingDetailId { get; set; }
    public int BookingId { get; set; }
    public int CourtId { get; set; }
    public DateTime BookingDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public decimal Price { get; set; }

    // Navigation properties
    public Booking Booking { get; set; } = null!;
    public Court Court { get; set; } = null!;
}
