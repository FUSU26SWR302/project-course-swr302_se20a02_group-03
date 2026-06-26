import { useState } from 'react'
import ApexLayout from '../../layouts/ApexLayout'
import './ApexSupportPage.css'

const faqs = [
  { q: 'How do I cancel a booking?', a: 'Go to your Booking page, select the booking you wish to cancel, and click "Cancel Booking". Cancellations made 24+ hours in advance receive a full refund.' },
  { q: 'Can I reschedule my court session?', a: 'Yes! Navigate to your upcoming bookings, click "Reschedule", and select a new available time slot. Rescheduling is free up to 4 hours before your session.' },
  { q: 'How does the wallet top-up work?', a: 'Go to Settings → Payments → Wallet and click "Top Up". You can add funds via credit card, bank transfer, or MoMo.' },
  { q: 'What is the guest policy?', a: 'Each booking can include up to 3 additional guests per court session. Guests must be registered PRO-SPORT members.' },
  { q: 'How do I report a problem with a court?', a: 'Use the "Report Issue" button below or contact support directly. Our facility team responds within 2 hours.' },
]

export default function ApexSupportPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [form, setForm] = useState({ subject: '', category: 'Booking', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({ subject: '', category: 'Booking', message: '' })
  }

  return (
    <ApexLayout title="Support">
      <div className="apex-support">
        {/* Hero */}
        <div className="support-hero">
          <div className="support-hero__icon">🎯</div>
          <h1 className="support-hero__title">How can we help?</h1>
          <p className="support-hero__sub">Search our FAQ or contact our team directly.</p>
          <div className="support-hero__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search for help..." id="support-search" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="support-quick">
          {[
            { icon: '📅', label: 'Booking Issue', color: '#0fc8b5' },
            { icon: '💳', label: 'Payment Help', color: '#6366f1' },
            { icon: '🎾', label: 'Match Problem', color: '#f59e0b' },
            { icon: '🔧', label: 'Technical Issue', color: '#ef4444' },
          ].map(a => (
            <div key={a.label} className="support-quick-btn" style={{ '--accent': a.color }}>
              <span className="support-quick-btn__icon" style={{ background: a.color + '1a', color: a.color }}>{a.icon}</span>
              <span>{a.label}</span>
            </div>
          ))}
        </div>

        <div className="support-grid">
          {/* FAQ */}
          <div>
            <h2 className="support-section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={faq.q} className={`faq-item ${openFaq === i ? 'faq-item--open' : ''}`}>
                  <button className="faq-item__question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <span className="faq-item__arrow">{openFaq === i ? '▲' : '▼'}</span>
                  </button>
                  {openFaq === i && <div className="faq-item__answer">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="support-section-title">Contact Support</h2>
            <div className="support-contact">
              {submitted ? (
                <div className="support-success">
                  <span>✅</span>
                  <p>Your message has been sent! We'll respond within 2 hours.</p>
                </div>
              ) : (
                <form className="support-form" onSubmit={handleSubmit}>
                  <div className="support-field">
                    <label htmlFor="support-subject">Subject</label>
                    <input id="support-subject" type="text" placeholder="Briefly describe your issue" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="support-input" required />
                  </div>
                  <div className="support-field">
                    <label htmlFor="support-category">Category</label>
                    <select id="support-category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="support-input">
                      {['Booking', 'Payment', 'Match', 'Account', 'Technical', 'Other'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="support-field">
                    <label htmlFor="support-message">Message</label>
                    <textarea id="support-message" rows={5} placeholder="Describe your issue in detail..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="support-input support-textarea" required />
                  </div>
                  <button type="submit" className="btn-primary support-submit">Send Message</button>
                </form>
              )}

              <div className="support-contact-info">
                <div className="contact-info-item">
                  <span>📧</span><span>support@prosport.com</span>
                </div>
                <div className="contact-info-item">
                  <span>📞</span><span>+84 28 3838 3838 (8am–10pm)</span>
                </div>
                <div className="contact-info-item">
                  <span>💬</span><span>Live chat available in-app</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApexLayout>
  )
}
