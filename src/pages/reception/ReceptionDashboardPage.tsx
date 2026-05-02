// src/pages/reception/ReceptionDashboardPage.tsx
import { useEffect } from 'react';
import {
  CalendarCheck,
  CalendarClock,
  Stethoscope,
  Users,
} from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchReceptionDashboardStatsThunk } from '@/store/receptionDashboard/receptionDashboardThunks';
import { fetchReceptionTodayAppointmentsThunk } from '@/store/receptionAppointments/receptionAppointmentsThunks';

export default function ReceptionDashboardPage() {
  const dispatch = useAppDispatch();

  const { stats, loading, error } = useAppSelector((state) => state.receptionDashboard);
  const { todayAppointments } = useAppSelector((state) => state.receptionAppointments);

  useEffect(() => {
    dispatch(fetchReceptionDashboardStatsThunk());
    dispatch(fetchReceptionTodayAppointmentsThunk());
  }, [dispatch]);

  const cards = [
    {
      label: 'مواعيد اليوم',
      value: stats?.today_appointments ?? 0,
      icon: CalendarCheck,
    },
    {
      label: 'قيد الانتظار',
      value: stats?.pending_appointments ?? 0,
      icon: CalendarClock,
    },
    {
      label: 'المرضى',
      value: stats?.patients_count ?? 0,
      icon: Users,
    },
    {
      label: 'الأطباء',
      value: stats?.doctors_count ?? 0,
      icon: Stethoscope,
    },
  ];

  if (loading) return <div className="p-6">جاري تحميل لوحة الاستقبال...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <span className="rounded-full bg-indigoCustom-100 px-4 py-2 text-sm font-bold text-brand-primary">
          CodevaClinic Reception
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-brand-text">لوحة الاستقبال</h1>
        <p className="mt-2 text-sm text-brand-muted">
          متابعة مواعيد اليوم، المرضى، والأطباء.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-3xl border border-brand-border bg-white p-5 shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigoCustom-100 text-brand-primary">
                <Icon size={22} />
              </div>

              <p className="mt-5 text-sm text-brand-muted">{item.label}</p>
              <h3 className="mt-1 text-3xl font-extrabold text-brand-text">
                {item.value}
              </h3>
            </div>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-3xl border border-brand-border bg-white shadow-soft">
        <div className="border-b border-brand-border p-5">
          <h2 className="text-lg font-extrabold text-brand-text">مواعيد اليوم</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-right">
            <thead className="bg-brand-light text-sm text-brand-muted">
              <tr>
                <th className="px-5 py-4">المريض</th>
                <th className="px-5 py-4">الطبيب</th>
                <th className="px-5 py-4">الوقت</th>
                <th className="px-5 py-4">الحالة</th>
              </tr>
            </thead>

            <tbody>
              {todayAppointments.map((item) => (
                <tr key={item.id} className="border-t border-brand-border">
                  <td className="px-5 py-4 font-bold">{item.patient?.full_name || '-'}</td>
                  <td className="px-5 py-4 text-brand-muted">{item.doctor?.full_name || '-'}</td>
                  <td className="px-5 py-4">{item.appointment_time}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={item.status} label={item.status_display} />
                  </td>
                </tr>
              ))}

              {todayAppointments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-brand-muted">
                    لا توجد مواعيد اليوم.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatusBadge({ status, label }: { status: string; label?: string }) {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700',
    confirmed: 'bg-blue-50 text-blue-700',
    completed: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
  };

  const labels: Record<string, string> = {
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    completed: 'مكتمل',
    cancelled: 'ملغي',
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${classes[status] || ''}`}>
      {label || labels[status] || status}
    </span>
  );
}
