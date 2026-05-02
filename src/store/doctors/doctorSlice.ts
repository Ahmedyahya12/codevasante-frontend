import { createSlice } from '@reduxjs/toolkit';
import { Doctor, DoctorAvailability } from '@/services/doctorService';
import {
  fetchDoctorAvailabilityThunk,
  fetchDoctorDetailThunk,
  fetchDoctorsThunk,
  fetchDoctorSpecialtiesThunk,
} from './doctorThunks';

interface DoctorState {
  doctors: Doctor[];
  doctorDetail: Doctor | null;
  specialties: string[];
  availability: DoctorAvailability | null;

  loading: boolean;
  detailLoading: boolean;
  specialtiesLoading: boolean;
  availabilityLoading: boolean;

  error: string | null;
  detailError: string | null;
  specialtiesError: string | null;
  availabilityError: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  doctorDetail: null,
  specialties: [],
  availability: null,

  loading: false,
  detailLoading: false,
  specialtiesLoading: false,
  availabilityLoading: false,

  error: null,
  detailError: null,
  specialtiesError: null,
  availabilityError: null,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    clearDoctorDetail: (state) => {
      state.doctorDetail = null;
      state.detailError = null;
    },
    clearDoctorAvailability: (state) => {
      state.availability = null;
      state.availabilityError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'فشل تحميل الأطباء';
      })

      .addCase(fetchDoctorDetailThunk.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchDoctorDetailThunk.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.doctorDetail = action.payload;
      })
      .addCase(fetchDoctorDetailThunk.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload || 'فشل تحميل تفاصيل الطبيب';
      })

      .addCase(fetchDoctorSpecialtiesThunk.pending, (state) => {
        state.specialtiesLoading = true;
        state.specialtiesError = null;
      })
      .addCase(fetchDoctorSpecialtiesThunk.fulfilled, (state, action) => {
        state.specialtiesLoading = false;
        state.specialties = action.payload;
      })
      .addCase(fetchDoctorSpecialtiesThunk.rejected, (state, action) => {
        state.specialtiesLoading = false;
        state.specialtiesError = action.payload || 'فشل تحميل التخصصات';
      })

      .addCase(fetchDoctorAvailabilityThunk.pending, (state) => {
        state.availabilityLoading = true;
        state.availabilityError = null;
      })
      .addCase(fetchDoctorAvailabilityThunk.fulfilled, (state, action) => {
        state.availabilityLoading = false;
        state.availability = action.payload;
      })
      .addCase(fetchDoctorAvailabilityThunk.rejected, (state, action) => {
        state.availabilityLoading = false;
        state.availabilityError = action.payload || 'فشل تحميل أوقات الطبيب';
      });
  },
});

export const { clearDoctorDetail, clearDoctorAvailability } = doctorSlice.actions;
export default doctorSlice.reducer;
