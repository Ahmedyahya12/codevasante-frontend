import { createSlice } from '@reduxjs/toolkit';
import type { BookingState } from './appointmentTypes';
import {
  createAppointmentThunk,
  fetchDoctorAvailabilityThunk,
  fetchDoctorsBySpecialtyThunk,
  fetchMyAppointmentsThunk,
  fetchSpecialtiesThunk,
} from './appointmentThunks';

const initialState: BookingState = {
  specialties: [],
  doctors: [],
  availableTimes: [],
  myAppointments: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearAppointmentError: (state) => {
      state.error = null;
    },
    resetBookingData: (state) => {
      state.doctors = [];
      state.availableTimes = [];
      state.error = null;
    },
    resetAvailableTimes: (state) => {
      state.availableTimes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialtiesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecialtiesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.specialties = action.payload;
      })
      .addCase(fetchSpecialtiesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchDoctorsBySpecialtyThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctorsBySpecialtyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsBySpecialtyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchDoctorAvailabilityThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctorAvailabilityThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.availableTimes = action.payload.available_times;
      })
      .addCase(fetchDoctorAvailabilityThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createAppointmentThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAppointmentThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAppointmentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMyAppointmentsThunk.fulfilled, (state, action) => {
        state.myAppointments = action.payload;
      });
  },
});

export const { clearAppointmentError, resetBookingData, resetAvailableTimes } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
