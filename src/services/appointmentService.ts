import axiosInstance from './axiosInstance';

export interface CreateAppointmentPayload {
  doctor: number;
  date: string;
  time: string;
  reason: string;
}

export interface Appointment {
  id: number;
  patient: number;
  doctor: number;
  patient_name: string;
  doctor_name: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'checked_in' | 'cancelled';
  created_at: string;
}

export const appointmentService = {
  createAppointment: async (payload: CreateAppointmentPayload) => {
    const { data } = await axiosInstance.post('/appointments/create/', payload);
    return data;
  },

  getMyAppointments: async () => {
    const { data } = await axiosInstance.get<Appointment[]>('/appointments/my/');
    return data;
  },

  getTodayAppointments: async () => {
    const { data } = await axiosInstance.get<Appointment[]>('/appointments/today/');
    return data;
  },

  confirmAppointment: async (id: number) => {
    const { data } = await axiosInstance.post(`/appointments/${id}/confirm/`);
    return data;
  },

  checkInAppointment: async (id: number) => {
    const { data } = await axiosInstance.post(`/appointments/${id}/check-in/`);
    return data;
  },

  cancelAppointment: async (id: number) => {
    const { data } = await axiosInstance.post(`/appointments/${id}/cancel/`);
    return data;
  },
};
