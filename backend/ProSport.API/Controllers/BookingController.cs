using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProSport.Application.DTOs;
using ProSport.Application.Interfaces;
using System.Security.Claims;

namespace ProSport.API.Controllers;

[Route("api/bookings")]
[ApiController]
public class BookingController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [Authorize(Roles = "Admin,Staff")]
    [HttpGet]
    public async Task<IActionResult> GetAllBookings()
    {
        var response = await _bookingService.GetAllBookingsAsync();
        return StatusCode(response.StatusCode, response);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBookingById(int id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized(new ApiResponseDto<object>(401, "Unauthorized"));
        }

        var response = await _bookingService.GetBookingByIdAsync(id);

        // Security: Chỉ Admin/Staff hoặc chính chủ mới được xem booking
        if (response.Data != null && response.Data.UserId != userId
            && !User.IsInRole("Admin") && !User.IsInRole("Staff"))
        {
            return StatusCode(403, new ApiResponseDto<object>(403, "Bạn không có quyền xem booking này"));
        }

        return StatusCode(response.StatusCode, response);
    }

    [Authorize]
    [HttpGet("my-bookings")]
    public async Task<IActionResult> GetMyBookings()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized(new ApiResponseDto<object>(401, "Unauthorized"));
        }

        var response = await _bookingService.GetUserBookingsAsync(userId);
        return StatusCode(response.StatusCode, response);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized(new ApiResponseDto<object>(401, "Unauthorized"));
        }

        // Ép UserId lấy từ JWT token để bảo mật, chống fake UserId
        dto.UserId = userId;

        var response = await _bookingService.CreateBookingAsync(dto);
        return StatusCode(response.StatusCode, response);
    }

    [Authorize]
    [HttpPut("{id}/cancel")]
    public async Task<IActionResult> CancelBooking(int id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized(new ApiResponseDto<object>(401, "Unauthorized"));
        }

        var response = await _bookingService.CancelBookingAsync(userId, id);
        return StatusCode(response.StatusCode, response);
    }

    [Authorize(Roles = "Admin,Staff,EliteStaff")]
    [HttpPost("check-in")]
    public async Task<IActionResult> ProcessCheckIn([FromBody] CheckInRequestDto dto)
    {
        var staffIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(staffIdClaim) || !int.TryParse(staffIdClaim, out int staffId))
        {
            return Unauthorized(new ApiResponseDto<object>(401, "Unauthorized"));
        }

        if (string.IsNullOrEmpty(dto.CheckInCode))
        {
            return BadRequest(new ApiResponseDto<object>(400, "Mã CheckInCode không được để trống."));
        }

        var response = await _bookingService.ProcessCheckInAsync(dto.CheckInCode, staffId);
        return StatusCode(response.StatusCode, response);
    }
}
