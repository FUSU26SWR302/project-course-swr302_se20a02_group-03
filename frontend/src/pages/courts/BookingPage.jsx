import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const slot = searchParams.get('slot') || '10:00'
  const [paymentMethod, setPaymentMethod] = useState('escrow')
  const [isSuccess, setIsSuccess] = useState(false)

  const court = {
    name: 'The Apex Pavilion – Court A',
    price: 120000,
    serviceFee: 6000,
  }

  const total = court.price + court.serviceFee

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f5f9fb]">
        <Navbar theme="light" />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-10 max-w-[480px] w-full text-center shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-[#00c8aa]/10 text-[#00c8aa] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h1 className="font-['Oswald'] text-3xl font-bold text-slate-900 mb-2">Đặt sân thành công!</h1>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Cảm ơn bạn. Sân {court.name} lúc {slot} đã được giữ chỗ. Mã đặt sân của bạn là <b>#BK-8842</b>.
            </p>
            <div className="flex gap-4">
              <Link to="/customer/bookings" className="flex-1 bg-slate-100 text-slate-600 font-semibold py-3.5 rounded-xl hover:bg-slate-200 transition-colors">Lịch sử đặt sân</Link>
              <Link to="/courts" className="flex-1 bg-[#00c8aa] text-white font-semibold py-3.5 rounded-xl hover:bg-[#009e87] transition-colors shadow-md shadow-[#00c8aa]/20">Về trang chủ</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f9fb]">
      <Navbar theme="light" />

      <div className="max-w-[1000px] mx-auto px-6 pt-[90px] pb-20 w-full">
        <h1 className="font-['Oswald'] text-3xl font-bold text-slate-900 mb-8">Xác nhận đặt sân</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
          <div className="space-y-6">
            {/* User Details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Thông tin người đặt</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Họ và tên</label>
                  <input type="text" value="Alex Mercer" readOnly className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Số điện thoại</label>
                  <input type="text" value="0901234567" readOnly className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 outline-none" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Phương thức thanh toán</h2>
              
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'escrow' ? 'border-[#00c8aa] bg-[#00c8aa]/5' : 'border-slate-200 hover:border-[#00c8aa]'}`}>
                  <input type="radio" name="payment" value="escrow" checked={paymentMethod === 'escrow'} onChange={() => setPaymentMethod('escrow')} className="mt-0.5 accent-[#00c8aa]" />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Ví Escrow Pro-Sport</p>
                    <p className="text-slate-500 text-xs mt-1">Số dư hiện tại: <b>4,850,000 VNĐ</b></p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'vnpay' ? 'border-[#00c8aa] bg-[#00c8aa]/5' : 'border-slate-200 hover:border-[#00c8aa]'}`}>
                  <input type="radio" name="payment" value="vnpay" checked={paymentMethod === 'vnpay'} onChange={() => setPaymentMethod('vnpay')} className="mt-0.5 accent-[#00c8aa]" />
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Thanh toán VNPay</p>
                      <p className="text-slate-500 text-xs mt-1">Thẻ ATM / Thẻ tín dụng / VNPAY QR</p>
                    </div>
                    <img src="https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png" alt="VNPay" className="h-6" />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Panel - Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Tóm tắt đơn đặt</h2>
              
              <div className="flex gap-4 pb-4 border-b border-slate-100 mb-4">
                <img src="https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=200&q=80" alt="Court" className="w-20 h-20 object-cover rounded-xl shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{court.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">Hôm nay • {slot} (90 phút)</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tiền sân</span>
                  <span className="font-semibold text-slate-800">{court.price.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Phí dịch vụ</span>
                  <span className="font-semibold text-slate-800">{court.serviceFee.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
                  <span className="font-bold text-slate-800">Tổng thanh toán</span>
                  <span className="font-bold text-[#00c8aa] text-lg">{total.toLocaleString('vi-VN')} VNĐ</span>
                </div>
              </div>

              <button onClick={() => setIsSuccess(true)} className="w-full bg-[#00c8aa] text-white font-bold py-3.5 rounded-xl hover:bg-[#009e87] transition-colors shadow-md shadow-[#00c8aa]/20 flex items-center justify-center gap-2">
                Thanh toán & Đặt sân
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              
              <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
                Bằng việc nhấn đặt sân, bạn đồng ý với <a href="#" className="text-[#00c8aa] hover:underline">Điều khoản</a> và <a href="#" className="text-[#00c8aa] hover:underline">Chính sách hủy sân</a> của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer variant="light" />
    </div>
  )
}
