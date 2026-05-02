// src/services/doctorPatientService.ts
import axiosInstance from './axiosInstance';

export const doctorPatientService = {
  getMyPatients: async () => {
    const res = await axiosInstance.get('/patients/my-doctor-patients/');
    return res.data;
  },
};
