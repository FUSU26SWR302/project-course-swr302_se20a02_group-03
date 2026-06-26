import axiosClient from './axiosClient';

export const bookingApi = {
  // Lấy danh sách sân
  getCourts: () => axiosClient.get('/courts'),
  
  // Lấy chi tiết sân
  getCourtById: (id) => axiosClient.get(`/courts/${id}`),

  // Lấy các giờ đã đặt
  getBookedSlots: (courtId, date) => axiosClient.get(`/courts/${courtId}/booked-slots`, { params: { date } }),

  // Đặt sân
  createBooking: (data) => axiosClient.post('/bookings', data),

  // Xem lịch sử đặt sân của user
  getMyBookings: () => axiosClient.get('/bookings/my-bookings'),

  // Hủy đặt sân
  cancelBooking: (bookingId) => axiosClient.put(`/bookings/${bookingId}/cancel`),

  // Quét mã QR Check-in (Dành cho Staff)
  checkInBooking: (checkInCode) => axiosClient.post('/bookings/check-in', { checkInCode }),
};
