import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Home,
  Info,
  LogIn,
  LogOut,
  Menu,
  Stethoscope,
  User,
  UserCircle,
  UserPlus,
  X,
} from 'lucide-react';

import Logo from '@/components/Logo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/auth/authSlice';
import { MySwal } from '@/utils/swal';

const navLinks = [
  { to: '/', label: 'الرئيسية', icon: Home },
  { to: '/services', label: 'الخدمات الطبية', icon: Stethoscope },
  { to: '/doctors-list', label: 'الأطباء', icon: UserPlus },
  // 👇 هذا الجديد
  // {
  //   to: '/patient/appointments',
  //   label: 'مواعيدي',
  //   icon: CalendarDays,
  //   roles: ['patient'], // 👈 مهم
  // },

  { to: '/booking', label: 'حجز موعد', icon: CalendarDays },
  { to: '/about', label: 'من نحن', icon: Info },
];

export default function PatientNavbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: 'تسجيل الخروج',
      text: 'هل تريد تسجيل الخروج من النظام؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'تسجيل الخروج',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#9CA3AF',
    });

    if (result.isConfirmed) {
      dispatch(logout());
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);

      await MySwal.fire({
        title: 'تم تسجيل الخروج',
        text: 'تم تسجيل الخروج من حسابك بنجاح.',
        icon: 'success',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#2E37A4',
      });

      navigate('/');
    }
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur"
      dir="rtl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {navLinks.map((item) => (
            <NavItem key={item.to} to={item.to} icon={item.icon}>
              {item.label}
            </NavItem>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#F4F7FF] px-4 py-2.5 transition hover:border-[#2E37A4]/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E37A4] text-white">
                  <UserCircle size={24} />
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">مرحباً، {user.full_name}</p>
                  <p className="text-xs text-gray-500">{user.role_display}</p>
                </div>

                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition ${isUserMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute left-0 mt-3 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                  <Link
                    to="/patient/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[#F4F7FF] hover:text-[#2E37A4]"
                  >
                    <User size={18} />
                    الملف الشخصي
                  </Link>
                  <Link
                    to="/patient/appointments"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-[#F4F7FF] hover:text-[#2E37A4]"
                  >
                    <ClipboardList size={18} />
                    مواعيدي
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-2xl bg-[#2E37A4] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#2E37A4]/20 transition hover:bg-[#252d8d]"
            >
              دخول
              <LogIn size={18} />
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F7FF] text-[#2E37A4] lg:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <MobileNavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </MobileNavItem>
            ))}
          </nav>

          <div className="mt-4 border-t border-gray-100 pt-4">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="rounded-2xl bg-[#F4F7FF] p-4">
                  <p className="font-bold text-gray-900">مرحباً، {user.full_name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <Link
                  to="/patient/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-gray-700 hover:bg-[#F4F7FF]"
                >
                  <User size={18} />
                  مواعيدي
                </Link>

                <Link
                  to="/patient/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-gray-700 hover:bg-[#F4F7FF]"
                >
                  <User size={18} />
                  الملف الشخصي
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-bold text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#2E37A4] px-5 py-3 text-center font-bold text-white"
              >
                دخول
                <LogIn size={18} />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({
  to,
  children,
  icon: Icon,
}: {
  to: string;
  children: React.ReactNode;
  icon: React.ElementType;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition ${
          isActive
            ? 'bg-[#2E37A4]/10 text-[#2E37A4]'
            : 'text-gray-500 hover:bg-[#2E37A4]/10 hover:text-[#2E37A4]'
        }`
      }
    >
      {children}
      <Icon size={18} />
    </NavLink>
  );
}

function MobileNavItem({
  to,
  children,
  icon: Icon,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  icon: React.ElementType;
  onClick: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
          isActive
            ? 'bg-[#2E37A4]/10 text-[#2E37A4]'
            : 'text-gray-600 hover:bg-[#F4F7FF] hover:text-[#2E37A4]'
        }`
      }
    >
      <Icon size={18} />
      {children}
    </NavLink>
  );
}
