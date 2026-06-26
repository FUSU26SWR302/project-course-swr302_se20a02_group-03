using Microsoft.EntityFrameworkCore;
using ProSport.Application.Interfaces;
using ProSport.Domain.Entities;
using ProSport.Infrastructure.Data;

namespace ProSport.Infrastructure.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly ProSportDbContext _context;

    public BookingRepository(ProSportDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Booking>> GetAllAsync()
    {
        return await _context.Bookings
            .Include(b => b.BookingDetails)
                .ThenInclude(bd => bd.Court)
            .Include(b => b.User)
            .Where(b => !b.IsDeleted)
            .ToListAsync();
    }

    public async Task<Booking?> GetByIdAsync(int bookingId)
    {
        return await _context.Bookings
            .Include(b => b.BookingDetails)
                .ThenInclude(bd => bd.Court)
            .Include(b => b.User)
            .FirstOrDefaultAsync(b => b.BookingId == bookingId && !b.IsDeleted);
    }

    public async Task<IEnumerable<Booking>> GetByUserIdAsync(int userId)
    {
        return await _context.Bookings
            .Include(b => b.BookingDetails)
                .ThenInclude(bd => bd.Court)
            .Where(b => b.UserId == userId && !b.IsDeleted)
            .ToListAsync();
    }

    public async Task<Booking?> GetByCheckInCodeAsync(string checkInCode)
    {
        return await _context.Bookings
            .Include(b => b.BookingDetails)
                .ThenInclude(bd => bd.Court)
            .Include(b => b.User)
            .Include(b => b.CheckIn)
            .FirstOrDefaultAsync(b => b.CheckInCode == checkInCode && !b.IsDeleted);
    }

    public async Task<Booking> CreateAsync(Booking booking)
    {
        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();
        return booking;
    }

    public async Task UpdateAsync(Booking booking)
    {
        _context.Bookings.Update(booking);
        await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Tạo booking trong Serializable Transaction để tránh race condition double-booking.
    /// Kiểm tra lại tính khả dụng của sân trước khi insert trong cùng 1 transaction.
    /// </summary>
    public async Task<Booking> CreateWithTransactionAsync(Booking booking)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync(
            System.Data.IsolationLevel.Serializable);
        try
        {
            // Re-check availability inside transaction
            foreach (var detail in booking.BookingDetails)
            {
                var hasConflict = await _context.BookingDetails
                    .AnyAsync(bd =>
                        bd.CourtId == detail.CourtId &&
                        bd.BookingDate == detail.BookingDate.Date &&
                        bd.Booking.Status != "Cancelled" &&
                        // Bỏ qua booking Pending đã hết hạn thanh toán
                        !(bd.Booking.Status == "Pending" && bd.Booking.PaymentDeadline.HasValue && bd.Booking.PaymentDeadline < DateTime.UtcNow) &&
                        !bd.Booking.IsDeleted &&
                        // Overlap check: any of these 3 conditions means overlap
                        ((bd.StartTime <= detail.StartTime && bd.EndTime > detail.StartTime) ||
                         (bd.StartTime < detail.EndTime && bd.EndTime >= detail.EndTime) ||
                         (bd.StartTime >= detail.StartTime && bd.EndTime <= detail.EndTime)));

                if (hasConflict)
                {
                    await transaction.RollbackAsync();
                    throw new InvalidOperationException(
                        $"Sân {detail.CourtId} đã được đặt trong khung giờ {detail.StartTime:hh\\:mm} - {detail.EndTime:hh\\:mm}. Vui lòng chọn giờ khác.");
                }
            }

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            // Reload with navigation properties
            return (await GetByIdAsync(booking.BookingId))!;
        }
        catch (InvalidOperationException)
        {
            throw; // Re-throw business logic exceptions
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    /// <summary>
    /// Tự động hủy các booking Pending đã quá hạn thanh toán.
    /// Nên gọi từ background job (Hangfire/Timer).
    /// </summary>
    public async Task<int> CancelExpiredBookingsAsync()
    {
        var expiredBookings = await _context.Bookings
            .Where(b => b.Status == "Pending"
                     && b.PaymentDeadline.HasValue
                     && b.PaymentDeadline < DateTime.UtcNow
                     && !b.IsDeleted)
            .ToListAsync();

        foreach (var booking in expiredBookings)
        {
            booking.Status = "Cancelled";
        }

        if (expiredBookings.Any())
        {
            await _context.SaveChangesAsync();
        }

        return expiredBookings.Count;
    }
}
