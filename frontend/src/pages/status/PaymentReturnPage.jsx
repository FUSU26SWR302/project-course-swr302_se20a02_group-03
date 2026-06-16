import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PaymentReturnPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing'); // 'processing', 'success', 'failed'
  const [message, setMessage] = useState('Đang xử lý giao dịch...');
  const [bookingData, setBookingData] = useState(null);
  const [countdown, setCountdown] = useState(15);
  const isProcessed = useRef(false); // Chống React StrictMode gọi 2 lần

  useEffect(() => {
    // Chống double-call: chỉ xử lý 1 lần duy nhất
    if (isProcessed.current) return;
    isProcessed.current = true;

    const processPayment = async () => {
      try {
        const queryString = searchParams.toString();
        const orderInfoRaw = searchParams.get('vnp_OrderInfo');
        let parsedInfo = 'Giao dịch';
        
        if (orderInfoRaw) {
            // Parse với pipe separator: {OrderType}|{ReferenceId}|{UserId}
            const parts = orderInfoRaw.split('|');
            if (parts[0] === 'Booking') {
                parsedInfo = `Thanh toán đặt sân mã #${parts[1]}`;
            } else if (parts[0] === 'Deposit') {
                parsedInfo = `Nạp tiền ví Escrow (Mã GD: ${parts[1]})`;
            }
        }

        const response = await axiosClient.get(`/payment/vnpay/return?${queryString}`);
        
        if (response.statusCode === 200) {
          setStatus('success');
          setMessage(`Giao dịch "${parsedInfo}" đã hoàn tất thành công!`);
          // Lấy booking data nếu có
          if (response.data?.booking) {
            setBookingData(response.data.booking);
          }
        } else {
          setStatus('failed');
          setMessage(response.message || 'Giao dịch không thành công.');
        }
      } catch (error) {
        setStatus('failed');
        const errorMsg = error?.response?.data?.message || error?.message || 'Đã xảy ra lỗi trong quá trình xác thực thanh toán.';
        setMessage(typeof errorMsg === 'string' ? errorMsg : 'Đã xảy ra lỗi trong quá trình xác thực thanh toán.');
      }
    };

    if (searchParams.toString()) {
      processPayment();
    } else {
      setStatus('failed');
      setMessage('Không tìm thấy thông tin giao dịch.');
    }
  }, []);

  // Countdown timer khi đang processing
  useEffect(() => {
    if (status !== 'processing') return;
    if (countdown <= 0) {
      setStatus('failed');
      setMessage('Quá thời gian xử lý. Vui lòng kiểm tra lịch sử đặt sân.');
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown]);

  const formatTime = (t) => {
    if (!t) return '';
    // Handle "HH:MM:SS" → "HH:MM"
    return t.length > 5 ? t.slice(0, 5) : t;
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-50">
      <Navbar theme="light" />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-10 max-w-[520px] w-full text-center shadow-xl shadow-brand-900/5 border border-brand-200/60">
          
          {status === 'processing' && (
            <div className="animate-pulse">
              <div className="w-16 h-16 border-4 border-brand-200 border-t-accent rounded-full animate-spin mx-auto mb-6"></div>
              <h1 className="font-heading text-2xl font-bold text-brand-900 mb-2">Đang xử lý</h1>
              <p className="text-brand-500 text-sm">Vui lòng đợi trong giây lát, không tắt trình duyệt...</p>
              <p className="text-brand-400 text-xs mt-2">Tự động timeout sau {countdown}s</p>
            </div>
          )}

          {status === 'success' && (
            <>
              <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h1 className="font-heading text-3xl font-bold text-brand-900 tracking-tight mb-2">Thanh toán thành công!</h1>
              <p className="text-brand-500 mb-6 leading-relaxed text-[0.95rem]">{message}</p>
              
              {/* Hiển thị chi tiết booking nếu có */}
              {bookingData && (
                <div className="bg-brand-50 rounded-2xl p-5 mb-6 text-left border border-brand-100">
                  <h3 className="font-bold text-brand-900 text-sm mb-3 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Chi tiết đặt sân
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-brand-500">Mã đơn</span>
                      <span className="font-semibold text-brand-900">#{bookingData.bookingId}</span>
                    </div>
                    {bookingData.details?.map((d, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-brand-500">{d.courtName}</span>
                        <span className="font-medium text-brand-800">{formatTime(d.startTime)} - {formatTime(d.endTime)}</span>
                      </div>
                    ))}
                    {bookingData.details?.[0]?.bookingDate && (
                      <div className="flex justify-between">
                        <span className="text-brand-500">Ngày</span>
                        <span className="font-medium text-brand-800">{new Date(bookingData.details[0].bookingDate).toLocaleDateString('vi-VN')}</span>
                      </div>
                    )}
                    <div className="border-t border-brand-200 pt-2 mt-2 flex justify-between">
                      <span className="font-semibold text-brand-900">Tổng tiền</span>
                      <span className="font-bold text-accent">{bookingData.totalAmount?.toLocaleString('vi-VN')} đ</span>
                    </div>
                  </div>
                  
                  {/* Hiển thị mã Check-in */}
                  {bookingData.checkInCode && (
                    <div className="mt-4 p-3 bg-white rounded-xl border border-accent/20 text-center">
                      <p className="text-xs text-brand-500 mb-1">Mã Check-in (QR đã gửi qua Email)</p>
                      <p className="font-mono text-lg font-bold text-accent tracking-wider">{bookingData.checkInCode}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex gap-4">
                <Link to="/customer/bookings" className="btn-outline flex-1 py-3.5 rounded-xl text-[0.9rem]">Xem lịch sử</Link>
                <Link to="/courts" className="btn-primary flex-1 py-3.5 rounded-xl text-[0.9rem]">Về trang chủ</Link>
              </div>
            </>
          )}

          {status === 'failed' && (
            <>
              <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>
              <h1 className="font-heading text-3xl font-bold text-brand-900 tracking-tight mb-2">Thanh toán thất bại</h1>
              <p className="text-brand-500 mb-8 leading-relaxed text-[0.95rem]">{message}</p>
              <div className="flex gap-4">
                <Link to="/customer/bookings" className="btn-outline flex-1 py-3.5 rounded-xl text-[0.9rem]">Xem lịch sử</Link>
                <Link to="/courts" className="btn-outline flex-1 py-3.5 rounded-xl text-[0.9rem]">Thử lại sau</Link>
              </div>
            </>
          )}

        </div>
      </div>
      <Footer variant="light" />
    </div>
  );
}
