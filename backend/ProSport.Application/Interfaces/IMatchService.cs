using ProSport.Application.DTOs;

namespace ProSport.Application.Interfaces;

public interface IMatchService
{
    Task<ApiResponseDto<IEnumerable<MatchDto>>> GetAvailableMatchesAsync();
    Task<ApiResponseDto<MatchDto>> GetMatchByIdAsync(int matchId);
    
    // Host tạo kèo
    Task<ApiResponseDto<MatchDto>> CreateMatchAsync(int hostId, CreateMatchDto dto);
    
    // Joiner xin vào kèo (sẽ gọi EscrowService để khóa tiền)
    Task<ApiResponseDto<bool>> JoinMatchAsync(int matchId, int userId);
    
    // Host duyệt Joiner
    Task<ApiResponseDto<bool>> ApproveJoinerAsync(int matchId, int hostId, int joinerId);
    
    // Rời kèo (trả lại tiền ký quỹ)
    Task<ApiResponseDto<bool>> LeaveMatchAsync(int matchId, int userId);
    
    // Đánh dấu kèo hoàn thành (chia tiền, trả cọc)
    Task<ApiResponseDto<bool>> CompleteMatchAsync(int matchId, int hostId);
}
