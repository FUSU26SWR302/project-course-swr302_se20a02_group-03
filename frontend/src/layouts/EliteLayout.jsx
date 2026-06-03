import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/elite/dashboard', label: 'Dashboard', icon: 'M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z' },
  { path: '/elite/schedule', label: 'Schedule', icon: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z' },
  { path: '/elite/pos', label: 'POS Terminal', icon: 'M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-2-6H6v2h12v-2z' },
  { path: '/elite/members', label: 'Members', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
  { path: '/elite/facilities', label: 'Facilities', icon: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z' },
  { path: '/elite/analytics', label: 'Analytics', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
]

export default function EliteLayout({ children }) {
  const location = useLocation()
  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-['Inter',sans-serif]">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 bottom-0 z-[100]">
        <div className="flex items-center gap-3 pt-8 pb-6 px-6">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&q=80" alt="Avatar" className="w-11 h-11 rounded-full object-cover" />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-[1.2]">Court Manager</h2>
            <p className="text-xs text-slate-500 mt-0.5">Station 04 - Active</p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <button className="w-full bg-[#008ba3] hover:bg-[#00768c] text-white border-none rounded-lg py-3 text-[0.875rem] font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
            Quick Scan
          </button>
        </div>

        <nav className="flex-1 flex flex-col">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 py-3 px-6 text-[0.875rem] font-medium no-underline transition-all ${
                isActive(link.path)
                  ? 'bg-[#00c2ff] text-white font-semibold rounded-r-full mr-4 hover:bg-[#00ace6] hover:text-white'
                  : 'text-slate-500 hover:bg-[#f8fafc] hover:text-slate-900'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d={link.icon} />
              </svg>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="py-6 border-t border-slate-200">
          <Link to="#" className="flex items-center gap-3 py-3 px-6 text-[0.875rem] font-medium text-slate-500 no-underline transition-all hover:bg-[#f8fafc] hover:text-slate-900">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span>Support</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 py-3 px-6 text-[0.875rem] font-medium text-slate-500 no-underline transition-all hover:bg-[#f8fafc] hover:text-slate-900">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-[240px] flex-1 flex flex-col">
        <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
          <div className="font-['Oswald',sans-serif] text-2xl font-bold text-[#006070] tracking-[-0.5px]">
            EliteSport OS
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-transparent border-none text-slate-500 cursor-pointer flex items-center justify-center transition-all hover:text-slate-900 relative"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></button>
            <button className="bg-transparent border-none text-slate-500 cursor-pointer flex items-center justify-center transition-all hover:text-slate-900 relative"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></button>
            <button className="bg-transparent border-none text-slate-500 cursor-pointer flex items-center justify-center transition-all hover:text-slate-900 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[0.6rem] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full border-[1.5px] border-white">2</span>
            </button>
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&q=80" alt="User" className="w-8 h-8 rounded-full object-cover ml-2" />
          </div>
        </header>

        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
