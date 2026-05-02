// src/store/receptionDashboard/receptionDashboardTypes.ts
export type ReceptionDashboardStats = {
  today_appointments: number;
  pending_appointments: number;
  confirmed_appointments: number;
  cancelled_appointments: number;
  patients_count: number;
  doctors_count: number;
};

export type ReceptionDashboardState = {
  stats: ReceptionDashboardStats | null;
  loading: boolean;
  error: string | null;
};
