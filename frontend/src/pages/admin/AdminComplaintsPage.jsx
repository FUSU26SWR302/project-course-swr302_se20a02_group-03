import AdminLayout from '../../layouts/AdminLayout'

export default function AdminComplaintsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Giải quyết Khiếu nại</h1>
            <p className="text-sm text-slate-500">Xử lý các báo cáo bùng kèo và tranh chấp giao dịch.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <input type="text" placeholder="Tìm mã ticket..." className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm outline-none" />
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 cursor-pointer">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-slate-900 text-sm">#TK-1042</span>
                  <span className="text-[0.65rem] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">URGENT</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 line-clamp-1">Báo cáo bùng kèo - Giao lưu cầu lông</p>
                <p className="text-xs text-slate-500 mt-1">Từ: Alex Mercer • 15 phút trước</p>
              </div>
              <div className="p-4 hover:bg-slate-50 cursor-pointer">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-slate-900 text-sm">#TK-1041</span>
                  <span className="text-[0.65rem] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">OPEN</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 line-clamp-1">Sân chất lượng kém, trơn trượt</p>
                <p className="text-xs text-slate-500 mt-1">Từ: Nguyen Van B • 2 giờ trước</p>
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
            <div className="p-5 border-b border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold text-slate-900">#TK-1042: Báo cáo bùng kèo - Giao lưu cầu lông</h2>
                <span className="text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">URGENT</span>
              </div>
              <p className="text-sm text-slate-500">Mã giao dịch liên quan: <span className="font-bold text-[#0d8a8a]">BK-8842</span></p>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm text-slate-800 leading-relaxed">
                  <strong>Alex Mercer:</strong> Thành viên "David Tran" đăng ký slot trong kèo giao lưu của tôi lúc 18:00 nhưng không xuất hiện, cũng không nhắn tin báo trước làm team thiếu người. Đề nghị phạt trừ tiền ký quỹ.
                </p>
                <div className="mt-3 flex gap-2">
                  <div className="w-16 h-16 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400 border border-slate-300">Ảnh 1</div>
                </div>
              </div>

              <div className="flex items-center gap-2 my-4">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Nhân viên trực sân xác nhận</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <p className="text-sm text-slate-800 leading-relaxed">
                  <strong>Staff (The Apex):</strong> Đã kiểm tra qua camera và hệ thống Check-in QR. Xác nhận người dùng David Tran không check-in vào khung giờ 18:00 - 19:30.
                </p>
              </div>
            </div>

            <div className="p-5 border-t border-slate-200 bg-slate-50">
              <p className="text-sm font-semibold text-slate-700 mb-3">Quyết định xử lý</p>
              <div className="flex gap-3">
                <button className="flex-1 border border-slate-300 text-slate-700 font-semibold py-2 rounded-lg bg-white hover:bg-slate-50">Bác bỏ (Không đủ bằng chứng)</button>
                <button className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600">Trừ 100% Ký quỹ David Tran</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
