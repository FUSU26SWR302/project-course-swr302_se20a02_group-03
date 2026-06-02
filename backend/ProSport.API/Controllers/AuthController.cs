using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using ProSport.Application.DTOs;
using ProSport.Application.DTOs.Auth;
using ProSport.Application.Services;

namespace ProSport.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
    {
        var result = await _authService.RegisterAsync(request);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        var result = await _authService.LoginAsync(request);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost("google-login")]
    [AllowAnonymous]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequestDto request)
    {
        var result = await _authService.GoogleLoginAsync(request);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost("verify-otp")]
    [AllowAnonymous]
    [EnableRateLimiting("OtpPolicy")]
    public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequestDto request)
    {
        var result = await _authService.VerifyOtpAsync(request);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost("resend-otp")]
    [AllowAnonymous]
    [EnableRateLimiting("OtpPolicy")]
    public async Task<IActionResult> ResendOtp([FromBody] ResendOtpRequestDto request)
    {
        var result = await _authService.ResendOtpAsync(request);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequestDto request)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            return Unauthorized(new ApiResponseDto<bool>(401, "Unauthorized", false));

        var result = await _authService.ChangePasswordAsync(userId, request);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost("complete-profile")]
    [Authorize]
    public async Task<IActionResult> CompleteProfile([FromBody] CompleteProfileRequestDto request)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
            return Unauthorized(new ApiResponseDto<bool>(401, "Unauthorized", false));

        var result = await _authService.CompleteProfileAsync(userId, request);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost("forgot-password")]
    [AllowAnonymous]
    [EnableRateLimiting("OtpPolicy")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDto request)
    {
        var result = await _authService.ForgotPasswordAsync(request);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPost("reset-password")]
    [AllowAnonymous]
    [EnableRateLimiting("OtpPolicy")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestDto request)
    {
        var result = await _authService.ResetPasswordAsync(request);
        return StatusCode(result.StatusCode, result);
    }
}
