using ProSport.Application.DTOs;

namespace ProSport.Application.Interfaces;

public interface ICourtService
{
    Task<ApiResponseDto<IEnumerable<CourtDto>>> GetAllCourtsAsync();
    Task<ApiResponseDto<CourtDto>> GetCourtByIdAsync(int courtId);
    Task<ApiResponseDto<IEnumerable<CourtDto>>> GetAvailableCourtsAsync(DateTime date, TimeSpan startTime, TimeSpan endTime);
    Task<ApiResponseDto<CourtDto>> CreateCourtAsync(CreateCourtDto dto);
    Task<ApiResponseDto<IEnumerable<string>>> GetBookedSlotsAsync(int courtId, DateTime date);
}
