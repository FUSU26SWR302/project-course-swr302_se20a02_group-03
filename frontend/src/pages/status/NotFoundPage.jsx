import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-sky-100 font-sans">
      <header className="p-6 text-center">
        <h1 className="font-oswald text-2xl font-bold text-[#006070] tracking-tight italic">PRO-SPORT</h1>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-12 text-center max-w-[540px] w-full">
          <div className="mb-8 flex justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] after:absolute after:inset-0 after:bg-gradient-to-t after:from-transparent after:to-[#00c2ff]/20">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00c2ff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
          </div>
          
          <h2 className="font-oswald text-[4rem] font-bold text-slate-900 leading-none mb-4">404</h2>
          <h3 className="text-xl font-bold text-slate-700 mb-4 leading-relaxed">Page Not Found. Looks like you've wandered off the court.</h3>
          <p className="text-[0.95rem] text-slate-500 leading-relaxed mb-8">
            The strategic play you are looking for doesn't exist or has been moved to a different playbook. Let's get you back in the game.
          </p>
 
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <Link to="/" className="flex items-center justify-center gap-2 bg-[#006070] hover:bg-[#004a57] text-white px-6 py-3 rounded-lg no-underline font-semibold text-sm transition-colors border-none cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Back to Dashboard
            </Link>
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#006070] px-6 py-3 rounded-lg font-semibold text-sm border border-[#006070] cursor-pointer transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Search Facility
            </button>
          </div>
        </div>
      </main>
 
      <footer className="text-center p-6 text-[0.75rem] text-[#94a3b8]">
        <p>© 2024 PRO-SPORT Management. Powered by FluidGrid Engine.</p>
      </footer>
    </div>
  )
}

