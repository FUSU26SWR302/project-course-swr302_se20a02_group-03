import MobileLayout from '../../layouts/MobileLayout'

export default function MobileChatPage() {
  return (
    <MobileLayout hideBottomNav={true} showBack={true} title={
      <div className="text-center">
        <h2 className="text-[1rem] font-bold m-0 text-slate-900">Saturday Night Doubles</h2>
        <span className="text-[0.75rem] text-slate-500 font-normal">4 Participants</span>
      </div>
    }>
      <div className="font-sans -mx-4 -my-5 pb-24 min-h-full flex flex-col gap-4">
        
        <div className="text-center my-2">
          <span className="bg-slate-200 text-slate-600 text-[0.65rem] font-bold py-1 px-3 rounded-full">Today</span>
        </div>

        {/* Message 1 */}
        <div className="flex items-end gap-2 self-start">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80" alt="Sarah" className="w-8 h-8 rounded-full object-cover mb-5 shrink-0" />
          <div className="max-w-[75%] flex flex-col">
            <span className="text-[0.65rem] text-slate-500 mb-1 ml-1">Sarah Jenkins</span>
            <div className="bg-slate-100 text-slate-900 p-3 rounded-[16px_16px_16px_4px] text-sm leading-relaxed mb-1">
              Hey team! Are we still on for 7 PM at Court 2? 🎾
            </div>
            <span className="text-[0.65rem] text-slate-400 flex items-center gap-1">10:12 AM</span>
          </div>
        </div>

        {/* Message 2 */}
        <div className="flex items-end gap-2 self-start">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" alt="Mike" className="w-8 h-8 rounded-full object-cover mb-5 shrink-0" />
          <div className="max-w-[75%] flex flex-col">
            <span className="text-[0.65rem] text-slate-500 mb-1 ml-1">Mike Davis</span>
            <div className="bg-slate-100 text-slate-900 p-3 rounded-[16px_16px_16px_4px] text-sm leading-relaxed mb-1">
              Yep, I'll be there a bit early to warm up.
            </div>
            <span className="text-[0.65rem] text-slate-400 flex items-center gap-1">10:15 AM</span>
          </div>
        </div>

        {/* My Message */}
        <div className="flex items-end gap-2 self-end justify-end">
          <div className="max-w-[75%] flex flex-col items-end">
            <div className="bg-[#006070] text-white p-3 rounded-[16px_16px_4px_16px] text-sm leading-relaxed mb-1">
              Awesome. I brought extra badminton shuttlecocks just in case.
            </div>
            <span className="text-[0.65rem] text-slate-400 flex items-center gap-1">10:50 AM <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00c2ff" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg></span>
          </div>
        </div>

        {/* System Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center my-4 mx-4">
          <p className="text-xs font-bold text-yellow-700 mb-0.5">Court Change Alert</p>
          <p className="text-xs text-yellow-800">We've been moved to Court 4 due to maintenance.</p>
        </div>

        {/* Image Message */}
        <div className="flex items-end gap-2 self-end justify-end">
          <div className="max-w-[75%] flex flex-col items-end">
            <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=300&q=80" alt="Court" className="w-full max-w-[250px] rounded-xl mb-1 border-2 border-[#006070] object-cover" />
          </div>
        </div>

      </div>

      {/* Chat Input */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] flex items-center gap-3 -mx-4 px-4 mt-auto z-10">
        <button className="bg-transparent border-none text-slate-400 p-0 flex hover:text-slate-600 cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        </button>
        <div className="flex-1 bg-slate-100 rounded-full flex items-center px-4 py-2">
          <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400" />
          <button className="bg-transparent border-none text-slate-400 p-0 flex hover:text-slate-600 cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </button>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#006070] text-white border-none flex items-center justify-center cursor-pointer hover:bg-[#004e5c] shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </MobileLayout>
  )
}
