// src/store/doctorAppointments/doctorAppointmentsThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { doctorAppointmentService, AppointmentStatus } from '@/services/doctorAppointmentService';

export const fetchDoctorAppointmentsThunk = createAsyncThunk(
  'doctorAppointments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await doctorAppointmentService.getAll();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحميل المواعيد');
    }
  }
);

export const fetchTodayAppointmentsThunk = createAsyncThunk(
  'doctorAppointments/fetchToday',
  async (_, { rejectWithValue }) => {
    try {
      return await doctorAppointmentService.getToday();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحميل مواعيد اليوم');
    }
  }
);

export const fetchUpcomingAppointmentsThunk = createAsyncThunk(
  'doctorAppointments/fetchUpcoming',
  async (_, { rejectWithValue }) => {
    try {
      return await doctorAppointmentService.getUpcoming();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحميل المواعيد القادمة');
    }
  }
);

export const updateAppointmentStatusThunk = createAsyncThunk(
  'doctorAppointments/updateStatus',
  async (payload: { id: number; status: AppointmentStatus }, { rejectWithValue }) => {
    try {
      return await doctorAppointmentService.updateStatus(payload.id, payload.status);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحديث حالة الموعد');
    }
  }
);
