import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer({ variant = 'light' }) {
  const isLight = variant === 'light'
  const footerRef = useRef(null)

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(footerRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 95%' }
        }
      )
    }
  }, [])

  return (
    <footer className={`mt-auto border-t ${isLight ? 'bg-white text-slate-900 border-slate-200' : 'bg-[#111827] text-white border-white/10'}`}>
      <div ref={footerRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-7 md:gap-12 px-6 pt-[52px] pb-[40px] max-w-[1180px] mx-auto">
        {/* Brand */}
        <div>
          <div className="font-['Oswald'] text-[1.3rem] font-bold tracking-wide mb-4">
            <span className={isLight ? 'text-slate-900' : 'text-white'}>PRO</span>
            <span className="text-[#00c8aa]">-</span>
            <span className={isLight ? 'text-slate-900' : 'text-white'}>SPORT</span>
          </div>
          <p className={`text-[0.84rem] leading-[1.65] ${isLight ? 'text-slate-500' : 'text-white/50'}`}>
            Elevating athletic achievement<br />
            through precision engineering and<br />
            border-defying settings.
          </p>
        </div>

        {/* Platform */}
        <div className="flex flex-col gap-[10px]">
          <h4 className={`font-['Oswald'] text-[0.78rem] font-bold tracking-[0.12em] uppercase mb-4 ${isLight ? 'text-slate-400' : 'text-white/35'}`}>PLATFORM</h4>
          <ul className="flex flex-col gap-2.5 list-none">
            <li><Link to="/" className={`text-[0.875rem] transition-colors hover:text-[#00c8aa] ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Discover</Link></li>
            <li><Link to="/about" className={`text-[0.875rem] transition-colors hover:text-[#00c8aa] ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Brand Mission</Link></li>
            <li><Link to="/courts" className={`text-[0.875rem] transition-colors hover:text-[#00c8aa] ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Country</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-[10px]">
          <h4 className={`font-['Oswald'] text-[0.78rem] font-bold tracking-[0.12em] uppercase mb-4 ${isLight ? 'text-slate-400' : 'text-white/35'}`}>LEGAL</h4>
          <ul className="flex flex-col gap-2.5 list-none">
            <li><Link to="#" className={`text-[0.875rem] transition-colors hover:text-[#00c8aa] ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Privacy Policy</Link></li>
            <li><Link to="#" className={`text-[0.875rem] transition-colors hover:text-[#00c8aa] ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Terms of Service</Link></li>
            <li><Link to="#" className={`text-[0.875rem] transition-colors hover:text-[#00c8aa] ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Sitemap</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-[10px]">
          <h4 className={`font-['Oswald'] text-[0.78rem] font-bold tracking-[0.12em] uppercase mb-4 ${isLight ? 'text-slate-400' : 'text-white/35'}`}>CONNECT</h4>
          <ul className="flex flex-row gap-2 list-none">
            <li>
              <a href="#" aria-label="Twitter" className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:border-[#00c8aa] hover:text-[#00c8aa] hover:bg-[#00c8aa]/10 ${isLight ? 'border-slate-200 text-slate-500' : 'border-white/15 text-white/60'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Instagram" className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:border-[#00c8aa] hover:text-[#00c8aa] hover:bg-[#00c8aa]/10 ${isLight ? 'border-slate-200 text-slate-500' : 'border-white/15 text-white/60'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="LinkedIn" className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:border-[#00c8aa] hover:text-[#00c8aa] hover:bg-[#00c8aa]/10 ${isLight ? 'border-slate-200 text-slate-500' : 'border-white/15 text-white/60'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </li>
          </ul>
          {!isLight && (
            <div className="flex gap-2 mt-4">
              <input type="email" placeholder="Email" id="newsletter-email" className="flex-1 px-[14px] py-[9px] border border-white/15 rounded-full bg-white/5 text-white text-[0.85rem] font-['Inter'] outline-none transition-colors focus:border-[#00c8aa] placeholder:text-white/35" />
              <button className="bg-[#00c8aa] hover:bg-[#009e87] hover:shadow-[0_0_24px_rgba(0,200,170,0.25)] text-white rounded-full px-[14px] py-[9px] transition-all" aria-label="Subscribe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between py-[18px] px-6 max-w-[1180px] mx-auto border-t gap-4 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
        <p className={`text-[0.8rem] ${isLight ? 'text-slate-400' : 'text-white/35'}`}>© 2024 PRO-SPORT COMPLEX. Engineered for Elite Performance.</p>
        {isLight && (
          <div className="flex gap-6 flex-wrap">
            <Link to="#" className="text-[0.8rem] text-slate-400 transition-colors hover:text-[#00c8aa]">About Us</Link>
            <Link to="#" className="text-[0.8rem] text-slate-400 transition-colors hover:text-[#00c8aa]">Terms of Service</Link>
            <Link to="#" className="text-[0.8rem] text-slate-400 transition-colors hover:text-[#00c8aa]">Privacy Policy</Link>
            <Link to="/contact" className="text-[0.8rem] text-slate-400 transition-colors hover:text-[#00c8aa]">Contact Support</Link>
            <Link to="#" className="text-[0.8rem] text-slate-400 transition-colors hover:text-[#00c8aa]">Partner Program</Link>
          </div>
        )}
      </div>
    </footer>
  )
}
