import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/shop', label: 'Shop' },
  { path: '/shop/performance', label: 'Performance' },
  { path: '/shop/collections', label: 'Collections' },
  { path: '/shop/new', label: 'New Arrivals' },
]

export default function ShopLayout({ children, showFlashBanner = false, darkHeader = false }) {
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [cartCount] = useState(2)
  const isActive = (path) => path === '/shop' ? location.pathname === '/shop' : location.pathname.startsWith(path)

  return (
    <div className={`min-h-screen flex flex-col ${darkHeader ? 'bg-[#0d1a24]' : 'bg-[#f5f9fc]'}`}>
      {showFlashBanner && (
        <div className="bg-[#0d2d3a] text-white flex items-center justify-center gap-2.5 py-2 px-6 text-[0.82rem]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#0fc8b5] shrink-0"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>FLASH SALE: Up to 40% off Elite Performance Gear. Ends in <strong className="text-[#0fc8b5]">04:23:59</strong>.</span>
          <a href="#" className="text-[#0fc8b5] font-bold ml-2 underline">Shop Now</a>
        </div>
      )}
      <header className={`h-[58px] flex items-center px-7 gap-6 sticky top-0 z-[100] shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${darkHeader ? 'bg-[#0d1a24] border-b border-white/[0.08]' : 'bg-white border-b border-[#e0ecf0]'}`}>
        <Link to="/shop" className="font-['Oswald',sans-serif] text-[1.3rem] font-bold tracking-[0.04em] no-underline flex shrink-0">
          <span className={darkHeader ? 'text-white' : 'text-[#0d2d3a]'}>PRO</span>
          <span className="text-[#0d8a8a]">-</span>
          <span className={darkHeader ? 'text-white' : 'text-[#0d2d3a]'}>SPORT</span>
        </Link>
        <nav className="flex gap-1 max-[600px]:hidden">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className={`py-1.5 px-3 text-[0.875rem] font-medium rounded-full no-underline transition-all ${
              isActive(link.path)
                ? 'text-[#0d8a8a] font-semibold'
                : darkHeader
                  ? 'text-white/65 hover:text-white hover:bg-white/[0.08]'
                  : 'text-slate-500 hover:text-[#0d8a8a] hover:bg-[rgba(13,138,138,0.07)]'
            }`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={`flex items-center gap-2 rounded-full py-2 px-4 flex-1 max-w-[320px] transition-all focus-within:border-[#0d8a8a] ${darkHeader ? 'bg-white/[0.06] border-[1.5px] border-white/[0.12]' : 'bg-[#f5f9fc] border-[1.5px] border-[#e0ecf0]'}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search gear..." id="shop-search" value={search} onChange={e => setSearch(e.target.value)} className={`border-none bg-transparent font-['Inter',sans-serif] text-[0.85rem] w-full outline-none placeholder:text-slate-400 ${darkHeader ? 'text-white' : 'text-[#0d2d3a]'}`} />
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <button className={`w-[34px] h-[34px] rounded-full bg-transparent border-none cursor-pointer flex items-center justify-center relative transition-all ${darkHeader ? 'text-white/70 hover:bg-white/10 hover:text-white' : 'text-slate-500 hover:bg-[rgba(13,138,138,0.08)] hover:text-[#0d8a8a]'}`} aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <Link to="/shop/cart" className={`w-[34px] h-[34px] rounded-full bg-transparent flex items-center justify-center relative transition-all no-underline ${darkHeader ? 'text-white/70 hover:bg-white/10 hover:text-white' : 'text-slate-500 hover:bg-[rgba(13,138,138,0.08)] hover:text-[#0d8a8a]'}`} aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#0d8a8a] text-white text-[0.6rem] font-bold flex items-center justify-center">{cartCount}</span>}
          </Link>
          <button className={`w-[34px] h-[34px] rounded-full bg-transparent border-none cursor-pointer flex items-center justify-center relative transition-all ${darkHeader ? 'text-white/70 hover:bg-white/10 hover:text-white' : 'text-slate-500 hover:bg-[rgba(13,138,138,0.08)] hover:text-[#0d8a8a]'}`} aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
          <Link to="/shop/cart" className={`flex items-center gap-1.5 py-2 px-4 rounded-full text-[0.82rem] font-semibold no-underline transition-all ${darkHeader ? 'bg-white text-[#0d2d3a]' : 'bg-[#0d2d3a] text-white'} hover:bg-[#0d8a8a]`}>Cart</Link>
          {!darkHeader && <Link to="/login" className="text-[0.82rem] font-semibold text-[#0d8a8a] no-underline py-1.5 px-3 rounded-full transition-all hover:bg-[rgba(13,138,138,0.08)]">Sign In</Link>}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className={`text-white/70 pt-10 px-10 pb-6 grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 ${darkHeader ? 'bg-[#060e14]' : 'bg-[#0d1a24]'}`}>
        <div>
          <div className="font-['Oswald',sans-serif] text-[1.2rem] font-bold text-white mb-2.5">PRO-SPORT</div>
          <p className="text-[0.8rem] text-white/50 leading-relaxed">Engineered for Elite Performance. Pushing the boundaries of athletic technology.</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white/40 mb-1">COMPANY</p>
          <a href="#" className="text-[0.82rem] text-white/60 no-underline transition-all hover:text-[#0fc8b5]">About Us</a><a href="#" className="text-[0.82rem] text-white/60 no-underline transition-all hover:text-[#0fc8b5]">Find a Store</a><a href="#" className="text-[0.82rem] text-white/60 no-underline transition-all hover:text-[#0fc8b5]">Careers</a>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white/40 mb-1">SUPPORT</p>
          <a href="#" className="text-[0.82rem] text-white/60 no-underline transition-all hover:text-[#0fc8b5]">Help Center</a><a href="#" className="text-[0.82rem] text-white/60 no-underline transition-all hover:text-[#0fc8b5]">Shipping &amp; Returns</a><a href="#" className="text-[0.82rem] text-white/60 no-underline transition-all hover:text-[#0fc8b5]">Contact Us</a>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white/40 mb-1">LEGAL</p>
          <a href="#" className="text-[0.82rem] text-white/60 no-underline transition-all hover:text-[#0fc8b5]">Privacy Policy</a><a href="#" className="text-[0.82rem] text-white/60 no-underline transition-all hover:text-[#0fc8b5]">Terms of Service</a>
        </div>
        <div className="col-span-full border-t border-white/[0.08] pt-5 flex justify-between items-center">
          <p className="text-[0.78rem] text-white/35">© 2024 PRO-SPORT. Engineered for Elite Performance.</p>
          <div className="flex gap-4">
            <a href="#" className="text-[0.8rem] text-white/50 no-underline transition-all hover:text-[#0fc8b5]">Twitter</a><a href="#" className="text-[0.8rem] text-white/50 no-underline transition-all hover:text-[#0fc8b5]">Instagram</a><a href="#" className="text-[0.8rem] text-white/50 no-underline transition-all hover:text-[#0fc8b5]">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
