import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import MatchProLayout from '../../layouts/MatchProLayout'

const sidebarLinks = [
  { label: 'Trending Matches', icon: '📈', active: true, path: '/matches' },
  { label: 'Nearby Sports', icon: '📍', path: '/matches/nearby' },
  { label: 'Community Hub', icon: '👥', path: '/matches/community' },
  { label: 'Leaderboards', icon: '🏆', path: '/matches/leaderboard' },
]

const sportFilters = ['Tất cả', 'Cầu lông', 'Pickleball']

const matches = [
  {
    id: 1,
    host: 'Alex Mercer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    level: 'Intermediate',
    sport: 'Cầu lông',
    location: 'Downtown Sports Complex',
    time: 'Today, 6:00 PM',
    slots: '2 SLOTS LEFT',
    slotsColor: '#f59e0b',
  },
  {
    id: 2,
    host: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    level: 'Advanced',
    sport: 'Pickleball',
    location: 'Westside Club Courts',
    time: 'Tomorrow, 8:00 AM',
    slots: '1 SLOT LEFT',
    slotsColor: '#ef4444',
  },
]

const nearbyPlayers = [
  { name: 'Marcus T.', dist: '0.5 miles away', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', online: true },
  { name: 'Elena R.', dist: '1.2 miles away', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80', online: true },
]

const leaderboard = [
  { rank: 1, name: 'David K.', pts: '2,450 pts', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80' },
  { rank: 2, name: 'Jessica W.', pts: '2,100 pts', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80' },
]

export default function MatchProFeedPage() {
  const [activeFilter, setActiveFilter] = useState('All Sports')
  const feedRef = useRef(null)

  useEffect(() => {
    if (feedRef.current) {
      gsap.fromTo(feedRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      )
    }
  }, [activeFilter])

  return (
    <MatchProLayout>
      <div className="grid grid-cols-[200px_1fr_260px] max-lg:grid-cols-[200px_1fr] max-md:grid-cols-1 gap-5 items-start">
        {/* Left sidebar */}
        <aside className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-5 max-md:hidden shrink-0">
          <div className="border-b border-slate-100 pb-4">
            <p className="text-sm font-bold text-slate-800">Pro Matcher</p>
            <p className="text-xs font-semibold text-[#00c8aa]">Elite Rank</p>
          </div>
          <div className="flex flex-col gap-1.5">
            {sidebarLinks.map(link => (
              <Link key={link.label} to={link.path} className={`flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-slate-600 no-underline transition-all hover:bg-slate-50 hover:text-slate-900 ${link.active ? 'bg-[rgba(0,200,170,0.08)] text-[#00c8aa] font-semibold' : ''}`}>
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
          <Link to="/matches/create" className="bg-[#00c8aa] hover:bg-[#009e87] text-white text-sm font-bold text-center py-2.5 rounded-lg no-underline transition-all">+ Create Match</Link>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Hero banner */}
          <div className="relative rounded-2xl overflow-hidden h-[220px] mb-5 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1546519638405-a9f1558b3cba?w=900&q=80" alt="Match" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end px-6 py-5 gap-1.5">
              <span className="text-[0.72rem] font-bold text-red-500 tracking-[0.08em] flex items-center gap-1.5 bg-red-500/15 w-fit px-2.5 py-[3px] rounded-full">● TRENDING NOW</span>
              <h2 className="font-['Oswald'] text-2xl font-bold text-white leading-[1.15]">Giải Đấu Pickleball Mùa Hè</h2>
              <div className="flex gap-4 text-[0.82rem] text-white/75">
                <span>📍 Midtown Court</span>
                <span>🕐 Starts in 2h</span>
              </div>
            </div>
          </div>

          {/* Sport filters */}
          <div className="flex gap-2 flex-wrap mb-5">
            {sportFilters.map(f => (
              <button
                key={f}
                className={`px-4 py-[7px] rounded-full border-[1.5px] text-[0.82rem] font-medium font-['Inter'] transition-all cursor-pointer ${activeFilter === f ? 'bg-[#00c8aa] border-[#00c8aa] text-white' : 'bg-white border-[#e0ecf0] text-slate-500 hover:border-[#00c8aa] hover:text-[#00c8aa]'}`}
                onClick={() => setActiveFilter(f)}
              >{f}</button>
            ))}
          </div>

          {/* Match cards */}
          <div ref={feedRef} className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
            {matches.map(m => (
              <Link to={`/matches/${m.id}`} key={m.id} className="bg-white rounded-[14px] border-[1.5px] border-[#e0ecf0] p-[18px] flex flex-col gap-3.5 no-underline text-inherit transition-all border-l-[3px] border-l-[#00c8aa] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:border-[#00c8aa]">
                <div className="flex items-start gap-2.5">
                  <img src={m.avatar} alt={m.host} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div>
                    <p className="font-bold text-[0.9rem] text-[#0d2d3a]">{m.host}</p>
                    <p className="text-[0.72rem] text-slate-400">Host</p>
                    <p className="text-[0.78rem] text-slate-500 mt-0.5">{m.level} • {m.sport}</p>
                  </div>
                  <span className="ml-auto text-[0.7rem] font-bold px-2 py-1 rounded-full whitespace-nowrap shrink-0" style={{background: m.slotsColor + '22', color: m.slotsColor}}>{m.slots}</span>
                </div>
                <div className="flex flex-col gap-[5px] text-[0.8rem] text-slate-500">
                  <span>📍 {m.location}</span>
                  <span>🕐 {m.time}</span>
                </div>
                <button className="btn-primary w-full justify-center p-2.5 rounded-lg text-sm">Join Match</button>
              </Link>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[260px] flex flex-col gap-4 max-lg:col-span-full max-lg:w-full max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1 shrink-0">
          <div className="bg-white rounded-[14px] border border-[#e0ecf0] p-4">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-[0.95rem] font-bold text-[#0d2d3a]">Nearby Players</h3>
              <button className="bg-transparent border-none text-slate-400 cursor-pointer hover:text-[#00c8aa]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></button>
            </div>
            {nearbyPlayers.map(p => (
              <div key={p.name} className="flex items-center gap-2.5 py-2 border-b border-[#f0f5f9] last:border-b-0">
                <div className="relative shrink-0">
                  <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover" />
                  {p.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />}
                </div>
                <div className="flex flex-col">
                  <p className="text-[0.85rem] font-semibold text-[#0d2d3a]">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.dist}</p>
                </div>
                <button className="ml-auto w-7 h-7 rounded-full bg-[rgba(13,138,138,0.1)] flex items-center justify-center text-[#00c8aa] border-none cursor-pointer transition-all hover:bg-[#00c8aa] hover:text-white" aria-label="Add friend">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[14px] border border-[#e0ecf0] p-4">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-[0.95rem] font-bold text-[#0d2d3a]">Leaderboard</h3>
              <span>🏆</span>
            </div>
            {leaderboard.map((p, i) => (
              <div key={p.name} className="flex items-center gap-2.5 py-2 border-b border-[#f0f5f9] last:border-b-0">
                <span className="font-bold text-[0.95rem] w-5 shrink-0" style={{color: i === 0 ? '#f59e0b' : '#64748b'}}>{p.rank}</span>
                <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover" />
                <p className="text-[0.85rem] font-semibold text-[#0d2d3a] flex-1">{p.name}</p>
                <p className="text-[0.8rem] text-[#00c8aa] font-semibold">{p.pts}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MatchProLayout>
  )
}
