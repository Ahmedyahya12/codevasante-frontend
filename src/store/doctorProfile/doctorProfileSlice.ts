// src/store/doctorProfile/doctorProfileSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { DoctorProfileState } from './doctorProfileTypes';
import { fetchDoctorProfileThunk, updateDoctorProfileThunk } from './doctorProfileThunks';

const initialState: DoctorProfileState = {
  profile: null,
  loading: false,
  actionLoading: false,
  error: null,
};

const doctorProfileSlice = createSlice({
  name: 'doctorProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchDoctorProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateDoctorProfileThunk.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateDoctorProfileThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.profile = action.payload.data || action.payload;
      })
      .addCase(updateDoctorProfileThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default doctorProfileSlice.reducer;
