import AdminLayout from '../../layouts/AdminLayout'

export default function AdminCourtsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Court Management</h1>
            <p className="text-sm text-slate-500">Overview and scheduling of all facilities.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-slate-200 text-slate-800 py-2 px-4 rounded-md text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:bg-slate-50 hover:border-slate-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Schedule Maintenance
            </button>
            <button className="bg-white border border-slate-200 text-slate-800 py-2 px-4 rounded-md text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:bg-slate-50 hover:border-slate-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Edit Pricing
            </button>
            <button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white border-none rounded-md py-2.5 px-4 text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all">
              + Add New Court
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[240px_1fr] gap-6 items-start max-md:grid-cols-1">
          {/* Filters Sidebar */}
          <div>
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <h3 className="text-xs font-bold text-slate-500 tracking-[0.05em] mb-4">SPORT TYPE</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-[10px] text-sm text-slate-900 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#0d8a8a]" />
                  Cầu lông
                </label>
                <label className="flex items-center gap-[10px] text-sm text-slate-900 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer accent-[#0d8a8a]" />
                  Pickleball
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] mt-4">
              <h3 className="text-xs font-bold text-slate-500 tracking-[0.05em] mb-4">STATUS</h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-[10px] text-sm text-slate-900 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#0d8a8a]" />
                  <span className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }}></span>
                  Available
                </label>
                <label className="flex items-center gap-[10px] text-sm text-slate-900 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#0d8a8a]" />
                  <span className="w-2 h-2 rounded-full" style={{ background: '#0f172a' }}></span>
                  Booked
                </label>
                <label className="flex items-center gap-[10px] text-sm text-slate-900 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#0d8a8a]" />
                  <span className="w-2 h-2 rounded-full" style={{ background: '#f59e0b' }}></span>
                  Maintenance
                </label>
                <label className="flex items-center gap-[10px] text-sm text-slate-900 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer accent-[#0d8a8a]" />
                  <span className="w-2 h-2 rounded-full" style={{ background: '#ef4444' }}></span>
                  Closed
                </label>
              </div>
            </div>
          </div>

          {/* Courts Grid */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
              <div className="relative h-[140px]">
                <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=80" alt="Tennis Court" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 right-3 flex justify-between">
                  <span className="flex items-center gap-1 py-1 px-[10px] rounded-full text-[0.65rem] font-bold tracking-[0.05em] bg-white text-slate-900"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/></svg>CẦU LÔNG</span>
                  <span className="flex items-center gap-1 py-1 px-[10px] rounded-full text-[0.65rem] font-bold tracking-[0.05em] bg-green-500 text-white">AVAILABLE</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-slate-900 mb-[6px]">Sân Cầu lông Trung tâm</h2>
                <p className="flex items-center gap-[6px] text-[0.8125rem] text-slate-500 mb-6"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Main Pavilion, East Wing</p>
                
                <div className="mt-auto mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-slate-500">Next Booking</span>
                    <span className="text-sm font-semibold text-slate-900">14:00 - 15:30</span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded overflow-hidden"><div className="h-full rounded" style={{ width: '30%', background: '#0ea5e9' }}></div></div>
                </div>

                <button className="w-full py-[10px] rounded-md text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all bg-[#0ea5e9] text-white border-none hover:bg-[#0284c7]">Quick Book</button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
              <div className="relative h-[140px]">
                <img src="https://images.unsplash.com/photo-1622227432807-91eb590c31ab?w=600&q=80" alt="Padel Court" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 right-3 flex justify-between">
                  <span className="flex items-center gap-1 py-1 px-[10px] rounded-full text-[0.65rem] font-bold tracking-[0.05em] bg-white text-slate-900"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/></svg>PICKLEBALL</span>
                  <span className="flex items-center gap-1 py-1 px-[10px] rounded-full text-[0.65rem] font-bold tracking-[0.05em] bg-[#0f172a] text-white">BOOKED</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-slate-900 mb-[6px]">Sân Pickleball A</h2>
                <p className="flex items-center gap-[6px] text-[0.8125rem] text-slate-500 mb-6"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Indoor Complex, Sector 2</p>
                
                <div className="mt-auto mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-slate-500">Current Session</span>
                    <span className="text-sm font-semibold text-slate-900">09:00 - 11:00</span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded overflow-hidden"><div className="h-full rounded" style={{ width: '60%', background: '#0f172a' }}></div></div>
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" alt="Sarah" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Sarah Jenkins</p>
                    <p className="text-xs text-slate-500">Pro Member</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
              <div className="relative h-[140px]">
                <img src="https://images.unsplash.com/photo-1542144610-092591748259?w=600&q=80" alt="Clay Court" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 right-3 flex justify-between">
                  <span className="flex items-center gap-1 py-1 px-[10px] rounded-full text-[0.65rem] font-bold tracking-[0.05em] bg-white text-slate-900"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/></svg>CẦU LÔNG</span>
                  <span className="flex items-center gap-1 py-1 px-[10px] rounded-full text-[0.65rem] font-bold tracking-[0.05em] bg-amber-500 text-white">MAINTENANCE</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-lg font-bold text-slate-900 mb-[6px]">Sân Cầu lông VIP</h2>
                <p className="flex items-center gap-[6px] text-[0.8125rem] text-slate-500 mb-6"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>South Gardens</p>
                
                <div className="mt-auto mb-5 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Task</span>
                    <span className="text-[0.8125rem] text-slate-900">Surface Reshaping</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Est. Completion</span>
                    <span className="text-[0.8125rem] text-slate-900" style={{ color: '#d97706', fontWeight: 600 }}>Today, 17:00</span>
                  </div>
                </div>

                <button className="w-full py-[10px] rounded-md text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all bg-white border border-slate-200 text-slate-900 hover:bg-[#f8fafc]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/></svg>
                  Update Status
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
