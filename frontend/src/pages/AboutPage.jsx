import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const principles = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    title: 'Innovation',
    desc: 'Pioneering smart court technology and data-driven training to push the boundaries of athletic performance.',
    stat: '12+',
    statLabel: 'Patents Filed',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Community',
    desc: 'Building a thriving ecosystem where athletes, coaches and professionals connect, compete and grow together.',
    stat: '500K+',
    statLabel: 'Active Athletes',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: 'Performance',
    desc: 'Delivering measurable results through premium facilities, advanced analytics and personalized training plans.',
    stat: '2M+',
    statLabel: 'Sessions Booked',
  },
]

const milestones = [
  { year: '2020', title: 'Founded in Ho Chi Minh City', desc: 'Started with a vision to digitize sports facility management across Southeast Asia.' },
  { year: '2021', title: 'First 50 Facilities Onboarded', desc: 'Partnered with tennis clubs, badminton halls and multi-sport complexes in Vietnam.' },
  { year: '2022', title: 'MatchPro Launch', desc: 'Launched our AI-powered matchmaking system, connecting athletes by skill level and location.' },
  { year: '2023', title: 'Series A Funding', desc: 'Secured $5M in funding to expand our smart court technology and mobile platform.' },
  { year: '2024', title: 'Regional Expansion', desc: 'Expanded operations to Thailand, Singapore and Philippines with 200+ partner venues.' },
  { year: '2025', title: 'Pro-Sport 2.0', desc: 'Launched next-gen platform with real-time analytics, gear rental and tournament management.' },
]

