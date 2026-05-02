// src/store/receptionAppointments/receptionAppointmentsThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  receptionAppointmentService,
  AppointmentStatus,
} from '@/services/receptionAppointmentService';
import { receptionCreateAppointmentService } from '@/services/receptionCreateAppointmentService';

export const fetchReceptionAppointmentsThunk = createAsyncThunk(
  'receptionAppointments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await receptionAppointmentService.getAll();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحميل المواعيد');
    }
  }
);

export const fetchReceptionTodayAppointmentsThunk = createAsyncThunk(
  'receptionAppointments/fetchToday',
  async (_, { rejectWithValue }) => {
    try {
      return await receptionAppointmentService.getToday();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحميل مواعيد اليوم');
    }
  }
);

export const updateReceptionAppointmentStatusThunk = createAsyncThunk(
  'receptionAppointments/updateStatus',
  async (payload: { id: number; status: AppointmentStatus }, { rejectWithValue }) => {
    try {
      return await receptionAppointmentService.updateStatus(payload.id, payload.status);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحديث حالة الموعد');
    }
  }
);

export const confirmReceptionArrivalThunk = createAsyncThunk(
  'receptionAppointments/confirmArrival',
  async (id: number, { rejectWithValue }) => {
    try {
      return await receptionAppointmentService.confirmArrival(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تأكيد الحضور');
    }
  }
);export const createReceptionAppointmentThunk = createAsyncThunk(
  'receptionAppointments/create',
  async (
    payload: {
      patient: number;
      doctor: number;
      appointment_date: string;
      appointment_time: string;
      reason?: string;
      department?: string;
      visit_type?: string;
      price?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log('CREATE APPOINTMENT PAYLOAD:', payload);

      return await receptionAppointmentService.create(payload);
    } catch (error: any) {
      console.log('CREATE APPOINTMENT ERROR:', error.response?.data);

      return rejectWithValue(
        error.response?.data?.message || JSON.stringify(error.response?.data) || 'فشل إنشاء الموعد'
      );
    }
  }
);

export const fetchReceptionDoctorsThunk = createAsyncThunk(
  'receptionAppointments/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      return await receptionCreateAppointmentService.getDoctors();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحميل الأطباء');
    }
  }
);
