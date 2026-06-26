namespace ProSport.Domain.Entities;

public class Voucher : BaseEntity
{
    public int VoucherId { get; set; }
    public string Code { get; set; } = null!; // Mã voucher (unique)
    public string Name { get; set; } = null!;
    public decimal DiscountPercent { get; set; } // % giảm giá (VD: 10 = 10%)
    public decimal? MaxDiscountAmount { get; set; } // Giảm tối đa (VND)
    public decimal? MinOrderAmount { get; set; } // Đơn tối thiểu để áp dụng
    public int TotalQuantity { get; set; }
    public int UsedQuantity { get; set; } = 0;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsActive { get; set; } = true;
    public int? CreatedByStaffId { get; set; } // Staff phát hành

    // Navigation properties
    public User? CreatedByStaff { get; set; }
}
