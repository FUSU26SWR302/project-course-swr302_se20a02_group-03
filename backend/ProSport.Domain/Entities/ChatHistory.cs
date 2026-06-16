namespace ProSport.Domain.Entities;

public class ChatHistory : BaseEntity
{
    public int ChatHistoryId { get; set; }
    public int UserId { get; set; }
    public string Question { get; set; } = null!;
    public string Answer { get; set; } = null!;

    // Navigation properties
    public User User { get; set; } = null!;
}
