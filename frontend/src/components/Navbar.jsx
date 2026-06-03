import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useNavbarEntrance } from '../hooks/useNavbarEntrance'

export default function Navbar({ theme = 'light' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useNavbarEntrance()

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/')
  }

  const navLinks = [
    { label: 'Home',      path: '/' },
    { label: 'Courts',    path: '/courts' },
    { label: 'Matches',   path: '/matches' },
    { label: 'Gear',      path: '/gear' },
    { label: 'About',     path: '/about' },
    { label: 'Contact',   path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  const isLight = theme === 'light'

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-all duration-200 backdrop-blur-md border-b ${isLight ? 'bg-white/95 border-slate-200 shadow-sm' : 'bg-[#0a0e1a]/92 border-white/10'}`}>
      <div className="flex items-center h-full gap-8 max-w-[1180px] mx-auto px-6">
        {/* Logo */}
        <Link to="/" className="font-['Oswald'] text-[1.45rem] font-bold tracking-wide flex items-center gap-[1px] shrink-0">
          <span className={isLight ? 'text-slate-900' : 'text-white'}>PRO</span>
          <span className="text-[#00c8aa]">-</span>
          <span className={isLight ? 'text-slate-900' : 'text-white'}>SPORT</span>
        </Link>

        {/* Links */}
        <ul className={`lg:flex items-center gap-2 list-none ml-auto ${menuOpen ? 'flex flex-col absolute top-[68px] left-0 right-0 p-4 gap-1 shadow-lg border-b ' + (isLight ? 'bg-white border-slate-200' : 'bg-[#0a0e1a] border-white/10') : 'hidden'}`}>
          {navLinks.map((link) => (
            <li key={link.path} className="w-full lg:w-auto">
              <Link
                to={link.path}
                className={`block w-full lg:inline-block text-[0.88rem] font-medium px-3.5 py-1.5 rounded-full transition-colors tracking-wide
                  ${isActive(link.path) 
                    ? (isLight ? 'text-[#00c8aa] bg-[#00c8aa]/10' : 'text-[#00c8aa] bg-[#00c8aa]/10')
                    : (isLight 
                        ? 'text-slate-500 hover:text-[#00c8aa] hover:bg-[#00c8aa]/10' 
                        : 'text-white/75 hover:text-[#00c8aa] hover:bg-[#00c8aa]/10')
                  }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className={`text-[0.88rem] font-medium px-3.5 py-1.5 rounded-full transition-colors ${isLight ? 'text-slate-500 hover:text-red-500 hover:bg-red-50' : 'text-white/75 hover:text-red-400 hover:bg-red-500/10'}`}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={`text-[0.88rem] font-medium px-3.5 py-1.5 rounded-full transition-colors ${isLight ? 'text-slate-500 hover:text-[#00c8aa] hover:bg-[#00c8aa]/10' : 'text-white/75 hover:text-[#00c8aa] hover:bg-[#00c8aa]/10'}`}>Login</Link>
              <Link to="/register" className="bg-[#00c8aa] hover:bg-[#009e87] hover:shadow-[0_0_24px_rgba(0,200,170,0.25)] hover:-translate-y-[1px] text-white rounded-full px-[18px] py-[8px] font-semibold text-[0.85rem] tracking-wide transition-all inline-flex items-center gap-2">Join Pro</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`lg:hidden flex flex-col gap-[5px] bg-transparent p-1.5 ml-auto relative w-[34px] h-[34px] justify-center items-center`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-[22px] h-[2px] rounded-sm transition-all absolute ${isLight ? 'bg-slate-900' : 'bg-white'} ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
          <span className={`block w-[22px] h-[2px] rounded-sm transition-all absolute ${isLight ? 'bg-slate-900' : 'bg-white'} ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-[22px] h-[2px] rounded-sm transition-all absolute ${isLight ? 'bg-slate-900' : 'bg-white'} ${menuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
        </button>
      </div>
    </nav>
  )
}
