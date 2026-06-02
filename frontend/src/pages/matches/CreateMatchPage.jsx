import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function CreateMatchPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f9fb]">
      <Navbar theme="light" />

      <div className="max-w-[700px] mx-auto px-6 pt-[90px] pb-20 w-full flex-1">
        <div className="mb-8">
          <Link to="/matches" className="text-slate-400 text-sm hover:text-[#00c8aa] mb-2 inline-block flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Quay lại
          </Link>
          <h1 className="font-['Oswald'] text-3xl font-bold text-slate-900">Tạo kèo giao lưu mới</h1>
          <p className="text-slate-500 text-sm mt-1">Tìm đồng đội, chia sẻ tiền sân dễ dàng qua ví Escrow.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Progress */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-4 gap-2">
            <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-[#00c8aa]' : 'bg-slate-200'}`} />
            <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-[#00c8aa]' : 'bg-slate-200'}`} />
            <div className={`flex-1 h-1.5 rounded-full ${step >= 3 ? 'bg-[#00c8aa]' : 'bg-slate-200'}`} />
          </div>

          <div className="p-8">
            {step === 1 && (
              <div className="animate-[fadeIn_0.3s_ease]">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Thông tin cơ bản</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tiêu đề kèo</label>
                    <input type="text" placeholder="VD: Tìm 2 tay vợt lông trình trung bình khá" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00c8aa]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bộ môn</label>
                    <select className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00c8aa] bg-white">
                      <option>Cầu lông</option>
                      <option>Pickleball</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Trình độ yêu cầu</label>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 rounded-lg border border-slate-200 hover:border-[#00c8aa] text-sm">Mới chơi</button>
                      <button className="flex-1 py-2 rounded-lg border border-[#00c8aa] bg-[#00c8aa]/5 text-[#00897b] font-medium text-sm">Trung bình</button>
                      <button className="flex-1 py-2 rounded-lg border border-slate-200 hover:border-[#00c8aa] text-sm">Khá / Giỏi</button>
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="mt-8 w-full bg-[#00c8aa] text-white font-bold py-3.5 rounded-xl hover:bg-[#009e87] transition-colors">Tiếp tục</button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-[fadeIn_0.3s_ease]">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Địa điểm & Thời gian</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Chọn sân (Từ danh sách đặt sân của bạn)</label>
                    <select className="w-full border border-[#00c8aa] bg-[#00c8aa]/5 text-[#00897b] rounded-xl px-4 py-3 outline-none font-medium">
                      <option>The Apex Pavilion - Court A (Hôm nay, 18:00)</option>
                    </select>
                    <p className="text-xs text-slate-400 mt-2">Kèo phải được gắn với một đơn đặt sân thực tế.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 opacity-60 pointer-events-none">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Ngày</label>
                      <input type="text" value="Hôm nay" readOnly className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Giờ</label>
                      <input type="text" value="18:00 - 19:30" readOnly className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(1)} className="px-6 bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl hover:bg-slate-200">Quay lại</button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-[#00c8aa] text-white font-bold py-3.5 rounded-xl hover:bg-[#009e87]">Tiếp tục</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-[fadeIn_0.3s_ease]">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Chi phí & Slot</h2>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Số lượng slot cần tuyển</label>
                      <input type="number" defaultValue="2" min="1" max="10" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00c8aa]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Số tiền Camp/Slot (VNĐ)</label>
                      <input type="number" defaultValue="40000" step="5000" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00c8aa]" />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Ví Escrow sẽ tự động tạm giữ số tiền <b>40,000 VNĐ</b> của mỗi người tham gia khi họ bấm Join. Tiền sẽ được chuyển cho bạn sau khi kèo kết thúc thành công.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Ghi chú thêm</label>
                    <textarea rows="3" placeholder="Nhớ mang theo nước uống..." className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00c8aa] resize-none"></textarea>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep(2)} className="px-6 bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl hover:bg-slate-200">Quay lại</button>
                  <Link to="/matches" className="flex-1 bg-[#00c8aa] text-white font-bold py-3.5 rounded-xl text-center hover:bg-[#009e87] flex items-center justify-center gap-2">
                    Tạo kèo
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  )
}
