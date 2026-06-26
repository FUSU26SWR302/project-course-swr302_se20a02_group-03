import { useState } from 'react'
import ProSportDashLayout from '../../layouts/ProSportDashLayout'

const tabs = ['All', 'Unread', 'Bookings', 'Matches', 'Rentals']

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const BagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const tagStyles = {
  urgent: 'bg-red-500/[0.12] text-red-500',
  pro: 'bg-[rgba(13,138,138,0.12)] text-[#0d8a8a]',
  new: 'bg-green-500/[0.12] text-green-500',
}

const notifications = [
  {
    id: 1,
    iconEl: <CalendarIcon />,
    iconBg: '#ef4444',
    tags: ['URGENT', 'PRO'],
    title: 'Center Court Elite Booking',
    body: 'Your reserved court time begins tomorrow at 10:00 AM. Please arrive 15 minutes early to finalize check-in at the front desk.',
    time: '10 mins ago',
    actions: [{ label: 'View Booking', variant: 'primary' }],
  },
  {
    id: 2,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    tags: ['NEW'],
    title: 'Match Invitation: Alex Mercer',
    body: 'Alex has invited you to a Competitive Singles match on Friday evening. Do you accept the challenge?',
    time: '2 hours ago',
    actions: [{ label: 'Join Match', variant: 'primary' }, { label: 'Decline', variant: 'outline' }],
  },
  {
    id: 3,
    iconEl: <BagIcon />,
    iconBg: '#f59e0b',
    tags: [],
    title: 'Rental Return Reminder',
    body: "Your rental for the 'Premium Carbon Racket' is due back today by 5:00 PM. Please return it to the pro shop.",
    time: '4 hours ago',
    actions: [{ label: 'Extend Rental', variant: 'dark' }],
  },
  {
    id: 4,
    iconEl: <CheckIcon />,
    iconBg: '#0d8a8a',
    tags: [],
    title: 'Payment Successful',
    body: "Your recent purchase for 'Pro Gear Pack V2' was successful. A receipt has been sent to your email.",
    time: 'Yesterday',
    actions: [],
  },
]

const actionBtnStyles = {
  primary: 'bg-[#0d8a8a] text-white border-none rounded-lg px-[18px] py-2 text-[0.82rem] font-bold cursor-pointer font-[\'Inter\'] transition-colors hover:bg-[#0d2d3a]',
  dark: 'bg-[#0d2d3a] text-white border-none rounded-lg px-[18px] py-2 text-[0.82rem] font-bold cursor-pointer font-[\'Inter\'] transition-colors hover:bg-[#0d8a8a]',
  outline: 'bg-white text-[#0d2d3a] border-[1.5px] border-[#e0ecf0] rounded-lg px-[18px] py-2 text-[0.82rem] font-semibold cursor-pointer font-[\'Inter\'] transition-all hover:border-[#0d8a8a] hover:text-[#0d8a8a]',
}

export default function DashInboxPage() {
  const [activeTab, setActiveTab] = useState('All')

  return (
    <ProSportDashLayout>
      <div>
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="font-['Oswald'] text-[1.6rem] font-bold text-[#0d2d3a]">Notifications</h1>
            <p className="text-[0.85rem] text-slate-500 mt-1">Manage your alerts and stay ahead of the game.</p>
          </div>
          <button className="flex items-center gap-1.5 bg-transparent border-[1.5px] border-[#e0ecf0] rounded-full px-3.5 py-[7px] text-[0.82rem] font-semibold text-[#0d8a8a] cursor-pointer font-['Inter'] transition-all whitespace-nowrap hover:bg-[rgba(13,138,138,0.07)] hover:border-[#0d8a8a]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Mark all as read
          </button>
        </div>

        <div className="flex gap-2 mb-5 flex-wrap">
          {tabs.map(t => (
            <button key={t} className={`py-[7px] px-4 rounded-full border-[1.5px] text-[0.82rem] font-medium cursor-pointer font-['Inter'] transition-all hover:border-[#0d8a8a] hover:text-[#0d8a8a] ${activeTab === t ? 'bg-[#0d2d3a] border-[#0d2d3a] text-white' : 'bg-white border-[#e0ecf0] text-slate-500'}`} onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {notifications.map(n => (
            <div key={n.id} className="flex gap-3.5 bg-white rounded-xl p-[18px] border-[1.5px] border-[#e0ecf0] transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="shrink-0">
                {n.avatar ? (
                  <img src={n.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: n.iconBg }}>
                    {n.iconEl}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex gap-1.5">
                    {n.tags.map(tag => (
                      <span key={tag} className={`text-[0.65rem] font-bold tracking-[0.06em] px-[7px] py-0.5 rounded uppercase ${tagStyles[tag.toLowerCase()] || ''}`}>{tag}</span>
                    ))}
                  </div>
                  <span className="text-[0.75rem] text-slate-400 ml-auto whitespace-nowrap">{n.time}</span>
                </div>
                <h3 className="text-[0.95rem] font-bold text-[#0d2d3a] mb-1.5">{n.title}</h3>
                <p className="text-sm text-slate-500 leading-[1.55]">{n.body}</p>
                {n.actions.length > 0 && (
                  <div className="flex gap-2.5 mt-3">
                    {n.actions.map(a => (
                      <button key={a.label} className={actionBtnStyles[a.variant]}>{a.label}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProSportDashLayout>
  )
}
