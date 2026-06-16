import { useState } from 'react'
import { Link } from 'react-router-dom'
import GearLayout from '../../layouts/GearLayout'

const stats = [
  { label: 'Active Rentals', value: '24', change: '+3 today', color: '#0d8a8a', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  { label: 'Overdue Returns', value: '3', change: '!  Needs attention', color: '#ef4444', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  { label: 'Revenue (Month)', value: '$4,280', change: '+12.4% vs last month', color: '#6366f1', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { label: 'Total Inventory', value: '142', change: '12 in maintenance', color: '#f59e0b', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
]

const activeRentals = [
  { id: 'R-001', customer: 'Alex Mercer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80', item: 'Vợt Yonex Astrox 99', category: 'Vợt Cầu lông', start: 'Today, 14:00', due: 'Today, 20:00', status: 'active', price: '$15' },
  { id: 'R-002', customer: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80', item: 'Vợt Pickleball Selkirk Amped', category: 'Vợt Pickleball', start: 'Today, 09:00', due: 'Today, 17:00', status: 'active', price: '$18' },
  { id: 'R-003', customer: 'Marcus T.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80', item: 'Giày Cầu lông Yonex 65Z', category: 'Giày Cầu lông', start: 'Yesterday, 10:00', due: 'Yesterday, 18:00', status: 'overdue', price: '$10' },
  { id: 'R-004', customer: 'Elena R.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&q=80', item: 'Cầu lông Feather (12 quả)', category: 'Cầu lông', start: 'Today, 11:00', due: 'Today, 19:00', status: 'active', price: '$8' },
  { id: 'R-005', customer: 'David K.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80', item: 'Bộ Pickleball Premium', category: 'Pickleball', start: 'Today, 16:00', due: 'Tomorrow, 10:00', status: 'pending', price: '$22' },
]

const inventoryAlerts = [
  { item: 'Vợt Yonex Astrox 99', stock: 2, total: 8, status: 'low' },
  { item: 'Giày Cầu lông Yonex 65Z', stock: 0, total: 3, status: 'out' },
  { item: 'Bộ Pickleball Premium', stock: 1, total: 5, status: 'low' },
]

const statusConfig = {
  active: { label: 'Active', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  overdue: { label: 'Overdue', bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
  pending: { label: 'Pending', bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' },
}

export default function GearDashboardPage() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all' ? activeRentals : activeRentals.filter(r => r.status === activeTab)

  return (
    <GearLayout>
      <div className="px-7 py-6 max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-brand-900">Equipment Dashboard</h1>
            <p className="text-sm text-brand-500 mt-1">Real-time overview of all rental operations</p>
          </div>
          <div className="flex gap-3">
            <Link to="/gear/rentals" className="btn-outline text-sm py-2 px-4 no-underline flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Manage Rentals
            </Link>
            <Link to="/gear/catalog" className="btn-primary text-sm py-2 px-4 no-underline flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New Rental
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-brand-200 p-5 flex flex-col gap-3 shadow-sm hover:border-brand-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.color + '18', color: s.color }}>
                  {s.icon}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-1">{s.label}</p>
                <p className="font-heading text-3xl font-bold text-brand-900 mb-1">{s.value}</p>
                <p className="text-xs font-medium text-brand-500">{s.change}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

          {/* Active Rentals Table */}
          <div className="bg-white rounded-2xl border border-brand-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-brand-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold text-brand-900">Active Rentals</h2>
                <Link to="/gear/rentals" className="text-sm text-accent font-semibold hover:underline">View All →</Link>
              </div>
              <div className="flex gap-2">
                {['all','active','overdue','pending'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${activeTab === tab ? 'bg-brand-900 text-white' : 'bg-brand-50 text-brand-600 hover:bg-brand-100'}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-brand-100">
              {filtered.map(r => {
                const s = statusConfig[r.status]
                return (
                  <div key={r.id} className="px-6 py-4 flex items-center gap-4 hover:bg-brand-50/50 transition-colors">
                    <img src={r.avatar} alt={r.customer} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-brand-900 truncate">{r.customer}</p>
                      <p className="text-xs text-brand-500 truncate mt-0.5">{r.item}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-brand-900">{r.price}/hr</p>
                      <p className="text-xs text-brand-400 mt-0.5">Due {r.due}</p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ml-2 ${s.bg} ${s.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                      {s.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">

            {/* Revenue Chart placeholder */}
            <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-brand-900 mb-6">Weekly Revenue</h2>
              <div className="flex items-end gap-2 h-32">
                {[40,65,45,80,55,90,72].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-full rounded-md transition-colors ${i === 5 ? 'bg-accent' : 'bg-brand-100'}`} style={{ height: `${h}%` }}></div>
                    <span className="text-xs font-semibold text-brand-400">{'SMTWTFS'[i]}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6 pt-5 border-t border-brand-100">
                <div>
                  <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">This Week</p>
                  <p className="font-bold text-brand-900 text-base">$1,240</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-1">Last Week</p>
                  <p className="font-bold text-brand-500 text-base">$980</p>
                </div>
              </div>
            </div>

            {/* Inventory Alerts */}
            <div className="bg-white rounded-2xl border border-brand-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg font-bold text-brand-900">Inventory Alerts</h2>
                <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-md">{inventoryAlerts.length} Issues</span>
              </div>
              <div className="flex flex-col gap-5">
                {inventoryAlerts.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-brand-900 truncate flex-1">{item.item}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ml-3 px-1.5 py-0.5 rounded ${item.status === 'out' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                        {item.status === 'out' ? 'Out of Stock' : 'Low Stock'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(item.stock / item.total) * 100}%`, background: item.status === 'out' ? '#ef4444' : '#f59e0b' }}></div>
                    </div>
                    <p className="text-xs font-medium text-brand-500 mt-1.5">{item.stock}/{item.total} available</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </GearLayout>
  )
}
