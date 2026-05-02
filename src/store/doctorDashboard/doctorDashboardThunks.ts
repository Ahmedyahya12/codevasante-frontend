// src/store/doctorDashboard/doctorDashboardThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doctorDashboardService } from '@/services/doctorDashboardService';

export const fetchDoctorDashboardStatsThunk = createAsyncThunk(
  'doctorDashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await doctorDashboardService.getStats();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحميل إحصائيات الطبيب');
    }
  }
);
