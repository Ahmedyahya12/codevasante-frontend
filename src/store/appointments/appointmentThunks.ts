import { createAsyncThunk } from '@reduxjs/toolkit';
import { doctorService } from '@/services/doctorService';
import { appointmentService } from '@/services/appointmentService';
import type { CreateAppointmentPayload } from '@/services/appointmentService';

const getErrorMessage = (error: any) => {
  const data = error?.response?.data;

  if (typeof data === 'string') return data;
  if (data?.detail) return data.detail;
  if (data?.message) return data.message;
  if (data?.error) return data.error;
  if (data?.non_field_errors?.[0]) return data.non_field_errors[0];

  const firstKey = data && Object.keys(data)[0];
  if (firstKey) {
    const value = data[firstKey];
    if (Array.isArray(value)) return value[0];
    return value;
  }

  return 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.';
};

export const fetchSpecialtiesThunk = createAsyncThunk(
  'appointments/fetchSpecialties',
  async (_, thunkAPI) => {
    try {
      return await doctorService.getSpecialties();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchDoctorsBySpecialtyThunk = createAsyncThunk(
  'appointments/fetchDoctorsBySpecialty',
  async (specialty: string, thunkAPI) => {
    try {
      return await doctorService.getDoctors(specialty ? { specialty } : undefined);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchDoctorAvailabilityThunk = createAsyncThunk(
  'appointments/fetchDoctorAvailability',
  async ({ doctorId, date }: { doctorId: number; date: string }, thunkAPI) => {
    try {
      return await doctorService.getDoctorAvailability(doctorId, date);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createAppointmentThunk = createAsyncThunk(
  'appointments/createAppointment',
  async (payload: CreateAppointmentPayload, thunkAPI) => {
    try {
      return await appointmentService.createAppointment(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchMyAppointmentsThunk = createAsyncThunk(
  'appointments/fetchMyAppointments',
  async (_, thunkAPI) => {
    try {
      return await appointmentService.getMyAppointments();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const cancelAppointmentThunk = createAsyncThunk(
  'appointments/cancelAppointment',
  async (id: number, thunkAPI) => {
    try {
      await appointmentService.cancelAppointment(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
