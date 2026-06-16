using System.ComponentModel.DataAnnotations;

namespace ProSport.Application.DTOs.Auth;

public class RegisterRequestDto
{
    [Required(ErrorMessage = "Full Name is required.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Full Name must be between 2 and 100 characters.")]
    public string FullName { get; set; } = null!;

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Password is required.")]
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
    [RegularExpression(@"^(?=.*[0-9]).{8,}$", ErrorMessage = "Password must contain at least one number.")]
    public string Password { get; set; } = null!;

    [Phone(ErrorMessage = "Invalid phone number format.")]
    [RegularExpression(@"^[0-9]+$", ErrorMessage = "Phone number must contain only digits.")]
    public string? PhoneNumber { get; set; }
}

public class LoginRequestDto
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Password is required.")]
    public string Password { get; set; } = null!;
}

public class GoogleLoginRequestDto
{
    [Required(ErrorMessage = "Google ID Token is required.")]
    public string GoogleIdToken { get; set; } = null!;
}

public class VerifyOtpRequestDto
{
    public int UserId { get; set; }

    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "OTP Code is required.")]
    public string OtpCode { get; set; } = null!;

    [Required(ErrorMessage = "Type is required.")]
    public string Type { get; set; } = null!; // "Register" or "ResetPassword"
}

public class ResendOtpRequestDto
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Type is required.")]
    public string Type { get; set; } = null!; // "Register" or "ResetPassword"
}

public class ChangePasswordRequestDto
{
    [Required(ErrorMessage = "Current Password is required.")]
    public string CurrentPassword { get; set; } = null!;

    [Required(ErrorMessage = "New Password is required.")]
    [MinLength(8, ErrorMessage = "New password must be at least 8 characters long.")]
    [RegularExpression(@"^(?=.*[0-9]).{8,}$", ErrorMessage = "New password must contain at least one number.")]
    public string NewPassword { get; set; } = null!;
}

public class ForgotPasswordRequestDto
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = null!;
}

public class ResetPasswordRequestDto
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "OTP Code is required.")]
    public string OtpCode { get; set; } = null!;

    [Required(ErrorMessage = "New Password is required.")]
    [MinLength(8, ErrorMessage = "New password must be at least 8 characters long.")]
    [RegularExpression(@"^(?=.*[0-9]).{8,}$", ErrorMessage = "New password must contain at least one number.")]
    public string NewPassword { get; set; } = null!;
}

public class CompleteProfileRequestDto
{
    [Required(ErrorMessage = "Phone Number is required.")]
    [Phone(ErrorMessage = "Invalid phone number format.")]
    [RegularExpression(@"^[0-9]+$", ErrorMessage = "Phone number must contain only digits.")]
    public string PhoneNumber { get; set; } = null!;
}

public class AuthResponseDto
{
    public int UserId { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string AccessToken { get; set; } = null!;
    public bool IsProfileComplete { get; set; }
    public string? AvatarUrl { get; set; }
}
