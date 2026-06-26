import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/gear/dashboard', label: 'Dashboard' },
  { path: '/gear/rentals', label: 'Rentals' },
  { path: '/gear/catalog', label: 'Catalog' },
]

export default function GearLayout({ children }) {
  const location = useLocation()
  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f9fc]">
      <header className="h-14 bg-white border-b border-[#e0ecf0] flex items-center px-7 gap-6 sticky top-0 z-[100] shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <Link to="/gear/catalog" className="font-['Oswald',sans-serif] text-[1.25rem] font-bold tracking-[0.04em] no-underline flex shrink-0">
          <span className="text-[#0d2d3a]">PRO</span><span className="text-[#0d8a8a]">-</span><span className="text-[#0d2d3a]">SPORT</span>
        </Link>
        <div className="flex items-center gap-2 bg-[#f5f9fc] border-[1.5px] border-[#e0ecf0] rounded-full py-[7px] px-4 flex-1 max-w-[300px] transition-all focus-within:border-[#0d8a8a]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search equipment..." id="gear-search" className="border-none bg-transparent font-['Inter',sans-serif] text-[0.85rem] text-[#0d2d3a] w-full outline-none placeholder:text-slate-400" />
        </div>
        <nav className="flex gap-1">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className={`py-1.5 px-3.5 text-[0.875rem] font-medium rounded-full no-underline transition-all ${
              isActive(link.path)
                ? 'text-[#0d8a8a] font-semibold border-b-2 border-[#0d8a8a] rounded-none pb-[5px]'
                : 'text-slate-500 hover:text-[#0d8a8a] hover:bg-[rgba(13,138,138,0.07)]'
            }`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 ml-auto">
          <button className="w-[34px] h-[34px] rounded-full bg-transparent border-none cursor-pointer flex items-center justify-center text-slate-500 transition-all hover:bg-[rgba(13,138,138,0.08)] hover:text-[#0d8a8a]" aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
          <button className="w-[34px] h-[34px] rounded-full bg-transparent border-none cursor-pointer flex items-center justify-center text-slate-500 transition-all hover:bg-[rgba(13,138,138,0.08)] hover:text-[#0d8a8a]" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <button className="w-[34px] h-[34px] rounded-full bg-transparent border-none cursor-pointer flex items-center justify-center text-slate-500 transition-all hover:bg-[rgba(13,138,138,0.08)] hover:text-[#0d8a8a]" aria-label="Profile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-white border-t border-[#e0ecf0] py-6 px-7 flex flex-wrap gap-4 items-center">
        <div className="font-['Oswald',sans-serif] text-[1.1rem] font-bold">
          <span className="text-[#0d2d3a]">PRO</span><span className="text-[#0d8a8a]">-</span><span className="text-[#0d2d3a]">SPORT</span>
        </div>
        <nav className="flex gap-5 flex-wrap">
          <Link to="/gear/catalog" className="text-[0.82rem] text-slate-500 no-underline transition-all hover:text-[#0d8a8a]">Equipment Catalog</Link>
          <Link to="/gear/rental-terms" className="text-[0.82rem] text-slate-500 no-underline transition-all hover:text-[#0d8a8a]">Rental Terms</Link>
          <Link to="/gear/maintenance" className="text-[0.82rem] text-slate-500 no-underline transition-all hover:text-[#0d8a8a]">Maintenance Tracking</Link>
          <Link to="/gear/support" className="text-[0.82rem] text-slate-500 no-underline transition-all hover:text-[#0d8a8a]">Support Hub</Link>
          <Link to="/gear/privacy" className="text-[0.82rem] text-slate-500 no-underline transition-all hover:text-[#0d8a8a]">Privacy Policy</Link>
        </nav>
        <p className="text-[0.78rem] text-slate-400 ml-auto">© 2024 PRO-SPORT Performance Systems. Engineered for Elite Athletes.</p>
      </footer>
    </div>
  )
}
