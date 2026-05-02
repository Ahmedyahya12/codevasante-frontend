// src/pages/reception/ReceptionCreateAppointmentPage.tsx
import { FormEvent, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { CalendarPlus, Save, Search } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { searchReceptionPatientsThunk } from '@/store/receptionPatients/receptionPatientsThunks';
import {
  createReceptionAppointmentThunk,
  fetchReceptionDoctorsThunk,
} from '@/store/receptionAppointments/receptionAppointmentsThunks';

export default function ReceptionCreateAppointmentPage() {
  const dispatch = useAppDispatch();

  const { patients, loading: patientsLoading } = useAppSelector((state) => state.receptionPatients);

  const { doctors, doctorsLoading, actionLoading } = useAppSelector(
    (state) => state.receptionAppointments
  );

  const [patientSearch, setPatientSearch] = useState('');

  const [form, setForm] = useState({
    patient: '',
    doctor: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
    department: '',
    visit_type: 'استشارة عامة',
    price: '',
  });

  const safePatients = Array.isArray(patients) ? patients : [];
  const safeDoctors = Array.isArray(doctors) ? doctors : [];

  useEffect(() => {
    dispatch(searchReceptionPatientsThunk(''));
    dispatch(fetchReceptionDoctorsThunk());
  }, [dispatch]);

  const selectedDoctor = useMemo(() => {
    return safeDoctors.find((doctor: any) => Number(doctor.id) === Number(form.doctor));
  }, [safeDoctors, form.doctor]);

  const updateField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      patient: '',
      doctor: '',
      appointment_date: '',
      appointment_time: '',
      reason: '',
      department: '',
      visit_type: 'استشارة عامة',
      price: '',
    });
    setPatientSearch('');
  };

  const handlePatientSearch = () => {
    dispatch(searchReceptionPatientsThunk(patientSearch));
  };

  const handleDoctorChange = (value: string) => {
    updateField('doctor', value);

    const doctor = safeDoctors.find((item: any) => Number(item.id) === Number(value));

    if (doctor?.specialty) {
      updateField('department', doctor.specialty);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.patient || !form.doctor || !form.appointment_date || !form.appointment_time) {
      Swal.fire('تنبيه', 'المريض والطبيب والتاريخ والوقت مطلوبة.', 'warning');
      return;
    }

    const res = await dispatch(
      createReceptionAppointmentThunk({
        patient: Number(form.patient),
        doctor: Number(form.doctor),
        appointment_date: form.appointment_date,
        appointment_time: form.appointment_time,
        reason: form.reason,
        department: form.department,
        visit_type: form.visit_type,
        price: Number(form.price || 0),
      })
    );

    if (createReceptionAppointmentThunk.fulfilled.match(res)) {
      Swal.fire('تم بنجاح', 'تم إنشاء الموعد بنجاح.', 'success');
      resetForm();
    } else {
      Swal.fire('خطأ', res.payload as string, 'error');
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-extrabold text-brand-text">إنشاء موعد</h1>
        <p className="mt-2 text-sm text-brand-muted">
          اختيار المريض والطبيب وتحديد تاريخ ووقت الموعد.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-brand-border bg-white p-5 shadow-soft"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary text-white">
            <CalendarPlus size={24} />
          </div>

          <div>
            <h2 className="font-extrabold text-brand-text">تفاصيل الموعد</h2>
            <p className="text-sm text-brand-muted">البيانات ستكون مربوطة بالمريض والطبيب.</p>
          </div>
        </div>

        <div className="mb-5 rounded-2xl border border-brand-border bg-brand-light p-4">
          <label className="mb-2 block text-sm font-bold text-brand-text">البحث عن مريض</label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-brand-border bg-white px-4 py-3">
              <Search size={18} className="text-brand-muted" />
              <input
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePatientSearch()}
                placeholder="اسم، بريد، هاتف، رقم وطني..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handlePatientSearch}
              className="rounded-2xl bg-brand-primary px-5 py-3 text-sm font-bold text-white"
            >
              بحث
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label="المريض"
            value={form.patient}
            onChange={(v) => updateField('patient', v)}
            loading={patientsLoading}
            options={safePatients.map((patient: any) => ({
              value: patient.id,
              label:
                patient.full_name ||
                `${patient.first_name || ''} ${patient.last_name || ''}`.trim() ||
                patient.email ||
                `مريض #${patient.id}`,
            }))}
          />

          <Select
            label="الطبيب"
            value={form.doctor}
            onChange={handleDoctorChange}
            loading={doctorsLoading}
            options={safeDoctors.map((doctor: any) => ({
              value: doctor.id,
              label: `${doctor.full_name || doctor.email || `طبيب #${doctor.id}`} ${
                doctor.specialty ? `- ${doctor.specialty}` : ''
              }`,
            }))}
          />

          <Input
            label="تاريخ الموعد"
            type="date"
            value={form.appointment_date}
            onChange={(v) => updateField('appointment_date', v)}
          />

          <Input
            label="وقت الموعد"
            type="time"
            value={form.appointment_time}
            onChange={(v) => updateField('appointment_time', v)}
          />

          <Input
            label="نوع الزيارة"
            value={form.visit_type}
            onChange={(v) => updateField('visit_type', v)}
            placeholder="استشارة عامة"
          />

          <Input
            label="السعر"
            type="number"
            value={form.price}
            onChange={(v) => updateField('price', v)}
            placeholder="500"
          />

          <Input
            label="القسم / التخصص"
            value={form.department}
            onChange={(v) => updateField('department', v)}
            placeholder="مثال: القلب"
          />

          <div className="rounded-2xl border border-brand-border bg-brand-light p-4">
            <p className="text-sm font-bold text-brand-text">الطبيب المحدد</p>
            <p className="mt-2 text-sm text-brand-muted">
              {selectedDoctor
                ? `${selectedDoctor.full_name || selectedDoctor.email || '-'} ${
                    selectedDoctor.specialty ? `- ${selectedDoctor.specialty}` : ''
                  }`
                : 'لم يتم اختيار طبيب بعد'}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-brand-text">سبب الزيارة</label>
            <textarea
              value={form.reason}
              onChange={(e) => updateField('reason', e.target.value)}
              placeholder="سبب الحجز أو ملاحظة موظف الاستقبال..."
              className="min-h-28 w-full rounded-2xl border border-brand-border bg-brand-light px-4 py-3 text-sm outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            disabled={actionLoading}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save size={17} />
            {actionLoading ? 'جاري إنشاء الموعد...' : 'إنشاء الموعد'}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="rounded-2xl border border-brand-border bg-white px-5 py-3 text-sm font-bold text-brand-text"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-brand-text">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-brand-border bg-brand-light px-4 py-3 text-sm outline-none focus:border-brand-primary"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  loading,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: number; label: string }[];
  loading?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-brand-text">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-brand-border bg-brand-light px-4 py-3 text-sm outline-none focus:border-brand-primary"
      >
        <option value="">{loading ? 'جاري التحميل...' : 'اختر'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
