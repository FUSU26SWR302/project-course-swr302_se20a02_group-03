import MobileLayout from '../../layouts/MobileLayout'

export default function MobileHomePage() {
  return (
    <MobileLayout>
      <div className="font-sans -mx-4 -my-5">
        
        {/* Hero Banner */}
        <div className="p-4">
          <div className="relative rounded-2xl overflow-hidden h-[180px]">
            <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=80" alt="Tennis Court" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-5 text-white">
              <span className="bg-red-500 text-white text-[0.65rem] font-extrabold px-2 py-1 rounded self-start mb-2">LIVE NOW</span>
              <span className="text-xs font-semibold mb-0.5">City Open 2024</span>
              <h2 className="text-2xl font-bold mb-1">Quarter Finals</h2>
              <p className="text-[0.8125rem] opacity-90">Watch live or join the conversation.</p>
            </div>
          </div>
        </div>

        <div className="px-4 pb-20">
          {/* Search */}
          <div className="flex items-center bg-white border border-slate-200 rounded-full py-3 px-4 gap-3 mb-5 focus-within:border-[#006070]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Find players, groups, or courts..." className="border-none bg-transparent w-full text-sm outline-none text-slate-800 placeholder:text-slate-400" />
          </div>

          {/* Filters */}
          <div className="flex gap-3 overflow-x-auto pb-3 mb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <button className="whitespace-nowrap py-2 px-4 rounded-full bg-[#006070] text-white border border-[#006070] text-sm font-medium cursor-pointer">Cầu lông</button>
            <button className="whitespace-nowrap py-2 px-4 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-500 cursor-pointer hover:bg-slate-50">Pickleball</button>
          </div>

          {/* Active Groups */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Active Groups</h3>
              <span className="text-xs font-semibold text-[#008ba3] cursor-pointer">View All</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center bg-white p-3 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-slate-100">
                <img src="https://images.unsplash.com/photo-1622227432807-91eb590c31ab?w=100&q=80" alt="Group" className="w-[60px] h-[60px] rounded-xl object-cover mr-4" />
                <div className="flex-1">
                  <h4 className="text-[0.95rem] font-bold text-slate-900">Northside Pickleball Pros</h4>
                  <p className="text-xs text-slate-500 mb-2">42 members • Advanced</p>
                  <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&q=80" alt="A" className="w-5 h-5 rounded-full border border-white -mr-1.5 object-cover" />
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&q=80" alt="A" className="w-5 h-5 rounded-full border border-white -mr-1.5 object-cover" />
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80" alt="A" className="w-5 h-5 rounded-full border border-white -mr-1.5 object-cover" />
                    <span className="bg-slate-200 text-slate-600 text-[0.6rem] font-bold py-0.5 px-1.5 rounded-full ml-2">+39</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>

              <div className="flex items-center bg-white p-3 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-slate-100">
                <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=100&q=80" alt="Group" className="w-[60px] h-[60px] rounded-xl object-cover mr-4" />
                <div className="flex-1">
                  <h4 className="text-[0.95rem] font-bold text-slate-900">Downtown Cầu lông Club</h4>
                  <p className="text-xs text-slate-500 mb-2">128 members • All Levels</p>
                  <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&q=80" alt="A" className="w-5 h-5 rounded-full border border-white -mr-1.5 object-cover" />
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80" alt="A" className="w-5 h-5 rounded-full border border-white -mr-1.5 object-cover" />
                    <span className="bg-slate-200 text-slate-600 text-[0.6rem] font-bold py-0.5 px-1.5 rounded-full ml-2">+126</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
            </div>
          </section>

          {/* Nearby Players */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Nearby Players</h3>
              <span className="flex items-center gap-1 text-xs text-slate-500"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> 5km</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="min-w-[220px] bg-white rounded-2xl p-5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col border border-slate-100">
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Alex" className="w-full h-full rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-green-500"></span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Alex Mercer</h4>
                <p className="text-xs text-[#008ba3] font-semibold mb-2">Pickleball • Level 4.5</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">Looking for a match this weekend. Usually plays at Northside.</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#006070] text-white border-none rounded-lg py-2.5 text-sm font-semibold hover:bg-[#004e5c] cursor-pointer">Connect</button>
                  <button className="w-10 h-10 rounded-lg bg-slate-100 border-none flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>
                </div>
              </div>

              <div className="min-w-[220px] bg-white rounded-2xl p-5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col border border-slate-100">
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Sarah" className="w-full h-full rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-slate-300"></span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Sarah Jenkins</h4>
                <p className="text-xs text-[#008ba3] font-semibold mb-2">Cầu lông • Casual</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">Casual hitter. Free on weekday evenings.</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#006070] text-white border-none rounded-lg py-2.5 text-sm font-semibold hover:bg-[#004e5c] cursor-pointer">Connect</button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </MobileLayout>
  )
}
