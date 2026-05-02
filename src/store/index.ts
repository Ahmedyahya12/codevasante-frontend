import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from './storage';
import authReducer from './auth/authSlice';
import appointmentReducer from './appointments/appointmentSlice';
import doctorReducer from './doctors/doctorSlice';

import doctorDashboardReducer from './doctorDashboard/doctorDashboardSlice';
import doctorAppointmentsReducer from './doctorAppointments/doctorAppointmentsSlice';
import doctorPatientsReducer from './doctorPatients/doctorPatientsSlice';
import medicalRecordsReducer from './medicalRecords/medicalRecordsSlice';
import doctorProfileReducer from './doctorProfile/doctorProfileSlice';
import { injectStore } from '@/services/axiosInstance';
import receptionDashboardReducer from './receptionDashboard/receptionDashboardSlice';
import receptionAppointmentsReducer from './receptionAppointments/receptionAppointmentsSlice';
import receptionPatientsReducer from './receptionPatients/receptionPatientsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  appointments: appointmentReducer,
  doctors: doctorReducer,
  doctorDashboard: doctorDashboardReducer,
  doctorAppointments: doctorAppointmentsReducer,
  doctorPatients: doctorPatientsReducer,
  medicalRecords: medicalRecordsReducer,
  doctorProfile: doctorProfileReducer,

  // reception reducers
  receptionDashboard: receptionDashboardReducer,
  receptionAppointments: receptionAppointmentsReducer,
  receptionPatients: receptionPatientsReducer,
});

const persistConfig = {
  key: 'codevaclinic',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

injectStore(store);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
