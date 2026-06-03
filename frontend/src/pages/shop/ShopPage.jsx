import { useState } from 'react'
import { Link } from 'react-router-dom'
import ShopLayout from '../../layouts/ShopLayout'

const categories = ['Equipment', 'Apparel', 'Shoes']
const sports = ['Tất cả', 'Cầu lông', 'Pickleball']

const products = [
  { id: 1, name: 'Aero Sprint Pro X', brand: 'VELOCITY', price: '$189.00', rating: 4.9, badge: 'NEW', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
  { id: 2, name: 'Therma-Shield Jacket', brand: 'CORETECH', price: '$145.00', rating: 4.7, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
  { id: 3, name: 'Elite Stride Shorts', brand: 'VELOCITY', price: '$65.00', rating: 4.9, badge: 'TRENDING', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' },
]

export default function ShopPage() {
  const [selectedCat, setSelectedCat] = useState(['Apparel'])
  const [selectedSport, setSelectedSport] = useState(['Cầu lông'])
  const [priceRange, setPriceRange] = useState(250)

  const toggle = (arr, setArr, val) => setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  return (
    <ShopLayout showFlashBanner darkHeader>
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-96px)]">
        {/* Left Sidebar */}
        <aside className="w-full md:w-[180px] shrink-0 p-6 md:py-6 md:px-5 bg-[#0d1a24] border-b md:border-b-0 md:border-r border-white/6 flex flex-col gap-6">
          <div className="flex flex-col">
            <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white/40 mb-3">CATEGORIES</p>
            {categories.map(c => (
              <label key={c} className="flex items-center gap-2 cursor-pointer text-sm text-white/70 py-1 select-none" htmlFor={`cat-${c}`}>
                <input type="checkbox" id={`cat-${c}`} className="hidden" checked={selectedCat.includes(c)} onChange={() => toggle(selectedCat, setSelectedCat, c)} />
                <span className={`w-4 h-4 border-[1.5px] border-white/25 rounded shrink-0 transition-all duration-200 flex items-center justify-center ${selectedCat.includes(c) ? 'bg-[#0d8a8a] border-[#0d8a8a]' : ''}`}>
                  {selectedCat.includes(c) && <span className="text-white text-[0.65rem] font-bold">✓</span>}
                </span>
                <span>{c}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col">
            <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white/40 mb-3">SPORT</p>
            <div className="flex flex-wrap gap-1.5">
              {sports.map(s => (
                <button key={s} className={`px-2.5 py-1 rounded-full border-[1.5px] border-white/15 bg-transparent text-xs font-medium text-white/60 cursor-pointer font-sans transition-all duration-200 hover:border-[#0d8a8a] hover:text-[#0fc8b5] ${selectedSport.includes(s) ? 'bg-[#0d8a8a] border-[#0d8a8a] text-white' : ''}`} onClick={() => toggle(selectedSport, setSelectedSport, s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white/40 mb-3">PRICE</p>
            <input type="range" min={0} max={500} value={priceRange} onChange={e => setPriceRange(e.target.value)} className="w-full accent-[#0d8a8a] cursor-pointer" id="price-range" />
            <div className="flex justify-between text-[0.78rem] text-white/50 mt-1.5"><span>$0</span><span>${priceRange}</span></div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 p-7 md:p-8 bg-[#0d1a24]">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-oswald text-2xl font-bold text-white">Elite Apparel</h1>
              <p className="text-[0.82rem] text-white/45 mt-1">Showing 124 results for high-performance gear.</p>
            </div>
            <div className="flex items-center gap-2 text-[0.82rem] text-white/55">
              <span>Sort by:</span>
              <select id="shop-sort" className="bg-white/6 border border-white/12 rounded-lg text-white px-2.5 py-1.5 font-sans text-[0.82rem] outline-none cursor-pointer">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map(p => (
              <Link to={`/shop/product/${p.id}`} key={p.id} className="group bg-white/4 rounded-[14px] border border-white/8 overflow-hidden no-underline text-inherit transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:border-[#0fc8b5]/30">
                <div className="relative h-[200px] overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-${p.id === 1 ? '1542291026-7eec264c27ff' : p.id === 2 ? '1591047139829-d91aecb6caea' : '1506629082955-511b1aa562c8'}?w=600&q=80`} alt={p.name} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105" />
                  {p.badge && <span className={`absolute top-2.5 left-2.5 text-[0.65rem] font-bold tracking-wider px-2 py-0.5 rounded ${p.badge === 'TRENDING' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>{p.badge}</span>}
                  <button className="absolute top-2 right-2 w-[30px] h-[30px] rounded-full bg-white/15 backdrop-blur-[4px] border-none cursor-pointer flex items-center justify-center text-white/80 transition-all duration-200 hover:bg-red-500/30 hover:text-red-500" aria-label="Wishlist">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                </div>
                <div className="p-3.5">
                  <p className="text-[0.68rem] font-bold tracking-widest uppercase text-white/35 mb-1">{p.brand}</p>
                  <h3 className="text-sm font-bold text-white mb-2.5">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-[0.95rem] font-bold text-[#0fc8b5]">{p.price}</p>
                    <span className="text-[0.78rem] text-amber-500">★ {p.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="inline-flex gap-2 items-center px-6 py-2.5 text-white/70 border border-white/20 rounded-md transition-colors hover:border-[#0fc8b5] hover:text-[#0fc8b5] bg-transparent cursor-pointer font-medium text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-6.06"/></svg>
              Load More Gear
            </button>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}

