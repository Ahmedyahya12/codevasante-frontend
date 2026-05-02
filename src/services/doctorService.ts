// src/services/doctorService.ts
import axiosInstance from './axiosInstance';

export interface Doctor {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  specialty: string;
  bio: string;
  years_of_experience: number;
  available: boolean;
  max_patients_per_slot: number;
  image?: string | null;
}

export interface DoctorAvailability {
  doctor: number;
  date: string;
  day_of_week?: number;
  available_times: string[];
  booked_counts?: Record<string, number>;
  message?: string;
}

export interface GetDoctorsParams {
  specialty?: string;
  search?: string;
}

interface PaginatedDoctorsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Doctor[];
}

export const doctorService = {
  getSpecialties: async () => {
    const { data } = await axiosInstance.get<string[]>('/doctors/specialties/');
    return data;
  },

  getDoctors: async (params?: GetDoctorsParams): Promise<Doctor[]> => {
    const { data } = await axiosInstance.get<PaginatedDoctorsResponse | Doctor[]>('/doctors/', {
      params: {
        ...(params?.specialty ? { specialty: params.specialty } : {}),
        ...(params?.search ? { search: params.search } : {}),
      },
    });

    // Backend DRF Pagination: { count, next, previous, results }
    if (!Array.isArray(data) && Array.isArray(data.results)) {
      return data.results;
    }

    // Si un jour backend retourne directement []
    if (Array.isArray(data)) {
      return data;
    }

    return [];
  },

  getDoctorById: async (id: number) => {
    const { data } = await axiosInstance.get<Doctor>(`/doctors/${id}/`);
    return data;
  },

  getDoctorAvailability: async (doctorId: number, date: string) => {
    const { data } = await axiosInstance.get<DoctorAvailability>(
      `/doctors/${doctorId}/availability/`,
      {
        params: { date },
      }
    );

    return data;
  },
};
