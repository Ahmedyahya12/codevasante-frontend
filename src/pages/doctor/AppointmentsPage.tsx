// src/pages/AppointmentsPage.tsx
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchDoctorAppointmentsThunk,
  updateAppointmentStatusThunk,
} from '@/store/doctorAppointments/doctorAppointmentsThunks';
import { AppointmentStatus } from '@/store/doctorAppointments/doctorAppointmentsTypes';

const statusClass: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-blue-50 text-blue-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
};

export default function AppointmentsPage() {
  const dispatch = useAppDispatch();

  const { appointments, loading, error, actionLoading } = useAppSelector(
    (state) => state.doctorAppointments
  );

  useEffect(() => {
    dispatch(fetchDoctorAppointmentsThunk());
  }, [dispatch]);

  const handleUpdateStatus = async (id: number, status: AppointmentStatus) => {
    const result = await Swal.fire({
      title: 'تأكيد العملية',
      text: 'هل تريد تحديث حالة الموعد؟',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'نعم',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#4f46e5',
    });

    if (!result.isConfirmed) return;

    const res = await dispatch(updateAppointmentStatusThunk({ id, status }));

    if (updateAppointmentStatusThunk.fulfilled.match(res)) {
      Swal.fire('تم بنجاح', 'تم تحديث حالة الموعد.', 'success');
    } else {
      Swal.fire('خطأ', res.payload as string, 'error');
    }
  };

  if (loading) {
    return <div className="p-6">جاري تحميل المواعيد...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6 p-4 lg:p-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-text">مواعيدي</h1>
        <p className="mt-1 text-sm text-brand-muted">إدارة المواعيد وتحديث حالتها.</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-brand-border bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-right">
            <thead className="bg-brand-light text-sm text-brand-muted">
              <tr>
                <th className="px-5 py-4">المريض</th>
                <th className="px-5 py-4">الهاتف</th>
                <th className="px-5 py-4">التاريخ</th>
                <th className="px-5 py-4">الوقت</th>
                <th className="px-5 py-4">نوع الزيارة</th>
                <th className="px-5 py-4">الحالة</th>
                <th className="px-5 py-4">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((item) => (
                <tr key={item.id} className="border-t border-brand-border">
                  <td className="px-5 py-4 font-bold text-brand-text">{item.patient?.full_name}</td>
                  <td className="px-5 py-4 text-brand-muted">{item.patient?.phone || '-'}</td>
                  <td className="px-5 py-4">{item.appointment_date}</td>
                  <td className="px-5 py-4">{item.appointment_time}</td>
                  <td className="px-5 py-4">{item.visit_type}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        statusClass[item.status]
                      }`}
                    >
                      {item.status_display}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        disabled={actionLoading}
                        onClick={() => handleUpdateStatus(item.id, 'confirmed')}
                        className="rounded-xl bg-blue-50 p-2 text-blue-600 disabled:opacity-50"
                        title="تأكيد"
                      >
                        <Clock size={17} />
                      </button>

                      <button
                        disabled={actionLoading}
                        onClick={() => handleUpdateStatus(item.id, 'completed')}
                        className="rounded-xl bg-green-50 p-2 text-green-600 disabled:opacity-50"
                        title="مكتمل"
                      >
                        <CheckCircle size={17} />
                      </button>

                      <button
                        disabled={actionLoading}
                        onClick={() => handleUpdateStatus(item.id, 'cancelled')}
                        className="rounded-xl bg-red-50 p-2 text-red-600 disabled:opacity-50"
                        title="إلغاء"
                      >
                        <XCircle size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {appointments.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-brand-muted">
                    لا توجد مواعيد حالياً.
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
