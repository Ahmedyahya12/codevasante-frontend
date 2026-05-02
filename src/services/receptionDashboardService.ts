// src/services/receptionDashboardService.ts
import axiosInstance from './axiosInstance';

export const receptionDashboardService = {
  getStats: async () => {
    const res = await axiosInstance.get('/dashboard/reception/stats/');
    return res.data;
  },
};
