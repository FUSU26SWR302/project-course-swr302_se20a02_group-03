using ProSport.Domain.Entities;

namespace ProSport.Application.Interfaces;

public interface IOtpCodeRepository
{
    Task<OtpCode> CreateAsync(OtpCode otp);
    Task<OtpCode?> GetLatestValidOtpAsync(int userId, string type);
    Task<OtpCode?> GetByCodeAsync(string code, string type);
    Task MarkAsUsedAsync(int otpId);
}
