using Microsoft.EntityFrameworkCore;
using ProSport.Application.Interfaces;
using ProSport.Domain.Entities;
using ProSport.Infrastructure.Data;

namespace ProSport.Infrastructure.Repositories;

public class CourtRepository : ICourtRepository
{
    private readonly ProSportDbContext _context;

    public CourtRepository(ProSportDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Court>> GetAllAsync()
    {
        return await _context.Courts
            .Include(c => c.CourtType)
            .Include(c => c.PricingRules)
            .Where(c => !c.IsDeleted)
            .ToListAsync();
    }

    public async Task<Court?> GetByIdAsync(int courtId)
    {
        return await _context.Courts
            .Include(c => c.CourtType)
            .Include(c => c.PricingRules)
            .FirstOrDefaultAsync(c => c.CourtId == courtId && !c.IsDeleted);
    }

    public async Task<IEnumerable<Court>> GetAvailableCourtsAsync(DateTime date, TimeSpan startTime, TimeSpan endTime)
    {
        // Get all courts that don't have overlapping bookings
        // Bỏ qua: Cancelled bookings + Pending bookings đã hết hạn thanh toán
        return await _context.Courts
            .Include(c => c.CourtType)
            .Where(c => !c.IsDeleted && c.Status == "Available")
            .Where(c => !c.BookingDetails.Any(b => 
                b.Booking.Status != "Cancelled" && // Bỏ qua các booking đã hủy
                // Bỏ qua booking Pending đã quá hạn thanh toán (ghost holds)
                !(b.Booking.Status == "Pending" && b.Booking.PaymentDeadline.HasValue && b.Booking.PaymentDeadline < DateTime.UtcNow) &&
                !b.Booking.IsDeleted &&
                b.BookingDate == date.Date && 
                ((b.StartTime <= startTime && b.EndTime > startTime) ||
                 (b.StartTime < endTime && b.EndTime >= endTime) ||
                 (b.StartTime >= startTime && b.EndTime <= endTime))))
            .ToListAsync();
    }

    public async Task<Court> CreateAsync(Court court)
    {
        _context.Courts.Add(court);
        await _context.SaveChangesAsync();
        return court;
    }

    public async Task UpdateAsync(Court court)
    {
        _context.Courts.Update(court);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<string>> GetBookedSlotsAsync(int courtId, DateTime date)
    {
        var bookedDetails = await _context.BookingDetails
            .Where(bd => bd.CourtId == courtId && bd.BookingDate.Date == date.Date && bd.Booking.Status != "Cancelled")
            .Where(bd => !(bd.Booking.Status == "Pending" && bd.Booking.PaymentDeadline.HasValue && bd.Booking.PaymentDeadline < DateTime.UtcNow) && !bd.Booking.IsDeleted)
            .ToListAsync();

        var bookedSlots = new List<string>();
        foreach (var detail in bookedDetails)
        {
            var startHour = detail.StartTime.Hours;
            var endHour = detail.EndTime.Hours;
            for (int i = startHour; i < endHour; i++)
            {
                bookedSlots.Add($"{i:00}:00");
            }
        }
        return bookedSlots.Distinct();
    }
}
