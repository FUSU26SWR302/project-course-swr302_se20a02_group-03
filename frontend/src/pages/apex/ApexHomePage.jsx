import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ApexLayout from '../../layouts/ApexLayout'
import authApi from '../../api/authApi'
import { bookingApi } from '../../api/bookingApi'
import dayjs from 'dayjs'

export default function ApexHomePage() {
  const [userProfile, setUserProfile] = useState(null)
  const [upcomingBookings, setUpcomingBookings] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, bookingsRes] = await Promise.all([
          authApi.getProfile(),
          bookingApi.getMyBookings()
        ])
        
        if (profileRes?.data?.data) setUserProfile(profileRes.data.data)
        
        if (bookingsRes?.data?.data) {
          // Lấy 3 booking sắp tới
          const upcoming = bookingsRes.data.data
            .filter(b => b.status === 'Confirmed' || b.status === 'Pending')
            .flatMap(b => b.bookingDetails.map(d => ({
              id: d.bookingDetailId,
              name: d.courtName,
              date: d.bookingDate,
              startTime: d.startTime,
              endTime: d.endTime,
              status: b.status,
              icon: d.courtName?.toLowerCase().includes('pickleball') ? '🏓' : '🏸',
              iconBg: d.courtName?.toLowerCase().includes('pickleball') ? '#f59e0b' : '#0d8a8a'
            })))
            .sort((a, b) => new Date(`${a.date}T${a.startTime}`) - new Date(`${b.date}T${b.startTime}`))
            .slice(0, 3)
            
          setUpcomingBookings(upcoming)
        }
      } catch (err) {
        console.error("Failed to fetch home data", err)
      }
    }
    fetchData()
  }, [])

  return (
    <ApexLayout title="Home">
      <div>
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#e8f7f5] to-[#d0eff8] rounded-2xl p-8 mb-6">
          <div>
            <h1 className="font-['Oswald'] text-[1.8rem] font-bold text-[#0d2d3a] mb-2.5">Welcome back, <span className="text-[#0fc8b5]">{userProfile?.fullName?.split(' ')[0] || 'User'}</span></h1>
            <p className="text-[0.9rem] text-slate-500 leading-relaxed mb-5 max-w-[500px]">You have {upcomingBookings.length} upcoming bookings and 1 pending match invitation. Ready to hit the court?</p>
            <div className="flex gap-3">
              <Link to="/apex/booking" className="btn-primary">Book a Court</Link>
              <Link to="/apex/shop" className="btn-outline">Rent Equipment</Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-5">
          {/* Upcoming Bookings */}
          <div className="bg-white rounded-[14px] p-5 border border-[#e0ecf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#0d2d3a] mb-4">Upcoming Bookings</h2>
              <Link to="/apex/booking" className="text-[0.82rem] text-[#0fc8b5] font-semibold">View All</Link>
            </div>
            {upcomingBookings.length === 0 ? (
              <p className="text-sm text-slate-400 py-4 text-center">No upcoming bookings.</p>
            ) : (
              upcomingBookings.map(b => (
                <div key={b.id} className="flex items-center gap-3 py-3 border-b border-[#f0f5f9] last:border-b-0">
                  <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-[1.1rem] shrink-0" style={{background: b.iconBg}}>{b.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-[#0d2d3a]">{b.name}</p>
                    <p className="text-[0.78rem] text-slate-400 mt-0.5">{dayjs(b.date).format('MMM DD')}, {b.startTime?.slice(0,5)} - {b.endTime?.slice(0,5)}</p>
                  </div>
                  <span className={`ml-auto text-[0.7rem] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${b.status === 'Confirmed' ? 'text-green-500 bg-green-500/10' : 'text-orange-500 bg-orange-500/10'}`}>{b.status?.toUpperCase()}</span>
                </div>
              ))
            )}
          </div>

          {/* Active Rentals */}
          <div className="bg-white rounded-[14px] p-5 border border-[#e0ecf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <h2 className="text-base font-bold text-[#0d2d3a] mb-4">Active Rentals</h2>
            <div className="flex items-center gap-3 mb-3">
              <div>
                <p className="text-sm font-bold text-[#0d2d3a]">Vợt Cầu lông Pro</p>
                <p className="text-[0.78rem] text-slate-400 mt-0.5">Due: Today, 20:00</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <div className="h-1.5 bg-[#e0ecf0] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0fc8b5] to-[#0d8a8a] rounded-full transition-all duration-400" style={{width: '65%'}} />
            </div>
            <Link to="/apex/shop" className="btn-outline mt-4 w-full justify-center flex">Rent More Gear</Link>
          </div>
        </div>

        {/* Match Invitations */}
        <div className="bg-white rounded-[14px] p-5 border border-[#e0ecf0] shadow-[0_1px_4px_rgba(0,0,0,0.04)] mt-5">
          <h2 className="text-base font-bold text-[#0d2d3a] mb-4">Match Invitations</h2>
          <div className="flex items-start gap-3.5">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" alt="David K." className="w-[46px] h-[46px] rounded-full object-cover shrink-0" />
            <div>
              <p className="text-[0.9rem] font-bold text-[#0d2d3a]">Doubles Match (Intermediate)</p>
              <p className="text-[0.78rem] text-slate-400 my-0.5">Hosted by David K.</p>
              <div className="flex gap-3 text-[0.8rem] text-slate-500 mt-1">
                <span>📍 Lê Văn Lộc</span>
                <span>🏟 Court 8</span>
              </div>
            </div>
            <div className="flex gap-2 ml-auto items-center">
              <button className="btn-primary">Join Match</button>
              <button className="btn-outline">Decline</button>
            </div>
          </div>
        </div>
      </div>
    </ApexLayout>
  )
}
