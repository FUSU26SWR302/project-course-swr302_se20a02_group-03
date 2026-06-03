import MobileLayout from '../../layouts/MobileLayout'

export default function MobileWalletPage() {
  return (
    <MobileLayout>
      <div className="font-sans -mx-4 -my-5 pb-24">
        
        {/* Balance */}
        <div className="bg-[#006070] text-white p-6 rounded-b-[24px] flex justify-between items-center shadow-sm">
          <div>
            <p className="text-[0.62rem] font-bold tracking-wider opacity-60">AVAILABLE BALANCE</p>
            <h1 className="font-['Oswald'] text-3xl font-bold mt-1 text-white">$4,850.00</h1>
          </div>
          <button className="bg-white/10 border-none w-9 h-9 rounded-full text-white flex items-center justify-center cursor-pointer hover:bg-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </button>
        </div>

        {/* Card Scroll */}
        <div className="flex gap-4 overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="w-full min-w-[280px] bg-slate-900 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col gap-4 border border-white/5">
            <div className="flex justify-between items-center">
              <h3 className="font-['Oswald'] text-base font-bold tracking-wide">PRO-SPORT</h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/></svg>
            </div>
            <div>
              <p className="text-[0.55rem] font-bold tracking-wider opacity-50">CARD NUMBER</p>
              <p className="text-sm font-semibold tracking-[0.1em] mt-1">**** **** **** 4928</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-[0.55rem] font-bold tracking-wider opacity-50">CARDHOLDER</p>
                <p className="text-xs font-bold">Alex Mercer</p>
              </div>
              <div>
                <p className="text-[0.55rem] font-bold tracking-wider opacity-50">EXP</p>
                <p className="text-xs font-bold">12/28</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Funds Button */}
        <div className="px-5 mb-6">
          <button className="w-full bg-[#00c2ff] hover:bg-[#00ace6] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border-none cursor-pointer shadow-md transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            Add Funds
          </button>
        </div>

        {/* Transactions */}
        <div className="px-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-900">Recent Transactions</h3>
            <span className="text-xs font-semibold text-[#008ba3] cursor-pointer">View All</span>
          </div>

          <div className="flex flex-col gap-3">
            
            <div className="flex items-center bg-white p-3 rounded-xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-blue-100 text-blue-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/></svg>
              </div>
              <div className="flex-1 ml-3 min-w-0">
                <h4 className="text-xs font-bold text-slate-800 truncate">Court Booking - Elite Arena</h4>
                <p className="text-[0.72rem] text-slate-400 mt-0.5">Today, 14:30</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-red-500">-$45.00</p>
                <span className="inline-block bg-green-100 text-green-700 text-[0.6rem] font-bold px-1.5 py-0.5 rounded mt-1">SUCCESS</span>
              </div>
            </div>

            <div className="flex items-center bg-white p-3 rounded-xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-orange-100 text-orange-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <div className="flex-1 ml-3 min-w-0">
                <h4 className="text-xs font-bold text-slate-800 truncate">Pro Shop - Vợt Cầu lông</h4>
                <p className="text-[0.72rem] text-slate-400 mt-0.5">Yesterday, 09:15</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-red-500">-$12.50</p>
                <span className="inline-block bg-amber-100 text-amber-700 text-[0.6rem] font-bold px-1.5 py-0.5 rounded mt-1">PENDING</span>
              </div>
            </div>

            <div className="flex items-center bg-white p-3 rounded-xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#00c2ff]/10 text-[#00c2ff]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 19 19 12"/></svg>
              </div>
              <div className="flex-1 ml-3 min-w-0">
                <h4 className="text-xs font-bold text-slate-800 truncate">Top Up - VNPay</h4>
                <p className="text-[0.72rem] text-slate-400 mt-0.5">Oct 12, 18:00</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-green-500">+$150.00</p>
                <span className="inline-block bg-green-100 text-green-700 text-[0.6rem] font-bold px-1.5 py-0.5 rounded mt-1">SUCCESS</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </MobileLayout>
  )
}
