import { Link, useLocation } from 'react-router-dom'

export default function MobileLayout({ children, hideBottomNav = false, title = null, showBack = false }) {
  const location = useLocation()
  
  return (
    <div className="flex justify-center min-h-screen bg-slate-200 py-5 max-[449px]:p-0">
      <div className="w-full max-w-[414px] bg-[#f8fafc] min-h-[800px] relative flex flex-col overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] min-[450px]:rounded-[40px] min-[450px]:border-[8px] min-[450px]:border-[#0f172a] min-[450px]:h-[850px] max-[449px]:max-w-full max-[449px]:min-h-screen">
        
        {/* Topbar */}
        <header className="h-[60px] bg-white flex items-center justify-between px-4 border-b border-slate-200 shrink-0 z-10">
          <div className="w-10 flex items-center">
            {showBack ? (
              <Link to="/mobile/home" className="bg-transparent border-none text-[#0f172a] flex items-center justify-center cursor-pointer p-0 no-underline">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              </Link>
            ) : (
              <button className="bg-transparent border-none text-[#0f172a] flex items-center justify-center cursor-pointer p-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            )}
          </div>
          
          <div className="flex-1 text-center">
            {title ? (
              <span className="text-base font-bold text-[#0f172a]">{title}</span>
            ) : (
              <h1 className="font-['Oswald',sans-serif] text-[1.25rem] font-bold text-[#006070] m-0">PRO-SPORT</h1>
            )}
          </div>
          
          <div className="w-10 flex items-center justify-end">
            {!showBack && (
              <button className="bg-transparent border-none text-[#0f172a] flex items-center justify-center cursor-pointer p-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z"/><path d="M4 9h16"/><path d="M9 4v16"/></svg>
              </button>
            )}
            {showBack && (
              <button className="bg-transparent border-none text-[#0f172a] flex items-center justify-center cursor-pointer p-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#f8fafc] p-[20px_16px]" style={{ position: 'relative' }}>
          {children}
        </main>

        {/* Bottom Nav */}
        {!hideBottomNav && (
          <nav className="h-[65px] bg-white flex justify-around items-center border-t border-slate-200 shrink-0 pb-[env(safe-area-inset-bottom)]">
            <Link to="/mobile/home" className={`flex flex-col items-center justify-center gap-1 no-underline text-[0.65rem] font-medium w-[20%] [&_svg]:w-[22px] [&_svg]:h-[22px] ${location.pathname.includes('/mobile/home') ? 'text-[#008ba3] font-semibold [&_svg]:stroke-[2.5] bg-[#e0f2fe] rounded-xl py-1.5 -translate-y-0.5' : 'text-slate-500'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill={location.pathname.includes('/mobile/home') ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>Home</span>
            </Link>
            <Link to="/mobile/booking" className={`flex flex-col items-center justify-center gap-1 no-underline text-[0.65rem] font-medium w-[20%] [&_svg]:w-[22px] [&_svg]:h-[22px] ${location.pathname.includes('/mobile/booking') ? 'text-[#008ba3] font-semibold [&_svg]:stroke-[2.5] bg-[#e0f2fe] rounded-xl py-1.5 -translate-y-0.5' : 'text-slate-500'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Booking</span>
            </Link>
            <Link to="/mobile/matches" className={`flex flex-col items-center justify-center gap-1 no-underline text-[0.65rem] font-medium w-[20%] [&_svg]:w-[22px] [&_svg]:h-[22px] ${location.pathname.includes('/mobile/matches') ? 'text-[#008ba3] font-semibold [&_svg]:stroke-[2.5] bg-[#e0f2fe] rounded-xl py-1.5 -translate-y-0.5' : 'text-slate-500'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Matches</span>
            </Link>
            <Link to="/mobile/wallet" className={`flex flex-col items-center justify-center gap-1 no-underline text-[0.65rem] font-medium w-[20%] [&_svg]:w-[22px] [&_svg]:h-[22px] ${location.pathname.includes('/mobile/wallet') ? 'text-[#008ba3] font-semibold [&_svg]:stroke-[2.5] bg-[#e0f2fe] rounded-xl py-1.5 -translate-y-0.5' : 'text-slate-500'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span>Shop</span>
            </Link>
            <Link to="/mobile/profile" className={`flex flex-col items-center justify-center gap-1 no-underline text-[0.65rem] font-medium w-[20%] [&_svg]:w-[22px] [&_svg]:h-[22px] ${location.pathname.includes('/mobile/profile') ? 'text-[#008ba3] font-semibold [&_svg]:stroke-[2.5] bg-[#e0f2fe] rounded-xl py-1.5 -translate-y-0.5' : 'text-slate-500'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill={location.pathname.includes('/mobile/profile') ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Profile</span>
            </Link>
          </nav>
        )}
      </div>
    </div>
  )
}
