import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const court = {
  id: 1,
  name: 'The Apex Pavilion – Court A',
  sport: 'Cầu lông / Pickleball',
  type: 'Indoor • Có điều hoà',
  address: 'Lê Văn Lộc, Quận 7, TP.HCM',
  rating: 4.9,
  reviews: 124,
  pricePerSlot: 120000,
  images: [
    'https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=900&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80',
    'https://images.unsplash.com/photo-1551958219-acbc595b39c6?w=600&q=80',
  ],
  amenities: [
    { label: 'WiFi', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg> },
    { label: 'Bãi giữ xe', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
    { label: 'Phòng thay đồ', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { label: 'Máy lạnh', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/></svg> },
    { label: 'Cho thuê vợt', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12 4-8 4 8"/><path d="M12 4v16"/></svg> },
    { label: 'Nước uống', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  ],
  description: 'Sân thi đấu tiêu chuẩn quốc tế, mặt sàn BWF cấp 1, hệ thống ánh sáng LED 800 lux. Phù hợp cho cả tập luyện lẫn thi đấu chuyên nghiệp. Môi trường thoáng đãng, cơ sở vật chất hiện đại bậc nhất khu vực.',
}

const HOURS = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00']
const BOOKED = ['09:00','10:00','14:00','15:00','20:00']

export default function CourtDetailPage() {
  const { id } = useParams()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(null)

  return (
    <div className="flex flex-col min-h-screen bg-brand-50">
      <Navbar theme="light" />

      <main className="flex-1 max-w-[1180px] mx-auto px-6 pt-28 pb-24 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2.5 text-xs font-semibold tracking-wide uppercase text-brand-400 mb-8">
          <Link to="/" className="hover:text-accent transition-colors duration-200">Trang chủ</Link>
          <span className="text-brand-300">/</span>
          <Link to="/courts" className="hover:text-accent transition-colors duration-200">Sân bãi</Link>
          <span className="text-brand-300">/</span>
          <span className="text-brand-900">{court.name}</span>
        </nav>

        {/* ── BENTO GALLERY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-14 h-[460px]">
          {/* Main Large Image */}
          <div className="relative rounded-3xl overflow-hidden bg-brand-200 group">
            <img 
              src={court.images[activeImg]} 
              alt={court.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute top-5 left-5 bg-accent/90 backdrop-blur-md text-white text-[0.7rem] font-bold tracking-[0.1em] px-3.5 py-1.5 rounded-lg uppercase shadow-lg shadow-accent/20">
              OPEN NOW
            </span>
          </div>
          
          {/* Side Thumbnails */}
          <div className="hidden lg:grid grid-rows-3 gap-4 h-full">
            {court.images.slice(1, 4).map((img, i) => {
              const realIndex = i + 1;
              const isActive = activeImg === realIndex;
              return (
                <button 
                  key={img} 
                  onClick={() => setActiveImg(realIndex)}
                  className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 h-full w-full group ${isActive ? 'border-accent shadow-md shadow-accent/10' : 'border-transparent opacity-80 hover:opacity-100 hover:border-brand-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {isActive && <div className="absolute inset-0 bg-accent/10" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Mobile Gallery Thumbs (if screen is small) */}
        <div className="flex lg:hidden gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {court.images.map((img, i) => (
            <button key={img} onClick={() => setActiveImg(i)}
              className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${activeImg === i ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
          {/* ── LEFT CONTENT ── */}
          <div className="flex flex-col gap-12">
            {/* Header & Meta */}
            <div>
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <h1 className="font-heading text-[clamp(2rem,3vw,2.8rem)] font-bold text-brand-900 tracking-tight leading-[1.1]">{court.name}</h1>
                  <p className="text-brand-500 text-[0.95rem] mt-3 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {court.sport}
                    <span className="text-brand-300 mx-1">/</span>
                    {court.type}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-white border border-brand-200/60 shadow-sm rounded-2xl px-4 py-2.5">
                  <span className="text-amber-500 text-lg leading-none">★</span>
                  <span className="font-bold text-brand-900 text-lg leading-none">{court.rating}</span>
                  <span className="text-brand-400 text-xs font-medium ml-1">({court.reviews} đánh giá)</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2.5 text-brand-500 text-sm mb-7 pb-7 border-b border-brand-200/60">
                <svg className="text-brand-400 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {court.address}
              </div>

              <p className="text-brand-600 text-base leading-[1.85]">{court.description}</p>
            </div>

            {/* Amenities Grid */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-brand-900 tracking-tight mb-6">Tiện ích sân</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
                {court.amenities.map(a => (
                  <div key={a.label} className="group flex items-center gap-3.5 bg-white border border-brand-200/50 p-4 rounded-2xl transition-all duration-300 hover:shadow-md hover:shadow-brand-900/5 hover:border-brand-300/50 hover:-translate-y-0.5">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-200/50 text-brand-500 flex items-center justify-center shrink-0 group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300">
                      {a.icon}
                    </div>
                    <span className="text-sm font-semibold text-brand-800">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-brand-900 tracking-tight mb-1.5">Lịch trống hôm nay</h2>
                  <p className="text-brand-500 text-sm">Chọn khung giờ để đặt sân</p>
                </div>
                {/* Legend */}
                <div className="hidden sm:flex gap-5 text-xs font-medium text-brand-500">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-white border border-brand-300 inline-block"/> Trống</span>
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-brand-100 inline-block"/> Đã đặt</span>
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-accent inline-block shadow-sm shadow-accent/30"/> Đang chọn</span>
                </div>
              </div>
              
              <div className="bg-white p-7 rounded-3xl border border-brand-200/60 shadow-sm">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                  {HOURS.map(h => {
                    const booked = BOOKED.includes(h)
                    const selected = selectedSlot === h
                    return (
                      <button key={h} disabled={booked}
                        onClick={() => setSelectedSlot(h)}
                        className={`py-3.5 rounded-xl text-sm font-bold transition-all duration-300 border-2
                          ${booked ? 'bg-brand-50 text-brand-300 border-transparent cursor-not-allowed opacity-60' :
                            selected ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20 scale-[1.02] -translate-y-px' :
                            'bg-white text-brand-700 border-brand-200/70 hover:border-accent hover:text-accent hover:bg-accent/5 hover:-translate-y-px'}`}>
                        {h}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL (Booking Widget) ── */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl p-7 lg:p-8 border border-brand-200/60 shadow-xl shadow-brand-900/5 relative overflow-hidden">
              {/* Subtle accent line on top */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent to-indigo-400" />
              
              <div className="mb-8">
                <p className="text-brand-500 text-xs font-semibold tracking-wider uppercase mb-1.5">Giá mỗi slot (90 phút)</p>
                <p className="font-heading text-4xl font-bold text-brand-900 tracking-tight flex items-baseline gap-1.5">
                  {court.pricePerSlot.toLocaleString('vi-VN')} 
                  <span className="text-[1.1rem] font-medium text-brand-400 font-sans tracking-normal">VNĐ</span>
                </p>
              </div>

              {/* Selected state info */}
              <div className={`transition-all duration-500 overflow-hidden ${selectedSlot ? 'max-h-32 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
                <div className="bg-accent/5 border border-accent/20 rounded-2xl p-4">
                  <p className="text-[0.7rem] font-bold tracking-wider uppercase text-accent mb-1.5">Khung giờ đã chọn</p>
                  <p className="font-heading text-xl font-bold text-brand-900 mb-0.5">{selectedSlot} – {HOURS[HOURS.indexOf(selectedSlot) + 1] || '22:00'}</p>
                  <p className="text-brand-500 text-xs font-medium">Hôm nay • {court.name}</p>
                </div>
              </div>

              {/* Placeholder when unselected */}
              <div className={`transition-all duration-500 overflow-hidden ${!selectedSlot ? 'max-h-16 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'}`}>
                <div className="bg-brand-50 border border-dashed border-brand-200 rounded-2xl py-3.5 text-center">
                  <p className="text-brand-400 text-xs font-medium">← Vui lòng chọn khung giờ trống</p>
                </div>
              </div>

              {/* Book Button */}
              <Link
                to={selectedSlot ? `/courts/${id}/book?slot=${selectedSlot}` : '#'}
                onClick={e => !selectedSlot && e.preventDefault()}
                className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-semibold text-[0.95rem] transition-all duration-300 active:scale-[0.98]
                  ${selectedSlot ? 'bg-brand-900 hover:bg-brand-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5' : 'bg-brand-100 text-brand-400 cursor-not-allowed'}`}>
                {selectedSlot ? 'Đặt Sân Ngay' : 'Chọn Giờ Đặt Sân'}
                {selectedSlot && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>}
              </Link>

              <p className="text-center text-brand-400 text-[0.7rem] font-medium mt-4 uppercase tracking-wider">
                Thanh toán an toàn qua Ví Escrow / VNPay
              </p>

              {/* Receipt / Invoice Preview */}
              <div className={`transition-all duration-700 ease-in-out overflow-hidden border-t border-brand-100 ${selectedSlot ? 'max-h-48 mt-6 pt-6 opacity-100' : 'max-h-0 mt-0 pt-0 opacity-0'}`}>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-[0.9rem]">
                    <span className="text-brand-500 font-medium">Phí thuê sân</span>
                    <span className="font-semibold text-brand-900">{court.pricePerSlot.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center text-[0.9rem]">
                    <span className="text-brand-500 font-medium flex items-center gap-1.5">
                      Phí dịch vụ 
                      <span className="bg-brand-100 text-brand-500 text-[0.65rem] font-bold px-1.5 py-0.5 rounded">5%</span>
                    </span>
                    <span className="font-semibold text-brand-900">{(court.pricePerSlot * 0.05).toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center text-[1.05rem] border-t border-brand-200/60 pt-4 mt-2">
                    <span className="font-bold text-brand-900">Tổng cộng</span>
                    <span className="font-heading text-2xl font-bold text-accent">{(court.pricePerSlot * 1.05).toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  )
}
