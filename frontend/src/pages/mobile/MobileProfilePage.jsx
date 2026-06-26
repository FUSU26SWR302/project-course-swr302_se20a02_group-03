import MobileLayout from '../../layouts/MobileLayout'

export default function MobileProfilePage() {
  return (
    <MobileLayout title="Profile">
      <div className="font-sans pb-12 flex flex-col gap-8">
        
        {/* Header Profile Info - Minimal & Clean */}
        <div className="pt-6 px-4 text-center flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" 
              alt="Alex Mercer" 
              className="w-full h-full object-cover rounded-2xl shadow-sm border border-slate-200/50" 
            />
            <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg border-2 border-white flex items-center gap-1 shadow-sm">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              PRO
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Alex Mercer</h2>
          <p className="flex items-center justify-center gap-1.5 text-sm text-slate-500 mt-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            San Francisco, CA
          </p>

          <div className="flex gap-3 mt-5 w-full">
            <button className="flex-1 bg-slate-900 text-white text-sm font-semibold py-3 rounded-xl transition-all active:scale-[0.98]">
              Edit Profile
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-xl transition-all active:bg-slate-50">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
          </div>
        </div>

        {/* Stats Grid - Bento Style */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col">
              <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">Matches</span>
              <span className="text-2xl font-bold tracking-tight text-slate-900 mt-1">142</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col">
              <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">Win Rate</span>
              <span className="text-2xl font-bold tracking-tight text-slate-900 mt-1">68%</span>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-col">
              <span className="text-[11px] font-semibold tracking-wider text-blue-600 uppercase">Skill Level</span>
              <span className="text-2xl font-bold tracking-tight text-blue-900 mt-1">4.2</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-col">
              <span className="text-[11px] font-semibold tracking-wider text-emerald-600 uppercase">Points</span>
              <span className="text-2xl font-bold tracking-tight text-emerald-900 mt-1">8.5k</span>
            </div>
          </div>
        </div>

        {/* Recent Matches */}
        <div className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold tracking-tight text-slate-900">Recent Matches</h3>
            <span className="text-sm font-semibold text-slate-500 cursor-pointer hover:text-slate-900 transition-colors">View All</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-slate-700 mr-4 shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Oct</span>
                <span className="text-lg font-bold leading-tight">24</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">Đơn Nam vs. David Kim</h4>
                <p className="text-xs text-slate-500 mt-0.5 truncate">Pro-Sport Center • Sân 2</p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  W 21-15, 21-18
                </div>
              </div>
            </div>

            <div className="flex items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-slate-700 mr-4 shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Oct</span>
                <span className="text-lg font-bold leading-tight">18</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">Giao hữu Pickleball Đôi</h4>
                <p className="text-xs text-slate-500 mt-0.5 truncate">Sài Gòn Arena • Sân VIP</p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded-md bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                  L 9-11, 11-8, 7-11
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements - Minimal scrolling cards */}
        <div className="pl-4">
          <h3 className="text-base font-bold tracking-tight text-slate-900 mb-4">Achievements</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="min-w-[140px] bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-50 text-amber-500 border border-amber-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c0 0-4 3-4 8 0 2.2 1.8 4 4 4s4-1.8 4-4c0-5-4-8-4-8z"/><path d="M12 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">10 Win Streak</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Unlocked</p>
              </div>
            </div>
            
            <div className="min-w-[140px] bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-500 border border-indigo-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Tournament Pro</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Unlocked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Summary - Premium Dark Card */}
        <div className="px-4">
          <div className="bg-slate-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            {/* Subtle background glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-slate-800 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative z-10 flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                Wallet Balance
              </div>
            </div>
            
            <div className="relative z-10 mb-8">
              <h2 className="text-4xl font-bold tracking-tight text-white">$240.50</h2>
            </div>
            
            <div className="relative z-10 space-y-3 mb-6 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg></div>
                  <div>
                    <p className="text-sm font-medium text-white">Pro Shop Discount</p>
                    <p className="text-xs text-slate-400 mt-0.5">Expires in 3 days</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-white">-15%</span>
              </div>
            </div>
            
            <button className="relative z-10 w-full bg-white text-slate-950 py-3.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98]">
              Add Funds
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {['Account Details', 'Payment Methods', 'Notifications'].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:border-slate-200 transition-colors">
                  {i === 0 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  {i === 1 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
                  {i === 2 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
                </div>
                <span className="flex-1 text-sm font-semibold text-slate-700">{item}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 group-hover:translate-x-0.5 transition-transform"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            ))}
          </div>
        </div>

      </div>
    </MobileLayout>
  )
}
