import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const faqs = [
  { q: 'How do I book a court?', a: 'Use our digital platform or mobile app to view real-time availability and secure your court instantly.' },
  { q: 'What is the cancellation policy?', a: 'Cancellations can be made 24 hours prior to the booking for a full refund of your amount.' },
  { q: 'Are training sessions available?', a: 'Yes, we have a roster of elite coaches available for private sessions. Enquire via the form above.' },
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar theme="light" />

      <div className="pt-[120px] pb-14 bg-gradient-to-br from-[#eaf4fb] to-[#daedf8] text-center">
        <div className="container">
          <h1 className="font-['Oswald'] text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-[#0a0e1a] mb-[14px]">Connect With Excellence</h1>
          <p className="text-base text-slate-500 max-w-[500px] mx-auto leading-[1.65]">
            Whether you're booking a court or joining a league, our team is here to ensure your performance meets your goals.
          </p>
        </div>
      </div>

      <section className="py-[60px] bg-white">
        <div className="container grid grid-cols-2 gap-10 items-start max-md:grid-cols-1">
          {/* Left: Form */}
          <div className="bg-white border-[1.5px] border-slate-200 rounded-lg p-9 shadow-sm">
            <h2 className="font-['Oswald'] text-[1.3rem] font-bold text-[#0a0e1a] mb-6">Get in Touch</h2>
            <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="c-name" className="form-label">Name</label>
                <div className="input-wrap">
                  <input id="c-name" type="text" placeholder="John Doe" className="form-input" style={{paddingLeft:'14px'}} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="c-email" className="form-label">Email</label>
                <div className="input-wrap">
                  <input id="c-email" type="email" placeholder="john@pro-sport.com" className="form-input" style={{paddingLeft:'14px'}} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="c-subject" className="form-label">Subject</label>
                <select id="c-subject" className="form-input w-full py-[11px] px-[14px] border-[1.5px] border-slate-200 rounded font-['Inter'] text-[0.9rem] text-slate-900 bg-white outline-none transition-all focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]" style={{paddingLeft:'14px'}}>
                  <option>General Inquiry</option>
                  <option>Court Booking</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="c-message" className="form-label">Message</label>
                <textarea id="c-message" rows={4} placeholder="How can we help you today?" className="form-input w-full py-[11px] px-[14px] border-[1.5px] border-slate-200 rounded font-['Inter'] text-[0.9rem] text-slate-900 bg-white outline-none transition-all resize-y min-h-[100px] focus:border-[#00c8aa] focus:shadow-[0_0_0_3px_rgba(0,200,170,0.12)]" style={{paddingLeft:'14px'}} />
              </div>
              <button type="submit" className="btn-primary py-[13px] px-7 text-[0.95rem]">
                Send Message →
              </button>
            </form>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-6">
            <h2 className="font-['Oswald'] text-[1.3rem] font-bold text-[#0a0e1a] mb-[6px]">Contact Details</h2>
            <div className="flex items-start gap-[14px]">
              <div className="w-10 h-10 rounded-full bg-[rgba(0,200,170,0.10)] flex items-center justify-center text-[#00c8aa] shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 5 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"/></svg>
              </div>
              <div>
                <p className="text-[0.78rem] text-slate-400 mb-[3px]">Hotline</p>
                <p className="text-[0.9rem] font-semibold text-[#0a0e1a] leading-[1.5]">+1 (800) PRO-SPORT</p>
              </div>
            </div>
            <div className="flex items-start gap-[14px]">
              <div className="w-10 h-10 rounded-full bg-[rgba(0,200,170,0.10)] flex items-center justify-center text-[#00c8aa] shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <p className="text-[0.78rem] text-slate-400 mb-[3px]">Email</p>
                <p className="text-[0.9rem] font-semibold text-[#0a0e1a] leading-[1.5]">performance@pro-sport.com</p>
              </div>
            </div>
            <div className="flex items-start gap-[14px]">
              <div className="w-10 h-10 rounded-full bg-[rgba(0,200,170,0.10)] flex items-center justify-center text-[#00c8aa] shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p className="text-[0.78rem] text-slate-400 mb-[3px]">Address</p>
                <p className="text-[0.9rem] font-semibold text-[#0a0e1a] leading-[1.5]">66 Athletic Plaza, Tech Connect<br />San Francisco, CA 94110</p>
              </div>
            </div>

            <div className="mt-1">
              <p className="text-[0.78rem] text-slate-400 mb-[10px]">Follow Our Performance</p>
              <div className="flex gap-2">
                {['twitter','instagram','linkedin','youtube'].map(s => (
                  <a key={s} href="#" aria-label={s} className="w-9 h-9 rounded-full border-[1.5px] border-slate-200 flex items-center justify-center text-slate-400 transition-all hover:border-[#00c8aa] hover:text-[#00c8aa] hover:bg-[rgba(0,200,170,0.07)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0e1a] rounded-md p-5 flex items-center justify-between gap-4 mt-2">
              <div>
                <p className="font-bold text-white text-[0.95rem]">Live Support</p>
                <p className="text-[0.78rem] text-white/50 mt-[3px]">Our agents available 24/7 for premium coaches.</p>
              </div>
              <button className="btn-primary p-[11px] rounded-full shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Image */}
      <section className="relative h-[340px] overflow-hidden">
        <div className="relative h-full">
          <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80" alt="Elite Facility" className="w-full h-full object-cover" />
          <div className="absolute bottom-8 left-8 bg-[rgba(10,14,26,0.75)] backdrop-blur-[8px] rounded-md py-5 px-6 max-w-[320px] flex flex-col gap-2">
            <div className="text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[#00c8aa]">Elite Facility</div>
            <p className="text-[0.88rem] text-white/80 leading-[1.5]">Centrally located in the heart of the Sport bay for easy access.</p>
            <a href="#" className="text-[0.85rem] text-[#00c8aa] font-semibold">Get Directions →</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pt-16 pb-20 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-7">
            <h2 className="section-title">Quick FAQ</h2>
            <a href="#" className="text-[0.88rem] text-[#00c8aa] font-medium hover:underline">View Full FAQ page →</a>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <div key={i} className={`border-[1.5px] rounded-md overflow-hidden transition-all ${openFaq === i ? 'border-[#00c8aa]' : 'border-slate-200'}`}>
                <button className="w-full flex items-center justify-between gap-4 py-4 px-5 bg-transparent text-left text-[0.9rem] font-semibold text-[#0a0e1a] font-['Inter'] cursor-pointer hover:bg-[rgba(0,200,170,0.04)]" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{transform: openFaq === i ? 'rotate(90deg)' : 'none', transition: '0.2s'}}><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                {openFaq === i && <p className="px-5 pb-4 text-sm text-slate-500 leading-[1.65] border-t border-slate-200 pt-[14px]">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  )
}
