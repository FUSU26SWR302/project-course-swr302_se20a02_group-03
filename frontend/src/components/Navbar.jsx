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
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 backdrop-blur-xl border-b ${isLight ? 'bg-white/80 border-brand-200 shadow-sm' : 'bg-brand-950/80 border-brand-800'}`}>
      <div className="flex items-center h-full gap-8 max-w-7xl mx-auto px-6">
        {/* Logo */}
        <Link to="/" className="font-heading text-2xl font-bold tracking-tight flex items-center gap-0.5 shrink-0">
          <span className={isLight ? 'text-brand-900' : 'text-white'}>PRO</span>
          <span className="text-accent">-</span>
          <span className={isLight ? 'text-brand-900' : 'text-white'}>SPORT</span>
        </Link>

        {/* Links */}
        <ul className={`lg:flex items-center gap-1 list-none ml-auto ${menuOpen ? 'flex flex-col absolute top-16 left-0 right-0 p-4 gap-1 shadow-md border-b ' + (isLight ? 'bg-white border-brand-200' : 'bg-brand-900 border-brand-800') : 'hidden'}`}>
          {navLinks.map((link) => (
            <li key={link.path} className="w-full lg:w-auto">
              <Link
                to={link.path}
                className={`block w-full lg:inline-block text-sm font-medium px-4 py-2 rounded-lg transition-colors
                  ${isActive(link.path) 
                    ? 'text-accent bg-accent/10'
                    : (isLight 
                        ? 'text-brand-500 hover:text-brand-900 hover:bg-brand-50' 
                        : 'text-brand-300 hover:text-white hover:bg-brand-800')
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
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${isLight ? 'text-brand-500 hover:text-red-600 hover:bg-red-50' : 'text-brand-300 hover:text-red-400 hover:bg-red-500/10'}`}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${isLight ? 'text-brand-600 hover:text-brand-900 hover:bg-brand-50' : 'text-brand-300 hover:text-white hover:bg-brand-800'}`}>Login</Link>
              <Link to="/register" className="btn-primary">Join Pro</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-lg transition-colors focus:ring-2 focus:ring-accent/20"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 rounded-full transition-transform ${isLight ? 'bg-brand-900' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 rounded-full transition-opacity ${isLight ? 'bg-brand-900' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 rounded-full transition-transform ${isLight ? 'bg-brand-900' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>
    </nav>
  )
}
