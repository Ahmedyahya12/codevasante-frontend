// src/store/doctorDashboard/doctorDashboardTypes.ts
export type NextAppointment = {
  id: number;
  patient_name: string;
  patient_phone: string;
  date: string;
  time: string;
  department: string;
  visit_type: string;
  status: string;
} | null;

export type DoctorDashboardStats = {
  total_appointments: number;
  today_appointments: number;
  upcoming_appointments: number;
  completed_appointments: number;
  cancelled_appointments: number;
  patients_count: number;
  online_consultations: number;
  revenue: number;
  next_appointment: NextAppointment;
};

export type DoctorDashboardState = {
  stats: DoctorDashboardStats | null;
  loading: boolean;
  error: string | null;
};
