import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ApexLayout from '../../layouts/ApexLayout'
import { matchApi } from '../../api/matchApi'
import authApi from '../../api/authApi'
import dayjs from 'dayjs'
import './ApexMatchesPage.css'

const myMatches = [
  { id: 1, sport: 'Badminton', opponent: 'David K.', result: 'WON', score: '21-15, 21-18', date: '2 days ago', icon: '🏸' },
  { id: 2, sport: 'Pickleball', opponent: 'Team Alpha', result: 'LOST', score: '9-11, 11-8, 7-11', date: 'Last week', icon: '🏓' },
  { id: 3, sport: 'Badminton', opponent: 'Linh N.', result: 'WON', score: '21-15, 21-18', date: 'Last week', icon: '🏸' },
]

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced', 'Pro']
const sports = ['All Sports', 'Badminton', 'Pickleball']

export default function ApexMatchesPage() {
  const [tab, setTab] = useState('find')
  const [levelFilter, setLevelFilter] = useState('All Levels')
  const [sportFilter, setSportFilter] = useState('All Sports')
  const [joined, setJoined] = useState([])
  const [openMatches, setOpenMatches] = useState([])
  const [userId, setUserId] = useState(null)
  const pageRef = useRef(null)

  useEffect(() => {
    const initData = async () => {
      try {
        const [profileRes, matchesRes] = await Promise.all([
          authApi.getProfile(),
          matchApi.getOpenMatches()
        ])
        
        if (profileRes?.data?.data) {
          setUserId(profileRes.data.data.userId)
        }
        
        if (matchesRes?.data?.data) {
          const formatted = matchesRes.data.data.map(m => ({
            id: m.matchId,
            sport: m.sportType,
            type: m.isCompetitive ? 'Competitive' : 'Friendly',
            level: m.skillLevel,
            host: m.hostName,
            hostImg: m.hostAvatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(m.hostName),
            court: m.location,
            date: dayjs(m.startTime).format('ddd, MMM D'),
            time: dayjs(m.startTime).format('HH:mm'),
            slots: m.maxParticipants - m.currentParticipants,
            maxSlots: m.maxParticipants,
            icon: m.sportType?.toLowerCase().includes('pickleball') ? '🏓' : '🏸',
            participants: m.participants || []
          }))
          setOpenMatches(formatted)
          
          // Find matches the user has already joined
          if (profileRes?.data?.data?.userId) {
            const myJoined = formatted
              .filter(m => m.participants.some(p => p.userId === profileRes.data.data.userId))
              .map(m => m.id)
            setJoined(myJoined)
          }
        }
      } catch (err) {
        console.error("Failed to load matches", err)
      }
    }
    initData()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.match-hero', { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' })
      gsap.from('.match-card', { opacity: 0, y: 40, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 })
    }, pageRef)
    return () => ctx.revert()
  }, [tab])

  const filtered = openMatches.filter(m =>
    (levelFilter === 'All Levels' || m.level === levelFilter) &&
    (sportFilter === 'All Sports' || m.sport === sportFilter)
  )

  const handleJoin = async (id) => {
    try {
      await matchApi.joinMatch(id)
      setJoined(prev => [...prev, id])
      gsap.from(`#match-join-${id}`, { scale: 0.8, duration: 0.3, ease: 'back.out(1.7)' })
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to join match')
    }
  }

  return (
    <ApexLayout title="Matches">
      <div className="apex-matches" ref={pageRef}>
        {/* Hero */}
        <div className="match-hero">
          <div>
            <h1 className="match-hero__title">Match Center</h1>
            <p className="match-hero__sub">Find open matches, challenge friends, or host your own game.</p>
          </div>
          <button className="btn-primary match-hero__create">+ Host a Match</button>
        </div>

        {/* Tabs */}
        <div className="match-tabs">
          <button className={`match-tab ${tab === 'find' ? 'active' : ''}`} onClick={() => setTab('find')}>🔍 Find Match</button>
          <button className={`match-tab ${tab === 'my' ? 'active' : ''}`} onClick={() => setTab('my')}>📋 My Matches</button>
          <button className={`match-tab ${tab === 'history' ? 'active' : ''}`} onClick={() => setTab('history')}>📊 History</button>
        </div>

        {/* Find Match */}
        {tab === 'find' && (
          <div>
            <div className="match-filters">
              <select className="match-filter-select" value={sportFilter} onChange={e => setSportFilter(e.target.value)} id="sport-filter">
                {sports.map(s => <option key={s}>{s}</option>)}
              </select>
              <select className="match-filter-select" value={levelFilter} onChange={e => setLevelFilter(e.target.value)} id="level-filter">
                {levels.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>

            <div className="matches-list">
              {filtered.map(m => (
                <div key={m.id} className="match-card">
                  <div className="match-card__sport">{m.icon}</div>
                  <div className="match-card__info">
                    <div className="match-card__top">
                      <span className="match-card__name">{m.sport} — {m.type}</span>
                      <span className={`match-level match-level--${m.level?.toLowerCase() || 'intermediate'}`}>{m.level || 'Intermediate'}</span>
                    </div>
                    <div className="match-card__meta">
                      <span>📅 {m.date} at {m.time}</span>
                      <span>📍 {m.court}</span>
                    </div>
                    <div className="match-card__host">
                      <img src={m.hostImg} alt={m.host} className="match-host__avatar" />
                      <span>Hosted by <strong>{m.host}</strong></span>
                    </div>
                  </div>
                  <div className="match-card__right">
                    <div className="match-slots">
                      <span className="match-slots__num">{m.slots}/{m.maxSlots}</span>
                      <span className="match-slots__label">slots left</span>
                    </div>
                    <button
                      id={`match-join-${m.id}`}
                      className={`btn-primary match-join-btn ${joined.includes(m.id) ? 'joined' : ''}`}
                      onClick={() => !joined.includes(m.id) && handleJoin(m.id)}
                    >
                      {joined.includes(m.id) ? '✓ Joined' : 'Join Match'}
                    </button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="match-empty">
                  <span>🏃</span>
                  <p>No matches found for those filters.</p>
                  <button className="btn-primary" onClick={() => { setSportFilter('All Sports'); setLevelFilter('All Levels') }}>Reset Filters</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Matches */}
        {tab === 'my' && (
          <div className="my-matches">
            {joined.length === 0 ? (
              <div className="match-empty">
                <span>🏸</span>
                <p>You haven't joined any matches yet.</p>
                <button className="btn-primary" onClick={() => setTab('find')}>Find a Match</button>
              </div>
            ) : (
              <div className="matches-list">
                {openMatches.filter(m => joined.includes(m.id)).map(m => (
                  <div key={m.id} className="match-card">
                    <div className="match-card__sport">{m.icon}</div>
                    <div className="match-card__info">
                      <div className="match-card__top">
                        <span className="match-card__name">{m.sport} — {m.type}</span>
                        <span className="match-level match-level--confirmed">Confirmed</span>
                      </div>
                      <div className="match-card__meta">
                        <span>📅 {m.date} at {m.time}</span>
                        <span>📍 {m.court}</span>
                      </div>
                    </div>
                    <div className="match-card__right">
                      <button className="btn-outline" style={{ fontSize: '0.8rem' }}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History */}
        {tab === 'history' && (
          <div>
            <div className="match-history">
              {myMatches.map(m => (
                <div key={m.id} className="history-card match-card">
                  <div className="match-card__sport">{m.icon}</div>
                  <div className="match-card__info">
                    <div className="match-card__top">
                      <span className="match-card__name">{m.sport} vs {m.opponent}</span>
                      <span className={`match-result ${m.result === 'WON' ? 'result--won' : 'result--lost'}`}>{m.result}</span>
                    </div>
                    <div className="match-card__meta">
                      <span>🏆 {m.score}</span>
                      <span>🕐 {m.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="match-stats">
              <div className="stat-card"><span className="stat-card__num">12</span><span className="stat-card__label">Total Matches</span></div>
              <div className="stat-card stat-card--won"><span className="stat-card__num">8</span><span className="stat-card__label">Won</span></div>
              <div className="stat-card stat-card--lost"><span className="stat-card__num">4</span><span className="stat-card__label">Lost</span></div>
              <div className="stat-card"><span className="stat-card__num">67%</span><span className="stat-card__label">Win Rate</span></div>
            </div>
          </div>
        )}
      </div>
    </ApexLayout>
  )
}
