import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from './authTypes';
import {
  getCurrentUserThunk,
  loginThunk,
  registerPatientThunk,
  setPasswordThunk,
} from './authThunks';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  setPasswordSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.setPasswordSuccess = false;
      localStorage.removeItem('persist:root');
    },

    clearAuthError: (state) => {
      state.error = null;
    },

    clearSetPasswordSuccess: (state) => {
      state.setPasswordSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(registerPatientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPatientThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerPatientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(setPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.setPasswordSuccess = false;
      })
      .addCase(setPasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.setPasswordSuccess = true;
      })
      .addCase(setPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.setPasswordSuccess = false;
      });
  },
});

export const { logout, clearAuthError, clearSetPasswordSuccess } = authSlice.actions;

export default authSlice.reducer;
