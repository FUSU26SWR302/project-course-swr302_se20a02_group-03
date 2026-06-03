export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-sky-100 font-sans">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col md:flex-row max-w-[900px] w-full overflow-hidden">
          {/* Left Side */}
          <div className="flex-1 p-8 bg-slate-50 flex flex-col">
            <div className="flex-1 rounded-xl overflow-hidden relative mb-6">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" alt="Server Maintenance" className="w-full h-full object-cover min-h-[240px]" />
              <div className="absolute bottom-4 right-4 bg-[#006070] text-white p-2 px-4 rounded-full text-[0.8125rem] font-bold flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                System Tune-up
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <div className="bg-white rounded-lg p-4 min-w-[80px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="block font-oswald text-3xl font-bold text-[#008ba3] leading-none mb-1">02</span>
                <span className="block text-[0.65rem] font-bold text-slate-500 tracking-wider">HOURS</span>
              </div>
              <span className="font-oswald text-2xl font-bold text-slate-400">:</span>
              <div className="bg-white rounded-lg p-4 min-w-[80px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="block font-oswald text-3xl font-bold text-[#008ba3] leading-none mb-1">45</span>
                <span className="block text-[0.65rem] font-bold text-slate-500 tracking-wider">MINS</span>
              </div>
              <span className="font-oswald text-2xl font-bold text-slate-400">:</span>
              <div className="bg-white rounded-lg p-4 min-w-[80px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="block font-oswald text-3xl font-bold text-[#008ba3] leading-none mb-1">12</span>
                <span className="block text-[0.65rem] font-bold text-slate-500 tracking-wider">SECS</span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 p-12 flex flex-col justify-center">
            <h1 className="font-oswald text-2xl font-bold text-[#006070] tracking-tight italic text-left mb-6">PRO-SPORT</h1>
            <h2 className="text-[2.25rem] font-bold text-slate-900 leading-tight mb-4">We're upgrading our performance.</h2>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              PRO-SPORT is currently undergoing scheduled maintenance to bring you new elite features. Our team is actively fine-tuning the engine.
            </p>

            <div>
              <div className="flex items-center bg-white border border-slate-300 rounded-lg p-1 pl-4 gap-3 mb-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input type="email" placeholder="Enter your email to be notified" className="flex-1 border-none outline-none font-sans text-sm text-slate-800" />
                <button className="bg-[#006070] text-white border-none py-2.5 px-5 rounded-md font-semibold cursor-pointer transition-colors hover:bg-[#004a57]">Notify Me</button>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-slate-200 pt-6">
              <span className="text-[0.8125rem] text-slate-500">Follow updates on our channels:</span>
              <div className="flex gap-2">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

