import { useState } from 'react'
import ProSportDashLayout from '../../layouts/ProSportDashLayout'

const stats = [
  { label: 'TOTAL SENT',          value: '248.5k', trend: '↑ +12.4% this month', trendUp: true  },
  { label: 'DELIVERY RATE',       value: '99.2%',  bar: true                                    },
  { label: 'AVG. OPEN RATE',      value: '42.8%',  bars: [30,50,40,55,70,65,80]                 },
  { label: 'CLICK-THROUGH (CTR)', value: '8.4%',   trend: '→ Stable vs last week', trendUp: null },
]

const audiences = ['Tất cả', 'Cầu lông', 'Pickleball', 'Lapsed Users', '+ Custom Segment']

const recentBroadcasts = [
  { status: 'SCHEDULED', statusColor: '#f59e0b', date: 'Tomorrow, 09:00', title: 'Weekend Tournament Reminder', meta: 'Target: Tournament Participants' },
  { status: 'SENT', statusColor: '#22c55e', date: 'Yesterday', title: 'Sân Pickleball Mới!', open: '68%', click: '12%' },
  { status: 'SENT', statusColor: '#22c55e', date: 'Mon, 14:30', title: 'App Update: Version 2.4 is live', open: '45%', click: '3%' },
]

export default function DashBroadcastPage() {
  const [msgBody, setMsgBody] = useState('')
  const [selectedAud, setSelectedAud] = useState(['All Active Members'])
  const [msgType, setMsgType] = useState('push')

  const toggleAud = (a) =>
    setSelectedAud(selectedAud.includes(a) ? selectedAud.filter(x => x !== a) : [...selectedAud, a])

  return (
    <ProSportDashLayout>
      <div>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="dash-page-title">Broadcast Management</h1>
            <p className="dash-page-sub">Design, schedule, and analyze targeted communications.</p>
          </div>
          <button className="btn-primary flex items-center gap-2 px-[18px] py-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            New Broadcast
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 max-[1000px]:grid-cols-2 gap-4 mb-6">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-xl p-[18px] border-[1.5px] border-[#e0ecf0]">
              <p className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-slate-400 mb-2">{s.label}</p>
              <p className="font-['Oswald'] text-[1.7rem] font-bold text-[#0d2d3a] mb-1.5">{s.value}</p>
              {s.trend && <p className={`text-[0.78rem] ${s.trendUp ? 'text-green-500' : 'text-slate-500'}`}>{s.trend}</p>}
              {s.bar && <div className="h-1.5 bg-[#e0ecf0] rounded-full overflow-hidden mt-2"><div className="w-[99%] h-full bg-gradient-to-r from-[#0d8a8a] to-[#0fc8b5] rounded-full" /></div>}
              {s.bars && (
                <div className="flex items-end gap-[3px] h-10 mt-2">
                  {s.bars.map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t ${i === s.bars.length - 1 ? 'bg-[#0d2d3a]' : 'bg-[rgba(13,138,138,0.5)]'}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_280px] max-[1000px]:grid-cols-1 gap-5 items-start">
          {/* Create Campaign */}
          <div className="bg-white rounded-[14px] p-6 border-[1.5px] border-[#e0ecf0]">
            <h2 className="text-base font-bold text-[#0d2d3a] mb-5">Create Campaign</h2>

            <div className="mb-[18px]">
              <label className="text-[0.78rem] font-semibold text-slate-500 block mb-2" htmlFor="camp-name">Campaign Internal Name</label>
              <input id="camp-name" type="text" placeholder="e.g., Summer Badminton League Promo" className="w-full border-[1.5px] border-[#e0ecf0] rounded-lg px-3.5 py-2.5 font-['Inter'] text-sm text-[#0d2d3a] outline-none transition-colors focus:border-[#0d8a8a] placeholder:text-slate-400 box-border" />
            </div>

            <div className="mb-[18px]">
              <label className="text-[0.78rem] font-semibold text-slate-500 block mb-2">Target Audience</label>
              <div className="flex flex-wrap gap-2">
                {audiences.map(a => (
                  <button key={a} className={`px-3.5 py-1.5 rounded-full border-[1.5px] text-[0.8rem] font-medium cursor-pointer font-['Inter'] transition-all hover:border-[#0d8a8a] hover:text-[#0d8a8a] ${selectedAud.includes(a) ? 'bg-[#0d8a8a] border-[#0d8a8a] text-white' : 'bg-white border-[#e0ecf0] text-slate-500'}`} onClick={() => toggleAud(a)}>{a}</button>
                ))}
              </div>
            </div>

            <div className="mb-[18px]">
              <div className="grid grid-cols-2 gap-3">
                <button className={`flex items-start gap-2.5 p-3.5 rounded-[10px] border-[1.5px] bg-white cursor-pointer text-left font-['Inter'] transition-all hover:border-[#0d8a8a] ${msgType === 'push' ? 'border-[#0d8a8a] bg-[rgba(13,138,138,0.05)]' : 'border-[#e0ecf0]'}`} onClick={() => setMsgType('push')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                  <div>
                    <p className="text-[0.85rem] font-bold text-[#0d2d3a]">Push Notification</p>
                    <p className="text-[0.75rem] text-slate-400 mt-0.5">High urgency, instant delivery</p>
                  </div>
                </button>
                <button className={`flex items-start gap-2.5 p-3.5 rounded-[10px] border-[1.5px] bg-white cursor-pointer text-left font-['Inter'] transition-all hover:border-[#0d8a8a] ${msgType === 'email' ? 'border-[#0d8a8a] bg-[rgba(13,138,138,0.05)]' : 'border-[#e0ecf0]'}`} onClick={() => setMsgType('email')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <div>
                    <p className="text-[0.85rem] font-bold text-[#0d2d3a]">Email Newsletter</p>
                    <p className="text-[0.75rem] text-slate-400 mt-0.5">Rich content, detailed updates</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="mb-[18px]">
              <label className="text-[0.78rem] font-semibold text-slate-500 block mb-2" htmlFor="msg-body">Message Body</label>
              <div className="flex gap-1.5 bg-[#f5f9fc] border-[1.5px] border-[#e0ecf0] rounded-t-lg px-2.5 py-1.5">
                <button className="bg-transparent border-none cursor-pointer text-[0.85rem] text-slate-500 px-2 py-[3px] rounded font-['Inter'] transition-colors hover:bg-[rgba(13,138,138,0.1)] hover:text-[#0d8a8a]"><strong>B</strong></button>
                <button className="bg-transparent border-none cursor-pointer text-[0.85rem] text-slate-500 px-2 py-[3px] rounded font-['Inter'] transition-colors hover:bg-[rgba(13,138,138,0.1)] hover:text-[#0d8a8a]"><em>I</em></button>
                <button className="bg-transparent border-none cursor-pointer text-[0.75rem] text-slate-500 px-2 py-[3px] rounded font-['Inter'] transition-colors hover:bg-[rgba(13,138,138,0.1)] hover:text-[#0d8a8a]">⟵⟶ Insert Variable</button>
              </div>
              <textarea
                id="msg-body"
                value={msgBody}
                onChange={e => setMsgBody(e.target.value.slice(0, 250))}
                placeholder="Enter your message here... Use {first_name} to personalize."
                className="w-full border-[1.5px] border-[#e0ecf0] border-t-0 rounded-b-lg px-3.5 py-3 font-['Inter'] text-sm text-[#0d2d3a] outline-none resize-y transition-colors focus:border-[#0d8a8a] placeholder:text-slate-400 box-border"
                rows={5}
              />
              <p className="text-[0.75rem] text-slate-400 text-right mt-1">{msgBody.length} / 250 chars</p>
            </div>

            <div className="flex items-center justify-between mt-1">
              <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[0.82rem] text-[#0d8a8a] font-['Inter'] hover:underline">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                Schedule for later
              </button>
              <div className="flex gap-2.5">
                <button className="btn-outline py-[9px] px-[18px] text-[0.85rem]">Save Draft</button>
                <button className="btn-primary py-[9px] px-[18px] text-[0.85rem]">Send Now</button>
              </div>
            </div>
          </div>

          {/* Recent Broadcasts */}
          <div className="bg-white rounded-[14px] p-5 border-[1.5px] border-[#e0ecf0]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[0.95rem] font-bold text-[#0d2d3a]">Recent Broadcasts</h2>
              <button className="bg-transparent border-none cursor-pointer text-slate-400 text-base">···</button>
            </div>
            {recentBroadcasts.map((b, i) => (
              <div key={b.title} className="py-3.5 border-b border-[#f0f5f9] last:border-b-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[0.65rem] font-bold tracking-[0.06em] px-2 py-[3px] rounded-full" style={{ background: b.statusColor + '20', color: b.statusColor }}>{b.status}</span>
                  <span className="text-[0.75rem] text-slate-400">{b.date}</span>
                </div>
                <p className="text-sm font-bold text-[#0d2d3a] mb-1">{b.title}</p>
                {b.meta  && <p className="text-[0.75rem] text-slate-400">{b.meta}</p>}
                {b.open  && <div className="flex gap-2.5 text-[0.75rem] text-slate-500 mt-1.5"><span>👁 {b.open}</span><span>🔗 {b.click}</span></div>}
              </div>
            ))}
            <a href="#" className="block text-center text-[0.82rem] text-[#0d8a8a] font-semibold mt-3.5 no-underline hover:underline">View All History</a>
          </div>
        </div>
      </div>
    </ProSportDashLayout>
  )
}
