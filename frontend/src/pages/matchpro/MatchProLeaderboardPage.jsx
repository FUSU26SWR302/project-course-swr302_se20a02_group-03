import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import MatchProLayout from '../../layouts/MatchProLayout'
import './MatchProLeaderboardPage.css'

const periods = ['This Week', 'This Month', 'All Time']
const sports = ['All Sports', 'Badminton', 'Pickleball']

const players = [
  { rank: 1, name: 'David K.', pts: 2450, wins: 34, matches: 40, sport: 'Badminton', level: 'Pro', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80', change: 0 },
  { rank: 2, name: 'Jessica W.', pts: 2100, wins: 28, matches: 35, sport: 'Pickleball', level: 'Advanced', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80', change: 1 },
  { rank: 3, name: 'Marcus T.', pts: 1980, wins: 25, matches: 33, sport: 'Badminton', level: 'Advanced', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', change: -1 },
  { rank: 4, name: 'Sarah J.', pts: 1750, wins: 22, matches: 30, sport: 'Pickleball', level: 'Intermediate', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80', change: 2 },
  { rank: 5, name: 'Jae Kim', pts: 1620, wins: 20, matches: 28, sport: 'Badminton', level: 'Advanced', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80', change: 0 },
  { rank: 6, name: 'Alex M.', pts: 1540, wins: 19, matches: 27, sport: 'Pickleball', level: 'Intermediate', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80', change: -2 },
  { rank: 7, name: 'Elena R.', pts: 1420, wins: 17, matches: 25, sport: 'Badminton', level: 'Advanced', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80', change: 1 },
  { rank: 8, name: 'Chris N.', pts: 1380, wins: 16, matches: 24, sport: 'Pickleball', level: 'Intermediate', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&q=80', change: 0 },
  { rank: 9, name: 'Mia S.', pts: 1250, wins: 14, matches: 22, sport: 'Badminton', level: 'Intermediate', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80', change: 3 },
  { rank: 10, name: 'Tom B.', pts: 1190, wins: 13, matches: 21, sport: 'Pickleball', level: 'Beginner', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80', change: -1 },
]

const sportColors = { Badminton: '#22c55e', Pickleball: '#6366f1', All: '#0d8a8a' }

export default function MatchProLeaderboardPage() {
  const [period, setPeriod] = useState('This Week')
  const [sport, setSport] = useState('All Sports')
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lb-hero', { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' })
      gsap.from('.lb-podium__place', { opacity: 0, y: 40, duration: 0.6, stagger: 0.12, ease: 'back.out(1.5)', delay: 0.3 })
      gsap.from('.lb-row', { opacity: 0, x: -30, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.5 })
    }, pageRef)
    return () => ctx.revert()
  }, [period, sport])

  const filtered = players.filter(p => sport === 'All Sports' || p.sport === sport)
  const top3 = filtered.slice(0, 3)
  const rest = filtered.slice(3)

  return (
    <MatchProLayout>
      <div className="mp-lb-page" ref={pageRef}>
        {/* Hero */}
        <div className="lb-hero">
          <div>
            <h1 className="lb-hero__title">🏆 Leaderboard</h1>
            <p className="lb-hero__sub">Top-ranked players across all sports this week.</p>
          </div>
          <div className="lb-filters">
            {periods.map(p => (
              <button key={p} className={`lb-period-btn ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
            ))}
          </div>
        </div>

        {/* Sport filter */}
        <div className="lb-sport-filters">
          {sports.map(s => (
            <button key={s} className={`lb-sport-btn ${sport === s ? 'active' : ''}`}
              style={sport === s ? { background: sportColors[s.replace(' Sports','').trim()] || '#0d8a8a' } : {}}
              onClick={() => setSport(s)}>
              {s}
            </button>
          ))}
        </div>

        {/* Podium top 3 */}
        {filtered.length >= 3 && (
          <div className="lb-podium">
            {/* 2nd */}
            <div className="lb-podium__place lb-podium__place--2">
              <img src={top3[1].img} alt={top3[1].name} className="lb-podium__avatar" />
              <div className="lb-podium__medal lb-podium__medal--silver">🥈</div>
              <p className="lb-podium__name">{top3[1].name}</p>
              <p className="lb-podium__pts">{top3[1].pts.toLocaleString()}</p>
              <div className="lb-podium__bar lb-podium__bar--2" />
            </div>
            {/* 1st */}
            <div className="lb-podium__place lb-podium__place--1">
              <div className="lb-podium__crown">👑</div>
              <img src={top3[0].img} alt={top3[0].name} className="lb-podium__avatar lb-podium__avatar--1" />
              <div className="lb-podium__medal lb-podium__medal--gold">🥇</div>
              <p className="lb-podium__name">{top3[0].name}</p>
              <p className="lb-podium__pts">{top3[0].pts.toLocaleString()}</p>
              <div className="lb-podium__bar lb-podium__bar--1" />
            </div>
            {/* 3rd */}
            <div className="lb-podium__place lb-podium__place--3">
              <img src={top3[2].img} alt={top3[2].name} className="lb-podium__avatar" />
              <div className="lb-podium__medal lb-podium__medal--bronze">🥉</div>
              <p className="lb-podium__name">{top3[2].name}</p>
              <p className="lb-podium__pts">{top3[2].pts.toLocaleString()}</p>
              <div className="lb-podium__bar lb-podium__bar--3" />
            </div>
          </div>
        )}

        {/* Full table */}
        <div className="lb-table">
          <div className="lb-table__header">
            <span className="lb-col-rank">Rank</span>
            <span className="lb-col-player">Player</span>
            <span className="lb-col-sport">Sport</span>
            <span className="lb-col-wins">Wins</span>
            <span className="lb-col-pts">Points</span>
            <span className="lb-col-change">±</span>
          </div>
          {rest.map((p, i) => (
            <div key={p.rank} className={`lb-row ${i % 2 === 0 ? 'lb-row--alt' : ''}`}>
              <span className="lb-col-rank lb-rank-num">{p.rank}</span>
              <div className="lb-col-player lb-player">
                <img src={p.img} alt={p.name} className="lb-player__avatar" />
                <div>
                  <p className="lb-player__name">{p.name}</p>
                  <p className="lb-player__level">{p.level}</p>
                </div>
              </div>
              <span className="lb-col-sport">
                <span className="lb-sport-dot" style={{ background: sportColors[p.sport] || '#94a3b8' }} />
                {p.sport}
              </span>
              <span className="lb-col-wins">{p.wins}/{p.matches}</span>
              <span className="lb-col-pts lb-pts">{p.pts.toLocaleString()}</span>
              <span className={`lb-col-change lb-change ${p.change > 0 ? 'lb-change--up' : p.change < 0 ? 'lb-change--down' : 'lb-change--same'}`}>
                {p.change > 0 ? `▲${p.change}` : p.change < 0 ? `▼${Math.abs(p.change)}` : '—'}
              </span>
            </div>
          ))}
        </div>

        {/* My rank card */}
        <div className="lb-my-rank">
          <div className="lb-my-rank__left">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" alt="You" className="lb-player__avatar" />
            <div>
              <p className="lb-player__name">Alex Johnson <span className="lb-you-badge">YOU</span></p>
              <p className="lb-player__level">Rank #6 · 1,540 pts</p>
            </div>
          </div>
          <div className="lb-my-rank__progress">
            <p className="lb-my-rank__label">260 pts to reach #5</p>
            <div className="lb-my-rank__bar">
              <div className="lb-my-rank__fill" style={{ width: '74%' }} />
            </div>
          </div>
        </div>
      </div>
    </MatchProLayout>
  )
}
