import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const bookings = [
  {
    id: 'BK-8842',
    courtName: 'The Apex Pavilion – Court A',
    date: 'Hôm nay',
    time: '18:00 - 19:30',
    total: 126000,
    status: 'CONFIRMED',
    statusColor: 'bg-green-100 text-green-700',
    type: 'Sắp tới'
  },
  {
    id: 'BK-7123',
    courtName: 'Nexus Courts – Court 3',
    date: '12/10/2023',
    time: '14:00 - 15:30',
    total: 150000,
    status: 'COMPLETED',
    statusColor: 'bg-slate-100 text-slate-600',
    type: 'Đã hoàn thành'
  },
  {
    id: 'BK-6551',
    courtName: 'Velocity Athletics – VIP Court',
    date: '05/10/2023',
    time: '19:00 - 21:00',
    total: 320000,
    status: 'CANCELLED',
    statusColor: 'bg-red-100 text-red-600',
    type: 'Đã hủy'
  }
]

export default function BookingHistoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f9fb]">
      <Navbar theme="light" />

      <div className="max-w-[1000px] mx-auto px-6 pt-[90px] pb-20 w-full flex-1">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-['Oswald'] text-3xl font-bold text-slate-900">Lịch sử đặt sân</h1>
          <Link to="/courts" className="bg-[#00c8aa] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#009e87] transition-colors">
            + Đặt sân mới
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-100">
            <button className="flex-1 py-4 text-sm font-semibold text-[#00c8aa] border-b-2 border-[#00c8aa]">Tất cả</button>
            <button className="flex-1 py-4 text-sm font-medium text-slate-500 hover:text-slate-800">Sắp tới</button>
            <button className="flex-1 py-4 text-sm font-medium text-slate-500 hover:text-slate-800">Đã hoàn thành</button>
            <button className="flex-1 py-4 text-sm font-medium text-slate-500 hover:text-slate-800">Đã hủy</button>
          </div>

          <div className="p-6">
            <div className="flex flex-col gap-4">
              {bookings.map(b => (
                <div key={b.id} className="border border-slate-100 rounded-xl p-5 hover:border-[#00c8aa]/50 transition-colors flex flex-wrap gap-4 items-center justify-between group">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-full bg-[#00c8aa]/10 flex items-center justify-center text-[#00c8aa] shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900">{b.courtName}</h3>
                        <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full ${b.statusColor}`}>{b.status}</span>
                      </div>
                      <p className="text-sm text-slate-500">{b.date} • {b.time}</p>
                      <p className="text-xs text-slate-400 mt-1">Mã đơn: {b.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right max-sm:text-left">
                      <p className="text-xs text-slate-500 mb-0.5">Tổng tiền</p>
                      <p className="font-bold text-slate-900">{b.total.toLocaleString('vi-VN')} đ</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors">Chi tiết</button>
                      {b.status === 'CONFIRMED' && (
                        <button className="px-4 py-2 border border-red-200 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors">Hủy sân</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  )
}
