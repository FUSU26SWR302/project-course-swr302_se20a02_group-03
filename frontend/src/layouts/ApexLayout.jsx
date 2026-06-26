import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import authApi from '../api/authApi'

const navLinks = [
  { path: '/apex', label: 'Home', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { path: '/apex/booking', label: 'Booking', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { path: '/apex/matches', label: 'Matches', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg> },
  { path: '/apex/shop', label: 'Shop', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  { path: '/apex/activity', label: 'Activity', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { path: '/apex/profile', label: 'Profile', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
]

const bottomLinks = [
  { path: '/apex/settings', label: 'Settings', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { path: '/apex/support', label: 'Support', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
]

export default function ApexLayout({ children, title }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authApi.getProfile()
        if (res?.data?.data) {
          setUserProfile(res.data.data)
        }
      } catch (err) {
        console.error("Failed to fetch profile", err)
      }
    }
    fetchProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  const isActive = (path) => {
    if (path === '/apex') return location.pathname === '/apex'
    return location.pathname.startsWith(path)
  }

  const defaultAvatar = "https://ui-avatars.com/api/?name=" + (userProfile?.fullName || 'User') + "&background=0fc8b5&color=fff"

  return (
    <div className="flex min-h-screen bg-[#f0f5f9]">
      {/* Sidebar */}
      <aside className={`w-[220px] min-h-screen bg-white border-r border-[#e8eef3] flex flex-col p-[20px_14px] fixed left-0 top-0 bottom-0 z-[200] transition-transform duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] overflow-y-auto max-[900px]:${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarOpen ? 'translate-x-0' : 'max-[900px]:-translate-x-full'}`}>
        <div className="flex items-center gap-2.5 px-1.5 pt-1 pb-5 border-b border-[#e8eef3] mb-4">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#0fc8b5] to-[#0990a8] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div>
            <span className="font-['Oswald',sans-serif] text-[1.1rem] font-bold text-[#0d1f2d] tracking-[0.02em]">PRO-SPORT</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 py-2.5 px-2 rounded-lg mb-4 bg-[rgba(15,200,181,0.06)]">
          <img src={userProfile?.avatarUrl || defaultAvatar} alt="User" className="w-[38px] h-[38px] rounded-full object-cover border-2 border-[#0fc8b5] shrink-0" />
          <div className="overflow-hidden">
            <p className="text-[0.82rem] font-bold text-[#0d1f2d] truncate" title={userProfile?.fullName || 'Loading...'}>{userProfile?.fullName || 'Loading...'}</p>
            <p className="text-[0.72rem] text-[#0fc8b5] font-medium">{userProfile?.role || 'Member'}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-[3px] flex-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-[11px] py-[9px] px-3 rounded-md text-[0.875rem] font-medium no-underline transition-all [&_svg]:shrink-0 ${
                isActive(link.path)
                  ? 'bg-[rgba(15,200,181,0.12)] text-[#0fc8b5] font-semibold'
                  : 'text-slate-500 hover:bg-[rgba(15,200,181,0.07)] hover:text-[#0fc8b5]'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <Link to="/apex/booking" className="my-4 justify-center rounded-lg py-[11px] text-[0.875rem] bg-[#00c8aa] hover:bg-[#009e87] text-white font-semibold text-center no-underline block transition-all">
          Book Court
        </Link>

        <div className="flex flex-col gap-[3px] border-t border-[#e8eef3] pt-3 mt-2">
          {bottomLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-[11px] py-[9px] px-3 rounded-md text-[0.875rem] font-medium no-underline transition-all [&_svg]:shrink-0 ${
                isActive(link.path)
                  ? 'bg-[rgba(15,200,181,0.12)] text-[#0fc8b5] font-semibold'
                  : 'text-slate-500 hover:bg-[rgba(15,200,181,0.07)] hover:text-[#0fc8b5]'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-[11px] py-[9px] px-3 rounded-md text-[0.875rem] font-medium no-underline transition-all [&_svg]:shrink-0 text-red-500 hover:bg-red-50 text-left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-[220px] max-[900px]:ml-0 flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-[60px] bg-white border-b border-[#e8eef3] flex items-center gap-4 px-6 sticky top-0 z-[100]">
          <button className="hidden max-[900px]:flex bg-transparent text-slate-500 p-1.5 rounded-lg transition-all hover:text-[#0fc8b5] hover:bg-[rgba(15,200,181,0.08)]" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div className="flex-1 max-w-[400px] flex items-center gap-2.5 bg-[#f0f5f9] border-[1.5px] border-[#e8eef3] rounded-full py-2 px-4 transition-all focus-within:border-[#0fc8b5]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search courts, gear, players..." id="apex-search" className="border-none bg-transparent font-['Inter',sans-serif] text-[0.85rem] text-slate-900 w-full outline-none placeholder:text-slate-400" />
          </div>
          <div className="flex items-center gap-2.5 ml-auto">
            <button className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-slate-500 relative transition-all hover:bg-[rgba(15,200,181,0.08)] hover:text-[#0fc8b5]" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[0.6rem] font-bold flex items-center justify-center">3</span>
            </button>
            <button className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-slate-500 relative transition-all hover:bg-[rgba(15,200,181,0.08)] hover:text-[#0fc8b5]" aria-label="Settings">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
            <Link to="/apex/profile">
              <img src={userProfile?.avatarUrl || defaultAvatar} alt="Profile" className="w-[34px] h-[34px] rounded-full object-cover border-2 border-[#0fc8b5] cursor-pointer transition-all hover:shadow-[0_0_0_3px_rgba(15,200,181,0.25)]" />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-7 max-[900px]:p-[20px_16px] overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Sidebar backdrop on mobile */}
      {sidebarOpen && <div className="hidden max-[900px]:block fixed inset-0 bg-black/40 z-[199]" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}
