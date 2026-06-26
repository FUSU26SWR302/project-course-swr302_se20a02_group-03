import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function CustomerProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f9fb]">
      <Navbar theme="light" />

      <div className="max-w-[1000px] mx-auto px-6 pt-[90px] pb-20 w-full flex-1">
        <h1 className="font-['Oswald'] text-3xl font-bold text-slate-900 mb-8">Tài khoản của tôi</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 h-fit">
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'profile' ? 'bg-[#00c8aa]/10 text-[#00c8aa]' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Thông tin cá nhân
              </button>
              <button 
                onClick={() => setActiveTab('ekyc')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === 'ekyc' ? 'bg-[#00c8aa]/10 text-[#00c8aa]' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Xác thực E-KYC
              </button>
              <div className="h-px bg-slate-100 my-2"></div>
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Đăng xuất
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            {activeTab === 'profile' && (
              <div className="animate-[fadeIn_0.3s_ease]">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Cập nhật hồ sơ</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80" alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                  <div>
                    <button className="bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">Đổi ảnh đại diện</button>
                    <p className="text-xs text-slate-400 mt-2">JPG, GIF hoặc PNG. Tối đa 5MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên</label>
                    <input type="text" defaultValue="Alex Mercer" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00c8aa]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại</label>
                    <input type="tel" defaultValue="0901234567" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00c8aa]" />
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                    <input type="email" defaultValue="alex.mercer@example.com" disabled className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-slate-500" />
                  </div>
                </div>
                
                <button className="bg-[#00c8aa] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#009e87] transition-colors">Lưu thay đổi</button>
              </div>
            )}

            {activeTab === 'ekyc' && (
              <div className="animate-[fadeIn_0.3s_ease]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Xác thực danh tính (E-KYC)</h2>
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase">Chưa xác thực</span>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mb-8">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Xác thực E-KYC là bắt buộc để bạn có thể <b>Tạo kèo</b> và <b>Sử dụng ví Escrow</b>. Thông tin của bạn được mã hóa an toàn.
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mặt trước CMND / CCCD</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl h-40 flex flex-col items-center justify-center text-slate-500 hover:border-[#00c8aa] hover:bg-[#00c8aa]/5 cursor-pointer transition-colors">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      <span className="text-sm font-medium">Click để tải ảnh lên</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mặt sau CMND / CCCD</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl h-40 flex flex-col items-center justify-center text-slate-500 hover:border-[#00c8aa] hover:bg-[#00c8aa]/5 cursor-pointer transition-colors">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      <span className="text-sm font-medium">Click để tải ảnh lên</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#00c8aa] text-white font-bold py-3.5 rounded-xl hover:bg-[#009e87] transition-colors">Gửi yêu cầu xác thực</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  )
}
