import AdminLayout from '../../layouts/AdminLayout'

const users = [
  { avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80', name: 'Sarah Jenkins', email: 'sarah.j@pro-sport.com', role: 'ADMIN', roleColor: '#818cf8', verified: true, active: 'Just now' },
  { initials: 'MR', color: '#f59e0b', name: 'Marcus Rodriguez', email: 'm.rodriguez@example.com', role: 'CUSTOMER', roleColor: '#94a3b8', verified: true, active: '2 hours ago' },
  { avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', name: 'David Chen', email: 'david.chen@pro-sport.staff', role: 'STAFF', roleColor: '#0ea5e9', verified: false, active: 'Yesterday' },
  { initials: 'EL', color: '#cbd5e1', name: 'Emma Larson', email: 'emma.l@guest.com', role: 'GUEST', roleColor: '#94a3b8', verified: true, active: 'Oct 12, 2023' },
]

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">User Management</h1>
            <p className="text-sm text-slate-500">Manage accounts, roles, and verification status across the platform.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-slate-200 text-slate-800 py-2 px-4 rounded-md text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:bg-slate-50 hover:border-slate-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
            </button>
            <button className="bg-[#0d8a8a] hover:bg-[#0b7373] text-white border-none rounded-md py-2.5 px-4 text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
              Create New User
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-slate-200">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full py-2 px-4 w-80 focus-within:border-[#0d8a8a]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search by name or email..." className="border-none outline-none font-['Inter'] text-sm text-slate-900 w-full" />
            </div>
            <div className="flex gap-2">
              <button className="py-[6px] px-4 rounded-full border border-[#e0f2fe] text-sm font-medium cursor-pointer bg-[#e0f2fe] text-[#0284c7]">All Users</button>
              <button className="py-[6px] px-4 rounded-full border border-slate-200 bg-white text-slate-500 text-sm font-medium cursor-pointer hover:bg-slate-50">Admin</button>
              <button className="py-[6px] px-4 rounded-full border border-slate-200 bg-white text-slate-500 text-sm font-medium cursor-pointer hover:bg-slate-50">Staff</button>
              <button className="py-[6px] px-4 rounded-full border border-slate-200 bg-white text-slate-500 text-sm font-medium cursor-pointer hover:bg-slate-50">Customer</button>
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Verification</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Active</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50/55 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {u.avatar ? (
                        <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: u.color }}>{u.initials}</div>
                      )}
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-block py-1 px-3 rounded-full text-xs font-bold" style={{ background: u.roleColor + '20', color: u.roleColor === '#94a3b8' ? '#64748b' : u.roleColor }}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: u.verified ? '#22c55e' : '#f59e0b' }}></span>
                      <span className="text-sm font-medium text-slate-900">{u.verified ? 'Verified' : 'Pending'}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-500">{u.active}</span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex gap-3">
                      <button className="bg-transparent border-none text-slate-400 cursor-pointer hover:text-[#0d8a8a]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button className="bg-transparent border-none text-slate-400 cursor-pointer hover:text-[#0d8a8a]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center py-4 px-5 border-t border-slate-200 bg-white">
            <span className="text-sm text-slate-500">Showing 1 to 4 of 1,248 users</span>
            <div className="flex gap-1">
              <button className="w-8 h-8 border-none bg-transparent rounded text-sm text-slate-500 cursor-pointer hover:bg-slate-100">&lt;</button>
              <button className="w-8 h-8 border-none rounded text-sm cursor-pointer bg-slate-800 text-white font-semibold">1</button>
              <button className="w-8 h-8 border-none bg-transparent rounded text-sm text-slate-500 cursor-pointer hover:bg-slate-100">2</button>
              <button className="w-8 h-8 border-none bg-transparent rounded text-sm text-slate-500 cursor-pointer hover:bg-slate-100">3</button>
              <span className="flex items-center justify-center w-8 text-slate-400">...</span>
              <button className="w-8 h-8 border-none bg-transparent rounded text-sm text-slate-500 cursor-pointer hover:bg-slate-100">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
