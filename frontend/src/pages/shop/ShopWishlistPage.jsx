import ShopLayout from '../../layouts/ShopLayout'

const items = [
  {
    id: 1,
    name: 'Aero-Swift Pro Elite Run',
    sub: "Men's Road Racing Shoes",
    price: '$240.00',
    badge: 'IN STOCK',
    badgeColor: '#22c55e',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  },
  {
    id: 2,
    name: 'PulseTrack V4 Biometric Watch',
    sub: 'Performance Wearable',
    price: '$299.00',
    oldPrice: '$350.00',
    badge: 'PRICE DROP',
    badgeColor: '#ef4444',
    img: 'https://images.unsplash.com/photo-1523475496153-3d6cc0a9bf63?w=400&q=80',
  },
]

export default function ShopWishlistPage() {
  return (
    <ShopLayout>
      <div className="px-5 md:px-10 py-7 pb-15 max-w-[1000px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-7 gap-4">
          <div>
            <h1 className="font-oswald text-3xl font-bold text-[#0d2d3a]">My Wishlist</h1>
            <p className="text-[0.85rem] text-[#64748b] mt-1">{items.length} items saved. Keep track of your elite gear.</p>
          </div>
          <div className="flex gap-2.5">
            <button className="inline-flex gap-1.5 items-center px-4 py-2 border border-[#e0ecf0] hover:border-[#0d8a8a] hover:text-[#0d8a8a] rounded-lg text-sm transition-colors text-[#0d2d3a] font-semibold bg-white cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Share Wishlist
            </button>
            <button className="px-4 py-2 bg-[#0d8a8a] hover:bg-[#0b7373] text-white rounded-lg text-sm font-semibold transition-colors border-none cursor-pointer">Move All to Cart</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4.5">
          {items.map(item => (
            <div key={item.id} className="group bg-white rounded-[14px] border-[1.5px] border-[#e0ecf0] overflow-hidden transition-all duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <div className="relative h-[180px] overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105" />
                {item.badge && (
                  <span className="absolute top-2.5 left-2.5 text-[0.65rem] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase" style={{background: item.badgeColor + '22', color: item.badgeColor, border: `1px solid ${item.badgeColor}44`}}>
                    {item.badge}
                  </span>
                )}
                <button className="absolute top-2 right-2 w-[26px] h-[26px] rounded-full bg-white/90 border border-[#e0ecf0] cursor-pointer text-base flex items-center justify-center text-[#94a3b8] transition-all duration-200 hover:bg-red-500 hover:text-white hover:border-red-500" aria-label="Remove">×</button>
              </div>
              <div className="p-3.5">
                <h3 className="text-sm font-bold text-[#0d2d3a] mb-1 line-clamp-2 leading-snug">{item.name}</h3>
                <p className="text-[0.78rem] text-[#94a3b8] mb-3">{item.sub}</p>
                <div className="flex items-center justify-between">
                  <div>
                    {item.oldPrice && <span className="text-xs text-[#94a3b8] line-through block mb-0.5">{item.oldPrice}</span>}
                    <span className="text-base font-bold" style={item.oldPrice ? {color:'#ef4444'} : {color: '#0d8a8a'}}>{item.price}</span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-[#0d8a8a]/10 border-none cursor-pointer flex items-center justify-center text-[#0d8a8a] transition-all duration-200 hover:bg-[#0d8a8a] hover:text-white" aria-label="Add to cart">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ShopLayout>
  )
}

