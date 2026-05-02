// src/store/receptionPatients/receptionPatientsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { ReceptionPatientsState } from './receptionPatientsTypes';
import {
  searchReceptionPatientsThunk,
  createReceptionPatientThunk,
} from './receptionPatientsThunks';

const getArrayData = (payload: any) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const getObjectData = (payload: any) => payload?.data || payload;

const initialState: ReceptionPatientsState = {
  patients: [],
  loading: false,
  actionLoading: false,
  error: null,
};

const receptionPatientsSlice = createSlice({
  name: 'receptionPatients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchReceptionPatientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchReceptionPatientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = getArrayData(action.payload);
      })
      .addCase(searchReceptionPatientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.patients = [];
        state.error = action.payload as string;
      })

      .addCase(createReceptionPatientThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createReceptionPatientThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        const created = getObjectData(action.payload);
        if (created?.id) {
          state.patients = [created, ...state.patients];
        }
      })
      .addCase(createReceptionPatientThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default receptionPatientsSlice.reducer;
