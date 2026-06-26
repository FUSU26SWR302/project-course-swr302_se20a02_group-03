import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SitemapPage() {
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(contentRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    )
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar theme="light" />
      
      {/* Header */}
      <div className="pt-[140px] pb-[60px] bg-gradient-to-br from-[#f0f7f6] via-[#e8f4f8] to-[#dceef8] text-center px-6">
        <h1 className="font-['Oswald'] text-[clamp(2rem,4vw,3rem)] font-bold text-[#0a0e1a] mb-4">Sitemap</h1>
        <p className="text-slate-500 max-w-[500px] mx-auto text-[0.95rem]">Navigate through our platform structure</p>
      </div>

      {/* Content */}
      <div className="container max-w-[900px] py-16" ref={contentRef}>
        
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Main */}
          <div>
            <h3 className="font-['Oswald'] text-[1.1rem] font-bold text-[#0a0e1a] mb-4 border-b-[1.5px] border-slate-100 pb-2">Main Pages</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Home / Discover</Link></li>
              <li><Link to="/about" className="text-slate-600 hover:text-[#00c8aa] transition-colors">About Us (Brand Mission)</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Contact Support</Link></li>
              <li><Link to="/courts" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Courts & Facilities</Link></li>
            </ul>
          </div>
          
          {/* Account */}
          <div>
            <h3 className="font-['Oswald'] text-[1.1rem] font-bold text-[#0a0e1a] mb-4 border-b-[1.5px] border-slate-100 pb-2">Account</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/login" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Register</Link></li>
              <li><Link to="/customer/profile" className="text-slate-600 hover:text-[#00c8aa] transition-colors">My Profile</Link></li>
              <li><Link to="/customer/bookings" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Booking History</Link></li>
            </ul>
          </div>
          
          {/* MatchPro */}
          <div>
            <h3 className="font-['Oswald'] text-[1.1rem] font-bold text-[#0a0e1a] mb-4 border-b-[1.5px] border-slate-100 pb-2">MatchPro Community</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/matches" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Trending Matches</Link></li>
              <li><Link to="/matches/nearby" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Nearby Sports</Link></li>
              <li><Link to="/matches/community" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Community Hub</Link></li>
              <li><Link to="/matches/leaderboard" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Leaderboards</Link></li>
            </ul>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Gear */}
          <div>
            <h3 className="font-['Oswald'] text-[1.1rem] font-bold text-[#0a0e1a] mb-4 border-b-[1.5px] border-slate-100 pb-2">Gear Rental</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/gear/catalog" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Gear Catalog</Link></li>
              <li><Link to="/gear/rentals" className="text-slate-600 hover:text-[#00c8aa] transition-colors">My Rentals</Link></li>
              <li><Link to="/gear/support" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Gear Support</Link></li>
              <li><Link to="/gear/rental-terms" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Rental Terms</Link></li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h3 className="font-['Oswald'] text-[1.1rem] font-bold text-[#0a0e1a] mb-4 border-b-[1.5px] border-slate-100 pb-2">Platform Portals</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/apex" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Apex Court System</Link></li>
              <li><Link to="/admin" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Admin Dashboard</Link></li>
              <li><Link to="/elite" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Elite Staff POS</Link></li>
              <li><Link to="/mobile" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Mobile App View</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-['Oswald'] text-[1.1rem] font-bold text-[#0a0e1a] mb-4 border-b-[1.5px] border-slate-100 pb-2">Legal</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/privacy" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-600 hover:text-[#00c8aa] transition-colors">Terms of Service</Link></li>
              <li><span className="text-[#00c8aa] font-medium">Sitemap (Current Page)</span></li>
            </ul>
          </div>
        </div>

      </div>

      <Footer variant="dark" />
    </div>
  )
}
