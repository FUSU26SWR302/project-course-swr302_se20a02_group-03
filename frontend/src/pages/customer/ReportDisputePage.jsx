import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ReportDisputePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f9fb]">
      <Navbar theme="light" />

      <div className="max-w-[700px] mx-auto px-6 pt-[90px] pb-20 w-full flex-1">
        <div className="mb-8">
          <Link to="/customer/bookings" className="text-slate-400 text-sm hover:text-[#00c8aa] mb-2 inline-block flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Quay lại
          </Link>
          <h1 className="font-['Oswald'] text-3xl font-bold text-slate-900 mb-2">Báo cáo vi phạm / Bùng kèo</h1>
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="shrink-0 mt-0.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <p className="text-sm text-red-800 leading-relaxed">
              Mọi báo cáo sai sự thật sẽ dẫn đến việc <b>khóa tài khoản vĩnh viễn</b>. Quản trị viên sẽ liên hệ Nhân viên (Staff) trực sân để đối chứng hình ảnh thực tế.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Mã giao dịch / Kèo liên quan</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00c8aa] bg-white">
                <option>Kèo Giao lưu Cầu lông Khá - #BK-8842</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Lý do báo cáo</label>
              <div className="grid grid-cols-1 gap-3">
                <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-[#00c8aa]">
                  <input type="radio" name="reason" className="accent-[#00c8aa]" defaultChecked />
                  <span className="text-sm font-medium text-slate-700">Người chơi bùng kèo (Không đến)</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-[#00c8aa]">
                  <input type="radio" name="reason" className="accent-[#00c8aa]" />
                  <span className="text-sm font-medium text-slate-700">Host hủy kèo không báo trước</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-[#00c8aa]">
                  <input type="radio" name="reason" className="accent-[#00c8aa]" />
                  <span className="text-sm font-medium text-slate-700">Người chơi có hành vi thiếu văn hóa</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Bằng chứng (Tùy chọn nhưng rất khuyến khích)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl h-32 flex flex-col items-center justify-center text-slate-500 hover:border-[#00c8aa] hover:bg-[#00c8aa]/5 cursor-pointer transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span className="text-sm font-medium">Tải lên ảnh chụp màn hình tin nhắn...</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Mô tả chi tiết sự việc</label>
              <textarea rows="4" className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00c8aa] resize-none" placeholder="Vui lòng cung cấp chi tiết thời gian và sự việc..."></textarea>
            </div>

            <button className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors">
              Gửi Báo Cáo Yêu Cầu Xử Lý
            </button>
          </form>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  )
}
