// src/store/receptionDashboard/receptionDashboardSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { ReceptionDashboardState } from './receptionDashboardTypes';
import { fetchReceptionDashboardStatsThunk } from './receptionDashboardThunks';

const initialState: ReceptionDashboardState = {
  stats: null,
  loading: false,
  error: null,
};

const receptionDashboardSlice = createSlice({
  name: 'receptionDashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceptionDashboardStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceptionDashboardStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchReceptionDashboardStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default receptionDashboardSlice.reducer;
