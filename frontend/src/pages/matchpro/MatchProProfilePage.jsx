import { Link } from 'react-router-dom'
import MatchProLayout from '../../layouts/MatchProLayout'

const metrics = [
  { label: 'WIN RATE', value: '68%', color: '#0d8a8a' },
  { label: 'MATCHES', value: '142', color: '#0d2d3a' },
  { label: 'RATING', value: '4.9★', color: '#f59e0b' },
  { label: 'MVP', value: '24', color: '#0d2d3a' },
]

const specialties = ['Cầu lông', 'Pickleball']

const achievements = [
  { icon: '🏆', title: "Tournament Champ", sub: "Summer Open '23" },
  { icon: '🔥', title: '10 Match Streak', sub: "Achieved Nov '23" },
]

const activity = [
  {
    id: 1,
    icon: '🎾',
    iconBg: '#0d8a8a',
    title: 'Won Badminton Singles Match',
    sub: 'vs. Jordan Lee • 6-4, 7-5',
    time: '2d ago',
    review: {
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
      text: '"Great match! Alex has an incredible serve. Looking forward to a rematch."',
      stars: 5,
    },
  },
  {
    id: 2,
    icon: '🏀',
    iconBg: '#f59e0b',
    title: 'Played Pickleball Doubles',
    sub: 'at Downtown Rec Center',
    time: '5d ago',
    tags: ['Team MVP', '12 Pts'],
  },
]

export default function MatchProProfilePage() {
  return (
    <MatchProLayout>
      <div className="flex min-h-[calc(100vh-60px)] bg-[#f0f7fa]">
        {/* Left sidebar */}
        <aside className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-5 max-md:hidden shrink-0 w-[200px] mr-5 h-fit">
          <div className="flex flex-col gap-1.5">
            {[{l:'Trending Matches',i:'📈'},{l:'Nearby Sports',i:'📍'},{l:'Community Hub',i:'👥'},{l:'Leaderboards',i:'🏆'}].map(item=>(
              <a key={item.l} href="#" className="flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-slate-600 no-underline transition-all hover:bg-slate-50 hover:text-slate-900">
                <span>{item.i}</span><span>{item.l}</span>
              </a>
            ))}
            <p className="text-[0.68rem] font-bold tracking-[0.06em] text-slate-400 mt-4 mb-2.5 px-3">ACCOUNT</p>
            <a href="#" className="flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-slate-600 no-underline transition-all hover:bg-slate-50 hover:text-slate-900 bg-[rgba(0,200,170,0.08)] text-[#00c8aa] font-semibold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Profile</span>
            </a>
            <a href="#" className="flex items-center gap-3 py-2 px-3 rounded-lg text-sm text-slate-600 no-underline transition-all hover:bg-slate-50 hover:text-slate-900">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              <span>Settings</span>
            </a>
          </div>
          <Link to="/matchpro/match/create" className="bg-[#00c8aa] hover:bg-[#009e87] text-white text-sm font-bold text-center py-2.5 rounded-lg no-underline transition-all">+ Create Match</Link>
        </aside>

        {/* Main */}
        <div className="flex-1 px-7 py-6 max-w-[900px] min-w-0">
          {/* Hero */}
          <div className="bg-gradient-to-br from-[#0d8a8a] to-[#0990a8] rounded-2xl p-9 flex items-center gap-5 mb-6 relative overflow-hidden before:content-[''] before:absolute before:-top-[60px] before:-right-[60px] before:w-[200px] before:h-[200px] before:rounded-full before:bg-white/[0.08]">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" alt="Alex" className="w-20 h-20 rounded-full object-cover border-[3px] border-white/50 shrink-0" />
            <div>
              <h1 className="font-['Oswald'] text-[1.6rem] font-bold text-white">Alex Rivers</h1>
              <p className="text-[0.85rem] text-white/75 mt-1">📍 Seattle, WA • Elite Rank</p>
            </div>
            <div className="flex gap-2.5 ml-auto">
              <button className="flex items-center gap-1.5 bg-white/15 border-[1.5px] border-white/40 text-white px-4 py-[9px] rounded-full text-[0.85rem] font-semibold font-['Inter'] cursor-pointer transition-all hover:bg-white/25">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                Add Friend
              </button>
              <button className="flex items-center gap-1.5 bg-white/10 border-[1.5px] border-white/30 text-white px-4 py-[9px] rounded-full text-[0.85rem] font-semibold font-['Inter'] cursor-pointer transition-all hover:bg-white/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Message
              </button>
            </div>
          </div>

          {/* Performance & Specialties */}
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            <div className="bg-white rounded-[14px] p-5 border border-[#e0ecf0]">
              <h3 className="text-[0.95rem] font-bold text-[#0d2d3a] mb-4">📊 Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-5">
                {metrics.map(m => (
                  <div key={m.label}>
                    <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-slate-400">{m.label}</p>
                    <p className="font-['Oswald'] text-[1.7rem] font-bold mt-1" style={{color: m.color}}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[14px] p-5 border border-[#e0ecf0]">
              <h3 className="text-[0.95rem] font-bold text-[#0d2d3a] mb-4">🎯 Specialties</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {specialties.map(s => (
                  <span key={s} className="bg-[rgba(13,138,138,0.10)] text-[#0d8a8a] border-[1.5px] border-[rgba(13,138,138,0.25)] rounded-full px-3.5 py-[5px] text-[0.82rem] font-semibold">{s}</span>
                ))}
              </div>
              <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-slate-400 mt-4 mb-2.5">ACHIEVEMENTS</p>
              {achievements.map(a => (
                <div key={a.title} className="flex items-center gap-2.5 py-2 border-b border-[#f0f5f9] last:border-b-0">
                  <span className="text-[1.2rem]">{a.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-[#0d2d3a]">{a.title}</p>
                    <p className="text-xs text-slate-400">{a.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-[14px] p-5 border border-[#e0ecf0] mt-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[0.95rem] font-bold text-[#0d2d3a]">🔄 Recent Activity</h3>
              <a href="#" className="text-[0.82rem] text-[#0d8a8a] font-semibold">View All</a>
            </div>
            {activity.map(a => (
              <div key={a.id} className="flex items-start gap-3.5 py-4 border-b border-[#f0f5f9] last:border-b-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[1.1rem] shrink-0" style={{background: a.iconBg}}>{a.icon}</div>
                <div className="flex-1">
                  <p className="text-[0.9rem] font-bold text-[#0d2d3a]">{a.title}</p>
                  <p className="text-[0.8rem] text-slate-500 mt-0.5">{a.sub}</p>
                  {a.tags && (
                    <div className="flex gap-1.5 mt-2">
                      {a.tags.map(t => <span key={t} className="bg-[#f0f7fa] text-slate-500 rounded-full px-2.5 py-[3px] text-xs font-medium">{t}</span>)}
                    </div>
                  )}
                  {a.review && (
                    <div className="flex gap-2.5 mt-2.5 bg-[#f8fbfd] rounded-[10px] p-3 items-start">
                      <img src={a.review.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="flex gap-[1px] text-[0.8rem] mb-[3px]">{[...Array(a.review.stars)].map((_,i) => <span key={i}>⭐</span>)}</div>
                        <p className="text-[0.8rem] text-slate-500 italic">{a.review.text}</p>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[0.78rem] text-slate-400 ml-auto shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MatchProLayout>
  )
}
