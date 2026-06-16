using ProSport.Application.DTOs;

namespace ProSport.Application.Interfaces;

public interface IBookingService
{
    Task<ApiResponseDto<IEnumerable<BookingDto>>> GetAllBookingsAsync();
    Task<ApiResponseDto<BookingDto>> GetBookingByIdAsync(int bookingId);
    Task<ApiResponseDto<IEnumerable<BookingDto>>> GetUserBookingsAsync(int userId);
    Task<ApiResponseDto<BookingDto>> CreateBookingAsync(CreateBookingDto dto);
    Task<ApiResponseDto<BookingDto>> ConfirmBookingPaymentAsync(int bookingId, string vnpayTransactionId, decimal paidAmount);
    Task<ApiResponseDto<bool>> CancelBookingAsync(int userId, int bookingId);
    Task<ApiResponseDto<BookingDto>> ProcessCheckInAsync(string checkInCode, int staffId);
}
