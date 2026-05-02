// src/store/doctorPatients/doctorPatientsThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doctorPatientService } from '@/services/doctorPatientService';

export const fetchDoctorPatientsThunk = createAsyncThunk(
  'doctorPatients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await doctorPatientService.getMyPatients();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحميل المرضى');
    }
  }
);
