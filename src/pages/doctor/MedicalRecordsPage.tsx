// src/pages/doctor/MedicalRecordsPage.tsx
import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, FileText, Plus, Search, UserRound } from 'lucide-react';
import Swal from 'sweetalert2';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchPatientMedicalRecordsThunk,
  createMedicalRecordThunk,
} from '@/store/medicalRecords/medicalRecordsThunks';
import { fetchDoctorPatientsThunk } from '@/store/doctorPatients/doctorPatientsThunks';

export default function MedicalRecordsPage() {
  const dispatch = useAppDispatch();

  const { records, loading, error, actionLoading } = useAppSelector(
    (state) => state.medicalRecords
  );
  const { patients } = useAppSelector((state) => state.doctorPatients);

  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');

  const safePatients = Array.isArray(patients) ? patients : [];
  const safeRecords = Array.isArray(records) ? records : [];

  const normalizedPatients = useMemo(() => {
    return safePatients.map((item: any) => item?.patient || item);
  }, [safePatients]);

  const selectedPatient = normalizedPatients.find(
    (p: any) => Number(p?.id) === Number(selectedPatientId)
  );

  useEffect(() => {
    dispatch(fetchDoctorPatientsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (selectedPatientId) {
      dispatch(fetchPatientMedicalRecordsThunk(selectedPatientId));
    }
  }, [dispatch, selectedPatientId]);

  const filteredRecords = safeRecords.filter((record: any) => {
    const text = `${record?.note || ''} ${selectedPatient?.full_name || ''}`;
    return text.toLowerCase().includes(search.toLowerCase());
  });

  const handleCreateNote = async () => {
    if (!selectedPatientId) {
      Swal.fire('تنبيه', 'اختر المريض أولاً', 'warning');
      return;
    }

    if (!note.trim()) {
      Swal.fire('تنبيه', 'اكتب الملاحظة الطبية أولاً', 'warning');
      return;
    }

    const res = await dispatch(
      createMedicalRecordThunk({
        patient: selectedPatientId,
        note: note.trim(),
      })
    );

    if (createMedicalRecordThunk.fulfilled.match(res)) {
      setNote('');
      Swal.fire('تم بنجاح', 'تمت إضافة الملاحظة الطبية.', 'success');
    } else {
      Swal.fire('خطأ', res.payload as string, 'error');
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6" dir="rtl">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <span className="rounded-full bg-indigoCustom-100 px-4 py-2 text-sm font-bold text-brand-primary">
            السجل الطبي
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-brand-text">الملاحظات الطبية</h1>
          <p className="mt-2 text-sm text-brand-muted">
            اختر المريض، راجع ملاحظاته السابقة، وأضف ملاحظة جديدة بشكل آمن.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <MiniStat label="عدد المرضى" value={normalizedPatients.length} />
          <MiniStat label="الملاحظات" value={safeRecords.length} />
          <MiniStat label="المريض المحدد" value={selectedPatient ? 'محدد' : 'غير محدد'} />
        </div>
      </div>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.2fr]">
        <div className="rounded-[28px] border border-brand-border bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigoCustom-100 text-brand-primary">
              <UserRound size={22} />
            </div>
            <div>
              <h2 className="font-extrabold text-brand-text">اختيار المريض</h2>
              <p className="text-sm text-brand-muted">الملاحظات مرتبطة بالمريض المختار.</p>
            </div>
          </div>

          <label className="mb-2 block text-sm font-bold text-brand-text">المريض</label>

          <select
            value={selectedPatientId || ''}
            onChange={(e) => setSelectedPatientId(Number(e.target.value))}
            className="w-full rounded-2xl border border-brand-border bg-brand-light px-4 py-3 text-sm font-semibold outline-none focus:border-brand-primary"
          >
            <option value="">-- اختر مريض --</option>
            {normalizedPatients.map((patient: any) => (
              <option key={patient?.id} value={patient?.id}>
                {patient?.full_name || patient?.email || 'مريض بدون اسم'}
              </option>
            ))}
          </select>

          {selectedPatient && (
            <div className="mt-5 rounded-2xl bg-brand-light p-4">
              <Info label="اسم المريض" value={selectedPatient.full_name || '-'} />
              <Info label="البريد" value={selectedPatient.email || '-'} />
              <Info label="الهاتف" value={selectedPatient.phone || '-'} />
            </div>
          )}
        </div>

        <div className="rounded-[28px] border border-brand-border bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-white">
              <Plus size={22} />
            </div>
            <div>
              <h2 className="font-extrabold text-brand-text">إضافة ملاحظة</h2>
              <p className="text-sm text-brand-muted">اكتب ملخص الاستشارة أو توصيات المتابعة.</p>
            </div>
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="اكتب الملاحظة الطبية هنا..."
            className="min-h-36 w-full resize-none rounded-2xl border border-brand-border bg-brand-light px-4 py-3 text-sm leading-7 outline-none focus:border-brand-primary"
          />

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs text-brand-muted">{note.length} حرف</p>

            <button
              type="button"
              onClick={handleCreateNote}
              disabled={actionLoading}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              <Plus size={17} />
              {actionLoading ? 'جاري الإضافة...' : 'إضافة الملاحظة'}
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-brand-border bg-white p-5 shadow-soft">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-brand-text">سجل الملاحظات</h2>
            <p className="mt-1 text-sm text-brand-muted">
              {selectedPatient
                ? `ملاحظات المريض: ${selectedPatient.full_name || selectedPatient.email}`
                : 'اختر مريضاً لعرض ملاحظاته الطبية.'}
            </p>
          </div>

          <div className="flex w-full max-w-sm items-center gap-2 rounded-2xl border border-brand-border bg-brand-light px-4 py-3">
            <Search size={18} className="text-brand-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث داخل الملاحظات..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-brand-light p-6 text-center text-brand-muted">
            جاري تحميل الملاحظات...
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600">{error}</div>
        ) : !selectedPatientId ? (
          <div className="rounded-2xl bg-brand-light p-10 text-center">
            <FileText className="mx-auto mb-3 text-brand-muted" size={34} />
            <p className="font-bold text-brand-text">لم يتم اختيار مريض بعد</p>
            <p className="mt-1 text-sm text-brand-muted">اختر المريض من الأعلى لعرض السجل الطبي.</p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="rounded-2xl bg-brand-light p-10 text-center">
            <FileText className="mx-auto mb-3 text-brand-muted" size={34} />
            <p className="font-bold text-brand-text">لا توجد ملاحظات</p>
            <p className="mt-1 text-sm text-brand-muted">يمكنك إضافة أول ملاحظة لهذا المريض.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredRecords.map((item: any) => (
              <article
                key={item.id}
                className="rounded-3xl border border-brand-border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigoCustom-100 text-brand-primary">
                    <FileText size={22} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="font-extrabold text-brand-text">ملاحظة طبية</h3>
                        <p className="mt-1 flex items-center gap-2 text-sm font-bold text-brand-primary">
                          <UserRound size={15} />
                          {selectedPatient?.full_name || selectedPatient?.email || 'مريض غير محدد'}
                        </p>
                      </div>

                      <span className="flex items-center gap-2 rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-muted">
                        <CalendarDays size={14} />
                        {item.created_at?.slice(0, 10) || '-'}
                      </span>
                    </div>

                    <p className="mt-4 rounded-2xl bg-brand-light p-4 leading-8 text-brand-muted">
                      {item.note}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-white px-5 py-4 shadow-soft">
      <p className="text-xs text-brand-muted">{label}</p>
      <p className="mt-1 text-xl font-extrabold text-brand-primary">{value}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 flex items-center justify-between last:mb-0">
      <span className="text-sm text-brand-muted">{label}</span>
      <span className="text-sm font-bold text-brand-text">{value}</span>
    </div>
  );
}
