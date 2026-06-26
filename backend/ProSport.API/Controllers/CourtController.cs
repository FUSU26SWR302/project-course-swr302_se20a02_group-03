using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProSport.Application.DTOs;
using ProSport.Application.Interfaces;

namespace ProSport.API.Controllers;

[Route("api/courts")]
[ApiController]
public class CourtController : ControllerBase
{
    private readonly ICourtService _courtService;

    public CourtController(ICourtService courtService)
    {
        _courtService = courtService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCourts()
    {
        var response = await _courtService.GetAllCourtsAsync();
        return StatusCode(response.StatusCode, response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCourtById(int id)
    {
        var response = await _courtService.GetCourtByIdAsync(id);
        return StatusCode(response.StatusCode, response);
    }

    [HttpGet("available")]
    public async Task<IActionResult> GetAvailableCourts([FromQuery] DateTime date, [FromQuery] TimeSpan startTime, [FromQuery] TimeSpan endTime)
    {
        var response = await _courtService.GetAvailableCourtsAsync(date, startTime, endTime);
        return StatusCode(response.StatusCode, response);
    }

    [HttpGet("{id}/booked-slots")]
    public async Task<IActionResult> GetBookedSlots(int id, [FromQuery] DateTime date)
    {
        // For simplicity, we delegate this to CourtService
        var response = await _courtService.GetBookedSlotsAsync(id, date);
        return StatusCode(response.StatusCode, response);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreateCourt([FromBody] CreateCourtDto dto)
    {
        var response = await _courtService.CreateCourtAsync(dto);
        return StatusCode(response.StatusCode, response);
    }
}
