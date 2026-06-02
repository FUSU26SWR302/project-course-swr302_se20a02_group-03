import { useState } from 'react'
import { Link } from 'react-router-dom'

const steps = ['Shipping', 'Payment', 'Review']
const payMethods = ['Card', 'VNPay', 'MoMo', 'Wallet']

export default function ShopCheckoutPage() {
  const [step] = useState(0)
  const [delivery, setDelivery] = useState('express')
  const [payMethod, setPayMethod] = useState('Card')

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f9fc]">
      {/* Mini header */}
      <header className="h-14 bg-white border-b border-[#e0ecf0] flex items-center justify-center">
        <Link to="/shop" className="font-oswald text-xl font-bold text-[#0d2d3a] tracking-wider no-underline">PRO-SPORT</Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-7 max-w-[1100px] my-8 mx-auto px-6 flex-1 items-start w-full">
        <div className="flex flex-col gap-5">
          {/* Steps */}
          <div className="flex items-center mb-2">
            {steps.map((s, i) => (
              <div key={s} className={`flex items-center gap-2 flex-1 ${i <= step ? 'text-[#0d8a8a]' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i <= step ? 'bg-[#0d8a8a] text-white' : 'bg-[#e0ecf0] text-[#94a3b8]'}`}>{i + 1}</div>
                <span className={`text-xs font-semibold ${i <= step ? 'text-[#0d8a8a]' : 'text-[#94a3b8]'}`}>{s}</span>
                {i < steps.length - 1 && <div className={`flex-1 h-[1.5px] mx-2 ${i < step ? 'bg-[#0d8a8a]' : 'bg-[#e0ecf0]'}`} />}
              </div>
            ))}
          </div>

          {/* Shipping Info */}
          <div className="bg-white rounded-[14px] p-6 border-[1.5px] border-[#e0ecf0]">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#0d2d3a] mb-5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              Shipping Information
            </h2>
            <div className="grid grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.78rem] font-semibold text-[#94a3b8]" htmlFor="s-fname">First Name</label>
                <input id="s-fname" type="text" defaultValue="John" className="border-[1.5px] border-[#e0ecf0] rounded-lg px-3 py-2.5 font-sans text-sm text-[#0d2d3a] outline-none transition-colors focus:border-[#0d8a8a]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.78rem] font-semibold text-[#94a3b8]" htmlFor="s-lname">Last Name</label>
                <input id="s-lname" type="text" defaultValue="Doe" className="border-[1.5px] border-[#e0ecf0] rounded-lg px-3 py-2.5 font-sans text-sm text-[#0d2d3a] outline-none transition-colors focus:border-[#0d8a8a]" />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[0.78rem] font-semibold text-[#94a3b8]" htmlFor="s-email">Email Address</label>
                <input id="s-email" type="email" defaultValue="john.doe@example.com" className="border-[1.5px] border-[#e0ecf0] rounded-lg px-3 py-2.5 font-sans text-sm text-[#0d2d3a] outline-none transition-colors focus:border-[#0d8a8a]" />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[0.78rem] font-semibold text-[#94a3b8]" htmlFor="s-address">Street Address</label>
                <input id="s-address" type="text" defaultValue="123 Performance Way" className="border-[1.5px] border-[#e0ecf0] rounded-lg px-3 py-2.5 font-sans text-sm text-[#0d2d3a] outline-none transition-colors focus:border-[#0d8a8a]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.78rem] font-semibold text-[#94a3b8]" htmlFor="s-city">City</label>
                <input id="s-city" type="text" defaultValue="Athletica" className="border-[1.5px] border-[#e0ecf0] rounded-lg px-3 py-2.5 font-sans text-sm text-[#0d2d3a] outline-none transition-colors focus:border-[#0d8a8a]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.78rem] font-semibold text-[#94a3b8]" htmlFor="s-zip">Postal Code</label>
                <input id="s-zip" type="text" defaultValue="10000" className="border-[1.5px] border-[#e0ecf0] rounded-lg px-3 py-2.5 font-sans text-sm text-[#0d2d3a] outline-none transition-colors focus:border-[#0d8a8a]" />
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-[14px] p-6 border-[1.5px] border-[#e0ecf0]">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#0d2d3a] mb-5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Delivery Method
            </h2>
            {[{id:'express',label:'Express Delivery',sub:'1-2 Business Days',price:'$15.00'},{id:'standard',label:'Standard Delivery',sub:'3-5 Business Days',price:'Free'}].map(d => (
              <label key={d.id} className={`flex items-center gap-3.5 border-[1.5px] rounded-lg p-3.5 px-4 cursor-pointer mb-2 transition-all duration-200 ${delivery === d.id ? 'border-[#0d8a8a] bg-[#0d8a8a]/[0.04]' : 'border-[#e0ecf0]'}`} htmlFor={`del-${d.id}`}>
                <input type="radio" id={`del-${d.id}`} name="delivery" value={d.id} checked={delivery === d.id} onChange={() => setDelivery(d.id)} className="hidden" />
                <div>
                  <p className="text-sm font-bold text-[#0d2d3a]">{d.label}</p>
                  <p className="text-[0.78rem] text-[#94a3b8] mt-0.5">{d.sub}</p>
                </div>
                <span className="ml-auto text-sm font-bold text-[#0d2d3a]">{d.price}</span>
              </label>
            ))}
          </div>

          {/* Payment */}
          <div className="bg-white rounded-[14px] p-6 border-[1.5px] border-[#e0ecf0]">
            <h2 className="flex items-center gap-2 text-base font-bold text-[#0d2d3a] mb-5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Payment Method
            </h2>
            <div className="flex gap-2.5 mb-4 flex-wrap">
              {payMethods.map(m => (
                <button key={m} className={`flex flex-col items-center gap-1.5 border-[1.5px] rounded-lg p-3 px-4 bg-white cursor-pointer font-sans text-[0.78rem] font-semibold transition-all duration-200 min-w-[72px] ${payMethod === m ? 'border-[#0d8a8a] text-[#0d8a8a] bg-[#0d8a8a]/5' : 'border-[#e0ecf0] text-[#64748b] hover:border-[#0d8a8a] hover:text-[#0d8a8a]'}`} onClick={() => setPayMethod(m)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  <span>{m}</span>
                </button>
              ))}
            </div>
            {payMethod === 'Card' && (
              <div className="border-[1.5px] border-[#e0ecf0] rounded-lg p-4 flex flex-col gap-3.5">
                <div className="flex flex-col gap-1.5 col-span-2">
                  <label className="text-[0.78rem] font-semibold text-[#94a3b8]" htmlFor="card-num">Card Number</label>
                  <div className="flex items-center gap-2 border-[1.5px] border-[#e0ecf0] rounded-lg px-3 py-2.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    <input id="card-num" type="text" placeholder="0000 0000 0000 0000" className="border-none outline-none flex-1 font-sans text-sm text-[#0d2d3a]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.78rem] font-semibold text-[#94a3b8]" htmlFor="expiry">Expiry Date</label>
                    <input id="expiry" type="text" placeholder="MM/YY" className="border-[1.5px] border-[#e0ecf0] rounded-lg px-3 py-2.5 font-sans text-sm text-[#0d2d3a] outline-none transition-colors focus:border-[#0d8a8a]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.78rem] font-semibold text-[#94a3b8]" htmlFor="cvc">CVC</label>
                    <input id="cvc" type="text" placeholder="123" className="border-[1.5px] border-[#e0ecf0] rounded-lg px-3 py-2.5 font-sans text-sm text-[#0d2d3a] outline-none transition-colors focus:border-[#0d8a8a]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-[14px] p-6 border-[1.5px] border-[#e0ecf0] md:sticky md:top-6">
          <h2 className="text-base font-bold text-[#0d2d3a] mb-4">Order Summary</h2>
          {[{name:'Aero-Dash Elite 2.0',meta:'Size: 10 | Color: Neon',price:'$185.00',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80'},{name:'Compression Pro Tights',meta:'Size: M | Color: Obsidian',price:'$75.00',img:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=100&q=80'}].map(item => (
            <div key={item.name} className="flex items-center gap-3 py-2.5 border-b border-[#f0f5f9]">
              <img src={item.img} alt={item.name} className="w-[46px] h-[46px] rounded-lg object-cover shrink-0" />
              <div>
                <p className="text-[0.85rem] font-bold text-[#0d2d3a]">{item.name}</p>
                <p className="text-[0.75rem] text-[#94a3b8]">{item.meta}</p>
              </div>
              <span className="ml-auto text-[0.85rem] font-semibold text-[#0d2d3a] whitespace-nowrap">{item.price}</span>
            </div>
          ))}
          <div className="flex flex-col gap-2 my-3.5 pt-2">
            <div className="flex justify-between text-[0.82rem] text-[#64748b]"><span>Subtotal</span><span>$260.00</span></div>
            <div className="flex justify-between text-[0.82rem] text-[#64748b]"><span>Shipping (Express)</span><span>$15.00</span></div>
            <div className="flex justify-between text-[0.82rem] text-[#64748b]"><span>Tax</span><span>$22.00</span></div>
          </div>
          <div className="flex justify-between text-base font-bold text-[#0d2d3a] my-3.5 pt-3 border-t-[1.5px] border-[#e0ecf0]">
            <span>Total</span>
            <span className="text-[#0d8a8a] text-[1.15rem]">$297.00</span>
          </div>
          <button className="bg-[#0d8a8a] hover:bg-[#0b7373] text-white font-semibold flex items-center justify-center w-full gap-2 p-3.5 rounded-full text-[0.95rem] border-none cursor-pointer transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Confirm Purchase
          </button>
          <p className="flex items-center justify-center gap-1.5 text-[0.78rem] text-[#94a3b8] mt-2.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Secure SSL Encrypted Checkout
          </p>
        </div>
      </div>

      <footer className="bg-[#0d1a24] text-white/55 flex flex-col md:flex-row items-center justify-between p-4.5 px-10 text-xs gap-5">
        <span className="font-oswald text-base font-bold text-white">PRO-SPORT</span>
        <p>© 2024 PRO-SPORT. Engineered for Elite Performance.</p>
        <div>
          <a href="#" className="text-white/55 no-underline ml-3 hover:text-[#0fc8b5]">Privacy</a>
          <a href="#" className="text-white/55 no-underline ml-3 hover:text-[#0fc8b5]">Terms</a>
        </div>
      </footer>
    </div>
  )
}

