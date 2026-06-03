import MobileLayout from '../../layouts/MobileLayout'

export default function MobileBookingPage() {
  return (
    <MobileLayout hideBottomNav={true} showBack={true} title="">
      <div className="font-sans -mx-4 -my-5 pb-24">
        
        {/* Progress */}
        <div className="p-5 flex flex-col gap-2.5">
          <div className="flex gap-2.5">
            <div className="flex-1 h-1 rounded bg-[#00c2ff]"></div>
            <div className="flex-1 h-1 rounded bg-slate-200"></div>
            <div className="flex-1 h-1 rounded bg-slate-200"></div>
          </div>
          <span className="text-[0.6875rem] font-bold text-slate-400 mt-1">Step 1 of 3</span>
        </div>

        {/* Header */}
        <div className="px-5 mb-5">
          <h2 className="text-lg font-bold text-slate-900">Select Court</h2>
          <p className="text-xs text-slate-500 mt-1">Swipe to explore available courts.</p>
        </div>

        {/* Court Card */}
        <div className="mx-5 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden cursor-pointer">
          <div className="relative h-[150px]">
            <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=80" alt="Court" className="w-full h-full object-cover" />
            <span className="absolute top-3 left-3 bg-[#006070] text-white text-[0.62rem] font-bold px-2 py-0.5 rounded">Indoor</span>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Center Court</h3>
                <p className="flex items-center gap-1.5 text-[0.72rem] text-slate-500 mt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  Premium Hardcourt
                </p>
              </div>
              <span className="bg-[#00c2ff]/10 text-[#00c2ff] text-[0.65rem] font-bold px-2 py-0.5 rounded">Cầu lông</span>
            </div>

            <div className="flex justify-between items-end mt-4 pt-3 border-t border-slate-50">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-slate-400 line-through">$45</span>
                <span className="text-sm font-bold text-[#006070]">$35</span>
                <span className="text-[0.65rem] text-slate-400">/hr</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Slots */}
        <div className="px-5 mt-6">
          <p className="text-[0.65rem] font-bold tracking-wider text-slate-500 mb-3 block">TODAY'S QUICK SLOTS</p>
          <div className="grid grid-cols-4 gap-2.5">
            <button className="bg-white border border-slate-200 text-slate-800 rounded-lg py-2.5 text-xs font-semibold cursor-pointer transition-all hover:bg-slate-50">17:00</button>
            <button className="bg-[#006070] text-white border-[#006070] rounded-lg py-2.5 text-xs font-semibold cursor-pointer transition-all">18:30</button>
            <button className="bg-white border border-slate-200 text-slate-800 rounded-lg py-2.5 text-xs font-semibold cursor-pointer transition-all hover:bg-slate-50">20:00</button>
            <button className="bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50 rounded-lg py-2.5 text-xs font-semibold" disabled>21:30</button>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Button */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] flex items-center gap-3 -mx-4 px-4 mt-auto z-10">
        <button className="w-full bg-[#00c2ff] hover:bg-[#00ace6] text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border-none cursor-pointer shadow-md transition-all">
          Proceed to Payment
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>

    </MobileLayout>
  )
}
