import { useState } from 'react'
import { Link } from 'react-router-dom'
import ShopLayout from '../../layouts/ShopLayout'

const initItems = [
  { id: 1, name: 'AeroSprint Pro Elite', color: 'Crimson/Neon', size: '10.5 US', price: 189.99, qty: 1, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80' },
  { id: 2, name: 'CoreKnit Performance Tee', color: 'Deep Navy', size: 'L', price: 45.00, qty: 2, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80' },
]

export default function ShopCartPage() {
  const [items, setItems] = useState(initItems)
  const [promo, setPromo] = useState('')

  const updateQty = (id, delta) => {
    setItems(items.map(item => item.id === id ? {...item, qty: Math.max(1, item.qty + delta)} : item))
  }

  const removeItem = (id) => setItems(items.filter(i => i.id !== id))

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = 15.00
  const tax = 23.10
  const total = subtotal + shipping + tax

  return (
    <ShopLayout>
      <div className="px-5 md:px-10 py-8 pb-15 max-w-[1100px] mx-auto">
        <h1 className="font-oswald text-3xl font-bold text-[#0d2d3a] mb-6">Your Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-7 items-start">
          {/* Items */}
          <div className="flex flex-col gap-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 bg-white rounded-[14px] p-4.5 border-[1.5px] border-[#e0ecf0]">
                <img src={item.img} alt={item.name} className="w-[90px] h-[90px] rounded-[10px] object-cover shrink-0 bg-[#f5f9fc]" />
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[0.95rem] font-bold text-[#0d2d3a] mb-1">{item.name}</h3>
                      <p className="text-xs text-[#94a3b8]">Color: {item.color}</p>
                      <p className="text-xs text-[#94a3b8]">Size: {item.size}</p>
                    </div>
                    <span className="text-base font-bold text-[#0d8a8a] whitespace-nowrap">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 border-[1.5px] border-[#e0ecf0] rounded-full py-1.5 px-3.5">
                      <button onClick={() => updateQty(item.id, -1)} className="bg-transparent border-none cursor-pointer text-base text-[#64748b] leading-none font-sans transition-colors hover:text-[#0d8a8a]" aria-label="Decrease">-</button>
                      <span className="text-sm font-bold text-[#0d2d3a] min-w-[20px] text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="bg-transparent border-none cursor-pointer text-base text-[#64748b] leading-none font-sans transition-colors hover:text-[#0d8a8a]" aria-label="Increase">+</button>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-transparent border-none cursor-pointer text-[0.82rem] text-[#94a3b8] font-sans flex items-center gap-1 hover:text-red-500">♡ Save</button>
                      <button className="bg-transparent border-none cursor-pointer text-[0.82rem] text-red-500 font-sans flex items-center gap-1" onClick={() => removeItem(item.id)}>🗑 Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-[14px] p-6 border-[1.5px] border-[#e0ecf0] md:sticky md:top-20">
            <h2 className="font-oswald text-[1.2rem] font-bold text-[#0d2d3a] mb-5">Order Summary</h2>
            <div className="flex flex-col gap-2.5 mb-4 border-b border-[#f0f5f9] pb-4">
              <div className="flex justify-between text-[0.875rem] text-[#64748b]"><span>Subtotal ({items.length} items)</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-[0.875rem] text-[#64748b]"><span>Estimated Shipping</span><span>${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between text-[0.875rem] text-[#64748b]"><span>Estimated Tax</span><span>${tax.toFixed(2)}</span></div>
            </div>
            <div className="flex justify-between text-base font-bold text-[#0d2d3a] my-4">
              <span>Total</span>
              <span className="text-[#0d8a8a] text-[1.15rem]">${total.toFixed(2)}</span>
            </div>
            <div className="mb-5">
              <p className="text-xs font-semibold text-[#64748b] mb-2">Apply Promo Code</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter code" id="promo-code" value={promo} onChange={e => setPromo(e.target.value)} className="flex-1 border-[1.5px] border-[#e0ecf0] rounded-lg px-3 py-2 font-sans text-[0.85rem] outline-none transition-colors focus:border-[#0d8a8a]" />
                <button className="bg-white border-[1.5px] border-[#e0ecf0] rounded-lg px-3.5 py-2 font-sans text-[0.85rem] font-semibold text-[#0d2d3a] cursor-pointer transition-colors hover:border-[#0d8a8a] hover:text-[#0d8a8a]">Apply</button>
              </div>
            </div>
            <Link to="/shop/checkout" className="bg-[#0d8a8a] hover:bg-[#0b7373] text-white font-semibold flex items-center justify-center w-full rounded-full p-[13px] text-[0.95rem] transition-colors border-none no-underline">
              Proceed to Checkout →
            </Link>
          </div>
        </div>
      </div>
    </ShopLayout>
  )
}

