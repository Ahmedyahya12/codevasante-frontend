// src/services/receptionAppointmentService.ts
import axiosInstance from './axiosInstance';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export const receptionAppointmentService = {
  getAll: async () => {
    const res = await axiosInstance.get('/reception/appointments/');
    return res.data;
  },

  getToday: async () => {
    const res = await axiosInstance.get('/reception/today-appointments/');
    return res.data;
  },

  updateStatus: async (id: number, status: AppointmentStatus) => {
    const res = await axiosInstance.patch(`/reception/appointments/${id}/status/`, {
      status,
    });
    return res.data;
  },

  confirmArrival: async (id: number) => {
    const res = await axiosInstance.post(`/reception/appointments/${id}/confirm-arrival/`);
    return res.data;
  },

  create: async (payload: {
    patient: number;
    doctor: number;
    appointment_date: string;
    appointment_time: string;
    reason?: string;
    department?: string;
    visit_type?: string;
    price?: number;
  }) => {
    const res = await axiosInstance.post('/appointments/reception/create/', payload);
    return res.data;
  },
};
