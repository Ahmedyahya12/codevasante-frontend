// src/store/receptionPatients/receptionPatientsThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { receptionPatientService } from '@/services/receptionPatientService';

export const searchReceptionPatientsThunk = createAsyncThunk(
  'receptionPatients/search',
  async (q: string, { rejectWithValue }) => {
    try {
      return await receptionPatientService.search(q);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل البحث عن المرضى');
    }
  }
);

export const createReceptionPatientThunk = createAsyncThunk(
  'receptionPatients/create',
  async (
    payload: {
      first_name: string;
      last_name: string;
      email: string;
      phone?: string;
      gender?: string;
      national_id?: string;
      address?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await receptionPatientService.create(payload);
    } catch (error: any) {
      console.log('CREATE PATIENT ERROR:', error.response?.data);

      return rejectWithValue(
        error.response?.data?.message || JSON.stringify(error.response?.data) || 'فشل إنشاء المريض'
      );
    }
  }
);
