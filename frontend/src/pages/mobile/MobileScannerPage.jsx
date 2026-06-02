export default function MobileScannerPage() {
  return (
    <div className="flex justify-center min-h-screen bg-slate-200 py-5 max-[449px]:p-0">
      <div className="w-full max-w-[414px] bg-[#0f172a] min-h-[800px] relative flex flex-col overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] min-[450px]:rounded-[40px] min-[450px]:border-[8px] min-[450px]:border-[#0f172a] min-[450px]:h-[850px] max-[449px]:max-w-full max-[449px]:min-h-screen">
        
        {/* Scanner Topbar */}
        <div className="h-[60px] flex items-center justify-between px-4 absolute top-0 left-0 right-0 z-10">
          <button className="bg-white/10 border-none w-9 h-9 rounded-full text-white flex items-center justify-center cursor-pointer hover:bg-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <h1 className="font-['Oswald',sans-serif] text-[1.25rem] font-bold text-white">PRO-SPORT</h1>
          <button className="bg-white/10 border-none w-9 h-9 rounded-full text-white flex items-center justify-center cursor-pointer hover:bg-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
          </button>
        </div>

        {/* Scanner Area */}
        <div className="flex-1 relative bg-slate-800 flex flex-col justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-950 opacity-80"></div>
          
          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="bg-black/60 text-white text-xs py-2 px-4 rounded-full mb-10">Position QR code within the frame</div>
            
            <div className="w-[250px] h-[250px] relative bg-white/5 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] mb-10">
              {/* Corner brackets */}
              <div className="absolute w-[30px] h-[30px] border-4 border-[#00c2ff] rounded-lg top-[-4px] left-[-4px] border-r-0 border-b-0"></div>
              <div className="absolute w-[30px] h-[30px] border-4 border-[#00c2ff] rounded-lg top-[-4px] right-[-4px] border-l-0 border-b-0"></div>
              <div className="absolute w-[30px] h-[30px] border-4 border-[#00c2ff] rounded-lg bottom-[-4px] left-[-4px] border-r-0 border-t-0"></div>
              <div className="absolute w-[30px] h-[30px] border-4 border-[#00c2ff] rounded-lg bottom-[-4px] right-[-4px] border-l-0 border-t-0"></div>
              
              {/* Scan line animation */}
              <div className="absolute left-0 right-0 h-0.5 bg-[#00c2ff] shadow-[0_0_8px_2px_rgba(0,194,255,0.5)] animate-pulse"></div>
            </div>

            <button className="bg-transparent border-none text-[#00c2ff] text-sm font-semibold cursor-pointer hover:underline">Enter Court ID Manually</button>
          </div>
        </div>

        {/* Success Bottom Sheet */}
        <div className="absolute bottom-6 left-4 right-4 bg-slate-200 rounded-2xl p-5 flex items-center gap-4 z-10 shadow-lg">
          <div className="w-10 h-10 rounded-full bg-[#006070]/10 text-[#006070] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div className="flex-1">
            <span className="block text-[0.65rem] font-bold text-[#008ba3] mb-0.5">Scan Successful</span>
            <h3 className="text-base font-bold text-slate-900 mb-0.5">Court 04 Check-in</h3>
            <p className="text-xs text-slate-500">Booking verified for 14:00</p>
          </div>
          <button className="bg-[#006070] text-white border-none py-2.5 px-4 rounded-lg text-sm font-semibold cursor-pointer hover:bg-[#004e5c]">Enter Court</button>
        </div>

      </div>
    </div>
  )
}
