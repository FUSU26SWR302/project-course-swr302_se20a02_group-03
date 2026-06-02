import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function MatchDetailPage() {
  const { id } = useParams()
  const [joined, setJoined] = useState(false)

  const match = {
    title: 'Giao lưu Cầu lông - Trình độ Khá',
    host: 'Alex Mercer',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    sport: 'Cầu lông',
    level: 'Khá / Giỏi',
    location: 'The Apex Pavilion - Court A',
    date: 'Hôm nay',
    time: '18:00 - 19:30',
    totalSlots: 4,
    joinedSlots: 2,
    pricePerSlot: 40000,
    note: 'Nhóm mình cần tuyển thêm 2 bạn đánh vui vẻ mồ hôi. Nhớ mang theo vợt cá nhân nhé.',
    participants: [
      { name: 'Alex Mercer', role: 'Host', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80' },
      { name: 'Sarah J.', role: 'Member', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80' }
    ]
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f9fb]">
      <Navbar theme="light" />

      <div className="max-w-[1000px] mx-auto px-6 pt-[90px] pb-20 w-full flex-1">
        <Link to="/matches" className="text-slate-400 text-sm hover:text-[#00c8aa] mb-6 inline-block flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Danh sách kèo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex gap-2 mb-4">
                <span className="bg-[#00c8aa]/10 text-[#00c8aa] text-xs font-bold px-2.5 py-1 rounded-full uppercase">{match.sport}</span>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase">{match.level}</span>
              </div>
              <h1 className="font-['Oswald'] text-2xl font-bold text-slate-900 mb-6">{match.title}</h1>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">📍</div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Địa điểm</p>
                    <p className="text-sm font-semibold text-slate-800">{match.location}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">🕒</div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Thời gian</p>
                    <p className="text-sm font-semibold text-slate-800">{match.date} • {match.time}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm font-semibold text-slate-900 mb-2">Ghi chú của Host</p>
                <p className="text-sm text-slate-600 leading-relaxed">{match.note}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900">Người tham gia ({match.joinedSlots + (joined ? 1 : 0)}/{match.totalSlots})</h2>
              </div>
              <div className="space-y-4">
                {match.participants.map(p => (
                  <div key={p.name} className="flex items-center gap-3">
                    <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                      <p className={`text-xs ${p.role === 'Host' ? 'text-[#00c8aa] font-semibold' : 'text-slate-400'}`}>{p.role}</p>
                    </div>
                  </div>
                ))}
                {joined && (
                  <div className="flex items-center gap-3 bg-amber-50 p-2 -mx-2 rounded-lg border border-amber-100">
                    <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700">ME</div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Bạn (Vừa tham gia)</p>
                      <p className="text-xs text-amber-600 font-semibold">Đã ký quỹ</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="sticky top-24 h-fit">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <img src={match.hostAvatar} alt="Host" className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Host kèo</p>
                  <p className="font-bold text-slate-900">{match.host}</p>
                  <p className="text-xs font-semibold text-amber-500 mt-0.5">★ 4.9 (42 kèo)</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Chi phí / Slot</p>
                  <p className="font-['Oswald'] text-2xl font-bold text-[#00c8aa]">
                    {match.pricePerSlot.toLocaleString('vi-VN')} <span className="text-sm font-normal text-slate-400">VNĐ</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-sm mb-1">Slot còn trống</p>
                  <p className="font-['Oswald'] text-2xl font-bold text-slate-900">{match.totalSlots - match.joinedSlots - (joined ? 1 : 0)}</p>
                </div>
              </div>

              {!joined ? (
                <>
                  <button onClick={() => setJoined(true)} className="w-full bg-[#00c8aa] text-white font-bold py-3.5 rounded-xl hover:bg-[#009e87] transition-colors shadow-md shadow-[#00c8aa]/20 flex items-center justify-center gap-2 mb-3">
                    Tham gia & Ký quỹ
                  </button>
                  <p className="text-xs text-slate-400 text-center leading-relaxed">
                    Hệ thống sẽ trừ <b>{match.pricePerSlot.toLocaleString('vi-VN')} VNĐ</b> từ ví Escrow. Sẽ hoàn lại 100% nếu bạn hủy trước 24h.
                  </p>
                </>
              ) : (
                <>
                  <button disabled className="w-full bg-green-50 text-green-600 font-bold py-3.5 rounded-xl cursor-not-allowed mb-3 border border-green-200 flex items-center justify-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Đã tham gia
                  </button>
                  <button onClick={() => setJoined(false)} className="w-full bg-white text-red-500 font-bold py-3 rounded-xl border border-red-200 hover:bg-red-50 transition-colors">
                    Rút khỏi kèo
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  )
}
