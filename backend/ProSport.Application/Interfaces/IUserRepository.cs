using ProSport.Domain.Entities;

namespace ProSport.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(int userId);
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByPhoneAsync(string phone);
    Task<User?> GetByGoogleIdAsync(string googleId);
    Task<User> CreateAsync(User user);
    Task UpdateAsync(User user);
}
