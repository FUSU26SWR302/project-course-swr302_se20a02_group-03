using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using ProSport.Application.Interfaces;

namespace ProSport.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var smtpServer = _configuration["EmailSettings:SmtpServer"];
        var port = int.Parse(_configuration["EmailSettings:Port"]!);
        var senderName = _configuration["EmailSettings:SenderName"];
        var senderEmail = _configuration["EmailSettings:SenderEmail"];
        var senderPassword = _configuration["EmailSettings:SenderPassword"];

        using var client = new SmtpClient(smtpServer, port)
        {
            Credentials = new NetworkCredential(senderEmail, senderPassword),
            EnableSsl = true
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(senderEmail!, senderName),
            Subject = subject,
            Body = body,
            IsBodyHtml = true
        };

        mailMessage.To.Add(toEmail);

        await client.SendMailAsync(mailMessage);
    }

    public async Task SendBookingConfirmationEmailAsync(string toEmail, string customerName, string bookingDetails, string checkInCode)
    {
        var qrUrl = $"https://quickchart.io/qr?text={checkInCode}&size=300";
        var subject = "PRO-SPORT: Booking Confirmation & QR Check-in";
        var body = $@"
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0ecf0; border-radius: 10px;'>
            <h2 style='color: #0d2d3a; text-align: center;'>Booking Confirmed!</h2>
            <p>Hi <b>{customerName}</b>,</p>
            <p>Your court booking has been confirmed successfully. Here are the details:</p>
            <div style='background: #f0f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;'>
                {bookingDetails}
            </div>
            <p style='text-align: center; color: #0fc8b5; font-weight: bold;'>Please present this QR code to the staff upon arrival for check-in:</p>
            <div style='text-align: center; margin: 20px 0;'>
                <img src='{qrUrl}' alt='QR Code' style='width: 200px; height: 200px; border: 2px solid #0fc8b5; border-radius: 8px;' />
                <p style='font-size: 12px; color: #666;'>Check-in Code: {checkInCode}</p>
            </div>
            <hr style='border: none; border-top: 1px solid #e0ecf0;' />
            <p style='font-size: 12px; color: #999; text-align: center;'>Thank you for choosing PRO-SPORT!</p>
        </div>";

        await SendEmailAsync(toEmail, subject, body);
    }
}
