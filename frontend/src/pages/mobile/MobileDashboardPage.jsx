import MobileLayout from '../../layouts/MobileLayout'

export default function MobileDashboardPage() {
  return (
    <MobileLayout>
      <div className="font-sans -mx-4 -my-5 pb-24 bg-[#0d161d] text-white min-h-screen">
        
        {/* Welcome */}
        <div className="p-5 pt-8">
          <h1 className="text-lg font-bold text-white">Ready for your next set, <span className="text-[#00c2ff]">Alex?</span></h1>
          <p className="text-xs text-slate-400 mt-1">Your upcoming schedule and stats.</p>
        </div>

        {/* Upcoming Booking */}
        <div className="px-5 mb-6">
          <h3 className="text-[0.65rem] font-bold tracking-wider text-slate-500 mb-3 block">UPCOMING BOOKING</h3>
          <div className="bg-[#13222d] border border-white/5 rounded-2xl p-4 flex flex-col gap-4 shadow-lg">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#00c2ff]/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00c2ff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <h4 className="text-sm font-bold text-white">Center Court 1</h4>
                <p className="flex items-center gap-1 text-[0.75rem] text-slate-400 mt-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Today, 10:00 AM - 11:30 AM</p>
                <p className="flex items-center gap-1 text-[0.75rem] text-slate-400 mt-0.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> w/ Sarah Jenkins</p>
              </div>
              <span className="bg-green-500/20 text-green-400 text-[0.62rem] font-extrabold px-2 py-0.5 rounded h-fit">CONFIRMED</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-[#00c2ff] text-slate-900 border-none rounded-lg py-2.5 text-xs font-bold hover:bg-[#00ace6] cursor-pointer">Manage Booking</button>
              <button className="w-10 h-10 rounded-lg bg-white/5 border-none flex items-center justify-center text-slate-300 hover:bg-white/10 cursor-pointer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 px-5 mb-6">
          <div className="bg-[#13222d] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-[#1a2d3b]">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#00c2ff]/10 text-[#00c2ff]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h4v4H4z"/><path d="M16 4h4v4h-4z"/><path d="M4 16h4v4H4z"/><path d="M16 16h4v4h-4z"/><path d="M10 10h4v4h-4z"/></svg>
            </div>
            <span className="text-[0.78rem] font-semibold text-slate-300">Scan QR Access</span>
          </div>
          <div className="bg-[#13222d] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-[#1a2d3b]">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-500/10 text-yellow-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <span className="text-[0.78rem] font-semibold text-slate-300">Book Court</span>
          </div>
        </div>

        {/* Match Recommendations */}
        <div className="px-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[0.65rem] font-bold tracking-wider text-slate-500 block">MATCH RECOMMENDATIONS</h3>
            <span className="text-xs font-semibold text-[#00c2ff] cursor-pointer">See All</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            <div className="min-w-[200px] h-[150px] rounded-2xl overflow-hidden relative border border-white/5 shadow-md bg-[url('https://images.unsplash.com/photo-1622227432807-91eb590c31ab?w=400&q=80')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 p-4 flex flex-col justify-end text-white">
                <span className="text-[0.62rem] font-bold text-[#00c2ff] tracking-wide mb-1.5">Level 3.5 - 4.0</span>
                <h4 className="text-xs font-bold text-white">Doubles Mixer</h4>
                <p className="flex items-center gap-1 text-[0.65rem] text-slate-400 mt-0.5"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Northside Club</p>
                <div className="flex justify-between items-center mt-2.5">
                  <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80" alt="P" className="w-5 h-5 rounded-full border border-slate-900 -mr-1.5 object-cover" />
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80" alt="P" className="w-5 h-5 rounded-full border border-slate-900 -mr-1.5 object-cover" />
                    <span className="bg-slate-800 text-slate-400 text-[0.6rem] font-bold py-0.5 px-1.5 rounded-full ml-2">+2</span>
                  </div>
                  <button className="bg-transparent border-none text-[#00c2ff] text-xs font-bold cursor-pointer hover:underline">Join</button>
                </div>
              </div>
            </div>

            <div className="min-w-[200px] h-[150px] rounded-2xl overflow-hidden relative border border-white/5 shadow-md bg-[url('https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&q=80')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 p-4 flex flex-col justify-end text-white">
                <span className="text-[0.62rem] font-bold text-yellow-400 tracking-wide mb-1.5">Open Level</span>
                <h4 className="text-xs font-bold text-white">Pickleball Practice</h4>
                <p className="flex items-center gap-1 text-[0.65rem] text-slate-400 mt-0.5"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Downtown Arena</p>
                <div className="flex justify-between items-center mt-2.5">
                  <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&q=80" alt="P" className="w-5 h-5 rounded-full border border-slate-900 -mr-1.5 object-cover" />
                    <span className="bg-slate-800 text-slate-400 text-[0.6rem] font-bold py-0.5 px-1.5 rounded-full ml-2">+1</span>
                  </div>
                  <button className="bg-transparent border-none text-[#00c2ff] text-xs font-bold cursor-pointer hover:underline">Join</button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </MobileLayout>
  )
}
