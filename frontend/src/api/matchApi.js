import axiosClient from './axiosClient';

export const matchApi = {
  // Xem danh sách kèo đang mở
  getOpenMatches: () => axiosClient.get('/matches/open'),

  // Xem chi tiết kèo
  getMatchById: (id) => axiosClient.get(`/matches/${id}`),

  // Tạo kèo mới
  createMatch: (data) => axiosClient.post('/matches', data),

  // Xin tham gia kèo
  joinMatch: (id) => axiosClient.post(`/matches/${id}/join`),

  // Host duyệt người tham gia
  approveJoiner: (id, participantId) => axiosClient.post(`/matches/${id}/approve/${participantId}`),

  // Hủy kèo (chỉ dành cho Host trước giờ hoặc Admin)
  cancelMatch: (id) => axiosClient.post(`/matches/${id}/cancel`),

  // Rời kèo (Joiner xin rút)
  leaveMatch: (id) => axiosClient.post(`/matches/${id}/leave`),
};
