// src/store/receptionAppointments/receptionAppointmentsTypes.ts
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type ReceptionAppointment = {
  id: number;
  patient: {
    id: number;
    full_name: string;
    email?: string;
    phone?: string;
  };
  doctor: {
    id: number;
    full_name: string;
    email?: string;
    phone?: string;
  };
  appointment_date: string;
  appointment_time: string;
  reason?: string;
  department?: string;
  visit_type?: string;
  status: AppointmentStatus;
  status_display?: string;
  price?: string | number;
  created_at?: string;
};

export type ReceptionAppointmentsState = {
  appointments: ReceptionAppointment[];
  todayAppointments: ReceptionAppointment[];
  doctors: any[];
  loading: boolean;
  actionLoading: boolean;
  doctorsLoading: boolean;
  error: string | null;
};
