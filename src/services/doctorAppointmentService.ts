// src/services/doctorAppointmentService.ts
import axiosInstance from './axiosInstance';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export const doctorAppointmentService = {
  getAll: async () => {
    const res = await axiosInstance.get('/appointments/doctor/');
    return res.data;
  },

  getToday: async () => {
    const res = await axiosInstance.get('/appointments/doctor/today/');
    return res.data;
  },

  getUpcoming: async () => {
    const res = await axiosInstance.get('/appointments/doctor/upcoming/');
    return res.data;
  },

  updateStatus: async (id: number, status: AppointmentStatus) => {
    const res = await axiosInstance.patch(`/appointments/doctor/${id}/status/`, {
      status,
    });
    return res.data;
  },
};
