using ProSport.Application.DTOs;
using ProSport.Application.DTOs.Auth;

namespace ProSport.Application.Services;

public interface IAuthService
{
    Task<ApiResponseDto<int>> RegisterAsync(RegisterRequestDto request);
    Task<ApiResponseDto<AuthResponseDto>> LoginAsync(LoginRequestDto request);
    Task<ApiResponseDto<AuthResponseDto>> GoogleLoginAsync(GoogleLoginRequestDto request);
    Task<ApiResponseDto<bool>> VerifyOtpAsync(VerifyOtpRequestDto request);
    Task<ApiResponseDto<bool>> ChangePasswordAsync(int userId, ChangePasswordRequestDto request);
    Task<ApiResponseDto<bool>> ForgotPasswordAsync(ForgotPasswordRequestDto request);
    Task<ApiResponseDto<bool>> ResetPasswordAsync(ResetPasswordRequestDto request);
    Task<ApiResponseDto<bool>> ResendOtpAsync(ResendOtpRequestDto request);
    Task<ApiResponseDto<bool>> CompleteProfileAsync(int userId, CompleteProfileRequestDto request);
    Task<ApiResponseDto<AuthResponseDto>> GetProfileAsync(int userId);
}
