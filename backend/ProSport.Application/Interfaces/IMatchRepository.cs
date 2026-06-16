using ProSport.Domain.Entities;

namespace ProSport.Application.Interfaces;

public interface IMatchRepository
{
    Task<IEnumerable<Match>> GetMatchesByStatusAsync(string status);
    Task<Match?> GetMatchByIdAsync(int matchId);
    Task<Match> CreateMatchAsync(Match match);
    Task UpdateMatchAsync(Match match);
    
    Task<MatchParticipant?> GetParticipantAsync(int matchId, int userId);
    Task AddParticipantAsync(MatchParticipant participant);
    Task UpdateParticipantAsync(MatchParticipant participant);
}
