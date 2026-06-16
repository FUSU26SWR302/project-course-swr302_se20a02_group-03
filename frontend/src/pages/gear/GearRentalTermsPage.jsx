import GearLayout from '../../layouts/GearLayout'

const sections = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    title: 'Rental Duration & Booking',
    items: [
      'Rentals are available in hourly increments with a minimum of 1 hour.',
      'Advance bookings can be made up to 14 days prior to the desired rental date.',
      'Same-day bookings are subject to equipment availability.',
      'Rental periods begin at the scheduled pickup time regardless of actual pickup.',
      'Extensions must be requested at least 30 minutes before the rental period ends.',
    ],
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    title: 'Pricing & Deposits',
    items: [
      'Rental rates are charged per hour as listed in the Equipment Catalog.',
      'A refundable security deposit is required for all premium equipment (Rackets, Golf Sets, etc.).',
      'Deposits are returned within 24 hours after verified equipment return.',
      'Deposits may be partially or fully forfeited in cases of damage or late return.',
      'All prices are inclusive of applicable taxes and handling fees.',
    ],
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Equipment Condition & Care',
    items: [
      'All equipment is inspected and sanitized before each rental.',
      'Renters must inspect equipment at pickup and report any pre-existing damage immediately.',
      'Equipment must be returned in the same condition as received.',
      'Renters are responsible for any damage caused during the rental period.',
      'Food, beverages, and liquids should be kept away from all rented equipment.',
    ],
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Returns & Late Fees',
    items: [
      'Equipment must be returned by the end of the agreed rental period.',
      'Late returns are charged at 1.5x the standard hourly rate for each additional hour.',
      'Equipment not returned within 4 hours of the due time is considered unreturned.',
      'Unreturned equipment will result in a full replacement charge plus a $50 administrative fee.',
      'Please report delays proactively to avoid additional charges.',
    ],
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    title: 'Cancellation Policy',
    items: [
      'Cancellations made 24+ hours before the rental start time receive a full refund.',
      'Cancellations made 2–24 hours before receive a 50% refund of the rental fee.',
      'Cancellations within 2 hours of the rental start time are non-refundable.',
      'PRO-SPORT reserves the right to cancel rentals due to equipment unavailability with full refund.',
      'No-shows forfeit the full rental fee and deposit.',
    ],
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    title: 'Liability & Insurance',
    items: [
      'PRO-SPORT is not liable for personal injury resulting from improper equipment use.',
      'Renters assume full responsibility for safe and proper use of all rented equipment.',
      'We recommend wearing appropriate protective gear at all times.',
      'PRO-SPORT equipment is covered by our internal maintenance insurance for manufacturing defects only.',
      'Personal accident insurance for renters is available for purchase at the front desk.',
    ],
  },
]

export default function GearRentalTermsPage() {
  return (
    <GearLayout>
      <div className="max-w-[820px] mx-auto px-7 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#0d8a8a]/10 text-[#0d8a8a] text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Legal Document
          </div>
          <h1 className="font-['Oswald'] text-3xl font-bold text-[#0d2d3a] mb-3">Equipment Rental Terms</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Please read these terms carefully before renting equipment from PRO-SPORT. By proceeding with a rental, 
            you agree to be bound by the following terms and conditions.
          </p>
          <p className="text-xs text-slate-400 mt-3">Last updated: June 1, 2026 · Effective immediately</p>
        </div>

        {/* Quick summary */}
        <div className="bg-[#0d8a8a] rounded-2xl p-6 mb-8 text-white">
          <h2 className="font-['Oswald'] text-lg font-bold mb-3 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Quick Summary
          </h2>
          <div className="grid grid-cols-3 max-[600px]:grid-cols-1 gap-4 text-sm">
            {[
              { label: 'Min. Rental', value: '1 hour' },
              { label: 'Cancellation (free)', value: '24h before' },
              { label: 'Late fee', value: '1.5× rate/hr' },
              { label: 'Deposit return', value: '< 24 hours' },
              { label: 'Advance booking', value: 'Up to 14 days' },
              { label: 'Support', value: '8:00 – 22:00' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-xl px-4 py-3">
                <p className="text-white/70 text-[0.7rem] uppercase tracking-wider">{item.label}</p>
                <p className="font-bold text-base mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((sec, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#e0ecf0] overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[#f0f4f8] bg-[#f9fbfc]">
                <span className="text-[#0d8a8a]">{sec.icon}</span>
                <h2 className="font-['Oswald'] text-base font-bold text-[#0d2d3a]">{i + 1}. {sec.title}</h2>
              </div>
              <ul className="px-6 py-5 flex flex-col gap-3">
                {sec.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a8a] mt-2 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
          <p className="font-semibold mb-1">📋 Agreement</p>
          <p className="leading-relaxed">By completing a rental transaction at PRO-SPORT, you acknowledge that you have read, understood, and agree to all terms outlined above. PRO-SPORT reserves the right to update these terms with 7 days' notice.</p>
        </div>
      </div>
    </GearLayout>
  )
}
