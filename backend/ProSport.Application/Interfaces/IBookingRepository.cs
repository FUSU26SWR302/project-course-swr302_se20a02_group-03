using ProSport.Domain.Entities;

namespace ProSport.Application.Interfaces;

public interface IBookingRepository
{
    Task<IEnumerable<Booking>> GetAllAsync();
    Task<Booking?> GetByIdAsync(int bookingId);
    Task<IEnumerable<Booking>> GetByUserIdAsync(int userId);
    Task<Booking?> GetByCheckInCodeAsync(string checkInCode);
    Task<Booking> CreateAsync(Booking booking);
    Task UpdateAsync(Booking booking);

    /// <summary>
    /// Tạo booking trong DB Transaction (Serializable) để tránh race condition double-booking.
    /// Nếu sân đã bị đặt giữa lúc check và create, throw InvalidOperationException.
    /// </summary>
    Task<Booking> CreateWithTransactionAsync(Booking booking);

    /// <summary>
    /// Tự động hủy các booking Pending đã quá hạn thanh toán (PaymentDeadline).
    /// </summary>
    Task<int> CancelExpiredBookingsAsync();
}
