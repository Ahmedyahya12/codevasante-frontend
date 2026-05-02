// src/store/doctorPatients/doctorPatientsTypes.ts
export type DoctorPatient = {
  id: number;
  patient: {
    id: number;
    full_name: string;
    email: string;
    phone: string;
  };
  created_at: string;
};

export type DoctorPatientsState = {
  patients: DoctorPatient[];
  loading: boolean;
  error: string | null;
};
