import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const principles = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    title: 'Innovation',
    desc: 'Pursuing smart court technology and scientific training to open the boundaries of training.',
    stat: '12+',
    statLabel: 'Patents Enrolled',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Community',
    desc: 'Building an ecosystem where athletes and professionals connect, compete and elevate each other.',
    stat: '500k',
    statLabel: 'Active Athletes',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: 'Performance',
    desc: 'Delivering measurable results through premium facilities designed for optimal athletic output.',
    stat: '2M+',
    statLabel: 'Premium Logins',
  },
]

const journey = [
  { label: 'World-Class Venues', tag: 'VENUES', image: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=800&q=80', large: true },
  { label: 'Data-Driven Excellence', tag: 'TECH', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', large: false },
  { label: 'Global Tournaments', tag: 'EVENTS', image: 'https://images.unsplash.com/photo-1540747913346-19212a4f5db4?w=600&q=80', large: false },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar theme="dark" />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[68px] px-6 pb-[60px] bg-[#0a0e1a] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-[rgba(10,14,26,0.95)] after:via-[rgba(10,14,26,0.4)] after:to-transparent">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1400&q=70')] bg-cover bg-center opacity-[0.22]" />
        <div className="relative z-[1] text-center max-w-[780px] container animate-fade-up">
          <h1 className="font-['Oswald'] text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-[1.1] tracking-[-0.01em] mb-[22px]">
            Redefining the Future of<br />Athletic Performance.
          </h1>
          <p className="text-[1.05rem] text-white/65 leading-[1.7] max-w-[540px] mx-auto">
            We bridge the gap between human potential and technological precision,
            engineering environments where elite athletes are forged.
          </p>
        </div>
      </section>

      {/* ── Our Journey ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="section-title mb-9 after:content-[''] after:block after:w-12 after:h-[3px] after:bg-[#00c8aa] after:mt-[10px]">Our Journey</h2>
          <div className="grid grid-cols-[1.3fr_1fr] grid-rows-[220px_220px] gap-4 max-md:grid-cols-1 max-md:grid-rows-[240px_180px_180px]">
            {journey.map((item) => (
              <div key={item.label} className={`relative rounded-lg overflow-hidden cursor-pointer group ${item.large ? 'row-span-2 max-md:row-span-1' : ''}`}>
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
            <h2 className="section-title">Core Principles</h2>
            <p className="section-subtitle">The foundations that drive our commitment to athletic supremacy.</p>
          </div>
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {principles.map((p) => (
              <div key={p.title} className="bg-white rounded-lg px-7 py-9 border-[1.5px] border-slate-200 transition-all hover:shadow-md hover:-translate-y-1 hover:border-[#00c8aa]">
                <div className="w-12 h-12 rounded-xl bg-[rgba(0,200,170,0.1)] flex items-center justify-center text-[#00c8aa] mb-[18px]">{p.icon}</div>
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

      {/* ── Global Operations ── */}
      <section className="pt-20 pb-[100px] bg-[#0a0e1a] text-white text-center overflow-hidden">
        <div className="container">
          <h2 className="font-['Oswald'] text-[2rem] font-bold mb-3">Global Operations</h2>
          <p className="text-[0.9rem] text-white/55 max-w-[500px] mx-auto mb-[52px] leading-[1.65]">Operating across 14 countries, delivering consistent, elite-tier athletic infrastructure worldwide.</p>
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

      <Footer variant="dark" />
    </div>
  )
}
