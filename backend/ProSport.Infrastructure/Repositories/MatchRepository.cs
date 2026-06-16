using Microsoft.EntityFrameworkCore;
using ProSport.Application.Interfaces;
using ProSport.Domain.Entities;
using ProSport.Infrastructure.Data;

namespace ProSport.Infrastructure.Repositories;

public class MatchRepository : IMatchRepository
{
    private readonly ProSportDbContext _context;

    public MatchRepository(ProSportDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Match>> GetMatchesByStatusAsync(string status)
    {
        return await _context.Matches
            .Where(m => m.Status == status)
            .OrderBy(m => m.MatchDate).ThenBy(m => m.StartTime)
            .ToListAsync();
    }

    public async Task<Match?> GetMatchByIdAsync(int matchId)
    {
        return await _context.Matches
            .Include(m => m.Participants)
            .FirstOrDefaultAsync(m => m.MatchId == matchId);
    }

    public async Task<Match> CreateMatchAsync(Match match)
    {
        _context.Matches.Add(match);
        await _context.SaveChangesAsync();
        return match;
    }

    public async Task UpdateMatchAsync(Match match)
    {
        _context.Matches.Update(match);
        await _context.SaveChangesAsync();
    }

    public async Task<MatchParticipant?> GetParticipantAsync(int matchId, int userId)
    {
        return await _context.MatchParticipants
            .FirstOrDefaultAsync(p => p.MatchId == matchId && p.UserId == userId);
    }

    public async Task AddParticipantAsync(MatchParticipant participant)
    {
        _context.MatchParticipants.Add(participant);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateParticipantAsync(MatchParticipant participant)
    {
        _context.MatchParticipants.Update(participant);
        await _context.SaveChangesAsync();
    }
}
