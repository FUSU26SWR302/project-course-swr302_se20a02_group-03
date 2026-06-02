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
  amenities: ['WiFi', 'Bãi giữ xe', 'Phòng thay đồ', 'Máy lạnh', 'Cho thuê vợt', 'Nước uống'],
  description: 'Sân thi đấu tiêu chuẩn quốc tế, mặt sàn BWF cấp 1, hệ thống ánh sáng LED 800 lux. Phù hợp cho cả tập luyện lẫn thi đấu chuyên nghiệp.',
}

const HOURS = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00']
const BOOKED = ['09:00','10:00','14:00','15:00','20:00']

export default function CourtDetailPage() {
  const { id } = useParams()
  const [activeImg, setActiveImg] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(null)

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f9fb]">
      <Navbar theme="light" />

      <div className="max-w-[1180px] mx-auto px-6 pt-[90px] pb-20 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link to="/" className="hover:text-[#00c8aa]">Trang chủ</Link>
          <span>/</span>
          <Link to="/courts" className="hover:text-[#00c8aa]">Sân bãi</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium">{court.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left */}
          <div>
            {/* Gallery */}
            <div className="rounded-2xl overflow-hidden mb-4 aspect-[16/9] bg-slate-200">
              <img src={court.images[activeImg]} alt={court.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3 mb-6">
              {court.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImg === i ? 'border-[#00c8aa] scale-105' : 'border-transparent opacity-60 hover:opacity-90'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Info */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-6">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                <div>
                  <h1 className="font-['Oswald'] text-2xl font-bold text-slate-900">{court.name}</h1>
                  <p className="text-slate-500 text-sm mt-1">{court.sport} • {court.type}</p>
                  <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {court.address}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 rounded-full px-3 py-1.5">
                  <span className="text-amber-500 text-sm">★</span>
                  <span className="font-bold text-slate-800 text-sm">{court.rating}</span>
                  <span className="text-slate-400 text-xs">({court.reviews} đánh giá)</span>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{court.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-6">
              <h2 className="font-semibold text-slate-900 mb-4">Tiện ích</h2>
              <div className="flex flex-wrap gap-2">
                {court.amenities.map(a => (
                  <span key={a} className="bg-[#00c8aa]/8 text-[#00897b] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#00c8aa]/20">{a}</span>
                ))}
              </div>
            </div>

            {/* Time Slot Grid */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="font-semibold text-slate-900 mb-1">Lịch trống hôm nay</h2>
              <p className="text-slate-400 text-xs mb-4">Chọn khung giờ để đặt sân</p>
              <div className="grid grid-cols-5 gap-2">
                {HOURS.map(h => {
                  const booked = BOOKED.includes(h)
                  const selected = selectedSlot === h
                  return (
                    <button key={h} disabled={booked}
                      onClick={() => setSelectedSlot(h)}
                      className={`py-2.5 rounded-xl text-xs font-semibold transition-all border
                        ${booked ? 'bg-slate-100 text-slate-300 cursor-not-allowed border-transparent' :
                          selected ? 'bg-[#00c8aa] text-white border-[#00c8aa] shadow-md' :
                          'bg-white text-slate-700 border-slate-200 hover:border-[#00c8aa] hover:text-[#00c8aa]'}`}>
                      {h}
                    </button>
                  )
                })}
              </div>
              <div className="flex gap-4 mt-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-white border border-slate-200 inline-block"/> Còn trống</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-100 inline-block"/> Đã đặt</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#00c8aa] inline-block"/> Đang chọn</span>
              </div>
            </div>
          </div>

          {/* Right - Booking Panel */}
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <div className="mb-5">
                <p className="text-slate-400 text-sm">Giá mỗi slot (90 phút)</p>
                <p className="font-['Oswald'] text-3xl font-bold text-slate-900 mt-1">
                  {court.pricePerSlot.toLocaleString('vi-VN')} <span className="text-base font-normal text-slate-400">VNĐ</span>
                </p>
              </div>

              {selectedSlot ? (
                <div className="bg-[#00c8aa]/8 border border-[#00c8aa]/20 rounded-xl p-4 mb-5">
                  <p className="text-xs font-semibold text-[#00897b] mb-1">Khung giờ đã chọn</p>
                  <p className="font-bold text-slate-800">{selectedSlot} – {HOURS[HOURS.indexOf(selectedSlot) + 1] || '22:00'}</p>
                  <p className="text-slate-500 text-xs mt-0.5">Hôm nay • {court.name}</p>
                </div>
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 mb-5 text-center">
                  <p className="text-slate-400 text-sm">← Chọn khung giờ bên trái</p>
                </div>
              )}

              <Link
                to={selectedSlot ? `/courts/${id}/book?slot=${selectedSlot}` : '#'}
                onClick={e => !selectedSlot && e.preventDefault()}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all
                  ${selectedSlot ? 'bg-[#00c8aa] hover:bg-[#009e87] text-white hover:shadow-[0_0_24px_rgba(0,200,170,0.3)]' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                Đặt sân ngay →
              </Link>

              <p className="text-center text-slate-400 text-xs mt-3">Thanh toán qua Ví Escrow Pro-Sport / VNPay</p>

              <div className="border-t border-slate-100 mt-5 pt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Phí sân</span>
                  <span className="font-semibold text-slate-800">{court.pricePerSlot.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Phí dịch vụ (5%)</span>
                  <span className="font-semibold text-slate-800">{(court.pricePerSlot * 0.05).toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
                  <span className="font-bold text-slate-800">Tổng cộng</span>
                  <span className="font-bold text-[#00c8aa]">{(court.pricePerSlot * 1.05).toLocaleString('vi-VN')} VNĐ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  )
}
