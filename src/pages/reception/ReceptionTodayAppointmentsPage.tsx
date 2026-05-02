// src/pages/reception/ReceptionTodayAppointmentsPage.tsx
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { CheckCircle, UserRound } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchReceptionTodayAppointmentsThunk,
  confirmReceptionArrivalThunk,
} from '@/store/receptionAppointments/receptionAppointmentsThunks';

export default function ReceptionTodayAppointmentsPage() {
  const dispatch = useAppDispatch();

  const { todayAppointments, loading, error, actionLoading } = useAppSelector(
    (state) => state.receptionAppointments
  );

  useEffect(() => {
    dispatch(fetchReceptionTodayAppointmentsThunk());
  }, [dispatch]);

  const handleConfirmArrival = async (id: number) => {
    const result = await Swal.fire({
      title: 'تأكيد الحضور',
      text: 'هل تريد تأكيد حضور هذا المريض؟',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'نعم',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#4f46e5',
    });

    if (!result.isConfirmed) return;

    const res = await dispatch(confirmReceptionArrivalThunk(id));

    if (confirmReceptionArrivalThunk.fulfilled.match(res)) {
      Swal.fire('تم', 'تم تأكيد حضور المريض.', 'success');
    } else {
      Swal.fire('خطأ', res.payload as string, 'error');
    }
  };

  if (loading) return <div className="p-6">جاري تحميل مواعيد اليوم...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-extrabold text-brand-text">مواعيد اليوم</h1>
        <p className="mt-2 text-sm text-brand-muted">
          متابعة وصول المرضى وتأكيد حضورهم.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {todayAppointments.map((item) => {
          const isAlreadyConfirmed =
            item.status === 'confirmed' ||
            item.status === 'completed' ||
            item.status === 'cancelled';

          const buttonLabel =
            item.status === 'confirmed'
              ? 'تم تأكيد الحضور'
              : item.status === 'completed'
                ? 'الموعد مكتمل'
                : item.status === 'cancelled'
                  ? 'الموعد ملغي'
                  : 'تأكيد حضور المريض';

          return (
            <article
              key={item.id}
              className="rounded-3xl border border-brand-border bg-white p-5 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigoCustom-100 text-brand-primary">
                  <UserRound size={24} />
                </div>

                <div>
                  <h3 className="font-extrabold text-brand-text">
                    {item.patient?.full_name || '-'}
                  </h3>
                  <p className="text-sm text-brand-muted">{item.patient?.phone || '-'}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-brand-light p-4">
                <Row label="الطبيب" value={item.doctor?.full_name || '-'} />
                <Row label="الوقت" value={item.appointment_time} />
                <Row label="الحالة" value={item.status_display || item.status} />
              </div>

              <button
                type="button"
                disabled={actionLoading || isAlreadyConfirmed}
                onClick={() => handleConfirmArrival(item.id)}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  isAlreadyConfirmed
                    ? 'bg-green-50 text-green-700'
                    : 'bg-brand-primary text-white hover:opacity-90'
                }`}
              >
                <CheckCircle size={17} />
                {actionLoading && !isAlreadyConfirmed ? 'جاري التأكيد...' : buttonLabel}
              </button>
            </article>
          );
        })}

        {todayAppointments.length === 0 && (
          <p className="text-sm text-brand-muted">لا توجد مواعيد اليوم.</p>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 flex items-center justify-between last:mb-0">
      <span className="text-sm text-brand-muted">{label}</span>
      <span className="text-sm font-bold text-brand-text">{value}</span>
    </div>
  );
}
