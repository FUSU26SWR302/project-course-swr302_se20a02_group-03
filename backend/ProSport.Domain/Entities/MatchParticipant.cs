namespace ProSport.Domain.Entities;

public class MatchParticipant : BaseEntity
{
    public int MatchParticipantId { get; set; }
    public int MatchId { get; set; }
    public int UserId { get; set; }
    public string Role { get; set; } = "Joiner"; // Host, Joiner
    public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected, Cancelled, EscrowPaid
    public bool HasPaidEscrow { get; set; } = false;

    // Navigation properties
    public Match Match { get; set; } = null!;
    public User User { get; set; } = null!;
}
