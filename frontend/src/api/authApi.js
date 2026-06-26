import axiosClient from './axiosClient';

const authApi = {
  login: (data) => {
    return axiosClient.post('/auth/login', data);
  },
  register: (data) => {
    return axiosClient.post('/auth/register', data);
  },
  verifyOtp: (data) => {
    return axiosClient.post('/auth/verify-otp', data);
  },
  resendOtp: (data) => {
    return axiosClient.post('/auth/resend-otp', data);
  },
  googleLogin: (data) => {
    return axiosClient.post('/auth/google-login', data);
  },
  resetPassword: (data) => {
    return axiosClient.post('/auth/reset-password', data);
  },
  completeProfile: (data) => {
    return axiosClient.post('/auth/complete-profile', data);
  },
  forgotPassword: (data) => {
    return axiosClient.post('/auth/forgot-password', data);
  },
  getProfile: () => {
    return axiosClient.get('/auth/me');
  }
};

export default authApi;
