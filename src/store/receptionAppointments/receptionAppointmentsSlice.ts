// src/store/receptionAppointments/receptionAppointmentsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { ReceptionAppointmentsState } from './receptionAppointmentsTypes';
import {
  fetchReceptionAppointmentsThunk,
  fetchReceptionTodayAppointmentsThunk,
  updateReceptionAppointmentStatusThunk,
  confirmReceptionArrivalThunk,
  createReceptionAppointmentThunk,
  fetchReceptionDoctorsThunk,
} from './receptionAppointmentsThunks';

const getArrayData = (payload: any) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const getObjectData = (payload: any) => payload?.data || payload;

const initialState: ReceptionAppointmentsState = {
  appointments: [],
  todayAppointments: [],
  doctors: [],
  loading: false,
  actionLoading: false,
  doctorsLoading: false,
  error: null,
};

const receptionAppointmentsSlice = createSlice({
  name: 'receptionAppointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceptionAppointmentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceptionAppointmentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = getArrayData(action.payload);
      })
      .addCase(fetchReceptionAppointmentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.appointments = [];
        state.error = action.payload as string;
      })

      .addCase(fetchReceptionTodayAppointmentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceptionTodayAppointmentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.todayAppointments = getArrayData(action.payload);
      })
      .addCase(fetchReceptionTodayAppointmentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.todayAppointments = [];
        state.error = action.payload as string;
      })

      .addCase(updateReceptionAppointmentStatusThunk.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateReceptionAppointmentStatusThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updated = getObjectData(action.payload);

        state.appointments = state.appointments.map((item) =>
          item.id === updated.id ? updated : item
        );

        state.todayAppointments = state.todayAppointments.map((item) =>
          item.id === updated.id ? updated : item
        );
      })
      .addCase(updateReceptionAppointmentStatusThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      .addCase(confirmReceptionArrivalThunk.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(confirmReceptionArrivalThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updated = getObjectData(action.payload);

        state.appointments = state.appointments.map((item) =>
          item.id === updated.id ? updated : item
        );

        state.todayAppointments = state.todayAppointments.map((item) =>
          item.id === updated.id ? updated : item
        );
      })
      .addCase(confirmReceptionArrivalThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createReceptionAppointmentThunk.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createReceptionAppointmentThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        const created = getObjectData(action.payload);
        if (created?.id) {
          state.appointments = [created, ...state.appointments];
        }
      })
      .addCase(createReceptionAppointmentThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchReceptionDoctorsThunk.pending, (state) => {
        state.doctorsLoading = true;
      })
      .addCase(fetchReceptionDoctorsThunk.fulfilled, (state, action) => {
        state.doctorsLoading = false;
        state.doctors = getArrayData(action.payload);
      })
      .addCase(fetchReceptionDoctorsThunk.rejected, (state, action) => {
        state.doctorsLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default receptionAppointmentsSlice.reducer;
