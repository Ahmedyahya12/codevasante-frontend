import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/authService';
import type { LoginPayload, RegisterPatientPayload, SetPasswordPayload, User } from './authTypes';

const getErrorMessage = (error: any) => {
  const data = error?.response?.data;

  if (typeof data === 'string') return data;
  if (data?.detail) return data.detail;
  if (data?.message) return data.message;
  if (data?.non_field_errors?.[0]) return data.non_field_errors[0];

  const firstKey = data && Object.keys(data)[0];
  if (firstKey) {
    const value = data[firstKey];
    if (Array.isArray(value)) return value[0];
    return value;
  }

  return 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.';
};

export const registerPatientThunk = createAsyncThunk(
  'auth/registerPatient',
  async (payload: RegisterPatientPayload, thunkAPI) => {
    try {
      return await authService.registerPatient(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, thunkAPI) => {
    try {
      return await authService.login(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk<User>('auth/me', async (_, thunkAPI) => {
  try {
    return await authService.getCurrentUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const setPasswordThunk = createAsyncThunk(
  'auth/setPassword',
  async (payload: SetPasswordPayload, thunkAPI) => {
    try {
      return await authService.setPassword(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
