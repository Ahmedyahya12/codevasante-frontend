// src/services/receptionCreateAppointmentService.ts
import axiosInstance from './axiosInstance';

export const receptionCreateAppointmentService = {
  getDoctors: async () => {
    const res = await axiosInstance.get('/doctors/');
    return res.data;
  },
};
