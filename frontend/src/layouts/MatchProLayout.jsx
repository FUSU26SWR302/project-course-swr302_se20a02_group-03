import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { path: '/matches', label: 'Feed' },
  { path: '/matches/nearby', label: 'Nearby' },
  { path: '/matches/community', label: 'Community' },
  { path: '/matches/leaderboard', label: 'Leaderboard' },
  { path: '/matches/create', label: 'Create Match' },
]

export default function MatchProLayout({ children }) {
  const location = useLocation()
  const isActive = (path) => {
    if (path === '/matches') return location.pathname === '/matches'
    return location.pathname.startsWith(path)
  }
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
    }
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f0f7fa] flex flex-col">
      <header ref={headerRef} className="h-[60px] bg-white border-b border-[#e0ecf0] flex items-center px-8 gap-8 sticky top-0 z-[200] shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
        <Link to="/matches" className="font-['Oswald',sans-serif] text-[1.3rem] font-bold text-[#0d2d3a] tracking-[0.03em] no-underline shrink-0">MatchPro</Link>
        <nav className="flex gap-1 flex-1 justify-center">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`py-1.5 px-[18px] text-[0.88rem] font-medium rounded-full no-underline transition-all relative ${
                isActive(link.path)
                  ? 'text-[#0d8a8a] font-semibold after:content-[""] after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:w-[60%] after:h-0.5 after:bg-[#0d8a8a] after:rounded-sm'
                  : 'text-slate-500 hover:text-[#0d8a8a] hover:bg-[rgba(13,138,138,0.07)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 ml-auto">
          <button className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-slate-500 border-none cursor-pointer transition-all hover:bg-[rgba(13,138,138,0.08)] hover:text-[#0d8a8a]" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <button className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-slate-500 border-none cursor-pointer transition-all hover:bg-[rgba(13,138,138,0.08)] hover:text-[#0d8a8a]" aria-label="Messages">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
          <button className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-slate-500 border-none cursor-pointer transition-all hover:bg-[rgba(13,138,138,0.08)] hover:text-[#0d8a8a]" aria-label="Profile">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
        </div>
      </header>
      <main ref={contentRef} className="flex-1">{children}</main>
    </div>
  )
}
