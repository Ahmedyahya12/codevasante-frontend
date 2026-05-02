// src/components/reception/ReceptionSidebar.tsx
import {
  CalendarCheck,
  CalendarDays,
  ChevronLeft,
  LayoutDashboard,
  PlusCircle,
  UserPlus,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Logo from '@/components/Logo';

type Props = {
  open: boolean;
  onClose: () => void;
};

const links = [
  { to: '/reception/dashboard', label: 'لوحة الاستقبال', icon: LayoutDashboard },
  { to: '/reception/today-appointments', label: 'مواعيد اليوم', icon: CalendarCheck },
  { to: '/reception/appointments', label: 'كل المواعيد', icon: CalendarDays },
  { to: '/reception/patients', label: 'المرضى', icon: Users },
  { to: '/reception/create-patient', label: 'إضافة مريض', icon: UserPlus },
  { to: '/reception/create-appointment', label: 'إنشاء موعد', icon: PlusCircle },
];

export default function ReceptionSidebar({ open, onClose }: Props) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 lg:hidden ${open ? 'block' : 'hidden'}`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-[285px] border-l border-brand-border bg-white transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-brand-border px-5">
          <Logo />
          <button
            onClick={onClose}
            className="rounded-full border border-brand-border p-1 lg:hidden"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-5 rounded-2xl border border-brand-border bg-gradient-to-br from-brand-primary/10 to-white p-4">
            <p className="text-sm font-extrabold text-brand-text">مساحة الاستقبال</p>
            <p className="mt-1 text-xs text-brand-muted">إدارة المرضى والمواعيد</p>
          </div>

          <p className="mb-2 px-2 text-xs font-bold text-brand-muted">القائمة الرئيسية</p>

          <nav className="space-y-1">
            {links.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
