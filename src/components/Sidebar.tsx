// src/components/Sidebar.tsx
import {
  CalendarDays,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const links = [
  { to: '/doctor/dashboard', label: 'لوحة الطبيب', icon: LayoutDashboard },
  { to: '/doctor/appointments', label: 'مواعيدي', icon: CalendarDays },
  { to: '/doctor/patients', label: 'مرضاي', icon: Users },
  { to: '/doctor/medical-records', label: 'الملاحظات الطبية', icon: FileText },
  { to: '/doctor/profile', label: 'ملفي الطبي', icon: Stethoscope },
  { to: '/doctor/settings', label: 'الإعدادات', icon: Settings },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 lg:hidden ${open ? 'block' : 'hidden'}`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-[280px] border-l border-brand-border bg-white transition-transform duration-300 lg:sticky lg:translate-x-0 ${
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
          <div className="mb-5 rounded-xl border border-brand-border bg-brand-light p-3">
            <p className="text-sm font-bold text-brand-text">مساحة الطبيب</p>
            <p className="text-xs text-brand-muted">CodevaClinic</p>
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
