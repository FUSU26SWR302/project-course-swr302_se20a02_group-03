using ProSport.Domain.Entities;

namespace ProSport.Application.Interfaces;

public interface ICourtRepository
{
    Task<IEnumerable<Court>> GetAllAsync();
    Task<Court?> GetByIdAsync(int courtId);
    Task<IEnumerable<Court>> GetAvailableCourtsAsync(DateTime date, TimeSpan startTime, TimeSpan endTime);
    Task<Court> CreateAsync(Court court);
    Task UpdateAsync(Court court);
    Task<IEnumerable<string>> GetBookedSlotsAsync(int courtId, DateTime date);
}
