import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useLocation } from 'react-router-dom'
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

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>
    ),
    title: 'Real-Time Court Grid',
    desc: 'Live availability matrix across all courts. No more phone calls or double bookings.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    title: 'Smart Match-Making',
    desc: 'AI-powered player matching by skill level, schedule, and location preference.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
    ),
    title: 'Escrow Wallet',
    desc: 'Secure deposit system eliminates no-shows. Funds held until match completion.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>
    ),
    title: 'AI Chatbot Assistant',
    desc: 'Natural language search for courts and matches. Ask, and it finds the best fit.',
  },
]

const steps = [
  { num: '01', title: 'Create Account', desc: 'Sign up in seconds. Complete E-KYC for full access to all platform features.' },
  { num: '02', title: 'Find & Book', desc: 'Browse real-time court availability or join open matches in your area.' },
  { num: '03', title: 'Play & Connect', desc: 'Check in via QR, play your match, and build your reputation score.' },
]

const stats = [
  { value: '42+', label: 'Premium Facilities' },
  { value: '2.4K', label: 'Active Athletes' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '15K+', label: 'Matches Completed' },
]

export default function HomePage() {
  const location = useLocation()
  const heroRef = useRef(null)
  const brandsRef = useRef(null)
  const facilitiesRef = useRef(null)
  const featuresRef = useRef(null)
  const stepsRef = useRef(null)
  const statsRef = useRef(null)
  const ctaRef = useRef(null)

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

    // Features Stagger
    if (featuresRef.current) {
      gsap.fromTo(featuresRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' }
        }
      )
    }

    // Steps Stagger
    if (stepsRef.current) {
      gsap.fromTo(stepsRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' }
        }
      )
    }

    // Stats counter animation
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' }
        }
      )
    }

    // CTA section
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' }
        }
      )
    }

    // Hash scrolling logic for Discover section
    if (location.hash === '#discover') {
      setTimeout(() => {
        document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location.hash])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar theme="light" />

      {/* ═══════════════════════════════════════════
          HERO — Dark, Bold, Premium
          ═══════════════════════════════════════════ */}
      <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Background court image */}
        <img
          src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/85 to-brand-900/60" />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '72px 72px'
        }} />
        
        {/* Accent glow — top-right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[140px] pointer-events-none" />
        {/* Accent glow — bottom-left */}
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

        <div ref={heroRef} className="relative z-10 flex flex-col items-center text-center py-28 lg:py-40 max-w-[860px] mx-auto px-6 w-full">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-6">
              Elevating Athletic Performance
            </p>
            <h1 className="font-heading text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[1.0] text-white tracking-[-0.02em] mb-7">
              FLUID PERFORMANCE.<br />
              <span className="text-accent">ELITE CONTROL.</span>
            </h1>
            <p className="text-brand-400 text-lg leading-[1.8] max-w-[560px] mb-12">
              The premier management platform for athletes and facilities.
              Book courts, schedule matches, and access pro-tier gear with
              seamless precision.
            </p>
            <div className="flex gap-4 flex-wrap items-center justify-center">
              <Link to="/register" className="btn-primary px-8 py-4 text-base rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20">
                Start Free Journey
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link to="/courts" className="inline-flex items-center gap-2.5 px-7 py-4 text-base font-medium text-brand-300 border border-brand-700 rounded-xl transition-all duration-300 hover:border-accent hover:text-white hover:bg-accent/5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Watch Demo
              </Link>
            </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUSTED BY — Minimal Brand Strip
          ═══════════════════════════════════════════ */}
      <section className="py-12 border-b border-brand-200/60 bg-white">
        <div className="max-w-[1180px] mx-auto px-6">
          <p className="text-center text-[0.68rem] font-bold tracking-[0.2em] text-brand-300 uppercase mb-8">
            Trusted by Elite Facilities & Brands
          </p>
          <div ref={brandsRef} className="flex justify-center items-center gap-12 md:gap-16 flex-wrap">
            {brands.map(b => (
              <span key={b} className="font-heading text-lg font-bold tracking-[0.08em] text-brand-300 transition-colors duration-300 hover:text-accent cursor-default select-none">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES — Why Pro-Sport (Bento Grid)
          ═══════════════════════════════════════════ */}
      <section id="discover" className="py-24 bg-brand-50">
        <div className="max-w-[1180px] mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-3">Platform Features</p>
            <h2 className="font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-brand-900 tracking-tight">
              Everything You Need.<br />
              <span className="text-brand-400">Nothing You Don't.</span>
            </h2>
          </div>

          {/* Bento-style grid: 2 tall + 2 short on the right */}
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <article
                key={i}
                className={`group bg-white border border-brand-200/50 rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/5 hover:border-brand-300/60 ${i === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200/50 flex items-center justify-center text-brand-500 group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-900 tracking-tight mb-2">{f.title}</h3>
                  <p className="text-sm text-brand-500 leading-relaxed">{f.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — 3 Steps
          ═══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            {/* Left — Sticky header */}
            <div className="lg:sticky lg:top-32">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-3">How It Works</p>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-brand-900 tracking-tight leading-tight mb-5">
                From Sign-Up<br />to Game Day.
              </h2>
              <p className="text-brand-500 text-sm leading-relaxed max-w-sm mb-8">
                Three simple steps to transform how you book courts, find opponents, and manage your sports experience.
              </p>
              <Link to="/register" className="btn-primary px-6 py-3">
                Get Started
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>

            {/* Right — Steps */}
            <div ref={stepsRef} className="flex flex-col gap-6">
              {steps.map((s, i) => (
                <article key={i} className="group flex gap-6 items-start p-7 rounded-2xl border border-brand-200/50 bg-brand-50/50 transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-brand-900/5 hover:border-brand-300/50 hover:-translate-y-0.5">
                  {/* Step number */}
                  <span className="font-heading text-4xl font-bold text-brand-200 group-hover:text-accent transition-colors duration-300 shrink-0 leading-none mt-1">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-brand-900 tracking-tight mb-2">{s.title}</h3>
                    <p className="text-sm text-brand-500 leading-relaxed">{s.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS — Dark Counter Strip
          ═══════════════════════════════════════════ */}
      <section className="py-20 bg-brand-900 relative overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/6 blur-[120px] pointer-events-none" />
        
        <div ref={statsRef} className="max-w-[1180px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-bold text-white tracking-tight mb-2">{s.value}</p>
              <p className="text-xs font-medium text-brand-500 tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          CTA — Final Conversion Section
          ═══════════════════════════════════════════ */}
      <section className="py-24 bg-brand-50 relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        <div ref={ctaRef} className="max-w-[680px] mx-auto px-6 text-center relative z-10">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-4">Ready to Play?</p>
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-brand-900 tracking-tight leading-tight mb-5">
            Join the Pro-Sport<br />Network Today.
          </h2>
          <p className="text-brand-500 text-base leading-relaxed max-w-md mx-auto mb-10">
            Start booking courts, finding opponents, and elevating your game. Free to join, no commitment required.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/register" className="btn-primary px-8 py-4 text-base rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20">
              Create Free Account
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link to="/courts" className="btn-outline px-8 py-4 text-base rounded-xl hover:-translate-y-0.5">
              Browse Courts
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="light" />
    </div>
  )
}
