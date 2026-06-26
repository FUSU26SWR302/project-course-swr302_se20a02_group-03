import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: 'M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z' },
  { path: '/admin/users', label: 'Users', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
  { path: '/admin/courts', label: 'Courts', icon: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' },
  { path: '/admin/bookings', label: 'Bookings', icon: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z' },
]

export default function AdminLayout({ children }) {
  const location = useLocation()
  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-['Inter',sans-serif]">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 bottom-0 z-[100]">
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="w-8 h-8 rounded-lg bg-[#00c2ff] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          </div>
          <div>
            <h2 className="font-['Oswald',sans-serif] text-[1.25rem] font-bold text-[#0d2d3a] leading-[1.1] tracking-[0.5px]">PRO-SPORT</h2>
            <p className="text-[0.6rem] font-semibold text-slate-500 tracking-[0.5px]">MANAGEMENT PORTAL</p>
          </div>
        </div>

        <div className="px-5 pb-5">
          <button className="w-full bg-[#0d8a8a] hover:bg-[#0b7373] text-white border-none rounded-md py-2.5 text-[0.9rem] font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all">+ New Booking</button>
        </div>

        <nav className="flex-1 overflow-y-auto pb-5 flex flex-col [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 py-3 px-5 text-[0.875rem] font-medium no-underline border-l-4 transition-all ${
                isActive(link.path)
                  ? 'bg-[#e6f4f4] text-[#0d8a8a] border-l-[#0d8a8a] font-semibold'
                  : 'text-slate-500 border-l-transparent hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d={link.icon} />
              </svg>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 p-5 border-t border-slate-200">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" alt="Admin" className="w-9 h-9 rounded-full object-cover" />
          <div className="flex flex-col">
            <p className="text-[0.875rem] font-semibold text-slate-900">Admin User</p>
            <p className="text-xs text-slate-500">admin@pro-sport.com</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-[240px] flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full py-2 px-4 w-[360px] transition-all focus-within:border-[#0d8a8a] focus-within:shadow-[0_0_0_2px_rgba(13,138,138,0.1)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search users, courts, bookings..." className="border-none outline-none bg-transparent w-full font-['Inter',sans-serif] text-[0.875rem] text-slate-900 placeholder:text-slate-400" />
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-transparent border-none cursor-pointer text-slate-500 flex items-center justify-center relative transition-all hover:text-[#0d8a8a]" aria-label="Help">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </button>
            <button className="bg-transparent border-none cursor-pointer text-slate-500 flex items-center justify-center relative transition-all hover:text-[#0d8a8a]" aria-label="Dark Mode">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </button>
            <button className="bg-transparent border-none cursor-pointer text-slate-500 flex items-center justify-center relative transition-all hover:text-[#0d8a8a]" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center ml-2 cursor-pointer">
              <span className="text-xs font-bold text-slate-600">AD</span>
            </div>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
