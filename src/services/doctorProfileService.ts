// src/services/doctorProfileService.ts
import axiosInstance from './axiosInstance';

export const doctorProfileService = {
  getMe: async () => {
    const res = await axiosInstance.get('/doctors/me/');
    return res.data;
  },

  updateMe: async (payload: FormData) => {
    const res = await axiosInstance.put('/doctors/me/update/', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};
