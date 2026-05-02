import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Doctor,
  DoctorAvailability,
  doctorService,
  GetDoctorsParams,
} from '@/services/doctorService';

const getErrorMessage = (error: any) => {
  return (
    error?.response?.data?.detail ||
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    'حدث خطأ غير متوقع'
  );
};

export const fetchDoctorsThunk = createAsyncThunk<
  Doctor[],
  GetDoctorsParams | undefined,
  { rejectValue: string }
>('doctors/fetchDoctors', async (params, thunkAPI) => {
  try {
    return await doctorService.getDoctors(params);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const fetchDoctorDetailThunk = createAsyncThunk<Doctor, number, { rejectValue: string }>(
  'doctors/fetchDoctorDetail',
  async (id, thunkAPI) => {
    try {
      return await doctorService.getDoctorById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchDoctorSpecialtiesThunk = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>('doctors/fetchSpecialties', async (_, thunkAPI) => {
  try {
    return await doctorService.getSpecialties();
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const fetchDoctorAvailabilityThunk = createAsyncThunk<
  DoctorAvailability,
  { doctorId: number; date: string },
  { rejectValue: string }
>('doctors/fetchAvailability', async ({ doctorId, date }, thunkAPI) => {
  try {
    return await doctorService.getDoctorAvailability(doctorId, date);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});
