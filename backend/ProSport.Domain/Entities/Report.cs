namespace ProSport.Domain.Entities;

public class Report : BaseEntity
{
    public int ReportId { get; set; }
    public int ReporterId { get; set; } // Người báo cáo
    public int ReportedUserId { get; set; } // Người bị báo cáo
    public int MatchId { get; set; } // Kèo liên quan
    public string Reason { get; set; } = null!; // Lý do (bùng kèo, gian lận, v.v.)
    public string? Evidence { get; set; } // URL ảnh/bằng chứng
    public string Status { get; set; } = "Pending"; // Pending, Investigating, Resolved, Rejected
    public string? AdminNote { get; set; } // Ghi chú xử lý từ Admin
    public int? ResolvedByAdminId { get; set; } // Admin giải quyết

    // Navigation properties
    public User Reporter { get; set; } = null!;
    public User ReportedUser { get; set; } = null!;
    public Match Match { get; set; } = null!;
    public User? ResolvedByAdmin { get; set; }
}
