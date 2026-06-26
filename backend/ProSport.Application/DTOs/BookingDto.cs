using System.ComponentModel.DataAnnotations;

namespace ProSport.Application.DTOs;

public class BookingDto
{
    public int BookingId { get; set; }
    public int UserId { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; } = null!;
    public string? PaymentMethod { get; set; }
    public string? PaymentStatus { get; set; }
    public string? CheckInCode { get; set; }
    public DateTime? PaymentDeadline { get; set; }
    public List<BookingDetailDto> Details { get; set; } = new List<BookingDetailDto>();
}

public class BookingDetailDto
{
    public int CourtId { get; set; }
    public string CourtName { get; set; } = null!;
    public DateTime BookingDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public decimal Price { get; set; }
}

public class CreateBookingDto
{
    public int UserId { get; set; }

    [Required(ErrorMessage = "Phải có ít nhất 1 chi tiết đặt sân")]
    [MinLength(1, ErrorMessage = "Phải có ít nhất 1 chi tiết đặt sân")]
    public List<CreateBookingDetailDto> Details { get; set; } = new List<CreateBookingDetailDto>();
}

public class CreateBookingDetailDto
{
    [Range(1, int.MaxValue, ErrorMessage = "CourtId phải lớn hơn 0")]
    public int CourtId { get; set; }

    [Required(ErrorMessage = "BookingDate là bắt buộc")]
    public DateTime BookingDate { get; set; }

    [Required(ErrorMessage = "StartTime là bắt buộc")]
    public TimeSpan StartTime { get; set; }

    [Required(ErrorMessage = "EndTime là bắt buộc")]
    public TimeSpan EndTime { get; set; }
}

public class CheckInRequestDto
{
    [Required(ErrorMessage = "Mã Check-in là bắt buộc")]
    public string CheckInCode { get; set; } = null!;
}
