import AdminLayout from '../../layouts/AdminLayout'

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard Overview</h1>
            <p className="text-sm text-slate-500">Real-time pulse of your sports facility operations.</p>
          </div>
          <div className="flex gap-3">
            <select className="border border-slate-200 rounded-md py-2 px-3 font-['Inter'] text-sm text-slate-900 outline-none bg-white">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
            <button className="bg-white border border-slate-200 text-slate-800 py-2 px-4 rounded-md text-sm font-medium cursor-pointer flex items-center gap-2 transition-all hover:bg-slate-50 hover:border-slate-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6 mb-6 max-xl:grid-cols-2">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#e0f2fe', color: '#0ea5e9' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              </div>
              <span className="text-xs font-semibold py-1 px-2 rounded-full bg-green-100 text-green-800">+12.4%</span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
            <p className="font-['Oswald'] text-4xl font-bold text-slate-900 leading-none">$248.5k</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#f1f5f9', color: '#64748b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <span className="text-xs font-semibold py-1 px-2 rounded-full bg-green-100 text-green-800">+5.2%</span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">Active Bookings</p>
            <p className="font-['Oswald'] text-4xl font-bold text-slate-900 leading-none">142</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#fef3c7', color: '#d97706' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">Live Matches</p>
            <p className="font-['Oswald'] text-4xl font-bold text-slate-900 leading-none">18</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#f1f5f9', color: '#64748b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <span className="text-xs font-semibold py-1 px-2 rounded-full bg-slate-100 text-slate-600">89% Utilized</span>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">Equipment Out</p>
            <p className="font-['Oswald'] text-4xl font-bold text-slate-900 leading-none">54</p>
          </div>
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-6 max-xl:grid-cols-1">
          <div>
            {/* Revenue Trends */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-slate-900">Revenue Trends</h2>
                <button className="bg-transparent border-none cursor-pointer text-[#94a3b8] text-[1.2rem] font-bold">···</button>
              </div>
              <div className="h-[240px] bg-[#fafafa] rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-full flex items-end gap-3 p-5">
                  <div className="flex-1 bg-[#38bdf8] opacity-80 rounded-t" style={{ height: '20%' }}></div>
                  <div className="flex-1 bg-[#38bdf8] opacity-80 rounded-t" style={{ height: '35%' }}></div>
                  <div className="flex-1 bg-[#38bdf8] opacity-80 rounded-t" style={{ height: '25%' }}></div>
                  <div className="flex-1 bg-[#38bdf8] opacity-80 rounded-t" style={{ height: '30%' }}></div>
                  <div className="flex-1 bg-[#38bdf8] opacity-80 rounded-t" style={{ height: '40%' }}></div>
                  <div className="flex-1 bg-[#38bdf8] opacity-80 rounded-t" style={{ height: '35%' }}></div>
                  <div className="flex-1 bg-[#38bdf8] opacity-80 rounded-t" style={{ height: '55%' }}></div>
                  <div className="flex-1 bg-[#0284c7] opacity-80 rounded-t" style={{ height: '80%' }}></div>
                </div>
                <p className="text-sm text-[#64748b] z-10 font-medium">[Line Chart Visualization Area]</p>
              </div>
            </div>

            {/* Court Utilization Heatmap */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] mt-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-slate-900">Court Utilization Heatmap</h2>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm" style={{ background: '#e0f2fe' }}></div>
                  <div className="w-3 h-3 rounded-sm" style={{ background: '#7dd3fc' }}></div>
                  <div className="w-3 h-3 rounded-sm" style={{ background: '#0284c7' }}></div>
                  <div className="w-3 h-3 rounded-sm" style={{ background: '#0c4a6e' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { day: 'Mon', colors: ['#0284c7','#0c4a6e','#7dd3fc','#e0f2fe','#0284c7','#0c4a6e'] },
                  { day: 'Wed', colors: ['#7dd3fc','#0c4a6e','#0284c7','#e0f2fe','#0c4a6e','#0284c7'] },
                  { day: 'Fri', colors: ['#e0f2fe','#0284c7','#0c4a6e','#0284c7','#0c4a6e','#e0f2fe'] },
                  { day: 'Sun', colors: ['#e0f2fe','#e0f2fe','#0284c7','#7dd3fc','#0c4a6e','#0284c7'] },
                ].map(row => (
                  <div key={row.day} className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-slate-500 w-8">{row.day}</span>
                    <div className="flex gap-2 flex-1">
                      {row.colors.map((c, i) => (
                        <div key={i} className="flex-1 h-8 rounded" style={{ background: c }}></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">Real-time Activity</h2>
                <p className="text-sm text-slate-500 mt-1">System events across all facilities</p>
              </div>
              <div className="flex flex-col flex-1">
                {[
                  { color: '#10b981', bg: '#d1fae5', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>, title: 'Court 4 Payment Cleared', desc: 'Booking #B-7829 by Michael T.', time: 'Just now' },
                  { color: '#3b82f6', bg: '#dbeafe', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'New Member Registration', desc: 'Sarah J. joined Pro Tier.', time: '5 mins ago' },
                  { color: '#f59e0b', bg: '#fef3c7', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>, title: 'Match Started: Semi-Finals', desc: 'Center Court is now live.', time: '12 mins ago' },
                  { color: '#ef4444', bg: '#fee2e2', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, title: 'Equipment Delay', desc: 'Racket set #14 late return flagged.', time: '28 mins ago' },
                  { color: '#64748b', bg: '#f1f5f9', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>, title: 'Booking Cancelled', desc: 'Court 2 at 18:00 freed up.', time: '1 hour ago' },
                ].map((item, i, arr) => (
                  <div key={i} className="flex gap-4 pb-5 relative">
                    {i < arr.length - 1 && <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-slate-200" />}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center z-[1]" style={{ color: item.color, background: item.bg }}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-[0.8125rem] text-slate-500 mt-[2px]">{item.desc}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-5 border-t border-slate-200 text-center">
                <a href="#" className="text-[#0d8a8a] hover:text-[#0b7373] text-sm font-semibold no-underline hover:underline">View All Logs</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}
