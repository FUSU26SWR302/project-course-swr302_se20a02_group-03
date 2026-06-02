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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure User
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
            entity.Property(e => e.IsDeleted).HasDefaultValue(false);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("SYSDATETIME()");
            entity.Property(e => e.IsPhoneVerified).HasDefaultValue(false);
        });

        // Configure OtpCode
        modelBuilder.Entity<OtpCode>(entity =>
        {
            entity.HasKey(e => e.OtpId);
            entity.HasIndex(e => new { e.UserId, e.Type, e.IsUsed, e.ExpiryTime });

            entity.Property(e => e.Code).IsRequired().HasMaxLength(6);
            entity.Property(e => e.Type).IsRequired().HasMaxLength(20);
            entity.Property(e => e.IsUsed).HasDefaultValue(false);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("SYSDATETIME()");

            entity.HasOne(d => d.User)
                .WithMany(p => p.OtpCodes)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });
    }
}
