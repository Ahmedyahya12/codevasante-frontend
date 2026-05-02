// src/router/AppRouter.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLoader from '@/components/common/AppLoader';
import PatientDoctorDetailPage from '@/pages/patient/PatientDoctorDetailPage';
import DoctorSettingsPage from '@/pages/doctor/DoctorSettingsPage';
import DoctorProfilePage from '@/pages/doctor/DoctorProfilePage';
import MedicalRecordsPage from '@/pages/doctor/MedicalRecordsPage';

const MainLayout = lazy(() => import('@/layouts/MainLayout'));
const PatientLayout = lazy(() => import('@/layouts/PatientLayout'));

const DashboardPage = lazy(() => import('@/pages/doctor/DashboardPage'));

const PatientsPage = lazy(() => import('@/pages/doctor/PatientsPage'));
const AppointmentsPage = lazy(() => import('@/pages/doctor/AppointmentsPage'));

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const SetPasswordPage = lazy(() => import('@/pages/auth/SetPasswordPage'));

const PatientHomePage = lazy(() => import('@/pages/patient/PatientHomePage'));
const PatientDoctorsPage = lazy(() => import('@/pages/patient/PatientDoctorsPage'));
const PatientBookingPage = lazy(() => import('@/pages/patient/PatientBookingPage'));
const PatientServicesPage = lazy(() => import('@/pages/patient/PatientServicesPage'));
const PatientAboutPage = lazy(() => import('@/pages/patient/PatientAboutPage'));
const BookingConfirmationPage = lazy(() => import('@/pages/patient/BookingConfirmationPage'));
const PatientAppointmentsPage = lazy(() => import('@/pages/patient/PatientAppointmentsPage'));

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const ProtectedRoute = lazy(() => import('@/components/ProtectedRoute'));
const GuestRoute = lazy(() => import('@/components/GuestRoute'));

const PublicOnlyForPatientRoute = lazy(() => import('@/components/PublicOnlyForPatientRoute'));
function withLoader(element: React.ReactNode) {
  return <Suspense fallback={<AppLoader />}>{element}</Suspense>;
}
const ReceptionLayout = lazy(() => import('@/layouts/ReceptionLayout'));

const ReceptionDashboardPage = lazy(() => import('@/pages/reception/ReceptionDashboardPage'));
const ReceptionAppointmentsPage = lazy(() => import('@/pages/reception/ReceptionAppointmentsPage'));
const ReceptionTodayAppointmentsPage = lazy(
  () => import('@/pages/reception/ReceptionTodayAppointmentsPage')
);
const ReceptionPatientsPage = lazy(() => import('@/pages/reception/ReceptionPatientsPage'));
const ReceptionCreatePatientPage = lazy(
  () => import('@/pages/reception/ReceptionCreatePatientPage')
);
const ReceptionCreateAppointmentPage = lazy(
  () => import('@/pages/reception/ReceptionCreateAppointmentPage')
);

const router = createBrowserRouter([
  {
    path: '/login',
    element: withLoader(
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: '/register',
    element: withLoader(
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: '/set-password/:uidb64/:token',
    element: withLoader(
      <GuestRoute>
        <SetPasswordPage />
      </GuestRoute>
    ),
  },

  {
    path: '/',
    element: withLoader(
      <PublicOnlyForPatientRoute>
        <PatientLayout />
      </PublicOnlyForPatientRoute>
    ),
    children: [
      { index: true, element: withLoader(<PatientHomePage />) },
      { path: 'services', element: withLoader(<PatientServicesPage />) },
      { path: 'doctors-list', element: withLoader(<PatientDoctorsPage />) },
      {
        path: 'doctors-list/:id',
        element: withLoader(<PatientDoctorDetailPage />),
      },
      {
        path: 'booking',
        element: withLoader(
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientBookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'booking/confirmation',
        element: withLoader(
          <ProtectedRoute allowedRoles={['patient']}>
            <BookingConfirmationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'patient/appointments',
        element: withLoader(
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientAppointmentsPage />
          </ProtectedRoute>
        ),
      },
      { path: 'about', element: withLoader(<PatientAboutPage />) },
    ],
  },

  {
    path: '/doctor',
    element: withLoader(
      <ProtectedRoute allowedRoles={['doctor']}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: withLoader(<DashboardPage />) },
      { path: 'appointments', element: withLoader(<AppointmentsPage />) },
      { path: 'patients', element: withLoader(<PatientsPage />) },
      { path: 'medical-records', element: withLoader(<MedicalRecordsPage />) },
      { path: 'profile', element: withLoader(<DoctorProfilePage />) },
      { path: 'settings', element: withLoader(<DoctorSettingsPage />) },

    ],
  },
  {
  path: '/reception',
  element: withLoader(
    <ProtectedRoute allowedRoles={['receptionist']}>
      <ReceptionLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: 'dashboard', element: withLoader(<ReceptionDashboardPage />) },
    { path: 'today-appointments', element: withLoader(<ReceptionTodayAppointmentsPage />) },
    { path: 'appointments', element: withLoader(<ReceptionAppointmentsPage />) },
    { path: 'patients', element: withLoader(<ReceptionPatientsPage />) },
    { path: 'create-patient', element: withLoader(<ReceptionCreatePatientPage />) },
    { path: 'create-appointment', element: withLoader(<ReceptionCreateAppointmentPage />) },
  ],
},

  {
    path: '*',
    element: withLoader(<NotFoundPage />),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
