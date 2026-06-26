import EliteLayout from '../../layouts/EliteLayout'

export default function ElitePosWalkInPage() {
  return (
    <EliteLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Walk-in Booking</h1>
            <p className="text-sm text-slate-500">Select court and complete checkout immediately.</p>
          </div>
          <div className="flex bg-white border border-slate-200 rounded-lg p-1">
            <button className="flex items-center gap-1.5 px-4 py-2 border-none bg-slate-50 rounded-md text-sm font-semibold text-[#00c2ff] cursor-pointer transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72"/></svg>
              Cầu lông
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 border-none bg-transparent rounded-md text-sm font-medium text-slate-500 cursor-pointer transition-all hover:text-slate-800">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Pickleball
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 border-none bg-transparent rounded-md text-sm font-medium text-slate-500 cursor-pointer transition-all hover:text-slate-800">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>
              Khác
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_340px] max-[1200px]:grid-cols-1 gap-6 items-start">
          {/* Left Column - Courts */}
          <div>
            <div className="flex justify-between items-center mb-5 bg-white px-5 py-4 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-slate-100">
              <h2 className="text-[1.125rem] font-bold text-slate-800 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Available Now & Next
              </h2>
              <div className="flex gap-4 bg-slate-100 px-3 py-1.5 rounded-full">
                <span className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-slate-500"><span className="w-2 h-2 rounded-full bg-sky-500"></span> Available</span>
                <span className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-slate-500"><span className="w-2 h-2 rounded-full bg-slate-400"></span> Booked</span>
              </div>
            </div>

            <div className="grid grid-cols-3 max-[1200px]:grid-cols-2 gap-4">
              {/* Court 1 */}
              <div className="bg-white rounded-xl border-[1.5px] border-[#008ba3] p-4 transition-all shadow-[0_4px_12px_rgba(0,139,163,0.15)]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-800">Sân Cầu lông 1</h3>
                    <p className="text-[0.75rem] text-slate-500 mt-0.5">Indoor • Panorama</p>
                  </div>
                  <span className="bg-[#008ba3] text-white text-[0.65rem] font-bold px-2 py-1 rounded">SELECTED</span>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="flex justify-between items-center px-4 py-3 rounded-lg border border-[#008ba3] bg-[#008ba3] text-sm font-semibold cursor-pointer transition-all">
                    <span className="text-white">10:00 - 11:30</span>
                    <span className="text-white">$45</span>
                  </button>
                  <button className="flex justify-between items-center px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm font-semibold cursor-pointer transition-all hover:border-slate-300 hover:bg-slate-50">
                    <span className="text-slate-800">11:30 - 13:00</span>
                    <span className="text-slate-500">$45</span>
                  </button>
                </div>
              </div>

              {/* Court 2 */}
              <div className="bg-white rounded-xl border-[1.5px] border-slate-200 p-4 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-800">Sân Cầu lông 2</h3>
                    <p className="text-[0.75rem] text-slate-500 mt-0.5">Indoor • Standard</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="flex justify-between items-center px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm font-semibold cursor-pointer transition-all hover:border-slate-300 hover:bg-slate-50">
                    <span className="text-slate-800">10:30 - 12:00</span>
                    <span className="text-slate-500">$40</span>
                  </button>
                  <button className="flex justify-between items-center px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm font-semibold cursor-pointer transition-all hover:border-slate-300 hover:bg-slate-50">
                    <span className="text-slate-800">12:00 - 13:30</span>
                    <span className="text-slate-500">$40</span>
                  </button>
                </div>
              </div>

              {/* Court 3 */}
              <div className="bg-white rounded-xl border-[1.5px] border-slate-200 p-4 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-800">Sân Pickleball 1</h3>
                    <p className="text-[0.75rem] text-slate-500 mt-0.5">Outdoor • Premium</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="flex justify-between items-center px-4 py-3 rounded-lg border border-slate-200 bg-slate-100 text-sm font-semibold cursor-not-allowed opacity-60" disabled>
                    <span className="text-slate-400 line-through">10:00 - 11:30</span>
                    <span className="text-slate-400 text-[0.75rem]">BOOKED</span>
                  </button>
                  <button className="flex justify-between items-center px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm font-semibold cursor-pointer transition-all hover:border-slate-300 hover:bg-slate-50">
                    <span className="text-slate-800">11:30 - 13:00</span>
                    <span className="text-slate-500">$50</span>
                  </button>
                </div>
              </div>

              {/* Court 4 */}
              <div className="bg-white rounded-xl border-[1.5px] border-slate-200 p-4 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-800">Sân Pickleball 2</h3>
                    <p className="text-[0.75rem] text-slate-500 mt-0.5">Outdoor • Standard</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="flex justify-between items-center px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm font-semibold cursor-pointer transition-all hover:border-slate-300 hover:bg-slate-50">
                    <span className="text-slate-800">10:00 - 11:30</span>
                    <span className="text-slate-500">$40</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Checkout */}
          <div className="flex flex-col gap-4">
            {/* Player Details */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[1.125rem] font-bold text-slate-800 flex items-center gap-2">Player Details</h3>
                <span className="text-[0.75rem] font-semibold text-[#008ba3] cursor-pointer hover:underline">Walk-in Guest</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="Search member name or phone..." className="border-none bg-transparent w-full font-['Inter'] text-sm text-slate-800 outline-none" />
              </div>
            </div>

            {/* Current Order */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-slate-100">
              <h3 className="text-[1.125rem] font-bold text-slate-800 flex items-center gap-2">Current Order</h3>
              
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Sân Cầu lông 1</p>
                    <p className="text-[0.75rem] text-slate-500 mt-0.5">Today, 10:00 - 11:30</p>
                  </div>
                  <button className="bg-transparent border-none text-red-500 text-xl cursor-pointer leading-none">&times;</button>
                </div>
                <div className="flex justify-between text-sm font-semibold text-slate-800 pt-4 border-t border-dashed border-slate-300">
                  <span>Court Fee</span>
                  <span>$45.00</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span>$45.00</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500 font-medium">
                  <span>Tax (10%)</span>
                  <span>$4.50</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500 font-medium mt-2 pt-4 border-t border-slate-200 items-center">
                  <span className="text-[1.125rem] font-bold text-slate-800">Total</span>
                  <span className="font-['Oswald'] text-[1.75rem] font-bold text-[#006070]">$49.50</span>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-slate-100">
              <p className="text-[0.6875rem] font-bold text-slate-500 tracking-[0.05em] mb-3">QUICK PAY</p>
              <div className="flex gap-3 mb-6">
                <button className="flex-1 flex flex-col items-center justify-center gap-2 py-4 border border-slate-200 rounded-xl bg-white text-[0.75rem] font-semibold text-slate-500 cursor-pointer transition-all hover:bg-slate-50">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                  Cash
                </button>
                <button className="flex-1 flex flex-col items-center justify-center gap-2 py-4 border border-[#008ba3] rounded-xl bg-white text-[0.75rem] font-semibold text-[#008ba3] cursor-pointer transition-all shadow-[0_0_0_1px_#008ba3]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008ba3" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  Card
                </button>
                <button className="flex-1 flex flex-col items-center justify-center gap-2 py-4 border border-slate-200 rounded-xl bg-white text-[0.75rem] font-semibold text-slate-500 cursor-pointer transition-all hover:bg-slate-50">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  QR Pay
                </button>
              </div>

              <button className="w-full bg-[#00c2ff] text-white border-none rounded-lg py-4 text-base font-bold cursor-pointer flex items-center justify-center gap-2 transition-colors hover:bg-[#00ace6]">
                Complete Booking
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </EliteLayout>
  )
}
