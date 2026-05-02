import type { Appointment } from '@/services/appointmentService';
import { Doctor } from '@/services/doctorService';


export interface BookingState {
  specialties: string[];
  doctors: Doctor[];
  availableTimes: string[];
  myAppointments: Appointment[];
  loading: boolean;
  error: string | null;
}
