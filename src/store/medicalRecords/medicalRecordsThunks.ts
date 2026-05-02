// src/store/medicalRecords/medicalRecordsThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { medicalRecordService } from '@/services/medicalRecordService';

export const fetchPatientMedicalRecordsThunk = createAsyncThunk(
  'medicalRecords/fetchByPatient',
  async (patientId: number, { rejectWithValue }) => {
    try {
      return await medicalRecordService.getByPatient(patientId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل تحميل الملاحظات الطبية');
    }
  }
);

export const createMedicalRecordThunk = createAsyncThunk(
  'medicalRecords/create',
  async (payload: { patient: number; note: string }, { rejectWithValue }) => {
    try {
      return await medicalRecordService.create(payload);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'فشل إضافة الملاحظة الطبية');
    }
  }
);
