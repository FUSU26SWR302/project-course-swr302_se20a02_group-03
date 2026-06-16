namespace ProSport.Application.DTOs;

public class MatchDto
{
    public int MatchId { get; set; }
    public int HostId { get; set; }
    public int CourtId { get; set; }
    public int? BookingId { get; set; }
    public DateTime MatchDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public int MaxParticipants { get; set; }
    public int CurrentParticipants { get; set; }
    public decimal EscrowAmount { get; set; }
    public string Status { get; set; } = null!;
    public string? LevelRequirement { get; set; }
    public string? Notes { get; set; }
}

public class CreateMatchDto
{
    public int CourtId { get; set; }
    public int BookingId { get; set; } // Phải có booking trước mới tạo được kèo
    public DateTime MatchDate { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public int MaxParticipants { get; set; }
    public decimal EscrowAmount { get; set; } // Host tự quy định số tiền cọc cho mỗi Joiner
    public string? LevelRequirement { get; set; }
    public string? Notes { get; set; }
}

public class MatchParticipantDto
{
    public int MatchParticipantId { get; set; }
    public int MatchId { get; set; }
    public int UserId { get; set; }
    public string Role { get; set; } = null!;
    public string Status { get; set; } = null!;
    public bool HasPaidEscrow { get; set; }
}
