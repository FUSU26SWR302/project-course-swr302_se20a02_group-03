using Microsoft.EntityFrameworkCore;
using ProSport.Domain.Entities;

namespace ProSport.Infrastructure.Data;

public class ProSportDbContext : DbContext
{
    public ProSportDbContext(DbContextOptions<ProSportDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<OtpCode> OtpCodes { get; set; } = null!;
    public DbSet<EkycProfile> EkycProfiles { get; set; } = null!;
    public DbSet<CourtType> CourtTypes { get; set; } = null!;
    public DbSet<Court> Courts { get; set; } = null!;
    public DbSet<PricingRule> PricingRules { get; set; } = null!;
    public DbSet<Booking> Bookings { get; set; } = null!;
    public DbSet<BookingDetail> BookingDetails { get; set; } = null!;
    public DbSet<Match> Matches { get; set; } = null!;
    public DbSet<MatchParticipant> MatchParticipants { get; set; } = null!;
    public DbSet<EscrowWallet> EscrowWallets { get; set; } = null!;
    public DbSet<Transaction> Transactions { get; set; } = null!;
    public DbSet<Equipment> Equipments { get; set; } = null!;
    public DbSet<EquipmentRental> EquipmentRentals { get; set; } = null!;
    // --- Bảng mới ---
    public DbSet<CheckIn> CheckIns { get; set; } = null!;
    public DbSet<Voucher> Vouchers { get; set; } = null!;
    public DbSet<PlayerRating> PlayerRatings { get; set; } = null!;
    public DbSet<Report> Reports { get; set; } = null!;
    public DbSet<ChatHistory> ChatHistories { get; set; } = null!;

    public override int SaveChanges()
    {
        UpdateAuditFields();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateAuditFields();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateAuditFields()
    {
        var entries = ChangeTracker.Entries<BaseEntity>();
        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = DateTime.UtcNow;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ========================
        // === EXISTING ENTITIES ===
        // ========================

        // --- User ---
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.GoogleId).IsUnique().HasFilter("[GoogleId] IS NOT NULL");
            
            entity.Property(e => e.FullName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.Property(e => e.PasswordHash).HasMaxLength(500);
            entity.Property(e => e.PhoneNumber).HasMaxLength(15);
            entity.Property(e => e.Role).IsRequired().HasMaxLength(20);
            entity.Property(e => e.EKycStatus).IsRequired().HasMaxLength(20).HasDefaultValue("Unverified");
            entity.Property(e => e.AvatarUrl).HasMaxLength(500);
            entity.Property(e => e.IsPhoneVerified).HasDefaultValue(false);

            entity.HasOne(e => e.EkycProfile)
                  .WithOne(e => e.User)
                  .HasForeignKey<EkycProfile>(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.EscrowWallet)
                  .WithOne(e => e.User)
                  .HasForeignKey<EscrowWallet>(e => e.UserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- OtpCode ---
        modelBuilder.Entity<OtpCode>(entity =>
        {
            entity.HasKey(e => e.OtpId);
            entity.HasIndex(e => new { e.UserId, e.Type, e.IsUsed, e.ExpiryTime });

            entity.Property(e => e.Code).IsRequired().HasMaxLength(6);
            entity.Property(e => e.Type).IsRequired().HasMaxLength(20);
            entity.Property(e => e.IsUsed).HasDefaultValue(false);

            entity.HasOne(d => d.User)
                .WithMany(p => p.OtpCodes)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- EkycProfile ---
        modelBuilder.Entity<EkycProfile>(entity =>
        {
            entity.HasKey(e => e.EkycProfileId);
            entity.Property(e => e.FullName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.IdentityNumber).IsRequired().HasMaxLength(20);
            entity.Property(e => e.Status).HasDefaultValue("Pending").HasMaxLength(20);
            entity.HasIndex(e => e.IdentityNumber).IsUnique();
        });

        // --- CourtType ---
        modelBuilder.Entity<CourtType>(entity =>
        {
            entity.HasKey(e => e.CourtTypeId);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(50);
        });

        // --- Court ---
        modelBuilder.Entity<Court>(entity =>
        {
            entity.HasKey(e => e.CourtId);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Status).HasDefaultValue("Available").HasMaxLength(20);

            entity.HasOne(e => e.CourtType)
                  .WithMany(c => c.Courts)
                  .HasForeignKey(e => e.CourtTypeId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- PricingRule (FIX: thêm CourtTypeId, DayOfWeek) ---
        modelBuilder.Entity<PricingRule>(entity =>
        {
            entity.HasKey(e => e.PricingRuleId);
            entity.Property(e => e.PricePerHour).HasColumnType("decimal(18,2)");
            entity.Property(e => e.IsWeekend).HasDefaultValue(false);

            entity.HasOne(e => e.Court)
                  .WithMany(c => c.PricingRules)
                  .HasForeignKey(e => e.CourtId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.CourtType)
                  .WithMany()
                  .HasForeignKey(e => e.CourtTypeId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- Booking (FIX: thêm CheckInCode, CancellationFee) ---
        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId);
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Status).HasDefaultValue("Pending").HasMaxLength(20);
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);
            entity.Property(e => e.PaymentStatus).HasDefaultValue("Pending").HasMaxLength(20);
            entity.Property(e => e.CheckInCode).HasMaxLength(50);
            entity.HasIndex(e => e.CheckInCode).IsUnique().HasFilter("[CheckInCode] IS NOT NULL");
            entity.Property(e => e.CancellationFee).HasColumnType("decimal(18,2)").HasDefaultValue(0m);
            entity.Property(e => e.PaymentDeadline);

            entity.HasOne(e => e.User)
                  .WithMany(u => u.Bookings)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- BookingDetail ---
        modelBuilder.Entity<BookingDetail>(entity =>
        {
            entity.HasKey(e => e.BookingDetailId);
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");

            entity.HasOne(e => e.Booking)
                  .WithMany(b => b.BookingDetails)
                  .HasForeignKey(e => e.BookingId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Court)
                  .WithMany(c => c.BookingDetails)
                  .HasForeignKey(e => e.CourtId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- Match (FIX: thêm BookingId) ---
        modelBuilder.Entity<Match>(entity =>
        {
            entity.HasKey(e => e.MatchId);
            entity.Property(e => e.Status).HasDefaultValue("Open").HasMaxLength(20);
            entity.Property(e => e.EscrowAmount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.LevelRequirement).HasMaxLength(50);

            entity.HasOne(e => e.Host)
                  .WithMany(u => u.HostedMatches)
                  .HasForeignKey(e => e.HostId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(e => e.Court)
                  .WithMany()
                  .HasForeignKey(e => e.CourtId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(e => e.Booking)
                  .WithMany()
                  .HasForeignKey(e => e.BookingId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- MatchParticipant (FIX: thêm Unique (MatchId, UserId)) ---
        modelBuilder.Entity<MatchParticipant>(entity =>
        {
            entity.HasKey(e => e.MatchParticipantId);
            entity.Property(e => e.Role).HasDefaultValue("Joiner").HasMaxLength(20);
            entity.Property(e => e.Status).HasDefaultValue("Pending").HasMaxLength(20);

            // FIX: Chống join trùng — 1 user chỉ tham gia 1 kèo 1 lần
            entity.HasIndex(e => new { e.MatchId, e.UserId }).IsUnique();

            entity.HasOne(e => e.Match)
                  .WithMany(m => m.Participants)
                  .HasForeignKey(e => e.MatchId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.User)
                  .WithMany()
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- EscrowWallet (FIX: Unique UserId — 1 user = 1 ví) ---
        modelBuilder.Entity<EscrowWallet>(entity =>
        {
            entity.HasKey(e => e.EscrowWalletId);
            entity.Property(e => e.Balance).HasColumnType("decimal(18,2)").HasDefaultValue(0m);
            entity.Property(e => e.LockedBalance).HasColumnType("decimal(18,2)").HasDefaultValue(0m);

            // FIX: Unique — mỗi user chỉ có đúng 1 ví
            entity.HasIndex(e => e.UserId).IsUnique();
        });

        // --- Transaction (FIX: thêm MatchId) ---
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId);
            entity.Property(e => e.Amount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Status).HasDefaultValue("Pending").HasMaxLength(20);
            entity.Property(e => e.ReferenceId).HasMaxLength(100);

            entity.HasOne(e => e.EscrowWallet)
                  .WithMany(w => w.Transactions)
                  .HasForeignKey(e => e.EscrowWalletId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Booking)
                  .WithMany(b => b.Transactions)
                  .HasForeignKey(e => e.BookingId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(e => e.Match)
                  .WithMany()
                  .HasForeignKey(e => e.MatchId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- Equipment (FIX: thêm Condition, ImageUrl) ---
        modelBuilder.Entity<Equipment>(entity =>
        {
            entity.HasKey(e => e.EquipmentId);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
            entity.Property(e => e.RentalPrice).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Condition).HasDefaultValue("Good").HasMaxLength(20);
            entity.Property(e => e.ImageUrl).HasMaxLength(500);
        });

        // --- EquipmentRental ---
        modelBuilder.Entity<EquipmentRental>(entity =>
        {
            entity.HasKey(e => e.EquipmentRentalId);
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18,2)");
            entity.Property(e => e.DamageFee).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Status).HasDefaultValue("Rented").HasMaxLength(20);

            entity.HasOne(e => e.Equipment)
                  .WithMany(eq => eq.Rentals)
                  .HasForeignKey(e => e.EquipmentId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(e => e.Booking)
                  .WithMany(b => b.EquipmentRentals)
                  .HasForeignKey(e => e.BookingId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ====================
        // === NEW ENTITIES ===
        // ====================

        // --- CheckIn (UC-S01, UC-S02) ---
        modelBuilder.Entity<CheckIn>(entity =>
        {
            entity.HasKey(e => e.CheckInId);
            entity.HasIndex(e => e.BookingId).IsUnique(); // 1 booking = 1 check-in

            entity.HasOne(e => e.Booking)
                  .WithOne(b => b.CheckIn)
                  .HasForeignKey<CheckIn>(e => e.BookingId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Staff)
                  .WithMany()
                  .HasForeignKey(e => e.StaffId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- Voucher (UC-S06) ---
        modelBuilder.Entity<Voucher>(entity =>
        {
            entity.HasKey(e => e.VoucherId);
            entity.Property(e => e.Code).IsRequired().HasMaxLength(20);
            entity.HasIndex(e => e.Code).IsUnique();
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.DiscountPercent).HasColumnType("decimal(5,2)");
            entity.Property(e => e.MaxDiscountAmount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.MinOrderAmount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(e => e.CreatedByStaff)
                  .WithMany()
                  .HasForeignKey(e => e.CreatedByStaffId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- PlayerRating (UC-C13) ---
        modelBuilder.Entity<PlayerRating>(entity =>
        {
            entity.HasKey(e => e.PlayerRatingId);
            // 1 user chỉ đánh giá 1 user khác trong cùng 1 kèo 1 lần
            entity.HasIndex(e => new { e.RaterId, e.RatedUserId, e.MatchId }).IsUnique();

            entity.HasOne(e => e.Rater)
                  .WithMany()
                  .HasForeignKey(e => e.RaterId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(e => e.RatedUser)
                  .WithMany()
                  .HasForeignKey(e => e.RatedUserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(e => e.Match)
                  .WithMany()
                  .HasForeignKey(e => e.MatchId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // --- Report (UC-C14, UC-A07) ---
        modelBuilder.Entity<Report>(entity =>
        {
            entity.HasKey(e => e.ReportId);
            entity.Property(e => e.Reason).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Status).HasDefaultValue("Pending").HasMaxLength(20);
            entity.Property(e => e.Evidence).HasMaxLength(1000);
            entity.Property(e => e.AdminNote).HasMaxLength(1000);

            entity.HasOne(e => e.Reporter)
                  .WithMany()
                  .HasForeignKey(e => e.ReporterId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(e => e.ReportedUser)
                  .WithMany()
                  .HasForeignKey(e => e.ReportedUserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(e => e.Match)
                  .WithMany()
                  .HasForeignKey(e => e.MatchId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.ResolvedByAdmin)
                  .WithMany()
                  .HasForeignKey(e => e.ResolvedByAdminId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // --- ChatHistory (UC-C15) ---
        modelBuilder.Entity<ChatHistory>(entity =>
        {
            entity.HasKey(e => e.ChatHistoryId);
            entity.Property(e => e.Question).IsRequired();
            entity.Property(e => e.Answer).IsRequired();

            entity.HasOne(e => e.User)
                  .WithMany()
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
