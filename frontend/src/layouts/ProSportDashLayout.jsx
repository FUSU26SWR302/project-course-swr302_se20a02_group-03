import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  {
    path: '/dashboard/inbox', label: 'Inbox',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><polyline points="3 9 12 15 21 9"/></svg>
  },
  {
    path: '/dashboard/bookings', label: 'Bookings',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  },
  {
    path: '/dashboard/matches', label: 'Matches',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>
  },
  {
    path: '/dashboard/rentals', label: 'Rentals',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  },
  {
    path: '/dashboard/payments', label: 'Payments',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
  },
  {
    path: '/dashboard/settings', label: 'Settings',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  },
]

export default function ProSportDashLayout({ children }) {
  const location = useLocation()
  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <div className="flex min-h-screen bg-[#f5f9fc]">
      <aside className="w-[160px] bg-white border-r border-[#e0ecf0] flex flex-col p-[20px_12px] fixed left-0 top-0 bottom-0 z-[100] overflow-y-auto">
        <div className="flex items-center gap-2.5 mb-7 pb-5 border-b border-[#e0ecf0]">
          <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#0d8a8a] to-[#0d2d3a] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/>
            </svg>
          </div>
          <div>
            <p className="font-['Oswald',sans-serif] text-[0.85rem] font-bold text-[#0d2d3a] leading-[1.2]">PRO-<br/>SPORT</p>
            <p className="text-[0.65rem] text-[#0d8a8a] font-medium mt-0.5">Elite Performance</p>
          </div>
        </div>

        <nav className="flex flex-col gap-[3px] flex-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2.5 py-[9px] px-3 rounded-[10px] text-[0.85rem] font-medium no-underline transition-all [&_svg]:shrink-0 ${
                isActive(link.path)
                  ? 'bg-[rgba(13,138,138,0.12)] text-[#0d8a8a] font-semibold'
                  : 'text-slate-500 hover:bg-[rgba(13,138,138,0.07)] hover:text-[#0d8a8a]'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-[#e0ecf0] mt-4">
          <button className="w-full bg-[#0d2d3a] hover:bg-[#0d8a8a] text-white border-none rounded-[10px] py-[11px] px-2 font-['Inter',sans-serif] text-[0.78rem] font-bold cursor-pointer transition-all">Upgrade to PRO</button>
        </div>
      </aside>

      <div className="ml-[160px] flex-1 flex flex-col min-h-screen">
        <header className="h-14 bg-white border-b border-[#e0ecf0] flex items-center px-6 gap-4 sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex-1 max-w-[360px] flex items-center gap-2 bg-[#f5f9fc] border-[1.5px] border-[#e0ecf0] rounded-full py-[7px] px-4 transition-all focus-within:border-[#0d8a8a]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 shrink-0">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search..." id="psd-search" className="border-none bg-transparent font-['Inter',sans-serif] text-[0.85rem] text-[#0d2d3a] w-full outline-none placeholder:text-slate-400" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="w-9 h-9 rounded-full bg-transparent border-none cursor-pointer flex items-center justify-center text-slate-500 relative transition-all hover:bg-[rgba(13,138,138,0.08)] hover:text-[#0d8a8a]" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute top-0.5 right-0.5 w-[15px] h-[15px] rounded-full bg-red-500 text-white text-[0.58rem] font-bold flex items-center justify-center">3</span>
            </button>
            <button className="w-9 h-9 rounded-full bg-transparent border-none cursor-pointer flex items-center justify-center text-slate-500 relative transition-all hover:bg-[rgba(13,138,138,0.08)] hover:text-[#0d8a8a]" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </div>
        </header>
        <main className="flex-1 p-7">{children}</main>
      </div>
    </div>
  )
}
