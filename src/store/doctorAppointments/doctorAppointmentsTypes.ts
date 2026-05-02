// src/store/doctorAppointments/doctorAppointmentsTypes.ts
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type AppointmentPatient = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
};

export type DoctorAppointment = {
  id: number;
  patient: AppointmentPatient;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  department: string;
  visit_type: string;
  status: AppointmentStatus;
  status_display: string;
  price: string | number;
  created_at: string;
};

export type DoctorAppointmentsState = {
  appointments: DoctorAppointment[];
  todayAppointments: DoctorAppointment[];
  upcomingAppointments: DoctorAppointment[];
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
};
