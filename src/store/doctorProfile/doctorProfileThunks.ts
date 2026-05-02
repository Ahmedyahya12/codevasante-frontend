// src/store/doctorProfile/doctorProfileThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doctorProfileService } from '@/services/doctorProfileService';

export const fetchDoctorProfileThunk = createAsyncThunk(
  'doctorProfile/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      return await doctorProfileService.getMe();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحميل ملف الطبيب');
    }
  }
);

export const updateDoctorProfileThunk = createAsyncThunk(
  'doctorProfile/updateMe',
  async (payload: FormData, { rejectWithValue }) => {
    try {
      return await doctorProfileService.updateMe(payload);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحديث ملف الطبيب');
    }
  }
);
