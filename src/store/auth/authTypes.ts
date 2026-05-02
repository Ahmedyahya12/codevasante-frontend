export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  role: 'patient' | 'doctor' | 'receptionist' | 'admin';
  role_display: string;
  is_first_login: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPatientPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  password: string;
  password_confirm: string;
  date_of_birth?: string | null;
  gender?: 'M' | 'F' | '';
  address?: string;
  national_id?: string;
  emergency_contact?: string;
  medical_notes?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  setPasswordSuccess?: boolean;
}

export type SetPasswordPayload = {
  uidb64: string;
  token: string;
  password: string;
  confirm_password: string;
};
