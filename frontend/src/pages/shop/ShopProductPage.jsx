import { useState } from 'react'
import ShopLayout from '../../layouts/ShopLayout'

const colors = [
  { name: 'Neon Blue / Ice White', hex: '#00b4d8' },
  { name: 'Midnight Black', hex: '#1a1a2e' },
  { name: 'Coral Orange', hex: '#f4845f' },
]

const sizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5]

const specs = [
  { label: 'Weight', value: '210g (Size 9)' },
  { label: 'Drop', value: '8mm' },
  { label: 'Cushioning', value: 'Max - React Foam+', highlight: true },
  { label: 'Plate', value: 'Full-length Carbon Fiber', highlight: true },
]

const thumbs = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80',
  'https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=200&q=80',
  'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=200&q=80',
]

export default function ShopProductPage() {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(9.5)
  const [activeThumb, setActiveThumb] = useState(0)
  const [specsOpen, setSpecsOpen] = useState(true)

  return (
    <ShopLayout>
      <div className="px-5 md:px-10 py-5 pb-15 max-w-[1200px] mx-auto">
        {/* Breadcrumb */}
        <div className="text-xs text-[#94a3b8] mb-5">
          <a href="#" className="text-[#0d8a8a] no-underline hover:underline">Home</a> › <a href="#" className="text-[#0d8a8a] no-underline hover:underline">Shoes</a> › <span className="text-[#64748b]">AeroPulse Elite X</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Gallery */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-[#f5f9fc] aspect-square mb-3">
              <img src={thumbs[activeThumb]} alt="Product" className="w-full h-full object-cover" />
              <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white border border-[#e0ecf0] cursor-pointer flex items-center justify-center text-[#94a3b8] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-200 hover:text-[#ef4444] hover:border-[#ef4444]" aria-label="Save">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            <div className="flex gap-2">
              {thumbs.map((t, i) => (
                <button key={i} className={`w-[72px] h-[72px] rounded-[10px] border-2 overflow-hidden cursor-pointer p-0 bg-[#f5f9fc] transition-colors duration-200 ${activeThumb === i ? 'border-[#0d8a8a]' : 'border-[#e0ecf0]'}`} onClick={() => setActiveThumb(i)}>
                  <img src={t} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="font-oswald text-3xl font-bold text-[#0d2d3a] mb-1.5">AeroPulse Elite X</h1>
            <p className="text-sm text-[#0d8a8a] mb-4">Professional Grade Marathon Footwear</p>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-oswald text-3xl font-bold text-[#0d2d3a]">$249.99</span>
              <span className="text-[0.82rem] bg-[#f59e0b]/10 text-[#f59e0b] px-2.5 py-1 rounded-full font-semibold">★ 4.9 (128 Reviews)</span>
            </div>

            {/* Color */}
            <div className="mb-5">
              <p className="text-[0.85rem] font-semibold text-[#0d2d3a] mb-2.5">Color: <span className="text-[#0d8a8a] font-normal">{colors[selectedColor].name}</span></p>
              <div className="flex gap-2">
                {colors.map((c, i) => (
                  <button
                    key={i}
                    className={`w-7 h-7 rounded-full border-[2.5px] cursor-pointer transition-all duration-200 ${selectedColor === i ? 'border-[#0d2d3a] shadow-[0_0_0_2px_white,0_0_0_4px_#0d2d3a]' : 'border-transparent'}`}
                    style={{background: c.hex}}
                    onClick={() => setSelectedColor(i)}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2.5">
                <p className="text-[0.85rem] font-semibold text-[#0d2d3a]">Size (US Men's)</p>
                <a href="#" className="text-xs text-[#0d8a8a] hover:underline">Size Guide</a>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {sizes.map(s => (
                  <button
                    key={s}
                    className={`p-2 border-[1.5px] rounded-lg font-sans text-sm font-medium cursor-pointer transition-all duration-200 ${selectedSize === s ? 'bg-[#0d2d3a] border-[#0d2d3a] text-white' : s === 11 ? 'opacity-35 cursor-not-allowed line-through border-[#e0ecf0] bg-white text-[#0d2d3a]' : 'border-[#e0ecf0] bg-white text-[#0d2d3a] hover:border-[#0d8a8a] hover:text-[#0d8a8a]'}`}
                    onClick={() => s !== 11 && setSelectedSize(s)}
                    disabled={s === 11}
                  >{s}</button>
                ))}
              </div>
              <p className="flex items-center gap-1.5 text-[0.82rem] text-green-500">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                In Stock & Ready to Ship
              </p>
            </div>

            {/* CTAs */}
            <button className="bg-[#0d8a8a] hover:bg-[#0b7373] text-white font-semibold flex items-center justify-center w-full gap-2 p-3.5 text-[0.95rem] mt-5 rounded-full transition-colors cursor-pointer border-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Add to Cart
            </button>
            <button className="w-full bg-white border-[1.5px] border-[#0d2d3a] text-[#0d2d3a] p-[13px] rounded-full font-sans text-[0.95rem] font-semibold cursor-pointer mt-2.5 transition-all duration-200 hover:bg-[#0d2d3a] hover:text-white">Buy Now with FastPay</button>

            {/* Specs */}
            <div className="mt-6 border-[1.5px] border-[#e0ecf0] rounded-xl overflow-hidden">
              <button className="w-full flex justify-between items-center p-3.5 px-4.5 bg-transparent border-none font-sans text-sm font-semibold text-[#0d8a8a] cursor-pointer" onClick={() => setSpecsOpen(!specsOpen)}>
                <span>Technical Specifications</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{transform: specsOpen ? 'rotate(180deg)' : 'none', transition: '0.2s'}}><polyline points="18 15 12 9 6 15"/></svg>
              </button>
              {specsOpen && (
                <div className="px-4.5 pb-3">
                  {specs.map(s => (
                    <div key={s.label} className="flex justify-between py-2.5 border-t border-[#f0f5f9] text-sm">
                      <span className="text-[#64748b]">{s.label}</span>
                      <span className={`font-semibold ${s.highlight ? 'text-[#0d8a8a]' : 'text-[#0d2d3a]'}`}>{s.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}

