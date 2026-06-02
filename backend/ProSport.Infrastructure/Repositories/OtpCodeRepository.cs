using Microsoft.EntityFrameworkCore;
using ProSport.Application.Interfaces;
using ProSport.Domain.Entities;
using ProSport.Infrastructure.Data;

namespace ProSport.Infrastructure.Repositories;

public class OtpCodeRepository : IOtpCodeRepository
{
    private readonly ProSportDbContext _context;

    public OtpCodeRepository(ProSportDbContext context)
    {
        _context = context;
    }

    public async Task<OtpCode> CreateAsync(OtpCode otp)
    {
        _context.OtpCodes.Add(otp);
        await _context.SaveChangesAsync();
        return otp;
    }

    public async Task<OtpCode?> GetLatestValidOtpAsync(int userId, string type)
    {
        var now = DateTime.UtcNow;
        return await _context.OtpCodes
            .Where(o => o.UserId == userId && o.Type == type && !o.IsUsed && o.ExpiryTime > now)
            .OrderByDescending(o => o.CreatedAt)
            .FirstOrDefaultAsync();
    }

    public async Task<OtpCode?> GetByCodeAsync(string code, string type)
    {
        var now = DateTime.UtcNow;
        return await _context.OtpCodes
            .Where(o => o.Code == code && o.Type == type && !o.IsUsed && o.ExpiryTime > now)
            .OrderByDescending(o => o.CreatedAt)
            .FirstOrDefaultAsync();
    }

    public async Task MarkAsUsedAsync(int otpId)
    {
        var otp = await _context.OtpCodes.FindAsync(otpId);
        if (otp != null)
        {
            otp.IsUsed = true;
            await _context.SaveChangesAsync();
        }
    }
}
