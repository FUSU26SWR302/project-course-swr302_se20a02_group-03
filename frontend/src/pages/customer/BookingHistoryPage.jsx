import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { bookingApi } from '../../api/bookingApi'
import { paymentApi } from '../../api/paymentApi'
import { useToast } from '../../components/Toast'

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await bookingApi.getMyBookings();
      if (res.statusCode === 200 && res.data) {
        setBookings(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      addToast('Lỗi khi tải lịch sử đặt sân', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn đặt sân này?')) return;
    try {
      const res = await bookingApi.cancelBooking(bookingId);
      if (res.statusCode === 200) {
        addToast(res.message || 'Hủy đặt sân thành công', 'success');
        fetchBookings(); // Reload data
      } else {
        addToast(res.message || 'Lỗi khi hủy đặt sân', 'error');
      }
    } catch (error) {
      addToast(error?.message || 'Có lỗi xảy ra', 'error');
    }
  };

  const handlePayment = async (bookingId, amount) => {
      // For simplicity, direct to VNPay. In a real app, you might want to show a modal to choose payment method.
      try {
          const vnpayRes = await paymentApi.createVnPayUrl(amount, 'Booking', bookingId);
          if (vnpayRes.statusCode === 200 && vnpayRes.data) {
              window.location.href = vnpayRes.data;
          } else {
              addToast("Không thể tạo link thanh toán VNPay", "error");
          }
      } catch(error) {
          addToast(error?.message || "Có lỗi xảy ra", "error");
      }
  }

  const filteredBookings = bookings.filter(b => {
    if (filter === 'All') return true;
    if (filter === 'Upcoming') return b.status === 'Confirmed' || b.status === 'Pending';
    if (filter === 'Completed') return b.status === 'Completed';
    if (filter === 'Cancelled') return b.status === 'Cancelled';
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Completed': return 'bg-slate-100 text-slate-600';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const formatTime = (t) => {
    if (!t) return '';
    // Handle "HH:MM:SS" → "HH:MM"
    return t.length > 5 ? t.slice(0, 5) : t;
  };

  // Tính thời gian còn lại cho PaymentDeadline
  const getDeadlineRemaining = useCallback((deadline) => {
    if (!deadline) return null;
    const deadlineTime = new Date(deadline).getTime();
    const now = Date.now();
    const diff = deadlineTime - now;
    if (diff <= 0) return 'Hết hạn';
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }, []);

  // Refresh countdown mỗi giây
  const [, setTick] = useState(0);
  useEffect(() => {
    const hasPending = bookings.some(b => b.status === 'Pending' && b.paymentDeadline);
    if (!hasPending) return;
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [bookings]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f9fb]">
      <Navbar theme="light" />

      <div className="max-w-[1000px] mx-auto px-6 pt-[90px] pb-20 w-full flex-1">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-['Oswald'] text-3xl font-bold text-slate-900">Lịch sử đặt sân</h1>
          <Link to="/courts" className="bg-[#00c8aa] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#009e87] transition-colors">
            + Đặt sân mới
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-100">
            <button onClick={() => setFilter('All')} className={`flex-1 py-4 text-sm font-semibold ${filter === 'All' ? 'text-[#00c8aa] border-b-2 border-[#00c8aa]' : 'text-slate-500 hover:text-slate-800'}`}>Tất cả</button>
            <button onClick={() => setFilter('Upcoming')} className={`flex-1 py-4 text-sm font-semibold ${filter === 'Upcoming' ? 'text-[#00c8aa] border-b-2 border-[#00c8aa]' : 'text-slate-500 hover:text-slate-800'}`}>Sắp tới / Chờ duyệt</button>
            <button onClick={() => setFilter('Completed')} className={`flex-1 py-4 text-sm font-semibold ${filter === 'Completed' ? 'text-[#00c8aa] border-b-2 border-[#00c8aa]' : 'text-slate-500 hover:text-slate-800'}`}>Đã hoàn thành</button>
            <button onClick={() => setFilter('Cancelled')} className={`flex-1 py-4 text-sm font-semibold ${filter === 'Cancelled' ? 'text-[#00c8aa] border-b-2 border-[#00c8aa]' : 'text-slate-500 hover:text-slate-800'}`}>Đã hủy</button>
          </div>

          <div className="p-6">
            {isLoading ? (
               <div className="text-center py-10 text-slate-500">Đang tải lịch sử...</div>
            ) : filteredBookings.length === 0 ? (
               <div className="text-center py-10 text-slate-500">Chưa có dữ liệu đặt sân.</div>
            ) : (
            <div className="flex flex-col gap-4">
              {filteredBookings.map(b => (
                <div key={b.bookingId} className="border border-slate-100 rounded-xl p-5 hover:border-[#00c8aa]/50 transition-colors flex flex-wrap gap-4 items-center justify-between group">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-full bg-[#00c8aa]/10 flex items-center justify-center text-[#00c8aa] shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900">{b.details?.[0]?.courtName || 'Sân chưa xác định'}</h3>
                        <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full ${getStatusColor(b.status)}`}>{b.status}</span>
                      </div>
                      <p className="text-sm text-slate-500">{new Date(b.details?.[0]?.bookingDate).toLocaleDateString('vi-VN')} • {formatTime(b.details?.[0]?.startTime)} - {formatTime(b.details?.[0]?.endTime)}</p>
                      <p className="text-xs text-slate-400 mt-1">Mã đơn: #{b.bookingId}</p>
                      
                      {/* Countdown thanh toán cho Pending */}
                      {b.status === 'Pending' && b.paymentDeadline && (
                        <p className={`text-xs font-semibold mt-1 ${getDeadlineRemaining(b.paymentDeadline) === 'Hết hạn' ? 'text-red-500' : 'text-orange-500'}`}>
                          ⏳ {getDeadlineRemaining(b.paymentDeadline) === 'Hết hạn' ? 'Đã hết hạn thanh toán' : `Còn ${getDeadlineRemaining(b.paymentDeadline)} để thanh toán`}
                        </p>
                      )}
                      
                      {/* Mã Check-in cho Confirmed */}
                      {b.status === 'Confirmed' && b.checkInCode && (
                        <p className="text-xs mt-1.5 flex items-center gap-1">
                          <span className="text-slate-400">Mã check-in:</span>
                          <span className="font-mono font-bold text-[#00c8aa] bg-[#00c8aa]/10 px-2 py-0.5 rounded">{b.checkInCode}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right max-sm:text-left">
                      <p className="text-xs text-slate-500 mb-0.5">Tổng tiền</p>
                      <p className="font-bold text-slate-900">{b.totalAmount.toLocaleString('vi-VN')} đ</p>
                    </div>
                    
                    <div className="flex gap-2">
                      {b.status === 'Pending' && (
                        <button onClick={() => handlePayment(b.bookingId, b.totalAmount)} className="px-4 py-2 bg-[#00c8aa] text-white rounded-lg text-sm font-semibold hover:bg-[#009e87] transition-colors">Thanh toán</button>
                      )}
                      {(b.status === 'Confirmed' || b.status === 'Pending') && (
                        <button onClick={() => handleCancel(b.bookingId)} className="px-4 py-2 border border-red-200 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors">Hủy sân</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  )
}
