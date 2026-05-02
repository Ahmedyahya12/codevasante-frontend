// src/components/PublicOnlyForPatientRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

const getDefaultPathByRole = (role?: string) => {
  if (role === 'doctor') return '/doctor/dashboard';
  if (role === 'receptionist') return '/reception/dashboard';
  if (role === 'admin') return '/admin/dashboard';
  return '/';
};

export default function PublicOnlyForPatientRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (isAuthenticated && user?.role !== 'patient') {
    return <Navigate to={getDefaultPathByRole(user?.role)} replace />;
  }

  return <>{children}</>;
}
