import { useState } from 'react'
import { Link } from 'react-router-dom'
import GearLayout from '../../layouts/GearLayout'

const products = [
  { id: 1, name: 'Wilson Pro Staff RF97', category: 'CẦU LÔNG', badge: 'NEW', price: '$15/hr', deposit: '$50', img: 'https://images.unsplash.com/photo-1617083934551-1af7da84de49?w=400&q=80', type: 'rental' },
  { id: 2, name: 'Babolat Technical Viper', category: 'PICKLEBALL', badge: 'PREMIUM', price: '$18/hr', deposit: '$60', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', type: 'rental' },
  { id: 3, name: 'Head Tour Balls (3-Pack)', category: 'CẦU LÔNG', badge: 'DEMO', price: '$8/tube', deposit: null, img: 'https://images.unsplash.com/photo-1612452040814-e42b8f2da8ea?w=400&q=80', type: 'purchase', stock: 'Available' },
  { id: 4, name: 'TaylorMade P790 Irons', category: 'KHÁC', badge: 'PREMIUM', price: '$45/day', deposit: '$150', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80', type: 'rental' },
]

const sports = ['Cầu lông', 'Pickleball']
const conditions = ['Premium', 'New', 'Demo']

const badgeStyles = {
  new: 'bg-green-500 text-white',
  premium: 'bg-amber-500 text-white',
  demo: 'bg-indigo-500 text-white',
}

export default function GearCatalogPage() {
  const [selected, setSelected] = useState(['Cầu lông', 'Pickleball'])
  const [selectedCond, setSelectedCond] = useState(['Premium'])

  const toggle = (arr, setArr, val) => {
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  return (
    <GearLayout>
      <div className="flex gap-0 min-h-[calc(100vh-56px-80px)] max-[700px]:flex-col">
        {/* Sidebar filters */}
        <aside className="w-[220px] max-[700px]:w-full shrink-0 px-5 py-6 bg-white border-r border-[#e0ecf0] max-[700px]:border-r-0 max-[700px]:border-b max-[700px]:border-b-[#e0ecf0]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-[#0d2d3a]">Filters</h3>
            <button className="text-[0.8rem] text-[#0d8a8a] bg-transparent border-none cursor-pointer font-['Inter']">Reset</button>
          </div>
          <div className="mb-5">
            <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-slate-400 mb-2.5">SPORT</p>
            {sports.map(s => (
              <label key={s} className="flex items-center gap-2 cursor-pointer text-sm text-[#0d2d3a] py-[5px] select-none" htmlFor={`sport-${s}`}>
                <input type="checkbox" id={`sport-${s}`} checked={selected.includes(s)} onChange={() => toggle(selected, setSelected, s)} className="peer hidden" />
                <span className={`w-4 h-4 border-[1.5px] rounded shrink-0 transition-all flex items-center justify-center text-[0.65rem] font-bold ${selected.includes(s) ? 'bg-[#0d8a8a] border-[#0d8a8a] text-white' : 'border-[#e0ecf0]'}`}>
                  {selected.includes(s) && '✓'}
                </span>
                <span>{s}</span>
              </label>
            ))}
          </div>
          <div className="mb-5">
            <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-slate-400 mb-2.5">CONDITION</p>
            <div className="flex flex-wrap gap-1.5">
              {conditions.map(c => (
                <button key={c} className={`px-3 py-[5px] rounded-full border-[1.5px] text-[0.78rem] font-medium cursor-pointer font-['Inter'] transition-all hover:border-[#0d8a8a] hover:text-[#0d8a8a] ${selectedCond.includes(c) ? 'bg-[#0d8a8a] border-[#0d8a8a] text-white' : 'bg-white border-[#e0ecf0] text-slate-500'}`}
                  onClick={() => toggle(selectedCond, setSelectedCond, c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <p className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-slate-400 mb-2.5">PRICE / HOUR</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center border-[1.5px] border-[#e0ecf0] rounded-lg px-2.5 py-1.5 gap-1 text-[0.82rem] text-slate-500"><span>$</span><input type="number" placeholder="Min" id="price-min" className="w-14 border-none outline-none font-['Inter'] text-[0.82rem]" /></div>
              <span>-</span>
              <div className="flex items-center border-[1.5px] border-[#e0ecf0] rounded-lg px-2.5 py-1.5 gap-1 text-[0.82rem] text-slate-500"><span>$</span><input type="number" placeholder="Max" id="price-max" className="w-14 border-none outline-none font-['Inter'] text-[0.82rem]" /></div>
            </div>
          </div>
          <button className="btn-primary w-full justify-center mt-2">Apply Filters</button>
        </aside>

        {/* Main content */}
        <div className="flex-1 px-7 py-6">
          <div className="mb-5">
            <h1 className="font-['Oswald'] text-2xl font-bold text-[#0d2d3a] mb-3">Catalog</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[0.82rem] text-slate-500 flex-1">Showing {products.length} available courts</span>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-lg border-[1.5px] border-[#0d8a8a] bg-[#0d8a8a] cursor-pointer flex items-center justify-center text-white transition-all" aria-label="Grid"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg></button>
                <button className="w-8 h-8 rounded-lg border-[1.5px] border-[#e0ecf0] bg-white cursor-pointer flex items-center justify-center text-slate-400 transition-all hover:border-[#0d8a8a] hover:text-[#0d8a8a]" aria-label="List"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>
              </div>
              <select className="py-[7px] px-3 border-[1.5px] border-[#e0ecf0] rounded-lg font-['Inter'] text-[0.82rem] text-[#0d2d3a] outline-none cursor-pointer" id="gear-sort">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 max-[1100px]:grid-cols-2 max-[700px]:grid-cols-1 gap-5 mb-7">
            {products.map(p => (
              <Link to={`/gear/catalog/${p.id}`} key={p.id} className="bg-white rounded-[14px] border-[1.5px] border-[#e0ecf0] overflow-hidden no-underline text-inherit transition-all flex flex-col hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)] hover:-translate-y-[3px] group">
                <div className="relative h-[180px] overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.04]" />
                  {p.badge && <span className={`absolute top-2.5 right-2.5 text-[0.68rem] font-bold tracking-[0.06em] px-2 py-[3px] rounded-full ${badgeStyles[p.badge.toLowerCase()] || ''}`}>{p.badge}</span>}
                  <button className="absolute top-2 left-2.5 w-7 h-7 rounded-full bg-white/90 border-none cursor-pointer text-base flex items-center justify-center text-slate-400 transition-colors hover:text-red-500" aria-label="Wishlist">♡</button>
                </div>
                <div className="p-3.5 flex-1 flex flex-col gap-2">
                  <p className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-slate-400">{p.category}</p>
                  <h3 className="text-[0.95rem] font-bold text-[#0d2d3a] leading-snug">{p.name}</h3>
                  <div className="flex gap-4 items-end">
                    <div>
                      <p className="text-[0.68rem] text-slate-400">{p.type === 'rental' ? 'Rental Rate' : 'Purchase'}</p>
                      <p className="text-[0.95rem] font-bold text-[#0d8a8a]">{p.price}</p>
                    </div>
                    {p.deposit && (
                      <div>
                        <p className="text-[0.68rem] text-slate-400">Deposit</p>
                        <p className="text-[0.82rem] text-slate-500 font-medium">{p.deposit}</p>
                      </div>
                    )}
                    {p.stock && <span className="text-[0.72rem] bg-green-500/10 text-green-500 rounded-full px-2 py-[3px] font-semibold">{p.stock}</span>}
                  </div>
                  <button className="btn-primary w-full justify-center py-2.5 text-[0.85rem] mt-auto">
                    {p.type === 'rental' ? 'Add to Rental' : 'Add to Cart'}
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5 justify-center">
            <button className="w-[34px] h-[34px] rounded-lg border-[1.5px] border-[#e0ecf0] bg-white text-sm text-slate-500 cursor-pointer font-['Inter'] transition-all hover:border-[#0d8a8a] hover:text-[#0d8a8a]">‹</button>
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-[34px] h-[34px] rounded-lg border-[1.5px] text-sm cursor-pointer font-['Inter'] transition-all ${p === 1 ? 'bg-[#0d8a8a] border-[#0d8a8a] text-white' : 'border-[#e0ecf0] bg-white text-slate-500 hover:border-[#0d8a8a] hover:text-[#0d8a8a]'}`}>{p}</button>
            ))}
            <span>...</span>
            <button className="w-[34px] h-[34px] rounded-lg border-[1.5px] border-[#e0ecf0] bg-white text-sm text-slate-500 cursor-pointer font-['Inter'] transition-all hover:border-[#0d8a8a] hover:text-[#0d8a8a]">›</button>
          </div>
        </div>
      </div>
    </GearLayout>
  )
}
