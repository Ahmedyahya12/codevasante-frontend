// src/store/doctorProfile/doctorProfileTypes.ts
export type DoctorProfile = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  image?: string | null;
  specialty: string;
  bio: string;
  years_of_experience: number;
  available: boolean;
};

export type DoctorProfileState = {
  profile: DoctorProfile | null;
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
};
