import AdminLayout from '../../layouts/AdminLayout'

export default function AdminPricingPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Cấu hình Giá động</h1>
            <p className="text-sm text-slate-500">Quản lý giá thuê sân theo giờ vàng, ngày lễ và bộ môn.</p>
          </div>
          <button className="bg-[#0d8a8a] text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-[#0b7373]">
            Lưu thay đổi
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Bảng Giá Cơ Bản (VNĐ/Slot)</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Sân Cầu lông (Trong nhà)</span>
                <input type="number" defaultValue="120000" className="border border-slate-200 rounded-lg px-3 py-1.5 w-32 text-right focus:border-[#0d8a8a] outline-none" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Sân Pickleball (Premium)</span>
                <input type="number" defaultValue="180000" className="border border-slate-200 rounded-lg px-3 py-1.5 w-32 text-right focus:border-[#0d8a8a] outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Hệ số Giá động (Multiplier)</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Giờ Vàng (17:00 - 20:00)</span>
                  <span className="text-xs text-slate-500">Nhân giá cơ bản với hệ số này</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">x</span>
                  <input type="number" defaultValue="1.5" step="0.1" className="border border-slate-200 rounded-lg px-3 py-1.5 w-20 text-center focus:border-[#0d8a8a] outline-none bg-amber-50 text-amber-700 font-bold" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Cuối tuần (T7, CN)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">x</span>
                  <input type="number" defaultValue="1.2" step="0.1" className="border border-slate-200 rounded-lg px-3 py-1.5 w-20 text-center focus:border-[#0d8a8a] outline-none font-bold" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-700 block">Ngày Lễ / Tết</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">x</span>
                  <input type="number" defaultValue="2.0" step="0.1" className="border border-slate-200 rounded-lg px-3 py-1.5 w-20 text-center focus:border-[#0d8a8a] outline-none font-bold text-red-500 bg-red-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
