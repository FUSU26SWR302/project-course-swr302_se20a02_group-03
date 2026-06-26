import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  { q: 'How do I book a court?', a: 'Use our digital platform or mobile app to view real-time availability and secure your court instantly. Bookings can be made up to 7 days in advance.' },
  { q: 'What is the cancellation policy?', a: 'Cancellations can be made 24 hours prior to your booking for a full refund. Late cancellations may incur a 20% fee.' },
  { q: 'Are training sessions available?', a: 'Yes, we have a roster of elite coaches available for private sessions. Enquire via the form above or through the MatchPro section of the app.' },
]

const channels = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 5 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"/>
      </svg>
    ),
    label: 'Hotline', value: '+1 (800) PRO-SPORT', sub: 'Mon – Fri, 8am – 8pm',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email', value: 'performance@pro-sport.com', sub: 'Reply within 2 hours',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Address', value: '66 Athletic Plaza, Sport Bay', sub: 'San Francisco, CA 94110',
  },
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [formSent, setFormSent] = useState(false)

  const heroRef    = useRef(null)
  const formRef    = useRef(null)
  const detailsRef = useRef(null)
  const faqRef     = useRef(null)

  useEffect(() => {
    // Hero entrance
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
    )
    // Form card slides in from left
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, x: -28 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 82%' } }
      )
    }
    // Contact detail items stagger from right
    if (detailsRef.current) {
      gsap.fromTo(detailsRef.current.children,
        { opacity: 0, x: 28 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: detailsRef.current, start: 'top 82%' } }
      )
    }
    // FAQ items fade up
    if (faqRef.current) {
      gsap.fromTo(faqRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 85%' } }
      )
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar theme="light" />

      {/* ── Hero ── */}
      <div className="pt-32 pb-16 bg-brand-50 text-center">
        <div ref={heroRef} className="max-w-7xl mx-auto px-6">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brand-900 mb-4">Connect With Excellence</h1>
          <p className="text-base sm:text-lg text-brand-500 max-w-xl mx-auto leading-relaxed">
            Whether you're booking a court or joining a league, our team is here to ensure your performance meets your goals.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Form */}
          <div ref={formRef} className="bg-white border border-brand-200 rounded-2xl p-8 sm:p-10 shadow-lg">
            <h2 className="font-heading text-2xl font-bold text-brand-900 mb-8">Get in Touch</h2>

            {formSent ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center animate-scale-in">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-900">Message Sent!</h3>
                <p className="text-brand-500 text-sm leading-relaxed max-w-xs">Our team will get back to you within 2 hours.</p>
                <button onClick={() => setFormSent(false)} className="mt-2 text-sm text-accent font-semibold hover:text-accent-hover transition-colors">
                  Send another →
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={e => { e.preventDefault(); setFormSent(true) }}>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-name" className="text-sm font-semibold text-brand-900">Name</label>
                  <input id="c-name" type="text" placeholder="John Doe" className="input-base" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-email" className="text-sm font-semibold text-brand-900">Email</label>
                  <input id="c-email" type="email" placeholder="john@example.com" className="input-base" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-subject" className="text-sm font-semibold text-brand-900">Subject</label>
                  <select id="c-subject" className="input-base text-brand-900">
                    <option>General Inquiry</option>
                    <option>Court Booking</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-message" className="text-sm font-semibold text-brand-900">Message</label>
                  <textarea id="c-message" rows={4} placeholder="How can we help you today?" className="input-base resize-y min-h-[120px] py-3" />
                </div>
                <button type="submit" className="btn-primary mt-2 py-3.5">Send Message</button>
              </form>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-8">
            <h2 className="font-heading text-2xl font-bold text-brand-900 mb-2">Contact Details</h2>

            <div ref={detailsRef} className="flex flex-col gap-6">
              {channels.map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-sm text-brand-500 mb-0.5">{c.label}</p>
                    <p className="text-lg font-semibold text-brand-900">{c.value}</p>
                    <p className="text-xs text-brand-400 mt-0.5">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-4 pt-8 border-t border-brand-200">
              <p className="text-sm font-semibold text-brand-900 mb-4">Follow Our Performance</p>
              <div className="flex gap-3">
                {['twitter', 'instagram', 'linkedin', 'youtube'].map(s => (
                  <a key={s} href="#" aria-label={s} className="w-10 h-10 rounded-full border border-brand-200 flex items-center justify-center text-brand-400 hover:text-accent hover:border-accent hover:bg-accent/5 transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Live Support */}
            <div className="bg-brand-900 rounded-2xl p-6 flex items-center justify-between gap-4 mt-2 shadow-lg">
              <div>
                <p className="font-bold text-white text-lg">Live Support</p>
                <p className="text-sm text-brand-300 mt-1">Our agents available 24/7 for premium coaches.</p>
              </div>
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full shrink-0 transition-colors active:scale-95">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Image */}
      <section className="relative h-[400px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80" alt="Elite Facility" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-950/20 mix-blend-multiply" />
        <div className="absolute bottom-10 left-10 bg-brand-950/80 backdrop-blur-md rounded-xl p-6 max-w-sm flex flex-col gap-3 shadow-2xl border border-white/10">
          <div className="text-xs font-bold tracking-widest uppercase text-accent">Elite Facility</div>
          <p className="text-sm text-brand-100 leading-relaxed">Centrally located in the heart of the Sport bay for easy access.</p>
          <a href="#" className="text-sm text-accent font-semibold hover:text-accent-hover transition-colors">Get Directions →</a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-brand-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-3xl font-bold text-brand-900">Quick FAQ</h2>
            <a href="#" className="text-sm text-accent font-semibold hover:underline">View Full FAQ →</a>
          </div>
          <div ref={faqRef} className="flex flex-col gap-4">
            {faqs.map((f, i) => (
              <div key={f.q} className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'border-accent shadow-md' : 'border-brand-200 hover:border-brand-300'}`}>
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left text-base font-semibold text-brand-900 cursor-pointer outline-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className={`text-brand-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-accent' : ''}`}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 auth-animate-fade">
                    <div className="pt-2 border-t border-brand-100 text-sm text-brand-600 leading-relaxed">
                      {f.a}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  )
}
