// src/components/GuestRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

type GuestRouteProps = {
  children: React.ReactNode;
};

const getDefaultPathByRole = (role?: string) => {
  if (role === 'doctor') return '/doctor/dashboard';
  if (role === 'receptionist') return '/reception/dashboard';
  if (role === 'admin') return '/admin/dashboard';
  if (role === 'patient') return '/';
  return '/';
};

export default function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={getDefaultPathByRole(user?.role)} replace />;
  }

  return <>{children}</>;
}
