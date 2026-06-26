import { Link } from 'react-router-dom'

export default function RestrictedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-sky-100 font-sans">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-[500px] w-full">
          <div className="mb-6 flex justify-center">
            <div className="w-40 h-40 rounded-full relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&q=80" alt="Referee Red Card" className="w-full h-full object-cover grayscale" />
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center font-oswald text-[3.5rem] font-bold text-red-500 tracking-tighter">lock</div>
            </div>
          </div>
          
          <h2 className="font-oswald text-[2.5rem] font-bold text-slate-900 mb-4">Restricted Area</h2>
          <p className="text-base text-slate-600 mb-8">
            Your current role does not have permission to view this section.
          </p>

          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <Link to="/" className="flex items-center justify-center gap-2 bg-[#006070] hover:bg-[#004a57] text-white px-6 py-3 rounded-lg no-underline font-semibold text-sm transition-colors border-none cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Return to Safety
            </Link>
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#006070] px-6 py-3 rounded-lg font-semibold text-sm border border-[#006070] cursor-pointer transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Request Access from Admin
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

