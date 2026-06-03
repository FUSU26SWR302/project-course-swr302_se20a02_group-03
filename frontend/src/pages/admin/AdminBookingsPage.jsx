import AdminLayout from '../../layouts/AdminLayout'

const bookings = [
  { id: '#BKG-8401', customer: { initials: 'MJ', name: 'Marcus Johnson', sub: '+1 (555) 019-2834', color: '#0ea5e9' }, court: { name: 'Center Court', sub: 'Hardcourt' }, date: 'Oct 24, 2023', time: '10:00 AM - 11:30 AM', payment: 'PAID', status: 'CONFIRMED' },
  { id: '#BKG-8402', customer: { initials: 'SW', name: 'Sarah Williams', sub: 'sarah.w@example.com', color: '#64748b' }, court: { name: 'Court 2', sub: 'Clay' }, date: 'Oct 24, 2023', time: '12:00 PM - 02:00 PM', payment: 'PENDING', status: 'CONFIRMED' },
  { id: '#BKG-8403', customer: { initials: 'DT', name: 'David Torres', sub: 'Member: Gold', color: '#d97706' }, court: { name: 'Court 1', sub: 'Hardcourt' }, date: 'Oct 24, 2023', time: '08:00 AM - 09:30 AM', payment: 'PAID', status: 'CHECKED-IN' },
  { id: '#BKG-8399', customer: { initials: 'EL', name: 'Elena Lopez', sub: 'Guest', color: '#cbd5e1' }, court: { name: 'Center Court', sub: '' }, date: 'Oct 23, 2023', time: '06:00 PM - 08:00 PM', payment: 'REFUNDED', status: 'CANCELLED' },
]

const paymentStyles = {
  PAID: 'bg-[#38bdf8] text-white',
  PENDING: 'bg-amber-500 text-white',
  REFUNDED: 'bg-red-300 text-white',
}

const statusStyles = {
  CONFIRMED: 'bg-indigo-100 text-indigo-600',
  'CHECKED-IN': 'bg-[#0d8a8a] text-white',
  CANCELLED: 'bg-slate-200 text-slate-500',
}

export default function AdminBookingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Booking Management</h1>
            <p className="text-sm text-slate-500">Manage court reservations, monitor statuses, and process payments.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-white border border-slate-200 rounded-md overflow-hidden">
              <button className="flex items-center gap-[6px] py-2 px-4 bg-slate-100 border-none text-sm font-semibold text-slate-900 cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                List
              </button>
              <button className="flex items-center gap-[6px] py-2 px-4 bg-transparent border-none text-sm font-medium text-slate-500 cursor-pointer hover:bg-slate-50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Timeline
              </button>
            </div>
            <button className="bg-[#0d8a8a] hover:bg-[#0b7373] text-white border-none rounded-md py-2.5 px-4 text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all">
              + Manual Booking
            </button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#e0f2fe', color: '#0ea5e9' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <span className="bg-slate-100 text-slate-600 text-xs font-semibold py-1 px-2 rounded">Today</span>
            </div>
            <p className="font-['Oswald'] text-[2.5rem] font-bold text-slate-900 leading-none mb-2">42</p>
            <p className="text-sm text-slate-500">Total Active Bookings</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#f1f5f9', color: '#64748b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
            </div>
            <p className="font-['Oswald'] text-[2.5rem] font-bold text-slate-900 leading-none mb-2">85<span style={{ fontSize: '1.25rem' }}>%</span></p>
            <p className="text-sm text-slate-500">Peak Court Utilization</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#fef3c7', color: '#d97706' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              </div>
            </div>
            <p className="font-['Oswald'] text-[2.5rem] font-bold text-slate-900 leading-none mb-2">8</p>
            <p className="text-sm text-slate-500">Pending Payments Action Required</p>
          </div>
        </div>

        {/* Table Area */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="flex justify-between items-center py-4 px-5 border-b border-slate-200 bg-white">
            <div className="flex gap-3">
              <select className="border border-slate-200 rounded-md py-2 px-3 font-['Inter'] text-sm text-slate-900 outline-none bg-white">
                <option>All Courts</option>
              </select>
              <div className="flex items-center gap-2 border border-slate-200 rounded-md py-2 px-3 bg-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <input type="text" placeholder="mm/dd/yyyy" className="border-none outline-none font-['Inter'] text-sm text-slate-900 w-[100px]" />
              </div>
            </div>
            <button className="flex items-center gap-2 bg-transparent border-none text-slate-500 text-sm font-semibold cursor-pointer hover:text-[#0d8a8a]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export CSV
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Court</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((b, i) => (
                <tr key={i} className="hover:bg-slate-50/55 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-slate-500">{b.id}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: b.customer.color }}>{b.customer.initials}</div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{b.customer.name}</p>
                        <p className="text-xs text-slate-500">{b.customer.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="font-semibold text-slate-900 text-sm">{b.court.name}</p>
                    {b.court.sub && <p className="text-xs text-slate-500">{b.court.sub}</p>}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="font-semibold text-slate-900 text-sm">{b.date}</p>
                    <p className="text-xs text-slate-500">{b.time}</p>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-block py-1 px-3 rounded-full text-xs font-bold ${paymentStyles[b.payment] || ''}`}>{b.payment}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`inline-block py-1 px-3 rounded text-xs font-bold ${statusStyles[b.status] || ''}`}>{b.status}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <button className="bg-transparent border-none text-[1.2rem] text-slate-400 hover:text-slate-600 cursor-pointer">...</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center py-4 px-5 border-t border-slate-200 bg-white">
            <span className="text-sm text-slate-500">Showing 1 to 4 of 42 entries</span>
            <div className="flex gap-1">
              <button className="w-8 h-8 border-none bg-transparent rounded text-sm text-slate-500 cursor-pointer hover:bg-slate-100">&lt;</button>
              <button className="w-8 h-8 border-none rounded text-sm cursor-pointer bg-[#0d8a8a] text-white font-semibold">1</button>
              <button className="w-8 h-8 border-none bg-transparent rounded text-sm text-slate-500 cursor-pointer hover:bg-slate-100">2</button>
              <button className="w-8 h-8 border-none bg-transparent rounded text-sm text-slate-500 cursor-pointer hover:bg-slate-100">3</button>
              <span className="flex items-center justify-center w-8 text-slate-400">...</span>
              <button className="w-8 h-8 border-none bg-transparent rounded text-sm text-slate-500 cursor-pointer hover:bg-slate-100">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
