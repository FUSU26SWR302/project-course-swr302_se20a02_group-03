import MobileLayout from '../../layouts/MobileLayout'

export default function MobileProfilePage() {
  return (
    <MobileLayout title="Profile">
      <div className="font-sans -mx-4 -my-5 pb-24">
        {/* Header Profile Info */}
        <div className="bg-[#006070] text-white p-5 pt-8 rounded-b-[32px] text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#006070] to-[#008ba3] rounded-b-[32px]">
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-yellow-500/25 border border-yellow-400 text-yellow-300 text-[0.65rem] font-bold px-2 py-0.5 rounded-full z-10">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Elite Member
            </div>
          </div>
          
          <div className="relative w-20 h-20 mx-auto border-2 border-white/60 rounded-full overflow-hidden shadow-lg mb-3 z-10">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" alt="Alex Mercer" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-lg font-bold z-10 relative mt-2">Alex Mercer</h2>
          <p className="flex items-center justify-center gap-1 text-xs opacity-75 mt-1 z-10 relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            San Francisco, CA
          </p>

          <div className="flex justify-center gap-3 mt-4 mb-1 z-10 relative">
            <button className="bg-white/15 border border-white/30 text-white text-xs font-semibold py-1.5 px-4 rounded-full cursor-pointer hover:bg-white/20">Edit Profile</button>
            <button className="bg-white/10 border border-white/20 text-white p-1.5 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/15">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 px-4 -mt-5 mb-6 z-20 relative">
          <div className="bg-white rounded-xl p-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col border border-slate-100">
            <span className="text-[0.62rem] font-bold tracking-wider text-slate-400">MATCHES</span>
            <span className="text-sm font-extrabold text-slate-800 mt-1">142</span>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col border border-slate-100">
            <span className="text-[0.62rem] font-bold tracking-wider text-slate-400">WIN RATE</span>
            <span className="text-sm font-extrabold text-slate-800 mt-1">68%</span>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col border border-sky-200 bg-sky-50/50">
            <span className="text-[0.62rem] font-bold tracking-wider text-slate-400">SKILL LEVEL</span>
            <span className="text-sm font-extrabold text-slate-800 mt-1">4.2</span>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col border border-yellow-200 bg-yellow-50/50">
            <span className="text-[0.62rem] font-bold tracking-wider text-slate-400">POINTS</span>
            <span className="text-sm font-extrabold text-slate-800 mt-1">8.5k</span>
          </div>
        </div>

        {/* Recent Matches */}
        <div className="px-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-slate-900">Recent Matches</h3>
            <span className="text-xs font-semibold text-[#008ba3] cursor-pointer">View All</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center bg-white p-3 rounded-xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex flex-col items-center justify-center text-slate-600 mr-3">
                <span className="text-[0.6rem] font-bold tracking-wider">OCT</span>
                <span className="text-sm font-bold mt-0.5">24</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800">Singles vs. David Kim</h4>
                <p className="text-[0.72rem] text-slate-500">Downtown Sports Center • Court 2</p>
                <div className="text-[0.72rem] font-semibold mt-1 px-1.5 py-0.5 rounded w-fit bg-green-100 text-green-700">W 6-4, 6-2</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>

            <div className="flex items-center bg-white p-3 rounded-xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex flex-col items-center justify-center text-slate-600 mr-3">
                <span className="text-[0.6rem] font-bold tracking-wider">OCT</span>
                <span className="text-sm font-bold mt-0.5">18</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800">Doubles Exhibition</h4>
                <p className="text-[0.72rem] text-slate-500">Bay Area Tennis Club • Center Court</p>
                <div className="text-[0.72rem] font-semibold mt-1 px-1.5 py-0.5 rounded w-fit bg-red-100 text-red-700">L 4-6, 5-7</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="px-4 mb-6">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Achievements</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="min-w-[110px] bg-white rounded-xl p-3 text-center border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-600"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c0 0-4 3-4 8 0 2.2 1.8 4 4 4s4-1.8 4-4c0-5-4-8-4-8z"/><path d="M12 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg></div>
              <p className="text-[0.72rem] font-semibold text-slate-800">10 Win Streak</p>
              <p className="text-[0.62rem] font-bold text-green-600 tracking-wide">UNLOCKED</p>
            </div>
            <div className="min-w-[110px] bg-white rounded-xl p-3 text-center border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-100 text-blue-600"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></div>
              <p className="text-[0.72rem] font-semibold text-slate-800">Tournament Pro</p>
              <p className="text-[0.62rem] font-bold text-green-600 tracking-wide">UNLOCKED</p>
            </div>
            <div className="min-w-[110px] bg-white rounded-xl p-3 text-center border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col items-center gap-1.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 text-slate-600"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <p className="text-[0.72rem] font-semibold text-slate-800">Social Butterfly</p>
              <p className="text-[0.62rem] font-bold text-green-600 tracking-wide">UNLOCKED</p>
            </div>
          </div>
        </div>

        {/* Wallet Summary */}
        <div className="mx-4 bg-slate-900 rounded-2xl p-5 text-white shadow-md mb-6 relative overflow-hidden">
          <div className="flex items-center gap-2 text-sm font-semibold opacity-75">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            Wallet
          </div>
          <div className="mt-4 mb-5">
            <p className="text-[0.62rem] font-bold tracking-wider opacity-60">AVAILABLE BALANCE</p>
            <h2 className="font-['Oswald'] text-2xl font-bold mt-1 text-white">$240.50</h2>
          </div>
          
          <div className="flex flex-col gap-2.5 mb-5">
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center bg-yellow-500/20 text-yellow-300"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg></div>
              <div style={{ flex: 1 }}>
                <p className="text-xs font-semibold text-white">Pro Shop Discount</p>
                <p className="text-[0.65rem] opacity-50">Expires in 3 days</p>
              </div>
              <span className="text-xs font-bold text-yellow-300">-15%</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center bg-cyan-500/20 text-cyan-300"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
              <div style={{ flex: 1 }}>
                <p className="text-xs font-semibold text-white">Free Court Hour</p>
                <p className="text-[0.65rem] opacity-50">Valid at Main St. Club</p>
              </div>
              <span className="text-xs font-bold text-cyan-300">1x</span>
            </div>
          </div>
          
          <button className="w-full bg-[#00c2ff] text-white border-none py-2.5 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#00ace6]">Add Funds</button>
        </div>

        {/* Menu Items */}
        <div className="mx-4 bg-white rounded-xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col divide-y divide-slate-100 mb-6">
          <div className="flex items-center gap-3.5 py-4 px-4 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="flex-1 font-semibold">Account Details</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <div className="flex items-center gap-3.5 py-4 px-4 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            <span className="flex-1 font-semibold">Payment Methods</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <div className="flex items-center gap-3.5 py-4 px-4 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span className="flex-1 font-semibold">Notifications</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        </div>

      </div>
    </MobileLayout>
  )
}
