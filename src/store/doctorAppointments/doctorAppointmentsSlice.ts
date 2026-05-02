// src/store/doctorAppointments/doctorAppointmentsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { DoctorAppointmentsState } from './doctorAppointmentsTypes';
import {
  fetchDoctorAppointmentsThunk,
  fetchTodayAppointmentsThunk,
  fetchUpcomingAppointmentsThunk,
  updateAppointmentStatusThunk,
} from './doctorAppointmentsThunks';

const getArrayData = (payload: any) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const initialState: DoctorAppointmentsState = {
  appointments: [],
  todayAppointments: [],
  upcomingAppointments: [],
  loading: false,
  actionLoading: false,
  error: null,
};

const doctorAppointmentsSlice = createSlice({
  name: 'doctorAppointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorAppointmentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointmentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = getArrayData(action.payload);
      })
      .addCase(fetchDoctorAppointmentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchTodayAppointmentsThunk.fulfilled, (state, action) => {
        state.todayAppointments = getArrayData(action.payload);
      })

      .addCase(fetchUpcomingAppointmentsThunk.fulfilled, (state, action) => {
        state.upcomingAppointments = getArrayData(action.payload);
      })

      .addCase(updateAppointmentStatusThunk.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateAppointmentStatusThunk.fulfilled, (state, action) => {
        state.actionLoading = false;

        const updated = action.payload?.data || action.payload;

        state.appointments = state.appointments.map((item) =>
          item.id === updated.id ? updated : item
        );

        state.todayAppointments = state.todayAppointments.map((item) =>
          item.id === updated.id ? updated : item
        );

        state.upcomingAppointments = state.upcomingAppointments.map((item) =>
          item.id === updated.id ? updated : item
        );
      })
      .addCase(updateAppointmentStatusThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default doctorAppointmentsSlice.reducer;
