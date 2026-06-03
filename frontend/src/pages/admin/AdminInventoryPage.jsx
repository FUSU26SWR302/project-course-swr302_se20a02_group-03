import AdminLayout from '../../layouts/AdminLayout'

export default function AdminInventoryPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Quản lý Kho Dụng cụ</h1>
            <p className="text-sm text-slate-500">Kiểm soát số lượng vợt, bóng, nước uống tại các cơ sở.</p>
          </div>
          <button className="bg-[#0d8a8a] text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-[#0b7373]">
            + Nhập kho mới
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex gap-4">
            <select className="border border-slate-300 rounded-md px-3 py-1.5 text-sm outline-none bg-white">
              <option>Cơ sở The Apex Pavilion</option>
              <option>Cơ sở Nexus Courts</option>
            </select>
            <input type="text" placeholder="Tìm kiếm vật phẩm..." className="border border-slate-300 rounded-md px-3 py-1.5 text-sm outline-none w-64" />
          </div>
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Vật phẩm</th>
                <th className="px-6 py-4">Phân loại</th>
                <th className="px-6 py-4 text-right">Tồn kho</th>
                <th className="px-6 py-4 text-right">Đang cho thuê</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">Vợt Yonex Astrox 99</td>
                <td className="px-6 py-4 text-slate-500">Cho thuê</td>
                <td className="px-6 py-4 text-right font-bold">12</td>
                <td className="px-6 py-4 text-right text-amber-600 font-bold">4</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">TỐT</span></td>
                <td className="px-6 py-4 text-blue-600 font-semibold cursor-pointer">Chi tiết</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">Ống Cầu lông Yonex AS-40</td>
                <td className="px-6 py-4 text-slate-500">Bán lẻ</td>
                <td className="px-6 py-4 text-right font-bold text-red-500">2</td>
                <td className="px-6 py-4 text-right text-slate-400">-</td>
                <td className="px-6 py-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">SẮP HẾT</span></td>
                <td className="px-6 py-4 text-blue-600 font-semibold cursor-pointer">Chi tiết</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-900">Nước suối Aquafina 500ml</td>
                <td className="px-6 py-4 text-slate-500">Bán lẻ</td>
                <td className="px-6 py-4 text-right font-bold">145</td>
                <td className="px-6 py-4 text-right text-slate-400">-</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">TỐT</span></td>
                <td className="px-6 py-4 text-blue-600 font-semibold cursor-pointer">Chi tiết</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
