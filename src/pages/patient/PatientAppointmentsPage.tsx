import { useEffect, useMemo } from 'react';
import {
  CalendarDays,
  Clock,
  FileText,
  Stethoscope,
  XCircle,
} from 'lucide-react';
import Swal from 'sweetalert2';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  cancelAppointmentThunk,
  fetchMyAppointmentsThunk,
} from '@/store/appointments/appointmentThunks';

const statusMap = {
  pending: {
    label: 'قيد الانتظار',
    className: 'bg-amber-50 text-amber-700 ring-amber-200',
  },
  confirmed: {
    label: 'مؤكد',
    className: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
  checked_in: {
    label: 'حضر إلى العيادة',
    className: 'bg-sky-50 text-sky-700 ring-sky-200',
  },
  cancelled: {
    label: 'ملغى',
    className: 'bg-rose-50 text-rose-700 ring-rose-200',
  },
};

export default function PatientAppointmentsPage() {
  const dispatch = useAppDispatch();

  const { myAppointments, loading, error } = useAppSelector(
    (state) => state.appointments
  );

  const appointments = useMemo(() => {
    if (Array.isArray(myAppointments)) return myAppointments;

    if (
      myAppointments &&
      typeof myAppointments === 'object' &&
      Array.isArray((myAppointments as any).results)
    ) {
      return (myAppointments as any).results;
    }

    return [];
  }, [myAppointments]);

  useEffect(() => {
    dispatch(fetchMyAppointmentsThunk());

    const interval = setInterval(() => {
      dispatch(fetchMyAppointmentsThunk());
    }, 15000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      pending: appointments.filter((a: any) => a.status === 'pending').length,
      confirmed: appointments.filter((a: any) => a.status === 'confirmed').length,
      cancelled: appointments.filter((a: any) => a.status === 'cancelled').length,
    };
  }, [appointments]);

  const handleCancel = async (id: number) => {
    const result = await Swal.fire({
      title: 'إلغاء الموعد',
      text: 'هل أنت متأكد من إلغاء هذا الموعد؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، إلغاء',
      cancelButtonText: 'رجوع',
      confirmButtonColor: '#E11D48',
      cancelButtonColor: '#64748B',
    });

    if (!result.isConfirmed) return;

    const action = await dispatch(cancelAppointmentThunk(id));

    if (cancelAppointmentThunk.fulfilled.match(action)) {
      await dispatch(fetchMyAppointmentsThunk());

      Swal.fire({
        icon: 'success',
        title: 'تم إلغاء الموعد',
        text: 'تم تحديث حالة الموعد بنجاح.',
        confirmButtonColor: '#2E37A4',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'تعذر الإلغاء',
        text: String(action.payload || 'حدث خطأ أثناء إلغاء الموعد.'),
        confirmButtonColor: '#0F766E',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-cyan-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-l from-[#1E2A78] via-[#2E37A4] to-[#0F766E] p-6 text-white shadow-2xl shadow-blue-900/20 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white ring-1 ring-white/20 backdrop-blur">
                لوحة المريض
              </span>

              <h1 className="mt-4 text-3xl font-black sm:text-4xl">مواعيدي</h1>

              <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-white/90">
                تابع حجوزاتك الطبية، حالة كل موعد، وتفاصيل الطبيب والوقت بسهولة.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold ring-1 ring-white/20 backdrop-blur">
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l3 3-3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
              يتم التحديث تلقائياً
            </div>
          </div>
        </section>

        {error && (
          <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="كل المواعيد" value={stats.total} icon={<CalendarDays size={22} />} />
          <StatCard title="قيد الانتظار" value={stats.pending} icon={<Clock size={22} />} />
          <StatCard title="مؤكدة" value={stats.confirmed} icon={<Stethoscope size={22} />} />
          <StatCard title="ملغاة" value={stats.cancelled} icon={<XCircle size={22} />} />
        </div>

        <div className="mt-7 overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-xl shadow-slate-200/70">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-black text-slate-900">قائمة الحجوزات</h2>
              <p className="mt-1 text-sm text-slate-500">
                يتم تحديث القائمة تلقائياً بدون الحاجة إلى الضغط على زر التحديث.
              </p>
            </div>
          </div>

          {loading && appointments.length === 0 ? (
            <div className="p-10 text-center text-sm font-bold text-slate-500">
              جاري تحميل المواعيد...
            </div>
          ) : appointments.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[900px] text-right">
                  <thead className="bg-slate-50 text-xs font-black text-slate-500">
                    <tr>
                      <th className="px-5 py-4">#</th>
                      <th className="px-5 py-4">الطبيب</th>
                      <th className="px-5 py-4">التاريخ</th>
                      <th className="px-5 py-4">الوقت</th>
                      <th className="px-5 py-4">سبب الزيارة</th>
                      <th className="px-5 py-4">الحالة</th>
                      <th className="px-5 py-4">إجراء</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {appointments.map((item: any) => {
                      const status =
                        statusMap[item.status as keyof typeof statusMap] || statusMap.pending;

                      const disabledCancel =
                        item.status === 'cancelled' || item.status === 'checked_in';

                      return (
                        <tr key={item.id} className="transition hover:bg-cyan-50/40">
                          <td className="px-5 py-4 text-sm font-bold text-slate-700">
                            #{item.id}
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm font-black text-slate-900">
                              {item.doctor_name || '---'}
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm font-bold text-slate-700">
                            {item.date || '---'}
                          </td>

                          <td className="px-5 py-4 text-sm font-bold text-slate-700">
                            {formatTime(item.time)}
                          </td>

                          <td className="max-w-[240px] truncate px-5 py-4 text-sm text-slate-500">
                            {item.reason || '---'}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${status.className}`}
                            >
                              {status.label}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <button
                              onClick={() => handleCancel(item.id)}
                              disabled={disabledCancel}
                              className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-black text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              إلغاء
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 p-4 lg:hidden">
                {appointments.map((item: any) => {
                  const status =
                    statusMap[item.status as keyof typeof statusMap] || statusMap.pending;

                  const disabledCancel =
                    item.status === 'cancelled' || item.status === 'checked_in';

                  return (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-slate-400">
                            موعد #{item.id}
                          </p>
                          <h3 className="mt-1 text-base font-black text-slate-900">
                            {item.doctor_name || '---'}
                          </h3>
                        </div>

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <div className="grid gap-3 text-sm">
                        <MobileRow label="التاريخ" value={item.date || '---'} />
                        <MobileRow label="الوقت" value={formatTime(item.time)} />
                        <MobileRow label="سبب الزيارة" value={item.reason || '---'} />
                      </div>

                      <button
                        onClick={() => handleCancel(item.id)}
                        disabled={disabledCancel}
                        className="mt-4 w-full rounded-xl bg-rose-50 px-4 py-3 text-sm font-black text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        إلغاء الموعد
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
          {icon}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <FileText size={28} />
      </div>

      <h3 className="mt-4 text-xl font-black text-slate-900">
        لا توجد مواعيد حالياً
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        يمكنك حجز موعد جديد من صفحة الحجز.
      </p>
    </div>
  );
}

function MobileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <span className="text-sm font-black text-slate-800">{value}</span>
    </div>
  );
}

function formatTime(time?: string) {
  if (!time) return '---';
  return time.slice(0, 5);
}
