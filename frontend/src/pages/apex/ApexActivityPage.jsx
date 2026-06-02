import { useState } from 'react'
import ApexLayout from '../../layouts/ApexLayout'

const tabs = ['All', 'Booking Reminders', 'Match Invitations', 'Payments', 'System']

const notifications = [
  {
    id: 1,
    type: 'match',
    icon: '🏸',
    iconBg: '#0d8a8a',
    title: 'Match Invitation',
    body: 'Sarah J. invited you to a Pickleball doubles match at Grand Slam Center.',
    time: '2m ago',
    unread: true,
    extra: { date: 'Tomorrow, 18:00 PM - Court 3' },
    actions: ['Accept', 'Decline'],
  },
  {
    id: 2,
    type: 'booking',
    icon: '⏰',
    iconBg: '#f59e0b',
    title: 'Upcoming Booking',
    body: 'Your indoor badminton session starts in 2 hours.',
    time: '1h ago',
    unread: false,
    link: 'View Details →',
  },
  {
    id: 3,
    type: 'payment',
    icon: '💳',
    iconBg: '#94a3b8',
    title: 'Payment Successful',
    body: 'Receipt for Court 6 booking ($45.00) has been generated.',
    time: 'Yesterday',
    unread: false,
    link: 'Download Receipt',
  },
  {
    id: 4,
    type: 'system',
    icon: '🔔',
    iconBg: '#6366f1',
    title: 'System Update',
    body: 'New court surfaces added! Check out the newly renovated outdoor hard courts available for booking next week.',
    time: '2 days ago',
    unread: false,
    actions: ['Explore Courts'],
  },
]

export default function ApexActivityPage() {
  const [activeTab, setActiveTab] = useState('All')

  return (
    <ApexLayout title="Activity">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-['Oswald'] text-[1.6rem] font-bold text-[#0d2d3a]">Notifications</h1>
          <button className="text-[0.82rem] text-[#0fc8b5] font-semibold bg-transparent border-none cursor-pointer hover:underline">Mark all as read</button>
        </div>

        <div className="flex gap-2 flex-wrap mb-5">
          {tabs.map(t => (
            <button
              key={t}
              className={`px-3.5 py-1.5 rounded-full border-[1.5px] text-[0.82rem] font-medium cursor-pointer font-['Inter'] transition-all hover:border-[#0fc8b5] hover:text-[#0fc8b5] ${activeTab === t ? 'bg-[#0d8a8a] border-[#0d8a8a] text-white' : 'bg-white border-[#e0ecf0] text-slate-500'}`}
              onClick={() => setActiveTab(t)}
            >{t}</button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {notifications.map(n => (
            <div key={n.id} className={`flex gap-3.5 bg-white rounded-[14px] p-[18px] border-[1.5px] border-[#e0ecf0] transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.07)] ${n.unread ? 'border-l-[3px] border-l-[#0fc8b5] bg-[rgba(15,200,181,0.03)]' : ''}`}>
              <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-[1.1rem] shrink-0" style={{background: n.iconBg}}>{n.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <p className="text-[0.9rem] font-bold text-[#0d2d3a] flex-1">{n.title}</p>
                  <span className="text-[0.75rem] text-slate-400 shrink-0">{n.time}</span>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-[#0fc8b5] shrink-0" />}
                </div>
                <p className="text-sm text-slate-500 leading-[1.55]">{n.body}</p>
                {n.extra && (
                  <div className="flex items-center gap-1.5 mt-2 bg-[#f0f7fa] rounded-lg px-3 py-[7px] text-[0.82rem] text-slate-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span>{n.extra.date}</span>
                  </div>
                )}
                {n.actions && (
                  <div className="flex gap-2 mt-3">
                    {n.actions.map((a, i) => (
                      <button key={a} className={`py-[7px] px-4 text-[0.82rem] rounded-lg ${i === 0 ? 'btn-primary' : 'btn-outline'}`}>{a}</button>
                    ))}
                  </div>
                )}
                {n.link && <a href="#" className="block mt-2 text-[0.82rem] text-[#0fc8b5] font-semibold hover:underline">{n.link}</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ApexLayout>
  )
}
