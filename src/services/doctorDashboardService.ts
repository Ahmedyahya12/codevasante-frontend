// src/services/doctorDashboardService.ts
import axiosInstance from './axiosInstance';

export const doctorDashboardService = {
  getStats: async () => {
    const res = await axiosInstance.get('/dashboard/doctor/stats/');
    return res.data;
  },
};
