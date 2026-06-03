import AdminLayout from '../../layouts/AdminLayout'

const kycRequests = [
  { id: 'KYC-092', user: 'Alex Mercer', type: 'CCCD (Chip)', submittedAt: '10 mins ago', status: 'PENDING' },
  { id: 'KYC-091', user: 'Tran Van A', type: 'CMND', submittedAt: '1 hour ago', status: 'PENDING' },
]

export default function AdminKycPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Phê duyệt E-KYC</h1>
            <p className="text-sm text-slate-500">Kiểm tra thông tin giấy tờ tùy thân của khách hàng để mở khóa Ví Escrow và tính năng Host kèo.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h2 className="font-semibold text-slate-800">Yêu cầu chờ duyệt ({kycRequests.length})</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {kycRequests.map(req => (
                <div key={req.id} className="p-4 flex justify-between items-center hover:bg-slate-50 cursor-pointer">
                  <div>
                    <p className="font-bold text-slate-900 text-sm mb-1">{req.user}</p>
                    <p className="text-xs text-slate-500">{req.id} • {req.type}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-amber-100 text-amber-700 text-[0.65rem] font-bold px-2 py-1 rounded-full">{req.status}</span>
                    <p className="text-[0.65rem] text-slate-400 mt-1">{req.submittedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail View */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h2 className="font-semibold text-slate-800">Chi tiết KYC: KYC-092</h2>
              <span className="text-xs font-semibold text-[#00c8aa]">Tự động đối chiếu AI: Khớp 98%</span>
            </div>
            <div className="p-6 flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">Mặt trước</p>
                  <div className="bg-slate-100 rounded-lg h-32 flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1633265486064-086b219458ce?w=300&q=80" alt="Mặt trước" className="w-full h-full object-cover opacity-80" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">Mặt sau</p>
                  <div className="bg-slate-100 rounded-lg h-32 flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1633265486064-086b219458ce?w=300&q=80" alt="Mặt sau" className="w-full h-full object-cover opacity-60" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[0.65rem] text-slate-500 uppercase tracking-wider mb-1">Họ tên trên thẻ</p>
                  <p className="text-sm font-bold text-slate-900">ALEX MERCER</p>
                </div>
                <div>
                  <p className="text-[0.65rem] text-slate-500 uppercase tracking-wider mb-1">Họ tên Profile</p>
                  <p className="text-sm font-bold text-slate-900">Alex Mercer</p>
                </div>
                <div>
                  <p className="text-[0.65rem] text-slate-500 uppercase tracking-wider mb-1">Số CCCD</p>
                  <p className="text-sm font-bold text-slate-900">079123456789</p>
                </div>
                <div>
                  <p className="text-[0.65rem] text-slate-500 uppercase tracking-wider mb-1">Ngày sinh</p>
                  <p className="text-sm font-bold text-slate-900">12/05/1995</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button className="flex-1 border border-red-200 text-red-500 font-bold py-2.5 rounded-lg hover:bg-red-50 transition-colors">Từ chối</button>
                <button className="flex-1 bg-[#00c8aa] text-white font-bold py-2.5 rounded-lg hover:bg-[#009e87] transition-colors">Phê duyệt</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
