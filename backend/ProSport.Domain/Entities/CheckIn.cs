namespace ProSport.Domain.Entities;

public class CheckIn : BaseEntity
{
    public int CheckInId { get; set; }
    public int BookingId { get; set; }
    public int StaffId { get; set; } // Nhân viên thực hiện check-in
    public DateTime CheckInTime { get; set; }
    public DateTime? CheckOutTime { get; set; }
    public string? Notes { get; set; }

    // Navigation properties
    public Booking Booking { get; set; } = null!;
    public User Staff { get; set; } = null!;
}
