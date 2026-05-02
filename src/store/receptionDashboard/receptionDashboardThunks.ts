// src/store/receptionDashboard/receptionDashboardThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { receptionDashboardService } from '@/services/receptionDashboardService';

export const fetchReceptionDashboardStatsThunk = createAsyncThunk(
  'receptionDashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await receptionDashboardService.getStats();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحميل إحصائيات الاستقبال');
    }
  }
);
