import { useState } from 'react'
import { Link } from 'react-router-dom'
import GearLayout from '../../layouts/GearLayout'

const products = [
  { id: 1,  name: 'Wilson Pro Staff RF97',      sport: 'Badminton',  itemType: 'Racket',      badge: 'NEW',     price: 15, priceLabel: '$15/hr',  deposit: '$50', img: 'https://images.unsplash.com/photo-1617083934551-1af7da84de49?w=400&q=80', type: 'rental' },
  { id: 2,  name: 'Babolat Technical Viper',    sport: 'Pickleball', itemType: 'Racket',      badge: 'PREMIUM', price: 18, priceLabel: '$18/hr',  deposit: '$60', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', type: 'rental' },
  { id: 3,  name: 'Yonex Astrox 100 ZZ',       sport: 'Badminton',  itemType: 'Racket',      badge: 'PREMIUM', price: 20, priceLabel: '$20/hr',  deposit: '$80', img: 'https://images.unsplash.com/photo-1617083934551-1af7da84de49?w=400&q=80', type: 'rental' },
  { id: 4,  name: 'Pickleball Paddle Pro Set',  sport: 'Pickleball', itemType: 'Racket',      badge: 'NEW',     price: 20, priceLabel: '$20/hr',  deposit: '$70', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80', type: 'rental' },
  { id: 5,  name: 'Mavis 350 Shuttlecock',      sport: 'Badminton',  itemType: 'Ball / Birdie', badge: 'DEMO',  price: 5,  priceLabel: '$5/tube', deposit: null,  img: 'https://images.unsplash.com/photo-1612452040814-e42b8f2da8ea?w=400&q=80', type: 'purchase', stock: 'Available' },
  { id: 6,  name: 'Pickleball Ball Set (6)',     sport: 'Pickleball', itemType: 'Ball / Birdie', badge: null,   price: 4,  priceLabel: '$4/set',  deposit: null,  img: 'https://images.unsplash.com/photo-1612452040814-e42b8f2da8ea?w=400&q=80', type: 'purchase', stock: 'Available' },
  { id: 7,  name: 'Nike Court Lite 3',          sport: 'Badminton',  itemType: 'Footwear',    badge: 'NEW',     price: 10, priceLabel: '$10/hr',  deposit: '$40', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', type: 'rental' },
  { id: 8,  name: 'K-Swiss Express Light',       sport: 'Pickleball', itemType: 'Footwear',    badge: 'PREMIUM', price: 12, priceLabel: '$12/hr',  deposit: '$45', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80', type: 'rental' },
  { id: 9,  name: 'Dry-Fit Badminton Polo',     sport: 'Badminton',  itemType: 'Apparel',     badge: 'NEW',     price: 5,  priceLabel: '$5/hr',   deposit: '$15', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', type: 'rental' },
  { id: 10, name: 'Pickleball Sport Shorts',    sport: 'Pickleball', itemType: 'Apparel',     badge: null,      price: 4,  priceLabel: '$4/hr',   deposit: '$10', img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80', type: 'rental' },
  { id: 11, name: 'Elbow Support Sleeve',        sport: 'Badminton',  itemType: 'Protection',  badge: 'NEW',     price: 3,  priceLabel: '$3/hr',   deposit: '$10', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', type: 'rental' },
  { id: 12, name: 'Wrist Guard Pro',             sport: 'Pickleball', itemType: 'Protection',  badge: null,      price: 3,  priceLabel: '$3/hr',   deposit: '$10', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', type: 'rental' },
  { id: 13, name: 'Racket Bag Yonex',            sport: 'Badminton',  itemType: 'Accessories', badge: null,      price: 5,  priceLabel: '$5/hr',   deposit: '$20', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', type: 'rental' },
  { id: 14, name: 'Pickleball Carry Bag',        sport: 'Pickleball', itemType: 'Accessories', badge: 'NEW',     price: 4,  priceLabel: '$4/hr',   deposit: '$15', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', type: 'rental' },
]

const itemTypeIcons = {
  'Racket':       '🏸',
  'Footwear':     '👟',
  'Apparel':      '👕',
  'Ball / Birdie':'🎾',
  'Accessories':  '🎒',
  'Protection':   '🦺',
}

const sports    = ['Badminton', 'Pickleball']
const itemTypes = ['Racket', 'Footwear', 'Apparel', 'Ball / Birdie', 'Accessories', 'Protection']
const conditions = ['Premium', 'New', 'Demo']

const badgeStyles = {
  new:     'bg-emerald-500 text-white',
  premium: 'bg-amber-500 text-white',
  demo:    'bg-indigo-500 text-white',
}

const DEFAULT_SPORTS    = sports
const DEFAULT_ITEMS     = itemTypes
const DEFAULT_CONDS     = []
const DEFAULT_PRICE_MIN = ''
const DEFAULT_PRICE_MAX = ''

export default function GearCatalogPage() {
  const [selectedSports,  setSelectedSports]  = useState(DEFAULT_SPORTS)
  const [selectedItems,   setSelectedItems]   = useState(DEFAULT_ITEMS)
  const [selectedConds,   setSelectedConds]   = useState(DEFAULT_CONDS)
  const [priceMin,        setPriceMin]        = useState(DEFAULT_PRICE_MIN)
  const [priceMax,        setPriceMax]        = useState(DEFAULT_PRICE_MAX)
  const [viewMode,        setViewMode]        = useState('grid') // 'grid' | 'list'
  const [sort,            setSort]            = useState('recommended')
  const [applied,         setApplied]         = useState({ sports: DEFAULT_SPORTS, items: DEFAULT_ITEMS, conds: DEFAULT_CONDS, min: '', max: '' })

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const handleReset = () => {
    setSelectedSports(DEFAULT_SPORTS)
    setSelectedItems(DEFAULT_ITEMS)
    setSelectedConds(DEFAULT_CONDS)
    setPriceMin(DEFAULT_PRICE_MIN)
    setPriceMax(DEFAULT_PRICE_MAX)
    setApplied({ sports: DEFAULT_SPORTS, items: DEFAULT_ITEMS, conds: DEFAULT_CONDS, min: '', max: '' })
  }

  const handleApply = () => {
    setApplied({ sports: selectedSports, items: selectedItems, conds: selectedConds, min: priceMin, max: priceMax })
  }

  // Count active filters
  const activeFilterCount =
    (applied.sports.length < sports.length ? 1 : 0) +
    (applied.items.length  < itemTypes.length ? 1 : 0) +
    (applied.conds.length  > 0 ? 1 : 0) +
    (applied.min || applied.max ? 1 : 0)

  // Filter + sort
  let filtered = products.filter(p => {
    const matchSport = applied.sports.includes(p.sport)
    const matchItem  = applied.items.includes(p.itemType)
    const matchCond  = applied.conds.length === 0 || (p.badge && applied.conds.map(c => c.toUpperCase()).includes(p.badge))
    const matchMin   = applied.min === '' || p.price >= Number(applied.min)
    const matchMax   = applied.max === '' || p.price <= Number(applied.max)
    return matchSport && matchItem && matchCond && matchMin && matchMax
  })

  if (sort === 'price-asc')  filtered = [...filtered].sort((a,b) => a.price - b.price)
  if (sort === 'price-desc') filtered = [...filtered].sort((a,b) => b.price - a.price)
  if (sort === 'newest')     filtered = [...filtered].sort((a,b) => b.id - a.id)

  return (
    <GearLayout>
      <div className="flex gap-0 min-h-[calc(100vh-56px-80px)] flex-col md:flex-row">

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside className="w-full md:w-64 shrink-0 px-6 py-8 bg-brand-50/50 border-r border-brand-200 md:border-b-0 border-b">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold tracking-tight text-brand-900">Filters</h3>
              {activeFilterCount > 0 && (
                <span className="bg-brand-900 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{activeFilterCount}</span>
              )}
            </div>
            <button onClick={handleReset} className="text-xs font-semibold text-brand-500 hover:text-brand-900 transition-colors">Reset</button>
          </div>

          {/* ── ITEM TYPE ──────────────────────────────── */}
          <div className="mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-400 mb-4">Item Type</p>
            <div className="flex flex-col gap-3">
              {itemTypes.map(it => (
                <label key={it} className="flex items-center gap-3 cursor-pointer group" htmlFor={`item-${it}`}>
                  <input type="checkbox" id={`item-${it}`} checked={selectedItems.includes(it)} onChange={() => toggle(selectedItems, setSelectedItems, it)} className="hidden" />
                  <span className={`w-5 h-5 border rounded shrink-0 transition-all flex items-center justify-center ${selectedItems.includes(it) ? 'bg-brand-900 border-brand-900 text-white' : 'border-brand-300 bg-white group-hover:border-brand-400'}`}>
                    {selectedItems.includes(it) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                  </span>
                  <span className={`text-sm flex-1 transition-colors ${selectedItems.includes(it) ? 'text-brand-900 font-semibold' : 'text-brand-600'}`}>{itemTypeIcons[it]} {it}</span>
                  <span className="text-xs text-brand-400 font-medium">
                    {products.filter(p => p.itemType === it).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ── SPORT ─────────────────────────────────── */}
          <div className="mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-400 mb-4">Sport</p>
            <div className="flex flex-col gap-3">
              {sports.map(s => (
                <label key={s} className="flex items-center gap-3 cursor-pointer group" htmlFor={`sport-${s}`}>
                  <input type="checkbox" id={`sport-${s}`} checked={selectedSports.includes(s)} onChange={() => toggle(selectedSports, setSelectedSports, s)} className="hidden" />
                  <span className={`w-5 h-5 border rounded shrink-0 transition-all flex items-center justify-center ${selectedSports.includes(s) ? 'bg-brand-900 border-brand-900 text-white' : 'border-brand-300 bg-white group-hover:border-brand-400'}`}>
                    {selectedSports.includes(s) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                  </span>
                  <span className={`text-sm flex-1 transition-colors ${selectedSports.includes(s) ? 'text-brand-900 font-semibold' : 'text-brand-600'}`}>{s}</span>
                  <span className="text-xs text-brand-400 font-medium">
                    {products.filter(p => p.sport === s).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ── CONDITION ─────────────────────────────── */}
          <div className="mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-400 mb-4">Condition</p>
            <div className="flex flex-wrap gap-2">
              {conditions.map(c => (
                <button key={c}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-all ${selectedConds.includes(c) ? 'bg-brand-900 border-brand-900 text-white shadow-sm' : 'bg-white border-brand-200 text-brand-600 hover:border-brand-300 hover:bg-brand-50'}`}
                  onClick={() => toggle(selectedConds, setSelectedConds, c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* ── PRICE ─────────────────────────────────── */}
          <div className="mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-400 mb-4">Price Range</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-brand-200 bg-white rounded-lg px-3 py-2.5 text-sm text-brand-500 flex-1 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all shadow-sm">
                <span className="mr-1 font-semibold">$</span>
                <input type="number" placeholder="Min" id="price-min" value={priceMin} onChange={e => setPriceMin(e.target.value)}
                  className="w-full border-none outline-none font-semibold bg-transparent text-brand-900 placeholder:text-brand-300 placeholder:font-normal" />
              </div>
              <span className="text-brand-300 font-medium">-</span>
              <div className="flex items-center border border-brand-200 bg-white rounded-lg px-3 py-2.5 text-sm text-brand-500 flex-1 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all shadow-sm">
                <span className="mr-1 font-semibold">$</span>
                <input type="number" placeholder="Max" id="price-max" value={priceMax} onChange={e => setPriceMax(e.target.value)}
                  className="w-full border-none outline-none font-semibold bg-transparent text-brand-900 placeholder:text-brand-300 placeholder:font-normal" />
              </div>
            </div>
          </div>

          <button onClick={handleApply} className="btn-primary w-full py-3.5 text-sm">
            Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </aside>

        {/* ── Main Content ──────────────────────────────────────────── */}
        <div className="flex-1 px-8 py-8 bg-brand-50/20">

          {/* Title + Controls */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold text-brand-900 mb-1">Catalog</h1>
              <p className="text-sm font-medium text-brand-500">
                Showing {filtered.length} high-performance gear
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex p-1 bg-brand-100 rounded-lg border border-brand-200">
                <button onClick={() => setViewMode('grid')}
                  className={`w-9 h-9 rounded-md flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-900 border border-brand-200' : 'text-brand-500 hover:text-brand-900'}`}
                  aria-label="Grid view">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
                </button>
                <button onClick={() => setViewMode('list')}
                  className={`w-9 h-9 rounded-md flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-brand-900 border border-brand-200' : 'text-brand-500 hover:text-brand-900'}`}
                  aria-label="List view">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </button>
              </div>
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="h-11 px-4 bg-white border border-brand-200 rounded-lg text-sm font-semibold text-brand-700 outline-none cursor-pointer hover:bg-brand-50 transition-colors shadow-sm focus:ring-2 focus:ring-accent/20">
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

          {/* Active filter tags */}
          {(applied.sports.length < sports.length || applied.items.length < itemTypes.length || applied.conds.length > 0 || applied.min || applied.max) && (
            <div className="flex flex-wrap gap-2 mb-8">
              {applied.items.length < itemTypes.length && applied.items.map(it => (
                <span key={it} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-900 text-white rounded-md text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  {itemTypeIcons[it]} {it}
                  <button onClick={() => { const n = applied.items.filter(x => x !== it); setSelectedItems(n); setApplied(a => ({...a, items: n})) }} className="text-brand-400 hover:text-white transition-colors ml-1">✕</button>
                </span>
              ))}
              {applied.conds.map(c => (
                <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  {c}
                  <button onClick={() => { const n = applied.conds.filter(x => x !== c); setSelectedConds(n); setApplied(a => ({...a, conds: n})) }} className="text-amber-500 hover:text-amber-900 transition-colors ml-1">✕</button>
                </span>
              ))}
              {(applied.min || applied.max) && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-100 text-brand-700 border border-brand-200 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  ${applied.min || '0'} – ${applied.max || '∞'}
                  <button onClick={() => { setPriceMin(''); setPriceMax(''); setApplied(a => ({...a, min: '', max: ''})) }} className="text-brand-400 hover:text-brand-900 transition-colors ml-1">✕</button>
                </span>
              )}
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-24 text-center bg-white rounded-2xl border border-brand-200 border-dashed">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-4 text-brand-300"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <h3 className="font-heading text-xl font-bold text-brand-900 mb-2">No gear found</h3>
              <p className="text-sm text-brand-500">We couldn't find anything matching your filters.</p>
              <button onClick={handleReset} className="mt-6 btn-primary px-6 py-2.5 text-sm">Clear all filters</button>
            </div>
          )}

          {/* Grid view */}
          {viewMode === 'grid' && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filtered.map(p => (
                <Link to={`/gear/catalog/${p.id}`} key={p.id} className="group bg-white rounded-2xl border border-brand-200 overflow-hidden no-underline text-inherit flex flex-col hover:border-brand-300 hover:shadow-lg transition-all duration-300">
                  <div className="relative h-56 overflow-hidden bg-brand-50">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {p.badge && <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm ${badgeStyles[p.badge.toLowerCase()] || ''}`}>{p.badge}</span>}
                    <button className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur border border-brand-200 flex items-center justify-center text-brand-400 hover:text-red-500 hover:bg-white transition-colors" aria-label="Wishlist">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-brand-400">{p.sport}</span>
                      <span className="text-xs font-semibold bg-brand-50 text-brand-600 rounded-md px-2 py-1">{itemTypeIcons[p.itemType]} {p.itemType}</span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-brand-900 leading-tight mb-4 group-hover:text-accent transition-colors">{p.name}</h3>
                    <div className="mt-auto flex items-end justify-between border-t border-brand-100 pt-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-1">{p.type === 'rental' ? 'Rent' : 'Buy'}</p>
                        <p className="text-xl font-bold text-brand-900">{p.priceLabel}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        {p.deposit && <span className="text-xs font-medium text-brand-500">Dep: {p.deposit}</span>}
                        {p.stock && <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md px-2 py-0.5">{p.stock}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* List view */}
          {viewMode === 'list' && filtered.length > 0 && (
            <div className="flex flex-col gap-4 mb-10">
              {filtered.map(p => (
                <Link to={`/gear/catalog/${p.id}`} key={p.id} className="group bg-white rounded-2xl border border-brand-200 overflow-hidden no-underline text-inherit flex hover:border-brand-300 hover:shadow-lg transition-all duration-300">
                  <img src={p.img} alt={p.name} className="w-48 h-full min-h-[160px] object-cover shrink-0" />
                  <div className="p-6 flex-1 flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-brand-400">{p.sport}</span>
                        <span className="text-xs font-semibold bg-brand-50 text-brand-600 rounded-md px-2 py-1">{itemTypeIcons[p.itemType]} {p.itemType}</span>
                        {p.badge && <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm ${badgeStyles[p.badge.toLowerCase()]}`}>{p.badge}</span>}
                      </div>
                      <h3 className="font-heading text-xl font-bold text-brand-900 mb-3 group-hover:text-accent transition-colors">{p.name}</h3>
                      {p.stock && <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md px-2 py-0.5">{p.stock}</span>}
                    </div>
                    <div className="text-right shrink-0 border-l border-brand-100 pl-8">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-1.5">{p.type === 'rental' ? 'Rental Rate' : 'Purchase'}</p>
                      <p className="text-3xl font-bold text-brand-900 mb-2">{p.priceLabel}</p>
                      {p.deposit && <p className="text-xs font-medium text-brand-500">Deposit: {p.deposit}</p>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-center gap-2">
              <button className="w-10 h-10 rounded-xl border border-brand-200 bg-white text-brand-500 hover:bg-brand-50 hover:text-brand-900 transition-colors flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="w-10 h-10 rounded-xl bg-brand-900 text-white font-bold text-sm shadow-sm">1</button>
              <button className="w-10 h-10 rounded-xl border border-brand-200 bg-white text-brand-700 font-bold text-sm hover:bg-brand-50 transition-colors">2</button>
              <button className="w-10 h-10 rounded-xl border border-brand-200 bg-white text-brand-700 font-bold text-sm hover:bg-brand-50 transition-colors">3</button>
              <span className="text-brand-400 font-bold px-2">...</span>
              <button className="w-10 h-10 rounded-xl border border-brand-200 bg-white text-brand-500 hover:bg-brand-50 hover:text-brand-900 transition-colors flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </GearLayout>
  )
}
