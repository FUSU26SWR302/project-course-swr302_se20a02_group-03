namespace ProSport.Application.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string toEmail, string subject, string body);
    Task SendBookingConfirmationEmailAsync(string toEmail, string customerName, string bookingDetails, string checkInCode);
}
