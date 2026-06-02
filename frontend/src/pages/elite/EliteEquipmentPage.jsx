import EliteLayout from '../../layouts/EliteLayout'

export default function EliteEquipmentPage() {
  return (
    <EliteLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Kiểm định Dụng cụ & Phụ thu</h1>
            <p className="text-sm text-slate-500">Ghi nhận tình trạng vợt trả lại và xử lý phụ thu hư hỏng.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Rentals */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Đang cho thuê</h2>
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-slate-900">Mã đơn: RN-9921</span>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">ĐANG THUÊ</span>
                </div>
                <p className="text-sm text-slate-600">Khách hàng: <strong>Alex Mercer</strong> (Sân Cầu lông 1)</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">2x Vợt Yonex</span>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">1x Ống cầu</span>
                </div>
                <button className="w-full mt-4 bg-[#00c2ff] text-white font-semibold py-2 rounded-md hover:bg-[#00ace6]">Tiến hành trả đồ</button>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Xử lý trả đồ (RN-9921)</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Vợt Yonex 1</p>
                  <p className="text-xs text-slate-500">Tình trạng lúc giao: Tốt</p>
                </div>
                <select className="border border-slate-300 rounded outline-none text-sm p-1">
                  <option>Bình thường</option>
                  <option>Xước nhẹ</option>
                  <option>Gãy/Hỏng nặng</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Vợt Yonex 2</p>
                  <p className="text-xs text-slate-500">Tình trạng lúc giao: Tốt</p>
                </div>
                <select className="border border-red-300 bg-white rounded outline-none text-sm p-1 text-red-600 font-semibold" defaultValue="Gãy/Hỏng nặng">
                  <option>Bình thường</option>
                  <option>Xước nhẹ</option>
                  <option value="Gãy/Hỏng nặng">Gãy/Hỏng nặng</option>
                </select>
              </div>

              {/* Phụ thu */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-4">
                <h3 className="text-sm font-bold text-amber-800 mb-2">Tính phí phụ thu</h3>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Phí đền bù (Vợt Yonex 2)</span>
                  <input type="number" defaultValue="500000" className="w-24 text-right border border-amber-300 rounded px-2 py-1 outline-none font-bold" />
                </div>
                <button className="w-full bg-amber-500 text-white font-bold py-2 rounded-md hover:bg-amber-600 mt-2">Xác nhận phụ thu & Đóng đơn</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EliteLayout>
  )
}
