import { useState } from 'react'
import GearLayout from '../../layouts/GearLayout'

const faqs = [
  { q: 'How do I extend my rental period?', a: 'Visit the Rentals page and click "Extend" on your active rental. Extensions can be made up to 30 minutes before the scheduled end time. You can also call our support line for immediate assistance.' },
  { q: 'What happens if I return equipment damaged?', a: 'If damage occurs beyond normal wear, the cost of repair or replacement will be deducted from your security deposit. For serious damage, you may be billed the difference. All damage is assessed by our technician team within 24 hours.' },
  { q: 'Can I cancel or modify a booking?', a: 'Cancellations made 24+ hours in advance receive a full refund. Within 2–24 hours receive 50% refund. Modifications (time change, extension) are free up to 2 hours before the rental start.' },
  { q: 'How are deposits refunded?', a: 'Security deposits are refunded within 24 hours of verified equipment return. Refunds are processed to your original payment method and may take 3–5 business days to appear.' },
  { q: 'What if the equipment is defective during my rental?', a: 'Contact us immediately at the support line. We will replace the equipment at no charge if a defect is confirmed. Do not continue to use defective equipment.' },
  { q: 'Is equipment sanitized between rentals?', a: 'Yes. All equipment goes through our standard cleaning and sanitization protocol before every rental. High-touch items (rackets, grips, gloves) receive additional disinfection.' },
  { q: 'Can I reserve a specific item?', a: 'Yes! In the Catalog, click any item and use "Add to Rental" — this reserves that specific unit for your time slot. Reservations are held for 15 minutes while you complete checkout.' },
]

const contactMethods = [
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: 'Phone', value: '+84 28 3456 7890', sub: 'Mon – Sun, 8:00 – 22:00', action: 'tel:+84283456789', actionLabel: 'Call Now', color: '#0d8a8a' },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: 'Email', value: 'gear@prosport.vn', sub: 'Response within 2 hours', action: 'mailto:gear@prosport.vn', actionLabel: 'Send Email', color: '#6366f1' },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: 'Live Chat', value: 'Chat with us', sub: 'Avg. response: 3 min', action: '#', actionLabel: 'Start Chat', color: '#f59e0b' },
]

export default function GearSupportPage() {
  const [open, setOpen] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <GearLayout>
      <div className="px-7 py-10 max-w-[900px] mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-[#0d8a8a]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#0d8a8a]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h1 className="font-['Oswald'] text-3xl font-bold text-[#0d2d3a] mb-2">Support Hub</h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">Get help with rentals, returns, maintenance, and more. We're here 7 days a week.</p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-3 max-[650px]:grid-cols-1 gap-4 mb-10">
          {contactMethods.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#e0ecf0] p-5 flex flex-col items-center text-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: c.color + '18', color: c.color }}>{c.icon}</div>
              <div>
                <p className="text-[0.7rem] text-slate-400 uppercase tracking-wider">{c.label}</p>
                <p className="font-semibold text-[#0d2d3a] text-sm mt-0.5">{c.value}</p>
                <p className="text-[0.72rem] text-slate-400 mt-0.5">{c.sub}</p>
              </div>
              <a href={c.action} className="btn-outline text-[0.78rem] py-1.5 px-4 no-underline">{c.actionLabel}</a>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_360px] max-[800px]:grid-cols-1 gap-7">

          {/* FAQ */}
          <div>
            <h2 className="font-['Oswald'] text-xl font-bold text-[#0d2d3a] mb-4">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#e0ecf0] overflow-hidden">
                  <button onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer bg-transparent border-none">
                    <span className="text-[0.875rem] font-semibold text-[#0d2d3a] pr-4">{faq.q}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d8a8a" strokeWidth="2.5"
                      className="shrink-0 transition-transform duration-200"
                      style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  {open === i && (
                    <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-[#f0f4f8]">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-['Oswald'] text-xl font-bold text-[#0d2d3a] mb-4">Send a Message</h2>
            {sent ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p className="font-semibold text-emerald-800 mb-1">Message Sent!</p>
                <p className="text-sm text-emerald-600">We'll get back to you within 2 hours.</p>
                <button onClick={() => setSent(false)} className="mt-4 text-sm text-emerald-700 underline bg-transparent border-none cursor-pointer">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e0ecf0] p-6 flex flex-col gap-4">
                {[
                  { id: 'name', label: 'Your Name', placeholder: 'Full name', type: 'text' },
                  { id: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
                  { id: 'subject', label: 'Subject', placeholder: 'e.g. Damaged equipment return', type: 'text' },
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={`support-${f.id}`} className="text-[0.75rem] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">{f.label}</label>
                    <input id={`support-${f.id}`} type={f.type} required placeholder={f.placeholder}
                      value={form[f.id]} onChange={e => setForm({...form, [f.id]: e.target.value})}
                      className="w-full border border-[#e0ecf0] rounded-xl px-4 py-2.5 text-sm text-[#0d2d3a] outline-none focus:border-[#0d8a8a] transition-colors" />
                  </div>
                ))}
                <div>
                  <label htmlFor="support-message" className="text-[0.75rem] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Message</label>
                  <textarea id="support-message" required rows={5} placeholder="Describe your issue in detail..."
                    value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full border border-[#e0ecf0] rounded-xl px-4 py-2.5 text-sm text-[#0d2d3a] outline-none focus:border-[#0d8a8a] transition-colors resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">Submit Request</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </GearLayout>
  )
}
