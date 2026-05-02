// src/pages/DashboardPage.tsx
import { useEffect } from 'react';
import { CalendarDays, DollarSign, Users, Video, ArrowUpRight } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDoctorDashboardStatsThunk } from '@/store/doctorDashboard/doctorDashboardThunks';
import { fetchTodayAppointmentsThunk } from '@/store/doctorAppointments/doctorAppointmentsThunks';

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  const { stats, loading, error } = useAppSelector((state) => state.doctorDashboard);

  useEffect(() => {
    dispatch(fetchDoctorDashboardStatsThunk());
    dispatch(fetchTodayAppointmentsThunk());
  }, [dispatch]);

  if (loading) {
    return <div className="p-6">جاري تحميل لوحة التحكم...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  const cards = [
    {
      title: 'إجمالي المواعيد',
      value: stats?.total_appointments ?? 0,
      icon: CalendarDays,
    },
    {
      title: 'مواعيد اليوم',
      value: stats?.today_appointments ?? 0,
      icon: CalendarDays,
    },
    {
      title: 'المرضى',
      value: stats?.patients_count ?? 0,
      icon: Users,
    },
    {
      title: 'الإيرادات',
      value: `${stats?.revenue ?? 0} MRU`,
      icon: DollarSign,
    },
    {
      title: 'الاستشارات عن بعد',
      value: stats?.online_consultations ?? 0,
      icon: Video,
    },
  ];

  return (
    <div className="space-y-6 p-4 lg:p-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-text">لوحة تحكم الطبيب</h1>
        <p className="mt-1 text-sm text-brand-muted">
          متابعة المواعيد، المرضى، والإحصائيات اليومية.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-brand-border bg-white p-5 shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigoCustom-100 text-brand-primary">
                <Icon size={22} />
              </div>

              <p className="mt-5 text-sm text-brand-muted">{item.title}</p>
              <h3 className="mt-1 text-2xl font-extrabold text-brand-text">{item.value}</h3>
            </div>
          );
        })}
      </section>

      <section className="rounded-3xl border border-brand-border bg-white p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-brand-text">الموعد القادم</h2>
          <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-primary">
            القادم
          </span>
        </div>

        {stats?.next_appointment ? (
          <>
            <h3 className="font-extrabold text-brand-text">
              {stats.next_appointment.patient_name}
            </h3>

            <div className="mt-5 grid gap-3 rounded-2xl bg-brand-light p-4 md:grid-cols-2">
              <Info label="الهاتف" value={stats.next_appointment.patient_phone} />
              <Info label="التاريخ" value={stats.next_appointment.date} />
              <Info label="الوقت" value={stats.next_appointment.time} />
              <Info label="نوع الزيارة" value={stats.next_appointment.visit_type} />
              <Info label="القسم" value={stats.next_appointment.department || '-'} />
              <Info label="الحالة" value={stats.next_appointment.status} />
            </div>

            <button className="mt-5 flex items-center gap-2 rounded-2xl bg-brand-primary px-4 py-3 text-sm font-bold text-white">
              عرض تفاصيل الموعد
              <ArrowUpRight size={17} />
            </button>
          </>
        ) : (
          <p className="text-sm text-brand-muted">لا يوجد موعد قادم حالياً.</p>
        )}
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-brand-muted">{label}</p>
      <p className="mt-1 text-sm font-bold text-brand-text">{value}</p>
    </div>
  );
}
