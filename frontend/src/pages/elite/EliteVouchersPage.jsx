import EliteLayout from '../../layouts/EliteLayout'

export default function EliteVouchersPage() {
  return (
    <EliteLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Phát hành Voucher</h1>
            <p className="text-sm text-slate-500">Tạo mã giảm giá tại quầy hoặc đền bù khách hàng.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Tạo Voucher Mới</h2>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Mã Voucher (Code)</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="VD: SORRY50" className="flex-1 border border-slate-300 rounded-md px-3 py-2 outline-none focus:border-[#00c2ff]" />
                  <button type="button" className="bg-slate-100 px-3 py-2 border border-slate-300 rounded-md text-sm hover:bg-slate-200">Random</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Loại giảm giá</label>
                  <select className="w-full border border-slate-300 rounded-md px-3 py-2 outline-none focus:border-[#00c2ff] bg-white">
                    <option>Giảm theo %</option>
                    <option>Giảm số tiền cố định</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Giá trị</label>
                  <input type="number" placeholder="50" className="w-full border border-slate-300 rounded-md px-3 py-2 outline-none focus:border-[#00c2ff]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Lý do phát hành</label>
                <select className="w-full border border-slate-300 rounded-md px-3 py-2 outline-none focus:border-[#00c2ff] bg-white">
                  <option>Khuyến mãi thông thường</option>
                  <option>Đền bù do sự cố sân</option>
                  <option>Quà tặng sinh nhật</option>
                </select>
              </div>
              <button className="w-full bg-[#00c2ff] text-white font-bold py-2.5 rounded-md hover:bg-[#00ace6] mt-4">Phát hành Voucher</button>
            </form>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Voucher Gần Đây</h2>
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900 text-sm">COMP50 - Giảm 50k</p>
                  <p className="text-xs text-slate-500">Lý do: Đền bù sự cố mất điện</p>
                </div>
                <span className="text-xs font-semibold bg-green-100 text-green-600 px-2 py-1 rounded">ACTIVE</span>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 flex justify-between items-center opacity-60">
                <div>
                  <p className="font-bold text-slate-900 text-sm">SUMMER20 - Giảm 20%</p>
                  <p className="text-xs text-slate-500">Lý do: Khuyến mãi hè</p>
                </div>
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">EXPIRED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EliteLayout>
  )
}
