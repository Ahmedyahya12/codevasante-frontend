// src/store/receptionPatients/receptionPatientsTypes.ts
export type ReceptionPatient = {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  gender?: string;
  national_id?: string;
  address?: string;
  created_at?: string;
};

export type ReceptionPatientsState = {
  patients: ReceptionPatient[];
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
};
