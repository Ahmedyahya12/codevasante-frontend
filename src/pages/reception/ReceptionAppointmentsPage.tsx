// src/pages/reception/ReceptionAppointmentsPage.tsx
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { CheckCircle, Search, XCircle } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchReceptionAppointmentsThunk,
  updateReceptionAppointmentStatusThunk,
} from '@/store/receptionAppointments/receptionAppointmentsThunks';

type ReceptionStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export default function ReceptionAppointmentsPage() {
  const dispatch = useAppDispatch();

  const { appointments, loading, error, actionLoading } = useAppSelector(
    (state) => state.receptionAppointments
  );

  useEffect(() => {
    dispatch(fetchReceptionAppointmentsThunk());
  }, [dispatch]);

  const handleUpdate = async (id: number, status: 'confirmed' | 'cancelled') => {
    const result = await Swal.fire({
      title: 'تأكيد العملية',
      text: status === 'confirmed' ? 'هل تريد تأكيد الموعد؟' : 'هل تريد إلغاء الموعد؟',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'نعم',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#4f46e5',
    });

    if (!result.isConfirmed) return;

    const res = await dispatch(updateReceptionAppointmentStatusThunk({ id, status }));

    if (updateReceptionAppointmentStatusThunk.fulfilled.match(res)) {
      Swal.fire('تم', 'تم تحديث حالة الموعد.', 'success');
    } else {
      Swal.fire('خطأ', res.payload as string, 'error');
    }
  };

  if (loading) return <div className="p-6">جاري تحميل المواعيد...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-extrabold text-brand-text">كل المواعيد</h1>
        <p className="mt-2 text-sm text-brand-muted">عرض وإدارة جميع مواعيد العيادة.</p>
      </div>

      <div className="flex items-center gap-2 rounded-3xl border border-brand-border bg-white p-4 shadow-soft">
        <Search size={18} className="text-brand-muted" />
        <input
          placeholder="بحث قريباً..."
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-3xl border border-brand-border bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-right">
            <thead className="bg-brand-light text-sm text-brand-muted">
              <tr>
                <th className="px-5 py-4">المريض</th>
                <th className="px-5 py-4">الطبيب</th>
                <th className="px-5 py-4">التاريخ</th>
                <th className="px-5 py-4">الوقت</th>
                <th className="px-5 py-4">الحالة</th>
                <th className="px-5 py-4">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((item) => {
                const status = item.status as ReceptionStatus;

                const canConfirm = status === 'pending';
                const canCancel = status === 'pending' || status === 'confirmed';

                return (
                  <tr key={item.id} className="border-t border-brand-border">
                    <td className="px-5 py-4 font-bold">
                      {item.patient?.full_name || '-'}
                    </td>

                    <td className="px-5 py-4 text-brand-muted">
                      {item.doctor?.full_name || '-'}
                    </td>

                    <td className="px-5 py-4">{item.appointment_date}</td>
                    <td className="px-5 py-4">{item.appointment_time}</td>

                    <td className="px-5 py-4">
                      <StatusBadge status={status} label={item.status_display} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={actionLoading || !canConfirm}
                          onClick={() => handleUpdate(item.id, 'confirmed')}
                          title={canConfirm ? 'تأكيد الموعد' : 'لا يمكن تأكيد هذا الموعد'}
                          className={`rounded-xl p-2 transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            canConfirm
                              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <CheckCircle size={17} />
                        </button>

                        <button
                          type="button"
                          disabled={actionLoading || !canCancel}
                          onClick={() => handleUpdate(item.id, 'cancelled')}
                          title={canCancel ? 'إلغاء الموعد' : 'لا يمكن إلغاء هذا الموعد'}
                          className={`rounded-xl p-2 transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            canCancel
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <XCircle size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {appointments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-brand-muted">
                    لا توجد مواعيد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
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
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${classes[status] || 'bg-gray-50 text-gray-700'}`}>
      {label || labels[status] || status}
    </span>
  );
}
