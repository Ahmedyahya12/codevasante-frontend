// src/store/doctorDashboard/doctorDashboardSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { DoctorDashboardState } from './doctorDashboardTypes';
import { fetchDoctorDashboardStatsThunk } from './doctorDashboardThunks';

const initialState: DoctorDashboardState = {
  stats: null,
  loading: false,
  error: null,
};

const doctorDashboardSlice = createSlice({
  name: 'doctorDashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorDashboardStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorDashboardStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDoctorDashboardStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default doctorDashboardSlice.reducer;
