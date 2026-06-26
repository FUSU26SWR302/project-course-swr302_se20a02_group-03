using Microsoft.Extensions.Logging;
using ProSport.Application.DTOs;
using ProSport.Application.Interfaces;
using ProSport.Domain.Entities;

namespace ProSport.Application.Services;

public class CourtService : ICourtService
{
    private readonly ICourtRepository _courtRepository;
    private readonly ILogger<CourtService> _logger;

    public CourtService(ICourtRepository courtRepository, ILogger<CourtService> logger)
    {
        _courtRepository = courtRepository;
        _logger = logger;
    }

    public async Task<ApiResponseDto<IEnumerable<CourtDto>>> GetAllCourtsAsync()
    {
        try
        {
            var courts = await _courtRepository.GetAllAsync();
            var dtos = courts.Select(MapToDto);
            return new ApiResponseDto<IEnumerable<CourtDto>>(200, "Success", dtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all courts");
            return new ApiResponseDto<IEnumerable<CourtDto>>(500, "An unexpected error occurred.");
        }
    }

    public async Task<ApiResponseDto<CourtDto>> GetCourtByIdAsync(int courtId)
    {
        try
        {
            var court = await _courtRepository.GetByIdAsync(courtId);
            if (court == null)
                return new ApiResponseDto<CourtDto>(404, "Court not found");

            return new ApiResponseDto<CourtDto>(200, "Success", MapToDto(court));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting court by id: {CourtId}", courtId);
            return new ApiResponseDto<CourtDto>(500, "An unexpected error occurred.");
        }
    }

    public async Task<ApiResponseDto<IEnumerable<CourtDto>>> GetAvailableCourtsAsync(DateTime date, TimeSpan startTime, TimeSpan endTime)
    {
        try
        {
            var courts = await _courtRepository.GetAvailableCourtsAsync(date, startTime, endTime);
            var dtos = courts.Select(MapToDto);
            return new ApiResponseDto<IEnumerable<CourtDto>>(200, "Success", dtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting available courts for date: {Date}", date);
            return new ApiResponseDto<IEnumerable<CourtDto>>(500, "An unexpected error occurred.");
        }
    }

    public async Task<ApiResponseDto<CourtDto>> CreateCourtAsync(CreateCourtDto dto)
    {
        try
        {
            var court = new Court
            {
                Name = dto.Name,
                CourtTypeId = dto.CourtTypeId,
                ImageUrl = dto.ImageUrl,
                Description = dto.Description,
                Status = "Available"
            };

            var created = await _courtRepository.CreateAsync(court);

            // Re-fetch to include CourtType navigation
            var fullCourt = await _courtRepository.GetByIdAsync(created.CourtId);
            return new ApiResponseDto<CourtDto>(201, "Court created successfully", MapToDto(fullCourt!));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating court: {CourtName}", dto.Name);
            return new ApiResponseDto<CourtDto>(500, "An unexpected error occurred.");
        }
    }

    private static CourtDto MapToDto(Court court)
    {
        return new CourtDto
        {
            CourtId = court.CourtId,
            Name = court.Name,
            CourtTypeName = court.CourtType?.Name ?? "",
            Status = court.Status,
            ImageUrl = court.ImageUrl,
            Description = court.Description,
            PricePerHour = court.PricingRules?.FirstOrDefault()?.PricePerHour ?? 100000
        };
    }

    public async Task<ApiResponseDto<IEnumerable<string>>> GetBookedSlotsAsync(int courtId, DateTime date)
    {
        try
        {
            var bookedSlots = await _courtRepository.GetBookedSlotsAsync(courtId, date);
            return new ApiResponseDto<IEnumerable<string>>(200, "Success", bookedSlots);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting booked slots for court: {CourtId} on {Date}", courtId, date);
            return new ApiResponseDto<IEnumerable<string>>(500, "An unexpected error occurred.");
        }
    }
}
