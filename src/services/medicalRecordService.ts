// src/services/medicalRecordService.ts
import axiosInstance from './axiosInstance';

export const medicalRecordService = {
  getByPatient: async (patientId: number) => {
    const res = await axiosInstance.get(`/medical-records/doctor/?patient_id=${patientId}`);
    return res.data;
  },

  create: async (payload: { patient: number; note: string }) => {
    const res = await axiosInstance.post('/medical-records/create/', payload);
    return res.data;
  },
};
