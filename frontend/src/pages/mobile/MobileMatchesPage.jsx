import MobileLayout from '../../layouts/MobileLayout'

export default function MobileMatchesPage() {
  return (
    <MobileLayout title="Matches">
      <div className="font-sans -mx-4 -my-5 pb-24 relative">
        <div className="flex items-center justify-center gap-1.5 py-3 text-xs text-slate-400 font-semibold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.26l5.08 5.08"/></svg>
          <span>Pull to refresh</span>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-3 px-4 mb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button className="whitespace-nowrap py-2 px-4 rounded-full bg-[#006070] text-white border border-[#006070] text-sm font-medium cursor-pointer">All Sports</button>
          <button className="whitespace-nowrap py-2 px-4 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-500 cursor-pointer hover:bg-slate-50">Cầu lông</button>
          <button className="whitespace-nowrap py-2 px-4 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-500 cursor-pointer hover:bg-slate-50">Pickleball</button>
        </div>

        <div className="px-4 flex flex-col gap-4">
          {/* Match 1 */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(0,194,255,0.1)] text-[#00c2ff] shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="text-sm font-bold text-slate-900">Mens Doubles</h3>
                <p className="flex items-center gap-1 text-[0.72rem] text-slate-500 mt-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 18:00 - 20:00</p>
              </div>
              <div className="flex flex-col gap-1.5 items-end">
                <span className="bg-red-100 text-red-600 text-[0.65rem] font-bold px-2 py-0.5 rounded-full">Starts in 2h</span>
                <span className="bg-slate-100 text-slate-600 text-[0.65rem] font-bold px-2 py-0.5 rounded-full">Lvl 4.5</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80" alt="P" className="w-7 h-7 rounded-full border border-white -mr-2 object-cover" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&q=80" alt="P" className="w-7 h-7 rounded-full border border-white -mr-2 object-cover" />
                <div className="bg-amber-100 text-amber-800 text-[0.62rem] font-bold py-0.5 px-2 rounded-full ml-4">1 spot</div>
              </div>
              <button className="bg-[#006070] text-white text-xs font-semibold py-1.5 px-5 rounded-lg border-none hover:bg-[#004e5c] cursor-pointer">Join</button>
            </div>

            <div className="flex items-center gap-1.5 text-[0.72rem] text-slate-400 mt-1.5 pt-2.5 border-t border-dashed border-slate-100">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Central Court, Area 5
            </div>
          </div>

          {/* Match 2 */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(0,194,255,0.1)] text-[#00c2ff] shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="text-sm font-bold text-slate-900">Pickleball Mixed</h3>
                <p className="flex items-center gap-1 text-[0.72rem] text-slate-500 mt-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Tomorrow, 09:00</p>
              </div>
              <div className="flex flex-col gap-1.5 items-end">
                <span className="bg-slate-100 text-slate-600 text-[0.65rem] font-bold px-2 py-0.5 rounded-full">Lvl 3.0</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&q=80" alt="P" className="w-7 h-7 rounded-full border border-white -mr-2 object-cover" />
                <div className="bg-amber-100 text-amber-800 text-[0.62rem] font-bold py-0.5 px-2 rounded-full ml-4">2 spots</div>
              </div>
              <button className="bg-[#006070] text-white text-xs font-semibold py-1.5 px-5 rounded-lg border-none hover:bg-[#004e5c] cursor-pointer">Join</button>
            </div>

            <div className="flex items-center gap-1.5 text-[0.72rem] text-slate-400 mt-1.5 pt-2.5 border-t border-dashed border-slate-100">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Westside Pickleball Club
            </div>
          </div>

          {/* Match 3 (Full) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-3 opacity-75">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="text-sm font-bold text-slate-900">Singles Practice</h3>
                <p className="flex items-center gap-1 text-[0.72rem] text-slate-500 mt-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Today, 20:00</p>
              </div>
              <div className="flex flex-col gap-1.5 items-end">
                <span className="bg-slate-100 text-slate-600 text-[0.65rem] font-bold px-2 py-0.5 rounded-full">Lvl 5.0</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center my-2">
              <span className="bg-slate-100 text-slate-500 text-xs font-bold py-1 px-3 rounded">Full</span>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80" alt="P" className="w-7 h-7 rounded-full border border-white -mr-2 object-cover" />
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&q=80" alt="P" className="w-7 h-7 rounded-full border border-white -mr-2 object-cover" />
              </div>
              <button className="bg-slate-100 text-slate-400 text-xs font-semibold py-1.5 px-5 rounded-lg border-none cursor-not-allowed" disabled>Full</button>
            </div>
          </div>
        </div>

        {/* FAB */}
        <button className="fixed bottom-20 right-4 w-14 h-14 bg-[#006070] hover:bg-[#004e5c] text-white rounded-full flex items-center justify-center shadow-lg border-none cursor-pointer z-50 transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>

      </div>
    </MobileLayout>
  )
}
