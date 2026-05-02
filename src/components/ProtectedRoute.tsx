// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

type Role = 'admin' | 'doctor' | 'receptionist' | 'patient';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: Role[];
};

const getDefaultPathByRole = (role?: string) => {
  if (role === 'doctor') return '/doctor/dashboard';
  if (role === 'receptionist') return '/reception/dashboard';
  if (role === 'admin') return '/admin/dashboard';
  if (role === 'patient') return '/';
  return '/login';
};

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          message: 'يجب تسجيل الدخول أولاً للوصول إلى هذه الصفحة',
        }}
      />
    );
  }

  const userRole = user?.role;

  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole as Role))) {
    return (
      <Navigate
        to={getDefaultPathByRole(userRole)}
        replace
        state={{
          message: 'ليس لديك صلاحية للوصول إلى هذه الصفحة',
        }}
      />
    );
  }

  return <>{children}</>;
}
