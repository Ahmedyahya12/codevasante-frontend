import axiosInstance from './axiosInstance';
import type {
  LoginPayload,
  RegisterPatientPayload,
  SetPasswordPayload,
} from '@/store/auth/authTypes';

export const authService = {
  registerPatient: async (payload: RegisterPatientPayload) => {
    const { data } = await axiosInstance.post('/auth/register/patient/', payload);
    return data;
  },

  login: async (payload: LoginPayload) => {
    const { data } = await axiosInstance.post('/auth/login/', payload);
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await axiosInstance.get('/auth/me/');
    return data;
  },

  setPassword: async ({ uidb64, token, password, confirm_password }: SetPasswordPayload) => {
    const { data } = await axiosInstance.post(`/auth/set-password/${uidb64}/${token}/`, {
      password,
      confirm_password,
    });

    return data;
  },
};
