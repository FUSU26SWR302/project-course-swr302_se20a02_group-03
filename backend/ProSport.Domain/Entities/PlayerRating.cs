namespace ProSport.Domain.Entities;

public class PlayerRating : BaseEntity
{
    public int PlayerRatingId { get; set; }
    public int RaterId { get; set; } // Người đánh giá
    public int RatedUserId { get; set; } // Người bị đánh giá
    public int MatchId { get; set; } // Kèo liên quan
    public int Score { get; set; } // 1-5 sao
    public string? Comment { get; set; }

    // Navigation properties
    public User Rater { get; set; } = null!;
    public User RatedUser { get; set; } = null!;
    public Match Match { get; set; } = null!;
}
