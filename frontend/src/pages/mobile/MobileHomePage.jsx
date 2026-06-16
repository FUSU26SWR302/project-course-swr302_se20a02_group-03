import MobileLayout from '../../layouts/MobileLayout'

export default function MobileHomePage() {
  return (
    <MobileLayout>
      <div className="font-sans pb-12 flex flex-col gap-8">
        
        {/* Hero Banner - Clean & Premium */}
        <div className="px-4 pt-4">
          <div className="relative rounded-3xl overflow-hidden h-[200px] border border-slate-200/50">
            <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=80" alt="Badminton Court" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="bg-red-500 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md self-start mb-3 shadow-sm">
                Live Now
              </span>
              <span className="text-xs font-semibold text-slate-300 mb-1">City Open 2024</span>
              <h2 className="text-2xl font-bold tracking-tight mb-1">Quarter Finals</h2>
              <p className="text-sm font-medium text-slate-300">Watch live or join the conversation.</p>
            </div>
          </div>
        </div>

        <div className="px-4 flex flex-col gap-8">
          
          {/* Search & Filters */}
          <div>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 gap-3 mb-4 focus-within:border-slate-400 focus-within:bg-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Find players, groups, or courts..." className="border-none bg-transparent w-full text-sm outline-none text-slate-900 placeholder:text-slate-400 font-medium" />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <button className="whitespace-nowrap py-2 px-4 rounded-xl bg-slate-900 text-white text-sm font-semibold cursor-pointer active:scale-95 transition-transform">
                Cầu lông
              </button>
              <button className="whitespace-nowrap py-2 px-4 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-600 cursor-pointer hover:bg-slate-50 active:scale-95 transition-transform">
                Pickleball
              </button>
            </div>
          </div>

          {/* Active Groups */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold tracking-tight text-slate-900">Active Groups</h3>
              <span className="text-sm font-semibold text-slate-500 cursor-pointer hover:text-slate-900 transition-colors">View All</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
                <img src="https://images.unsplash.com/photo-1622227432807-91eb590c31ab?w=100&q=80" alt="Group" className="w-14 h-14 rounded-xl object-cover mr-4 border border-slate-100" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">Northside Pickleball Pros</h4>
                  <p className="text-xs text-slate-500 mb-2 truncate">42 members • Advanced</p>
                  <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&q=80" alt="A" className="w-5 h-5 rounded-full border-2 border-white -mr-1.5 object-cover" />
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&q=80" alt="B" className="w-5 h-5 rounded-full border-2 border-white -mr-1.5 object-cover" />
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80" alt="C" className="w-5 h-5 rounded-full border-2 border-white -mr-1.5 object-cover" />
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold py-0.5 px-1.5 rounded-full ml-2">+39</span>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 hover:text-slate-600 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>

              <div className="flex items-center bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
                <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=100&q=80" alt="Group" className="w-14 h-14 rounded-xl object-cover mr-4 border border-slate-100" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">Downtown Cầu lông Club</h4>
                  <p className="text-xs text-slate-500 mb-2 truncate">128 members • All Levels</p>
                  <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&q=80" alt="A" className="w-5 h-5 rounded-full border-2 border-white -mr-1.5 object-cover" />
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80" alt="B" className="w-5 h-5 rounded-full border-2 border-white -mr-1.5 object-cover" />
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold py-0.5 px-1.5 rounded-full ml-2">+126</span>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 hover:text-slate-600 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          </section>

          {/* Nearby Players */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold tracking-tight text-slate-900">Nearby Players</h3>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> 
                Within 5km
              </span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="min-w-[240px] bg-white rounded-3xl p-5 text-center border border-slate-200 shadow-sm flex flex-col">
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Alex" className="w-full h-full rounded-full object-cover border border-slate-200" />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white bg-emerald-500"></span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Alex Mercer</h4>
                <div className="inline-flex items-center justify-center gap-1 mx-auto mt-1 mb-3 px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                  Pickleball • 4.5
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed mb-5 flex-1">Looking for a match this weekend. Usually plays at Northside.</p>
                <div className="flex gap-2 w-full">
                  <button className="flex-1 bg-slate-900 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-slate-800 transition-colors active:scale-[0.98]">
                    Connect
                  </button>
                  <button className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors active:scale-[0.98]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </button>
                </div>
              </div>

              <div className="min-w-[240px] bg-white rounded-3xl p-5 text-center border border-slate-200 shadow-sm flex flex-col">
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Sarah" className="w-full h-full rounded-full object-cover border border-slate-200" />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white bg-slate-300"></span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Sarah Jenkins</h4>
                <div className="inline-flex items-center justify-center gap-1 mx-auto mt-1 mb-3 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                  Cầu lông • Casual
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed mb-5 flex-1">Casual hitter. Free on weekday evenings.</p>
                <div className="flex gap-2 w-full mt-auto">
                  <button className="w-full bg-slate-900 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-slate-800 transition-colors active:scale-[0.98]">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </MobileLayout>
  )
}
