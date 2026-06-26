import GearLayout from '../../layouts/GearLayout'

const sections = [
  { title: 'Information We Collect', body: `We collect personal information you provide directly when creating an account or making a rental:
• Name, email address, and phone number
• Payment information (processed securely via our payment partners)
• Identity verification documents (for premium equipment rentals)
• Rental history, preferences, and usage patterns
• Device identifiers and browsing data when using our platform` },
  { title: 'How We Use Your Information', body: `Your information is used to:
• Process and manage equipment rental bookings
• Verify your identity for deposit and liability purposes
• Send rental confirmations, reminders, and receipts
• Improve our equipment catalog and pricing based on usage trends
• Provide customer support and resolve disputes
• Comply with legal obligations and enforce our rental terms` },
  { title: 'Data Sharing & Third Parties', body: `We do not sell your personal data. We share information only with:
• Payment processors (Stripe, MoMo) to complete transactions
• Maintenance technicians for equipment servicing (anonymized records only)
• Legal authorities when required by law
• Service providers who assist in operating our platform under strict data protection agreements
All third parties are bound by confidentiality obligations.` },
  { title: 'Security', body: `We implement industry-standard security measures:
• All data transmitted via 256-bit SSL encryption
• Payment information is tokenized and never stored on our servers
• Regular security audits and penetration testing
• Access to personal data restricted to authorized personnel only
• Incident response plan in place for any potential data breaches` },
  { title: 'Data Retention', body: `We retain your personal data for as long as necessary:
• Active account data: retained for the duration of your account
• Rental records: kept for 3 years for legal and financial compliance
• Payment records: retained per Vietnamese tax law requirements (5 years)
• You may request deletion of your data at any time, subject to legal retention requirements` },
  { title: 'Your Rights', body: `Under applicable data protection law, you have the right to:
• Access a copy of the personal data we hold about you
• Request correction of inaccurate or incomplete data
• Request deletion of your data ("right to be forgotten")
• Object to processing of your data for marketing purposes
• Data portability – receive your data in a structured, machine-readable format
To exercise any of these rights, contact us at privacy@prosport.vn` },
  { title: 'Cookies & Tracking', body: `Our platform uses cookies to:
• Keep you logged in between sessions
• Remember your preferences and cart contents
• Analyze platform usage to improve performance
• Provide relevant recommendations
You may disable cookies in your browser settings, though some features may not function correctly.` },
  { title: 'Contact & Updates', body: `For privacy-related questions or requests:
Email: privacy@prosport.vn
Address: PRO-SPORT Performance Systems, Ho Chi Minh City, Vietnam
We may update this Privacy Policy periodically. Changes will be communicated via email and posted on this page with an updated effective date. Continued use of our platform after changes constitutes acceptance of the updated policy.` },
]

export default function GearPrivacyPage() {
  return (
    <GearLayout>
      <div className="max-w-[820px] mx-auto px-7 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Privacy & Data
          </div>
          <h1 className="font-['Oswald'] text-3xl font-bold text-[#0d2d3a] mb-3">Privacy Policy</h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
            PRO-SPORT is committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights.
          </p>
          <p className="text-xs text-slate-400 mt-3">Effective: June 1, 2026 · Applies to all PRO-SPORT Gear services</p>
        </div>

        {/* Quick nav */}
        <div className="bg-[#f5f9fc] border border-[#e0ecf0] rounded-2xl p-5 mb-8">
          <p className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-wider mb-3">Table of Contents</p>
          <div className="grid grid-cols-2 max-[500px]:grid-cols-1 gap-1.5">
            {sections.map((s, i) => (
              <a key={i} href={`#privacy-${i}`} className="text-[0.82rem] text-[#0d8a8a] no-underline hover:underline flex items-center gap-1.5">
                <span className="text-slate-300">{i + 1}.</span> {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-5">
          {sections.map((s, i) => (
            <div key={i} id={`privacy-${i}`} className="bg-white rounded-2xl border border-[#e0ecf0] p-6">
              <h2 className="font-['Oswald'] text-base font-bold text-[#0d2d3a] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#0d8a8a]/10 text-[#0d8a8a] rounded-lg flex items-center justify-center text-[0.7rem] font-bold shrink-0">{i + 1}</span>
                {s.title}
              </h2>
              <div className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{s.body}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 p-5 bg-[#f5f9fc] border border-[#e0ecf0] rounded-2xl text-sm text-slate-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d8a8a" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p>Questions about this policy? Email <a href="mailto:privacy@prosport.vn" className="text-[#0d8a8a] font-medium hover:underline">privacy@prosport.vn</a> and we'll respond within 48 hours.</p>
        </div>
      </div>
    </GearLayout>
  )
}
