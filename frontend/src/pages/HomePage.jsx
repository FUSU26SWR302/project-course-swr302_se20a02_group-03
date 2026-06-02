import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const brands = ['APEXGEAR', 'NEXUSCOURTS', 'VELOCITYATHLETICS', 'PRIMEFIT']

const facilities = [
  {
    id: 1,
    name: 'The Apex Pavilion',
    sub: 'Tổ Hợp Thể Thao • 4 Sân',
    tag: 'OPEN',
    image: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=800&q=80',
    large: true,
  },
  {
    id: 2,
    name: 'Summit Arena',
    sub: 'Featured Pro',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80',
    large: false,
  },
  {
    id: 3,
    name: 'View All 42 Facilities',
    sub: 'Explore the full network',
    isViewAll: true,
    image: 'https://images.unsplash.com/photo-1551958219-acbc595b39c6?w=600&q=80',
    large: false,
  },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const brandsRef = useRef(null)
  const facilitiesRef = useRef(null)

  useEffect(() => {
    // Hero Animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    // Brands Stagger Animation
    if (brandsRef.current) {
      gsap.fromTo(brandsRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: brandsRef.current, start: 'top 85%' }
        }
      )
    }

    // Facilities Stagger Animation
    if (facilitiesRef.current) {
      gsap.fromTo(facilitiesRef.current.children,
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: facilitiesRef.current, start: 'top 80%' }
        }
      )
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar theme="light" />

      {/* ── Hero ── */}
      <section ref={heroRef} className="pt-[68px] min-h-screen bg-gradient-to-br from-[#f0f7f6] via-[#e8f4f8] to-[#dceef8] flex items-center relative overflow-hidden before:content-[''] before:absolute before:-top-[120px] before:-right-[120px] before:w-[600px] before:h-[600px] before:rounded-full before:bg-[radial-gradient(circle,rgba(0,200,170,0.12)_0%,transparent_70%)] before:pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-center pt-[60px] pb-[80px] max-w-[1180px] mx-auto px-6 text-center lg:text-left w-full">
          <div className="animate-[fadeInUp_0.6s_ease_both]">
            <p className="text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-[#00c8aa] mb-5">Elevating Athletic Performance</p>
            <h1 className="font-['Oswald'] text-[clamp(2.4rem,4.5vw,4rem)] font-bold leading-[1.05] text-slate-900 tracking-[-0.01em] mb-5">
              FLUID<br />PERFORMANCE.<br />ELITE CONTROL.
            </h1>
            <p className="text-[1rem] text-slate-500 leading-[1.7] max-w-[440px] mb-9 mx-auto lg:mx-0">
              The premier management platform for athletes and facilities.
              Book courts, schedule matches, and access pro-tier gear with
              seamless precision.
            </p>
            <div className="flex gap-3.5 flex-wrap items-center justify-center lg:justify-start">
              <Link to="/register" className="bg-[#00c8aa] hover:bg-[#009e87] hover:shadow-[0_0_24px_rgba(0,200,170,0.25)] hover:-translate-y-[1px] text-white rounded-full font-semibold tracking-[0.03em] transition-all inline-flex items-center gap-2 px-[26px] py-[13px] text-[0.95rem]">
                Start Free Journey →
              </Link>
              <Link to="/courts" className="bg-transparent text-slate-900 border-[1.5px] border-slate-200 rounded-full font-medium transition-all hover:border-[#00c8aa] hover:text-[#00c8aa] hover:bg-[#00c8aa]/5 inline-flex items-center gap-2 px-[22px] py-[13px] text-[0.95rem]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Watch Platform Demo
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center animate-[fadeIn_0.5s_ease_both]">
            <div className="relative rounded-[32px] w-full max-w-[520px]">
              <img
                src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80"
                alt="Pro player"
                className="w-full h-[420px] object-cover rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
              />
              {/* Card overlay */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-[20px] px-[18px] py-[14px] flex items-center justify-between gap-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.14)] w-[calc(100%-40px)] max-w-[380px]">
                <div className="flex items-center gap-3 text-left">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00c8aa] shrink-0 animate-[pulse-glow_2s_infinite]" />
                  <div>
                    <p className="font-bold text-[0.9rem] text-slate-900 leading-tight">Pro Arena Alpha</p>
                    <p className="text-[0.78rem] text-slate-400 mt-0.5">4.9 ★ · 11 Reviews</p>
                  </div>
                </div>
                <Link to="/courts" className="bg-[#00c8aa] hover:bg-[#009e87] hover:shadow-[0_0_24px_rgba(0,200,170,0.25)] hover:-translate-y-[1px] text-white rounded-full font-semibold transition-all inline-flex items-center justify-center text-[0.82rem] px-4 py-2 whitespace-nowrap">Available Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 Trusted By 🌟 */}
      <section className="py-[60px] pb-[48px] border-y border-slate-200 bg-white">
        <div className="max-w-[1180px] mx-auto px-6">
          <p className="text-center text-[0.72rem] font-bold tracking-[0.15em] text-slate-400 uppercase mb-8">TRUSTED BY ELITE FACILITIES & BRANDS</p>
          <div ref={brandsRef} className="flex justify-center items-center gap-[52px] flex-wrap">
            {brands.map(b => (
              <span key={b} className="font-['Oswald'] text-[1.1rem] font-bold tracking-[0.08em] text-slate-400 transition-colors hover:text-[#00c8aa] cursor-default">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 🌟 Elite Facilities 🌟 */}
      <section className="pt-[72px] pb-[80px] bg-white">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex items-end justify-between mb-9 flex-wrap gap-4">
            <div>
              <h2 className="font-['Oswald'] text-[2rem] font-bold text-slate-900 tracking-[0.01em]">Elite Facilities</h2>
              <p className="text-slate-500 text-[0.97rem] mt-2">Book premium courts across the network.</p>
            </div>
            <div className="flex gap-2.5">
              <button className="w-9 h-9 rounded-full border-[1.5px] border-slate-200 bg-transparent text-[1.2rem] text-slate-500 flex items-center justify-center transition-all hover:border-[#00c8aa] hover:text-[#00c8aa] hover:bg-[#00c8aa]/10" aria-label="Previous">←</button>
              <button className="w-9 h-9 rounded-full border-[1.5px] border-slate-200 bg-transparent text-[1.2rem] text-slate-500 flex items-center justify-center transition-all hover:border-[#00c8aa] hover:text-[#00c8aa] hover:bg-[#00c8aa]/10" aria-label="Next">→</button>
            </div>
          </div>

          <div ref={facilitiesRef} className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] auto-rows-[280px] lg:grid-rows-[240px_240px] gap-4 text-left">
            {facilities.map(f => (
              <div key={f.id} className={`relative rounded-[20px] overflow-hidden cursor-pointer group ${f.large ? 'lg:row-span-2' : ''}`}>
                <img src={f.image} alt={f.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className={`absolute inset-0 flex flex-col justify-end p-[22px] gap-2.5 ${f.isViewAll ? 'bg-gradient-to-t from-black/40 to-[#00c8aa]/60 items-center justify-center text-center' : 'bg-gradient-to-t from-black/80 via-black/10 to-transparent'}`}>
                  {f.tag && <span className="absolute top-4 left-4 bg-[#00c8aa] text-white text-[0.72rem] font-bold tracking-[0.1em] px-2.5 py-1 rounded-full">{f.tag}</span>}
                  <div className={f.isViewAll ? 'hidden' : 'block'}>
                    <p className="font-['Oswald'] text-[1.2rem] font-bold text-white">{f.name}</p>
                    <p className="text-[0.82rem] text-white/70 mt-0.5">{f.sub}</p>
                  </div>
                  {f.large && (
                    <Link to="/courts" className="bg-[#00c8aa] hover:bg-[#009e87] hover:shadow-[0_0_24px_rgba(0,200,170,0.25)] hover:-translate-y-[1px] text-white rounded-full font-semibold transition-all inline-flex items-center justify-center text-[0.85rem] px-[18px] py-[10px] w-fit mt-2">Book Now</Link>
                  )}
                  {f.isViewAll && (
                    <>
                      <p className="font-['Oswald'] text-[1.2rem] font-bold text-white">{f.name}</p>
                      <Link to="/courts" className="text-white font-semibold text-[0.88rem] underline underline-offset-4 mt-1">
                        Explore the network →
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="light" />
    </div>
  )
}
