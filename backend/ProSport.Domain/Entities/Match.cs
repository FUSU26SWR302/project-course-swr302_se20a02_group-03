namespace ProSport.Domain.Entities;

public class Match : BaseEntity
{
    public int MatchId { get; set; }
    public int HostId { get; set; } // Người tạo kèo
    public int CourtId { get; set; }
    public int? BookingId { get; set; } // Liên kết tới booking đặt sân cho kèo này
    public DateTime MatchDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public int MaxParticipants { get; set; }
    public int CurrentParticipants { get; set; }
    public decimal EscrowAmount { get; set; } // Số tiền ký quỹ mỗi người
    public string Status { get; set; } = "Open"; // Open, Closed, Cancelled, Completed
    public string? LevelRequirement { get; set; } // Beginner, Intermediate, Advanced
    public string? Notes { get; set; }

    // Navigation properties
    public User Host { get; set; } = null!;
    public Court Court { get; set; } = null!;
    public Booking? Booking { get; set; }
    public ICollection<MatchParticipant> Participants { get; set; } = new List<MatchParticipant>();
}