const team = [
  { name: 'David Nguyen', role: 'CEO & Co-Founder', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', quote: 'Technology should empower athletes, not complicate their game.' },
  { name: 'Sarah Chen', role: 'CTO', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80', quote: 'We build systems that think like coaches and perform like champions.' },
  { name: 'Marcus Tran', role: 'Head of Product', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80', quote: 'Every feature we ship is tested on the court, not just in the lab.' },
  { name: 'Elena Park', role: 'VP of Operations', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80', quote: 'Our venues set the standard for what modern sports facilities should be.' },
]

const partners = ['APEXGEAR', 'NEXUSCOURTS', 'VELOCITYATHLETICS', 'PRIMEFIT', 'ELITEPRO', 'SPORTZONE']

const journey = [
  { label: 'World-Class Venues', tag: 'VENUES', image: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=800&q=80', large: true },
  { label: 'Data-Driven Excellence', tag: 'TECH', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', large: false },
  { label: 'Global Tournaments', tag: 'EVENTS', image: 'https://images.unsplash.com/photo-1540747913346-19212a4f5db4?w=600&q=80', large: false },
]

const stats = [
  { value: '200+', label: 'Partner Venues' },
  { value: '500K', label: 'Active Athletes' },
  { value: '2M+', label: 'Matches Played' },
  { value: '14', label: 'Cities Covered' },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const missionRef = useRef(null)
  const journeyRef = useRef(null)
  const principlesRef = useRef(null)
  const timelineRef = useRef(null)
  const teamRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    // Hero
    gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })

    // Mission
    if (missionRef.current) {
      gsap.fromTo(missionRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: missionRef.current, start: 'top 80%' } }
      )
    }

    // Journey images
    if (journeyRef.current) {
      gsap.fromTo(journeyRef.current.children,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: journeyRef.current, start: 'top 80%' } }
      )
    }

    // Principles cards
    if (principlesRef.current) {
      gsap.fromTo(principlesRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: principlesRef.current, start: 'top 80%' } }
      )
    }

    // Timeline
    if (timelineRef.current) {
      gsap.fromTo(timelineRef.current.querySelectorAll('.timeline-item'),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' } }
      )
    }

    // Team
    if (teamRef.current) {
      gsap.fromTo(teamRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: teamRef.current, start: 'top 80%' } }
      )
    }

    // Stats counter
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' } }
      )
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar theme="dark" />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[68px] px-6 pb-[60px] bg-[#0a0e1a] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-[rgba(10,14,26,0.95)] after:via-[rgba(10,14,26,0.4)] after:to-transparent">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1400&q=70')] bg-cover bg-center opacity-[0.22]" />
        <div ref={heroRef} className="relative z-[1] text-center max-w-[780px] container">
          <span className="inline-block text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#00c8aa] mb-5 px-4 py-1.5 rounded-full border border-[#00c8aa]/30 bg-[#00c8aa]/10">About PRO-SPORT</span>
          <h1 className="font-['Oswald'] text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-[1.1] tracking-[-0.01em] mb-[22px]">
            Redefining the Future of<br />Athletic Performance.
          </h1>
          <p className="text-[1.05rem] text-white/65 leading-[1.7] max-w-[540px] mx-auto mb-8">
            We bridge the gap between human potential and technological precision,
            engineering environments where elite athletes are forged.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/courts" className="bg-[#00c8aa] hover:bg-[#009e87] hover:shadow-[0_0_24px_rgba(0,200,170,0.25)] hover:-translate-y-[1px] text-white rounded-full font-semibold tracking-[0.03em] transition-all inline-flex items-center gap-2 px-[26px] py-[13px] text-[0.95rem]">
              Explore Facilities →
            </Link>
            <Link to="/contact" className="bg-transparent text-white border-[1.5px] border-white/25 rounded-full font-medium transition-all hover:border-[#00c8aa] hover:text-[#00c8aa] hover:bg-[#00c8aa]/5 inline-flex items-center gap-2 px-[22px] py-[13px] text-[0.95rem]">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand Mission ── */}
      <section className="py-20 bg-white">
        <div ref={missionRef} className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#00c8aa] mb-4 block">Our Mission</span>
            <h2 className="font-['Oswald'] text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-slate-900 leading-[1.15] mb-6">
              Empowering Athletes Through<br />Technology & Premium Facilities
            </h2>
            <p className="text-[0.95rem] text-slate-500 leading-[1.75] mb-6">
              PRO-SPORT was born from a simple belief: every athlete deserves access to world-class facilities and intelligent tools that help them reach their peak performance. We combine cutting-edge technology with premium venues to create an ecosystem where athletes of all levels can train, compete and grow.
            </p>
            <p className="text-[0.95rem] text-slate-500 leading-[1.75] mb-8">
              Our platform connects <strong className="text-slate-800">200+ venues</strong>, <strong className="text-slate-800">500,000+ athletes</strong>, and <strong className="text-slate-800">elite coaching programs</strong> into one seamless experience — from booking a court to finding your perfect match.
            </p>
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00c8aa]/10 flex items-center justify-center text-[#00c8aa]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <span className="text-[0.88rem] font-medium text-slate-700">Smart Booking System</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00c8aa]/10 flex items-center justify-center text-[#00c8aa]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <span className="text-[0.88rem] font-medium text-slate-700">AI Match-Making</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00c8aa]/10 flex items-center justify-center text-[#00c8aa]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <span className="text-[0.88rem] font-medium text-slate-700">Real-Time Analytics</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80" alt="Athletic training" className="w-full h-[420px] object-cover rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.12)]" />
            <div className="absolute -bottom-5 -left-5 bg-[#0a0e1a] text-white rounded-xl px-6 py-4 shadow-lg max-w-[220px]">
              <p className="font-['Oswald'] text-[2rem] font-bold text-[#00c8aa] leading-none">5+</p>
              <p className="text-[0.82rem] text-white/60 mt-1">Years of Excellence in Sports Technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="py-14 bg-[#0a0e1a]">
        <div ref={statsRef} className="container flex justify-center gap-16 flex-wrap">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-['Oswald'] text-[2.2rem] font-bold text-[#00c8aa] leading-none">{s.value}</p>
              <p className="text-[0.82rem] text-white/50 mt-2 tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Journey ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <span className="text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#00c8aa] mb-3 block">What We Do</span>
          <h2 className="section-title mb-9 after:content-[''] after:block after:w-12 after:h-[3px] after:bg-[#00c8aa] after:mt-[10px]">Our Journey</h2>
          <div ref={journeyRef} className="grid grid-cols-[1.3fr_1fr] grid-rows-[220px_220px] gap-4 max-md:grid-cols-1 max-md:grid-rows-[240px_180px_180px]">
            {journey.map((item) => (
              <div key={item.label} className={`relative rounded-[16px] overflow-hidden cursor-pointer group ${item.large ? 'row-span-2 max-md:row-span-1' : ''}`}>
                <img src={item.image} alt={item.label} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.72] to-transparent flex flex-col justify-end p-5 gap-[6px]">
                  <span className="text-[0.68rem] font-bold tracking-[0.12em] text-[#00c8aa] uppercase">{item.tag}</span>
                  <p className="font-['Oswald'] text-[1.05rem] font-bold text-white">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Principles ── */}
      <section className="py-20 bg-[var(--color-bg)]">
        <div className="container">
          <div className="text-center mb-[52px]">
            <span className="text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#00c8aa] mb-3 block">Why Choose Us</span>
            <h2 className="section-title">Core Principles</h2>
            <p className="section-subtitle">The foundations that drive our commitment to athletic excellence.</p>
          </div>
          <div ref={principlesRef} className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {principles.map((p) => (
              <div key={p.title} className="bg-white rounded-[16px] px-7 py-9 border-[1.5px] border-slate-200 transition-all hover:shadow-md hover:-translate-y-1 hover:border-[#00c8aa] group">
                <div className="w-12 h-12 rounded-xl bg-[rgba(0,200,170,0.1)] flex items-center justify-center text-[#00c8aa] mb-[18px] transition-all group-hover:bg-[#00c8aa] group-hover:text-white">{p.icon}</div>
                <h3 className="font-['Oswald'] text-[1.2rem] font-bold text-[#0a0e1a] mb-[10px]">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-[1.65] mb-5">{p.desc}</p>
                <div className="flex flex-col gap-[2px] border-t border-slate-200 pt-4">
                  <span className="font-['Oswald'] text-[1.6rem] font-bold text-[#00c8aa]">{p.stat}</span>
                  <span className="text-[0.78rem] text-slate-400">{p.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#00c8aa] mb-3 block">Our Story</span>
            <h2 className="section-title">From Vision to Reality</h2>
            <p className="section-subtitle">Key milestones in our journey to transform sports management.</p>
          </div>
          <div ref={timelineRef} className="relative max-w-[700px] mx-auto">
            {/* Timeline line */}
            <div className="absolute left-[22px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00c8aa] via-[#00c8aa]/40 to-transparent max-md:left-[18px]" />
            {milestones.map((m, i) => (
              <div key={m.year} className="timeline-item relative flex gap-6 mb-8 last:mb-0 pl-[52px] max-md:pl-[44px]">
                {/* Dot */}
                <div className={`absolute left-[14px] top-1 w-[18px] h-[18px] rounded-full border-[3px] ${i === milestones.length - 1 ? 'border-[#00c8aa] bg-[#00c8aa] shadow-[0_0_12px_rgba(0,200,170,0.4)]' : 'border-[#00c8aa] bg-white'} max-md:left-[10px]`} />
                <div className="bg-[#f8fafb] border border-slate-200 rounded-xl px-6 py-5 flex-1 transition-all hover:shadow-md hover:border-[#00c8aa]/40">
                  <span className="text-[0.72rem] font-bold tracking-[0.1em] text-[#00c8aa] uppercase">{m.year}</span>
                  <h3 className="font-['Oswald'] text-[1.05rem] font-bold text-slate-900 mt-1 mb-1.5">{m.title}</h3>
                  <p className="text-[0.85rem] text-slate-500 leading-[1.65]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Team ── */}
      <section className="py-20 bg-[var(--color-bg)]">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#00c8aa] mb-3 block">Our People</span>
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle">The visionaries driving PRO-SPORT's mission forward.</p>
          </div>
          <div ref={teamRef} className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {team.map(t => (
              <div key={t.name} className="bg-white rounded-[16px] border-[1.5px] border-slate-200 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 hover:border-[#00c8aa] group">
                <div className="relative h-[220px] overflow-hidden">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-[0.78rem] text-white/90 italic leading-[1.5]">"{t.quote}"</p>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <h3 className="font-['Oswald'] text-[1.05rem] font-bold text-slate-900">{t.name}</h3>
                  <p className="text-[0.82rem] text-[#00c8aa] font-medium mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-14 bg-white border-y border-slate-200">
        <div className="container">
          <p className="text-center text-[0.72rem] font-bold tracking-[0.15em] text-slate-400 uppercase mb-8">Trusted Partners & Brands</p>
          <div className="flex justify-center items-center gap-[52px] flex-wrap">
            {partners.map(b => (
              <span key={b} className="font-['Oswald'] text-[1.1rem] font-bold tracking-[0.08em] text-slate-400 transition-colors hover:text-[#00c8aa] cursor-default">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Operations ── */}
      <section className="pt-20 pb-[100px] bg-[#0a0e1a] text-white text-center overflow-hidden">
        <div className="container">
          <span className="text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#00c8aa] mb-4 block">Worldwide Presence</span>
          <h2 className="font-['Oswald'] text-[2rem] font-bold mb-3">Global Operations</h2>
          <p className="text-[0.9rem] text-white/55 max-w-[500px] mx-auto mb-[52px] leading-[1.65]">Operating across 14 cities, delivering consistent, elite-tier athletic infrastructure throughout Southeast Asia and beyond.</p>
          <div className="relative flex items-center justify-center min-h-[160px]">
            <div className="font-['Oswald'] text-[clamp(2rem,6vw,5rem)] font-bold tracking-[0.15em] text-[#00c8aa] opacity-25 select-none">NETWORK ACTIVE</div>
            <div className="absolute inset-0 flex flex-wrap gap-[18px] justify-center items-center pointer-events-none">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-[#00c8aa] opacity-40 animate-[pulse-glow_2.5s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 bg-gradient-to-br from-[#f0f7f6] via-[#e8f4f8] to-[#dceef8]">
        <div className="container text-center">
          <h2 className="font-['Oswald'] text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-slate-900 leading-[1.15] mb-4">
            Ready to Elevate Your Game?
          </h2>
          <p className="text-[0.95rem] text-slate-500 max-w-[480px] mx-auto leading-[1.7] mb-8">
            Join 500,000+ athletes who trust PRO-SPORT for their training, matches and competitive journey.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/register" className="bg-[#00c8aa] hover:bg-[#009e87] hover:shadow-[0_0_24px_rgba(0,200,170,0.25)] hover:-translate-y-[1px] text-white rounded-full font-semibold tracking-[0.03em] transition-all inline-flex items-center gap-2 px-[28px] py-[14px] text-[0.95rem]">
              Start Free Journey →
            </Link>
            <Link to="/contact" className="bg-transparent text-slate-900 border-[1.5px] border-slate-200 rounded-full font-medium transition-all hover:border-[#00c8aa] hover:text-[#00c8aa] hover:bg-[#00c8aa]/5 inline-flex items-center gap-2 px-[24px] py-[14px] text-[0.95rem]">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  )
}
