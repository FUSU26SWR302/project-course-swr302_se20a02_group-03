using Microsoft.Extensions.Logging;
using ProSport.Application.DTOs;
using ProSport.Application.Interfaces;
using ProSport.Domain.Entities;
using System.Transactions;

namespace ProSport.Application.Services;

public class EscrowService : IEscrowService
{
    private readonly IEscrowRepository _escrowRepository;
    private readonly IBookingRepository _bookingRepository;
    private readonly ILogger<EscrowService> _logger;

    public EscrowService(IEscrowRepository escrowRepository, IBookingRepository bookingRepository, ILogger<EscrowService> logger)
    {
        _escrowRepository = escrowRepository;
        _bookingRepository = bookingRepository;
        _logger = logger;
    }

    public async Task<ApiResponseDto<EscrowWalletDto>> GetWalletAsync(int userId)
    {
        try
        {
            var wallet = await _escrowRepository.GetWalletByUserIdAsync(userId);
            if (wallet == null)
            {
                // Auto create wallet if not exists
                wallet = new EscrowWallet { UserId = userId, Balance = 0, LockedBalance = 0 };
                await _escrowRepository.CreateWalletAsync(wallet);
            }

            return new ApiResponseDto<EscrowWalletDto>(200, "Success", new EscrowWalletDto
            {
                EscrowWalletId = wallet.EscrowWalletId,
                UserId = wallet.UserId,
                Balance = wallet.Balance,
                LockedBalance = wallet.LockedBalance
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting wallet for user {UserId}", userId);
            return new ApiResponseDto<EscrowWalletDto>(500, "Lỗi server khi lấy thông tin ví");
        }
    }

    public async Task<ApiResponseDto<IEnumerable<TransactionDto>>> GetTransactionHistoryAsync(int userId)
    {
        try
        {
            var wallet = await _escrowRepository.GetWalletByUserIdAsync(userId);
            if (wallet == null) return new ApiResponseDto<IEnumerable<TransactionDto>>(404, "Ví không tồn tại");

            var transactions = await _escrowRepository.GetTransactionsByWalletIdAsync(wallet.EscrowWalletId);
            var dtos = transactions.Select(t => new TransactionDto
            {
                TransactionId = t.TransactionId,
                Amount = t.Amount,
                Type = t.Type,
                Status = t.Status,
                ReferenceId = t.ReferenceId,
                Description = t.Description,
                CreatedAt = t.CreatedAt
            });

            return new ApiResponseDto<IEnumerable<TransactionDto>>(200, "Success", dtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting transaction history for user {UserId}", userId);
            return new ApiResponseDto<IEnumerable<TransactionDto>>(500, "Lỗi server khi lấy lịch sử giao dịch");
        }
    }

    public async Task<ApiResponseDto<bool>> DepositAsync(int userId, decimal amount, string referenceId, string description)
    {
        try
        {
            var wallet = await _escrowRepository.GetWalletByUserIdAsync(userId);
            if (wallet == null) return new ApiResponseDto<bool>(404, "Ví không tồn tại", false);

            wallet.Balance += amount;
            var transaction = new Domain.Entities.Transaction
            {
                EscrowWalletId = wallet.EscrowWalletId,
                Amount = amount,
                Type = "Deposit",
                Status = "Completed",
                ReferenceId = referenceId,
                Description = description
            };

            await _escrowRepository.UpdateWalletAsync(wallet);
            await _escrowRepository.AddTransactionAsync(transaction);

            return new ApiResponseDto<bool>(200, "Nạp tiền thành công", true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error depositing to wallet for user {UserId}", userId);
            return new ApiResponseDto<bool>(500, "Lỗi server khi nạp tiền", false);
        }
    }

    public async Task<ApiResponseDto<bool>> LockFundsAsync(int userId, decimal amount, int matchId, string description)
    {
        try
        {
            var wallet = await _escrowRepository.GetWalletByUserIdAsync(userId);
            if (wallet == null) return new ApiResponseDto<bool>(404, "Ví không tồn tại", false);

            if (wallet.Balance < amount)
                return new ApiResponseDto<bool>(400, "Số dư không đủ để ký quỹ. Vui lòng nạp thêm tiền.", false);

            wallet.Balance -= amount;
            wallet.LockedBalance += amount;

            var transaction = new Domain.Entities.Transaction
            {
                EscrowWalletId = wallet.EscrowWalletId,
                MatchId = matchId,
                Amount = amount,
                Type = "EscrowLock",
                Status = "Completed",
                Description = description
            };

            await _escrowRepository.UpdateWalletAsync(wallet);
            await _escrowRepository.AddTransactionAsync(transaction);

            return new ApiResponseDto<bool>(200, "Khóa tiền ký quỹ thành công", true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error locking funds for user {UserId}, match {MatchId}", userId, matchId);
            return new ApiResponseDto<bool>(500, "Lỗi server khi khóa tiền ký quỹ", false);
        }
    }

    public async Task<ApiResponseDto<bool>> ReleaseFundsAsync(int userId, decimal amount, int matchId, string description)
    {
        try
        {
            var wallet = await _escrowRepository.GetWalletByUserIdAsync(userId);
            if (wallet == null) return new ApiResponseDto<bool>(404, "Ví không tồn tại", false);

            if (wallet.LockedBalance < amount)
                return new ApiResponseDto<bool>(400, "Số tiền yêu cầu mở khóa vượt quá số dư đang bị khóa", false);

            wallet.LockedBalance -= amount;
            wallet.Balance += amount;

            var transaction = new Domain.Entities.Transaction
            {
                EscrowWalletId = wallet.EscrowWalletId,
                MatchId = matchId,
                Amount = amount,
                Type = "EscrowRelease",
                Status = "Completed",
                Description = description
            };

            await _escrowRepository.UpdateWalletAsync(wallet);
            await _escrowRepository.AddTransactionAsync(transaction);

            return new ApiResponseDto<bool>(200, "Mở khóa tiền ký quỹ thành công", true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error releasing funds for user {UserId}, match {MatchId}", userId, matchId);
            return new ApiResponseDto<bool>(500, "Lỗi server khi mở khóa tiền ký quỹ", false);
        }
    }

    public async Task<ApiResponseDto<bool>> DeductLockedFundsAsync(int userId, decimal amount, int matchId, string description)
    {
        try
        {
            var wallet = await _escrowRepository.GetWalletByUserIdAsync(userId);
            if (wallet == null) return new ApiResponseDto<bool>(404, "Ví không tồn tại", false);

            if (wallet.LockedBalance < amount)
                return new ApiResponseDto<bool>(400, "Số dư bị khóa không đủ để khấu trừ", false);

            wallet.LockedBalance -= amount;

            var transaction = new Domain.Entities.Transaction
            {
                EscrowWalletId = wallet.EscrowWalletId,
                MatchId = matchId,
                Amount = amount,
                Type = "Payment", // Thường là trả tiền sân hoặc phạt bùng kèo
                Status = "Completed",
                Description = description
            };

            await _escrowRepository.UpdateWalletAsync(wallet);
            await _escrowRepository.AddTransactionAsync(transaction);

            return new ApiResponseDto<bool>(200, "Khấu trừ tiền ký quỹ thành công", true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deducting locked funds for user {UserId}, match {MatchId}", userId, matchId);
            return new ApiResponseDto<bool>(500, "Lỗi server khi trừ tiền ký quỹ", false);
        }
    }

    public async Task<ApiResponseDto<bool>> PayForBookingAsync(int userId, int bookingId)
    {
        try
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null)
                return new ApiResponseDto<bool>(404, "Không tìm thấy thông tin đặt sân", false);

            if (booking.UserId != userId)
                return new ApiResponseDto<bool>(403, "Bạn không có quyền thanh toán cho đơn này", false);

            if (booking.PaymentStatus == "Paid")
                return new ApiResponseDto<bool>(400, "Đơn đặt sân này đã được thanh toán", false);

            // Kiểm tra booking đã hết hạn thanh toán chưa
            if (booking.PaymentDeadline.HasValue && DateTime.UtcNow > booking.PaymentDeadline.Value)
            {
                booking.Status = "Cancelled";
                await _bookingRepository.UpdateAsync(booking);
                return new ApiResponseDto<bool>(400, "Đơn đặt sân đã hết hạn thanh toán. Vui lòng đặt lại.", false);
            }

            // Sử dụng atomic method để tránh race condition trừ tiền 2 lần
            var payResult = await _escrowRepository.PayFromWalletAtomicAsync(
                userId, booking.TotalAmount, bookingId);

            if (!payResult)
                return new ApiResponseDto<bool>(400, "Số dư không đủ để thanh toán. Vui lòng nạp thêm tiền.", false);

            // Cập nhật booking
            booking.PaymentMethod = "Escrow";
            booking.PaymentStatus = "Paid";
            booking.Status = "Confirmed";
            booking.CheckInCode = $"QR-{booking.BookingId}-{Guid.NewGuid().ToString()[..8]}";
            await _bookingRepository.UpdateAsync(booking);

            return new ApiResponseDto<bool>(200, "Thanh toán bằng ví Escrow thành công", true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error paying for booking {BookingId} by user {UserId}", bookingId, userId);
            return new ApiResponseDto<bool>(500, "Lỗi server khi thanh toán đặt sân", false);
        }
    }
}
