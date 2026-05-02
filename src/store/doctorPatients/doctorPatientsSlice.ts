// src/store/doctorPatients/doctorPatientsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { DoctorPatientsState } from './doctorPatientsTypes';
import { fetchDoctorPatientsThunk } from './doctorPatientsThunks';

const getArrayData = (payload: any) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const initialState: DoctorPatientsState = {
  patients: [],
  loading: false,
  error: null,
};

const doctorPatientsSlice = createSlice({
  name: 'doctorPatients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorPatientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorPatientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = getArrayData(action.payload);
      })
      .addCase(fetchDoctorPatientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.patients = [];
      });
  },
});

export default doctorPatientsSlice.reducer;
