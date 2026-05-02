// src/store/medicalRecords/medicalRecordsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { MedicalRecordsState } from './medicalRecordsTypes';
import { fetchPatientMedicalRecordsThunk, createMedicalRecordThunk } from './medicalRecordsThunks';

const getArrayData = (payload: any) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const initialState: MedicalRecordsState = {
  records: [],
  loading: false,
  actionLoading: false,
  error: null,
};

const medicalRecordsSlice = createSlice({
  name: 'medicalRecords',
  initialState,
  reducers: {
    clearMedicalRecords: (state) => {
      state.records = [];
      state.loading = false;
      state.actionLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientMedicalRecordsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.records = [];
      })

      .addCase(fetchPatientMedicalRecordsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.records = getArrayData(action.payload);
      })

      .addCase(fetchPatientMedicalRecordsThunk.rejected, (state, action) => {
        state.loading = false;
        state.records = [];
        state.error = action.payload as string;
      })

      .addCase(createMedicalRecordThunk.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(createMedicalRecordThunk.fulfilled, (state, action) => {
        state.actionLoading = false;

        const newRecord = action.payload?.data || action.payload;

        const currentRecords = Array.isArray(state.records)
          ? state.records
          : getArrayData(state.records);

        state.records = newRecord ? [newRecord, ...currentRecords] : currentRecords;
      })

      .addCase(createMedicalRecordThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMedicalRecords } = medicalRecordsSlice.actions;
export default medicalRecordsSlice.reducer;
