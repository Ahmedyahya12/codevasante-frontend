// src/store/medicalRecords/medicalRecordsTypes.ts
export type MedicalRecord = {
  id: number;
  patient: number;
  doctor: number;
  note: string;
  created_at: string;
};

export type MedicalRecordsState = {
  records: MedicalRecord[];
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
};
