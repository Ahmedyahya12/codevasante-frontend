// src/services/receptionPatientService.ts
import axiosInstance from './axiosInstance';

export const receptionPatientService = {
  search: async (q = '') => {
    const res = await axiosInstance.get(`/patients/search/?q=${encodeURIComponent(q)}`);
    return res.data;
  },

  create: async (payload: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    gender?: string;
    national_id?: string;
    address?: string;
  }) => {
    const res = await axiosInstance.post('/patients/create/', payload);
    return res.data;
  },
};
