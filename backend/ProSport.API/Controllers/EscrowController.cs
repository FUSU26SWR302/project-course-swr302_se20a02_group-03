using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProSport.Application.DTOs;
using ProSport.Application.Interfaces;
using System.Security.Claims;

namespace ProSport.API.Controllers;

[Route("api/escrow")]
[ApiController]
[Authorize]
public class EscrowController : ControllerBase
{
    private readonly IEscrowService _escrowService;

    public EscrowController(IEscrowService escrowService)
    {
        _escrowService = escrowService;
    }

    private bool TryGetUserId(out int userId)
    {
        userId = 0;
        var claim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return !string.IsNullOrEmpty(claim) && int.TryParse(claim, out userId);
    }

    [HttpGet("my-wallet")]
    public async Task<IActionResult> GetMyWallet()
    {
        if (!TryGetUserId(out int userId))
            return Unauthorized(new ApiResponseDto<object>(401, "Unauthorized"));

        var response = await _escrowService.GetWalletAsync(userId);
        return StatusCode(response.StatusCode, response);
    }

    [HttpGet("my-transactions")]
    public async Task<IActionResult> GetMyTransactions()
    {
        if (!TryGetUserId(out int userId))
            return Unauthorized(new ApiResponseDto<object>(401, "Unauthorized"));

        var response = await _escrowService.GetTransactionHistoryAsync(userId);
        return StatusCode(response.StatusCode, response);
    }

    // API nạp tiền tạm thời dùng cho FE test (Mock VNPay)
    [HttpPost("deposit-mock")]
    public async Task<IActionResult> DepositMock([FromQuery] decimal amount)
    {
        if (!TryGetUserId(out int userId))
            return Unauthorized(new ApiResponseDto<object>(401, "Unauthorized"));

        var response = await _escrowService.DepositAsync(userId, amount, $"MOCK-{Guid.NewGuid()}", "Nạp tiền Mock");
        return StatusCode(response.StatusCode, response);
    }

    [HttpPost("pay-booking/{bookingId}")]
    public async Task<IActionResult> PayBooking(int bookingId)
    {
        if (!TryGetUserId(out int userId))
            return Unauthorized(new ApiResponseDto<object>(401, "Unauthorized"));

        var response = await _escrowService.PayForBookingAsync(userId, bookingId);
        return StatusCode(response.StatusCode, response);
    }
}
