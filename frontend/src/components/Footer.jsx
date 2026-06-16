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
    <footer className={`mt-auto border-t ${isLight ? 'bg-white text-brand-900 border-brand-200' : 'bg-brand-950 text-white border-brand-800'}`}>
      <div ref={footerRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-8 md:gap-12 px-6 py-14 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="font-heading text-2xl font-bold tracking-tight">
            <span className={isLight ? 'text-brand-900' : 'text-white'}>PRO</span>
            <span className="text-accent">-</span>
            <span className={isLight ? 'text-brand-900' : 'text-white'}>SPORT</span>
          </div>
          <p className={`text-sm leading-relaxed ${isLight ? 'text-brand-500' : 'text-brand-400'}`}>
            Elevating athletic achievement<br />
            through precision engineering and<br />
            border-defying settings.
          </p>
        </div>

        {/* Platform */}
        <div className="flex flex-col gap-4">
          <h4 className={`font-heading text-xs font-bold tracking-widest uppercase ${isLight ? 'text-brand-400' : 'text-brand-600'}`}>PLATFORM</h4>
          <ul className="flex flex-col gap-3 list-none">
            <li><Link to="/#discover" className={`text-sm font-medium transition-colors hover:text-accent ${isLight ? 'text-brand-600' : 'text-brand-300'}`}>Discover</Link></li>
            <li><Link to="/brand-mission" className={`text-sm font-medium transition-colors hover:text-accent ${isLight ? 'text-brand-600' : 'text-brand-300'}`}>Brand Mission</Link></li>
            <li><Link to="/courts" className={`text-sm font-medium transition-colors hover:text-accent ${isLight ? 'text-brand-600' : 'text-brand-300'}`}>Facilities</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4">
          <h4 className={`font-heading text-xs font-bold tracking-widest uppercase ${isLight ? 'text-brand-400' : 'text-brand-600'}`}>LEGAL</h4>
          <ul className="flex flex-col gap-3 list-none">
            <li><Link to="/privacy" className={`text-sm font-medium transition-colors hover:text-accent ${isLight ? 'text-brand-600' : 'text-brand-300'}`}>Privacy Policy</Link></li>
            <li><Link to="/terms" className={`text-sm font-medium transition-colors hover:text-accent ${isLight ? 'text-brand-600' : 'text-brand-300'}`}>Terms of Service</Link></li>
            <li><Link to="/sitemap" className={`text-sm font-medium transition-colors hover:text-accent ${isLight ? 'text-brand-600' : 'text-brand-300'}`}>Sitemap</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-4">
          <h4 className={`font-heading text-xs font-bold tracking-widest uppercase ${isLight ? 'text-brand-400' : 'text-brand-600'}`}>CONNECT</h4>
          <ul className="flex flex-row gap-2.5 list-none">
            <li>
              <a href="#" aria-label="Twitter" className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:border-accent hover:text-accent hover:bg-accent/10 ${isLight ? 'border-brand-200 text-brand-500' : 'border-brand-800 text-brand-400'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Instagram" className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:border-accent hover:text-accent hover:bg-accent/10 ${isLight ? 'border-brand-200 text-brand-500' : 'border-brand-800 text-brand-400'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="LinkedIn" className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:border-accent hover:text-accent hover:bg-accent/10 ${isLight ? 'border-brand-200 text-brand-500' : 'border-brand-800 text-brand-400'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </li>
          </ul>
          {!isLight && (
            <div className="flex gap-2 mt-2">
              <input type="email" placeholder="Email" id="newsletter-email" className="flex-1 px-4 py-2 border border-brand-800 rounded-xl bg-brand-900 text-white text-sm outline-none transition-colors focus:border-accent placeholder:text-brand-600" />
              <button className="bg-accent hover:bg-accent-hover text-white rounded-xl px-4 py-2 transition-all active:scale-[0.98]" aria-label="Subscribe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 px-6 max-w-7xl mx-auto border-t gap-4 ${isLight ? 'border-brand-200' : 'border-brand-800'}`}>
        <p className={`text-sm ${isLight ? 'text-brand-500' : 'text-brand-500'}`}>© 2024 PRO-SPORT COMPLEX. Engineered for Elite Performance.</p>
        {isLight && (
          <div className="flex gap-6 flex-wrap">
            <Link to="#" className="text-sm font-medium text-brand-500 transition-colors hover:text-brand-900">About Us</Link>
            <Link to="/terms" className="text-sm font-medium text-brand-500 transition-colors hover:text-brand-900">Terms</Link>
            <Link to="/privacy" className="text-sm font-medium text-brand-500 transition-colors hover:text-brand-900">Privacy</Link>
            <Link to="/contact" className="text-sm font-medium text-brand-500 transition-colors hover:text-brand-900">Support</Link>
          </div>
        )}
      </div>
    </footer>
  )
}