import EliteLayout from '../../layouts/EliteLayout'

export default function EliteDisputesPage() {
  return (
    <EliteLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Xác nhận Bùng Kèo</h1>
            <p className="text-sm text-slate-500">Đối chứng hiện trường cho các ticket từ Admin.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="border-l-4 border-amber-500 pl-4 mb-6">
            <h2 className="text-lg font-bold text-slate-800">Yêu cầu đối chứng: #TK-1042</h2>
            <p className="text-sm text-slate-600 mt-1">Admin yêu cầu Staff trực tại <strong>The Apex Pavilion</strong> xác nhận sự việc.</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-6 space-y-2 text-sm">
            <p><strong>Nội dung khiếu nại:</strong> Khách hàng David Tran không đến trong kèo giao lưu lúc 18:00 (Sân Court A).</p>
            <p><strong>Bằng chứng khách hàng cung cấp:</strong> (Ảnh chụp màn hình)</p>
          </div>

          <h3 className="font-bold text-slate-800 mb-3 text-sm">Báo cáo của Staff</h3>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Xác minh thực tế</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="verify" className="accent-[#00c2ff]" />
                  <span className="text-sm">Đúng, khách không đến</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="verify" className="accent-[#00c2ff]" />
                  <span className="text-sm">Sai, khách có đến nhưng trễ</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Chi tiết / Trích xuất Camera</label>
              <textarea rows="4" className="w-full border border-slate-300 rounded-md p-3 text-sm outline-none focus:border-[#00c2ff] resize-none" placeholder="Nhập ghi chú hoặc đính kèm link camera..."></textarea>
            </div>

            <button className="bg-[#00c2ff] text-white font-bold px-6 py-2 rounded-md hover:bg-[#00ace6]">Gửi báo cáo lên Admin</button>
          </form>
        </div>
      </div>
    </EliteLayout>
  )
}
