using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ProSport.Application.DTOs;
using ProSport.Application.DTOs.Auth;
using ProSport.Application.Interfaces;
using ProSport.Domain.Entities;
using BC = BCrypt.Net.BCrypt;

namespace ProSport.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IOtpCodeRepository _otpCodeRepository;
    private readonly IConfiguration _configuration;
    private readonly IEmailService _emailService;
    private readonly ILogger<AuthService> _logger;

    public AuthService(IUserRepository userRepository, IOtpCodeRepository otpCodeRepository, IConfiguration configuration, IEmailService emailService, ILogger<AuthService> logger)
    {
        _userRepository = userRepository;
        _otpCodeRepository = otpCodeRepository;
        _configuration = configuration;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<ApiResponseDto<int>> RegisterAsync(RegisterRequestDto request)
    {
        try
        {
            var existingUser = await _userRepository.GetByEmailAsync(request.Email);
            User userToProcess = null;

            // BUG #3 FIX: Check phone duplicate BEFORE updating/creating user
            if (!string.IsNullOrEmpty(request.PhoneNumber))
            {
                var existingPhone = await _userRepository.GetByPhoneAsync(request.PhoneNumber);
                if (existingPhone != null && existingPhone.UserId != existingUser?.UserId)
                {
                    return new ApiResponseDto<int>(400, "Phone number already in use.");
                }
            }

            if (existingUser != null)
            {
                if (existingUser.IsPhoneVerified)
                    return new ApiResponseDto<int>(400, "Email already exists.");
                
                // Update existing unverified user
                existingUser.FullName = request.FullName;
                existingUser.PasswordHash = BC.HashPassword(request.Password);
                existingUser.PhoneNumber = request.PhoneNumber;
                await _userRepository.UpdateAsync(existingUser);
                userToProcess = existingUser;
            }

            if (userToProcess == null)
            {
                var user = new User
                {
                    FullName = request.FullName,
                    Email = request.Email,
                    PasswordHash = BC.HashPassword(request.Password),
                    PhoneNumber = request.PhoneNumber,
                    Role = "Customer",
                    CreatedAt = DateTime.UtcNow
                };

                userToProcess = await _userRepository.CreateAsync(user);
            }

            // BUG #2 FIX: Always send OTP via email regardless of phone number
            var otpCode = GenerateOtp();
            await _otpCodeRepository.CreateAsync(new OtpCode
            {
                UserId = userToProcess.UserId,
                Code = otpCode,
                Type = "Register",
                ExpiryTime = DateTime.UtcNow.AddMinutes(5),
                CreatedAt = DateTime.UtcNow
            });
            
            // SEND REAL EMAIL
            string emailBody = $@"
                <div style='font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e0ecf0; border-radius: 12px;'>
                    <h2 style='color: #0d2d3a; text-align: center;'>Chào mừng đến với PRO-SPORT</h2>
                    <p>Xin chào <strong>{request.FullName}</strong>,</p>
                    <p>Cảm ơn bạn đã đăng ký tài khoản. Đây là mã xác nhận (OTP) của bạn, có hiệu lực trong 5 phút:</p>
                    <div style='text-align: center; margin: 30px 0;'>
                        <span style='font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #00c8aa; background: #e8f2f8; padding: 15px 30px; border-radius: 8px;'>{otpCode}</span>
                    </div>
                    <p style='color: #7b8e98; font-size: 13px; text-align: center;'>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
                </div>
            ";
            await _emailService.SendEmailAsync(request.Email, "PRO-SPORT: Mã Xác Nhận Đăng Ký", emailBody);

            return new ApiResponseDto<int>(200, "Registration successful.", userToProcess.UserId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during registration for email: {Email}", request.Email);
            return new ApiResponseDto<int>(500, "An unexpected error occurred while processing your request.");
        }
    }

    public async Task<ApiResponseDto<bool>> ResendOtpAsync(ResendOtpRequestDto request)
    {
        try
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
                return new ApiResponseDto<bool>(404, "User not found.", false);

            var otpCode = GenerateOtp();
            await _otpCodeRepository.CreateAsync(new OtpCode
            {
                UserId = user.UserId,
                Code = otpCode,
                Type = request.Type,
                ExpiryTime = DateTime.UtcNow.AddMinutes(5),
                CreatedAt = DateTime.UtcNow
            });

            string emailBody = $@"
                <div style='font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e0ecf0; border-radius: 12px;'>
                    <h2 style='color: #0d2d3a; text-align: center;'>Mã Xác Nhận Mới</h2>
                    <p>Xin chào <strong>{user.FullName}</strong>,</p>
                    <p>Bạn vừa yêu cầu gửi lại mã xác nhận. Đây là mã OTP mới của bạn, có hiệu lực trong 5 phút:</p>
                    <div style='text-align: center; margin: 30px 0;'>
                        <span style='font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #00c8aa; background: #e8f2f8; padding: 15px 30px; border-radius: 8px;'>{otpCode}</span>
                    </div>
                    <p style='color: #7b8e98; font-size: 13px; text-align: center;'>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
                </div>
            ";
            await _emailService.SendEmailAsync(user.Email, "PRO-SPORT: Mã Xác Nhận Mới", emailBody);

            return new ApiResponseDto<bool>(200, "OTP resent successfully.", true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during OTP resend for email: {Email}", request.Email);
            return new ApiResponseDto<bool>(500, "An unexpected error occurred while processing your request.", false);
        }
    }

    public async Task<ApiResponseDto<AuthResponseDto>> LoginAsync(LoginRequestDto request)
    {
        try
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null || user.PasswordHash == null || !BC.Verify(request.Password, user.PasswordHash))
                return new ApiResponseDto<AuthResponseDto>(401, "Invalid email or password.");

            var token = GenerateJwtToken(user);

            return new ApiResponseDto<AuthResponseDto>(200, "Login successful.", new AuthResponseDto
            {
                UserId = user.UserId,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                AccessToken = token,
                IsProfileComplete = !string.IsNullOrEmpty(user.PhoneNumber)
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login for email: {Email}", request.Email);
            return new ApiResponseDto<AuthResponseDto>(500, "An unexpected error occurred while processing your request.");
        }
    }

    public async Task<ApiResponseDto<AuthResponseDto>> GoogleLoginAsync(GoogleLoginRequestDto request)
    {
        try
        {
            var clientId = _configuration["GoogleAuth:ClientId"];
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { clientId }
            };

            GoogleJsonWebSignature.Payload payload;
            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(request.GoogleIdToken, settings);
            }
            catch (InvalidJwtException)
            {
                return new ApiResponseDto<AuthResponseDto>(401, "Invalid Google token.");
            }

            var user = await _userRepository.GetByGoogleIdAsync(payload.Subject) ?? await _userRepository.GetByEmailAsync(payload.Email);

            if (user == null)
            {
                user = new User
                {
                    FullName = payload.Name,
                    Email = payload.Email,
                    GoogleId = payload.Subject,
                    Role = "Customer",
                    AvatarUrl = payload.Picture,
                    EKycStatus = "Verified", // Google accounts are considered verified
                    CreatedAt = DateTime.UtcNow
                };
                user = await _userRepository.CreateAsync(user);
            }
            else if (string.IsNullOrEmpty(user.GoogleId))
            {
                user.GoogleId = payload.Subject;
                user.AvatarUrl ??= payload.Picture;
                await _userRepository.UpdateAsync(user);
            }

            var token = GenerateJwtToken(user);

            return new ApiResponseDto<AuthResponseDto>(200, "Google login successful.", new AuthResponseDto
            {
                UserId = user.UserId,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                AccessToken = token,
                IsProfileComplete = !string.IsNullOrEmpty(user.PhoneNumber)
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during Google login");
            return new ApiResponseDto<AuthResponseDto>(500, "An unexpected error occurred while processing your request.");
        }
    }

    public async Task<ApiResponseDto<bool>> VerifyOtpAsync(VerifyOtpRequestDto request)
    {
        try
        {
            Console.WriteLine($"[VerifyOtp] Received Request - UserId: {request.UserId}, Email: {request.Email}, OtpCode: {request.OtpCode}, Type: {request.Type}");
            
            int userId = request.UserId;
            if (userId == 0 && !string.IsNullOrEmpty(request.Email))
            {
                var user = await _userRepository.GetByEmailAsync(request.Email);
                if (user == null) return new ApiResponseDto<bool>(404, "User not found.", false);
                userId = user.UserId;
            }

            var otp = await _otpCodeRepository.GetLatestValidOtpAsync(userId, request.Type);
            
            if (otp == null)
            {
                Console.WriteLine($"[VerifyOtp] No valid OTP found in DB for UserId: {userId}");
                return new ApiResponseDto<bool>(400, "Invalid or expired OTP.", false);
            }

            if (otp.Code != request.OtpCode)
            {
                Console.WriteLine($"[VerifyOtp] OTP Code mismatch. Expected: {otp.Code}, Received: {request.OtpCode}");
                return new ApiResponseDto<bool>(400, "Invalid or expired OTP.", false);
            }

            if (request.Type == "Register")
            {
                await _otpCodeRepository.MarkAsUsedAsync(otp.OtpId);
                var user = await _userRepository.GetByIdAsync(userId);
                if (user != null)
                {
                    user.IsPhoneVerified = true;
                    await _userRepository.UpdateAsync(user);
                }
            }
            // For ResetPassword, we do NOT burn the OTP here. We burn it in ResetPasswordAsync.

            Console.WriteLine($"[VerifyOtp] Success!");
            return new ApiResponseDto<bool>(200, "OTP verified successfully.", true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during OTP verification for UserId: {UserId}", request.UserId);
            return new ApiResponseDto<bool>(500, "An unexpected error occurred while processing your request.", false);
        }
    }

    public async Task<ApiResponseDto<bool>> ChangePasswordAsync(int userId, ChangePasswordRequestDto request)
    {
        try
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null || user.PasswordHash == null || !BC.Verify(request.CurrentPassword, user.PasswordHash))
                return new ApiResponseDto<bool>(400, "Invalid current password.", false);

            user.PasswordHash = BC.HashPassword(request.NewPassword);
            await _userRepository.UpdateAsync(user);

            return new ApiResponseDto<bool>(200, "Password changed successfully.", true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during password change for UserId: {UserId}", userId);
            return new ApiResponseDto<bool>(500, "An unexpected error occurred while processing your request.", false);
        }
    }

    public async Task<ApiResponseDto<bool>> CompleteProfileAsync(int userId, CompleteProfileRequestDto request)
    {
        try
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return new ApiResponseDto<bool>(404, "User not found.", false);

            if (!string.IsNullOrEmpty(request.PhoneNumber))
            {
                var existingPhone = await _userRepository.GetByPhoneAsync(request.PhoneNumber);
                if (existingPhone != null && existingPhone.UserId != userId)
                    return new ApiResponseDto<bool>(400, "Phone number already exists.", false);
                
                user.PhoneNumber = request.PhoneNumber;
                await _userRepository.UpdateAsync(user);
            }

            return new ApiResponseDto<bool>(200, "Profile completed successfully.", true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during profile completion for UserId: {UserId}", userId);
            return new ApiResponseDto<bool>(500, "An unexpected error occurred while processing your request.", false);
        }
    }


    public async Task<ApiResponseDto<bool>> ForgotPasswordAsync(ForgotPasswordRequestDto request)
    {
        try
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
                return new ApiResponseDto<bool>(404, "User not found.", false);

            var otpCode = GenerateOtp();
            await _otpCodeRepository.CreateAsync(new OtpCode
            {
                UserId = user.UserId,
                Code = otpCode,
                Type = "ResetPassword",
                ExpiryTime = DateTime.UtcNow.AddMinutes(5),
                CreatedAt = DateTime.UtcNow
            });

            // SEND REAL EMAIL
            string emailBody = $@"
                <div style='font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e0ecf0; border-radius: 12px;'>
                    <h2 style='color: #0d2d3a; text-align: center;'>Khôi phục mật khẩu PRO-SPORT</h2>
                    <p>Xin chào <strong>{user.FullName}</strong>,</p>
                    <p>Chúng tôi nhận được yêu cầu khôi phục mật khẩu từ bạn. Vui lòng sử dụng mã xác nhận (OTP) sau đây, mã có hiệu lực trong 5 phút:</p>
                    <div style='text-align: center; margin: 30px 0;'>
                        <span style='font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #00c8aa; background: #e8f2f8; padding: 15px 30px; border-radius: 8px;'>{otpCode}</span>
                    </div>
                    <p style='color: #7b8e98; font-size: 13px; text-align: center;'>Nếu bạn không yêu cầu đổi mật khẩu, tài khoản của bạn vẫn an toàn và bạn có thể bỏ qua email này.</p>
                </div>
            ";
            await _emailService.SendEmailAsync(user.Email, "PRO-SPORT: Mã Khôi Phục Mật Khẩu", emailBody);

            return new ApiResponseDto<bool>(200, "OTP sent successfully.", true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during forgot password for email: {Email}", request.Email);
            return new ApiResponseDto<bool>(500, "An unexpected error occurred while processing your request.", false);
        }
    }

    public async Task<ApiResponseDto<bool>> ResetPasswordAsync(ResetPasswordRequestDto request)
    {
        try
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
                return new ApiResponseDto<bool>(404, "User not found.", false);

            var otp = await _otpCodeRepository.GetLatestValidOtpAsync(user.UserId, "ResetPassword");
            if (otp == null || otp.Code != request.OtpCode)
                return new ApiResponseDto<bool>(400, "Invalid or expired OTP.", false);

            await _otpCodeRepository.MarkAsUsedAsync(otp.OtpId);

            user.PasswordHash = BC.HashPassword(request.NewPassword);
            await _userRepository.UpdateAsync(user);

            return new ApiResponseDto<bool>(200, "Password reset successfully.", true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during password reset for email: {Email}", request.Email);
            return new ApiResponseDto<bool>(500, "An unexpected error occurred while processing your request.", false);
        }
    }

    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiryMinutes = Convert.ToDouble(_configuration["JwtSettings:ExpiryInMinutes"]);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("FullName", user.FullName)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private string GenerateOtp()
    {
        return System.Security.Cryptography.RandomNumberGenerator.GetInt32(100000, 1000000).ToString();
    }
}
