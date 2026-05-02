// src/components/reception/ReceptionHeader.tsx
import { Bell, CalendarPlus, LogOut, Menu, Search, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/auth/authSlice';

type Props = {
  onMenuClick: () => void;
};

export default function ReceptionHeader({ onMenuClick }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const fullName =
    user?.full_name ||
    `${user?.first_name || ''} ${user?.last_name || ''}`.trim() ||
    user?.email ||
    'موظف استقبال';

  const firstLetter = fullName.trim().charAt(0) || 'م';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-brand-border bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl border border-brand-border p-2 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="hidden w-full max-w-md items-center gap-2 rounded-2xl border border-brand-border bg-brand-light px-4 py-2 md:flex">
          <Search size={17} className="text-brand-muted" />
          <input
            placeholder="بحث عن مريض، رقم هاتف، أو موعد..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="mr-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/reception/create-appointment')}
            className="btn-primary hidden items-center gap-2 sm:flex"
          >
            <CalendarPlus size={16} />
            إنشاء موعد
          </button>

          <button className="relative rounded-full border border-brand-border p-2">
            <Bell size={18} />
            <span className="absolute left-1 top-1 h-2 w-2 rounded-full bg-errorCustom-900" />
          </button>

          {isAuthenticated ? (
            <>
              <div className="hidden items-center gap-3 rounded-2xl border border-brand-border bg-brand-light px-3 py-2 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigoCustom-100 text-sm font-bold text-brand-primary">
                  {firstLetter}
                </div>

                <div className="leading-tight">
                  <p className="text-sm font-bold text-brand-text">مرحبًا، {fullName}</p>
                  <p className="text-xs text-brand-muted">موظف استقبال</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-brand-border p-2 text-errorCustom-900 transition hover:bg-red-50"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-indigoCustom-100 text-brand-primary"
            >
              <UserRound size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
