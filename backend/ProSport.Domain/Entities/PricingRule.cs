namespace ProSport.Domain.Entities;

public class PricingRule : BaseEntity
{
    public int PricingRuleId { get; set; }
    public int? CourtId { get; set; } // Gắn giá cho 1 sân cụ thể
    public int? CourtTypeId { get; set; } // Hoặc gắn giá chung cho 1 loại sân
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public decimal PricePerHour { get; set; }
    public bool IsWeekend { get; set; }
    public int? DayOfWeek { get; set; } // 0=CN, 1=T2, ..., 6=T7 (optional, ưu tiên hơn IsWeekend nếu có)

    // Navigation properties
    public Court? Court { get; set; }
    public CourtType? CourtType { get; set; }
}
