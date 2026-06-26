import EliteLayout from '../../layouts/EliteLayout'

export default function EliteDashboardPage() {
  return (
    <EliteLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Overview</h1>
            <p className="text-sm text-slate-500">Today's operational metrics and active tasks.</p>
          </div>
        </div>

        <div className="grid grid-cols-4 max-[1200px]:grid-cols-2 gap-6">
          {/* Stats Cards */}
          <div className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col">
            <div className="absolute top-2.5 -right-2.5 opacity-60">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f1f5f9" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div className="flex justify-between items-center mb-6 relative z-[1]">
              <span className="text-[0.75rem] font-bold text-slate-500 tracking-[0.05em]">COURT OCCUPANCY</span>
              <span className="flex items-center gap-1 bg-green-100 text-green-900 px-2.5 py-1.5 rounded-full text-[0.75rem] font-bold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                12%
              </span>
            </div>
            <h2 className="font-['Oswald'] text-[3.5rem] font-bold text-slate-950 leading-none mb-2 relative z-[1]">84%</h2>
            <p className="text-sm text-slate-500 relative z-[1]">11 of 13 courts active</p>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col">
            <div className="absolute top-2.5 -right-2.5 opacity-60">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f1f5f9" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <div className="flex justify-between items-center mb-6 relative z-[1]">
              <span className="text-[0.75rem] font-bold text-slate-500 tracking-[0.05em]">ACTIVE RENTALS</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-blue-500"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg></div>
            </div>
            <h2 className="font-['Oswald'] text-[3.5rem] font-bold text-slate-950 leading-none mb-2 relative z-[1]">42</h2>
            <p className="text-sm text-slate-500 relative z-[1]">Items currently out</p>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col">
            <div className="absolute top-2.5 -right-2.5 opacity-60">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#f1f5f9" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </div>
            <div className="flex justify-between items-center mb-6 relative z-[1]">
              <span className="text-[0.75rem] font-bold text-slate-500 tracking-[0.05em]">DAILY REVENUE</span>
              <span className="flex items-center gap-1 bg-green-100 text-green-900 px-2.5 py-1.5 rounded-full text-[0.75rem] font-bold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                5%
              </span>
            </div>
            <h2 className="font-['Oswald'] text-[3.5rem] font-bold text-slate-950 leading-none mb-2 relative z-[1]">$4.2k</h2>
            <p className="text-sm text-slate-500 relative z-[1]">As of 2:30 PM</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h3 className="text-[1.125rem] font-bold text-slate-900 mb-5">Quick Actions</h3>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[calc(100%-44px)]">
              <button className="bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all p-4 text-sm font-semibold text-slate-800 hover:bg-white hover:border-[#00c2ff] hover:shadow-[0_4px_12px_rgba(0,194,255,0.1)]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#00c2ff] text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                </div>
                New Booking
              </button>
              <button className="bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all p-4 text-sm font-semibold text-slate-800 hover:bg-white hover:border-[#00c2ff] hover:shadow-[0_4px_12px_rgba(0,194,255,0.1)]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-200 text-slate-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>
                </div>
                Scan QR
              </button>
              <button className="bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all p-4 text-sm font-semibold text-slate-800 hover:bg-white hover:border-[#00c2ff] hover:shadow-[0_4px_12px_rgba(0,194,255,0.1)]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-amber-500 text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                New Rental
              </button>
              <button className="bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all p-4 text-sm font-semibold text-slate-800 hover:bg-white hover:border-[#00c2ff] hover:shadow-[0_4px_12px_rgba(0,194,255,0.1)]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-100 text-red-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
                </div>
                Return Equip
              </button>
            </div>
          </div>
        </div>
      </div>
    </EliteLayout>
  )
}
