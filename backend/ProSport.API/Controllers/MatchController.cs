using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProSport.Application.DTOs;
using ProSport.Application.Interfaces;
using System.Security.Claims;

namespace ProSport.API.Controllers;

[Route("api/matches")]
[ApiController]
public class MatchController : ControllerBase
{
    private readonly IMatchService _matchService;

    public MatchController(IMatchService matchService)
    {
        _matchService = matchService;
    }

    [HttpGet("open")]
    public async Task<IActionResult> GetAvailableMatches()
    {
        var response = await _matchService.GetAvailableMatchesAsync();
        return StatusCode(response.StatusCode, response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMatchById(int id)
    {
        var response = await _matchService.GetMatchByIdAsync(id);
        return StatusCode(response.StatusCode, response);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateMatch([FromBody] CreateMatchDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var response = await _matchService.CreateMatchAsync(userId, dto);
        return StatusCode(response.StatusCode, response);
    }

    [Authorize]
    [HttpPost("{id}/join")]
    public async Task<IActionResult> JoinMatch(int id)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var response = await _matchService.JoinMatchAsync(id, userId);
        return StatusCode(response.StatusCode, response);
    }

    [Authorize]
    [HttpPost("{id}/approve/{joinerId}")]
    public async Task<IActionResult> ApproveJoiner(int id, int joinerId)
    {
        var hostId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var response = await _matchService.ApproveJoinerAsync(id, hostId, joinerId);
        return StatusCode(response.StatusCode, response);
    }

    [Authorize]
    [HttpPost("{id}/leave")]
    public async Task<IActionResult> LeaveMatch(int id)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var response = await _matchService.LeaveMatchAsync(id, userId);
        return StatusCode(response.StatusCode, response);
    }
}
