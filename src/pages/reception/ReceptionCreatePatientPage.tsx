// src/pages/reception/ReceptionCreatePatientPage.tsx
import { FormEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { Save, UserPlus } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createReceptionPatientThunk } from '@/store/receptionPatients/receptionPatientsThunks';

export default function ReceptionCreatePatientPage() {
  const dispatch = useAppDispatch();
  const { actionLoading } = useAppSelector((state) => state.receptionPatients);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    national_id: '',
    address: '',
  });

  const updateField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      gender: '',
      national_id: '',
      address: '',
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim()) {
      Swal.fire('تنبيه', 'الاسم الأول واسم العائلة والبريد الإلكتروني مطلوبة.', 'warning');
      return;
    }

    const res = await dispatch(createReceptionPatientThunk(form));

    if (createReceptionPatientThunk.fulfilled.match(res)) {
      Swal.fire('تم بنجاح', 'تم إنشاء المريض بنجاح.', 'success');
      resetForm();
    } else {
      Swal.fire('خطأ', res.payload as string, 'error');
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-extrabold text-brand-text">إضافة مريض جديد</h1>
        <p className="mt-2 text-sm text-brand-muted">إنشاء حساب مريض جديد من طرف موظف الاستقبال.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-brand-border bg-white p-5 shadow-soft"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigoCustom-100 text-brand-primary">
            <UserPlus size={24} />
          </div>

          <div>
            <h2 className="font-extrabold text-brand-text">معلومات المريض</h2>
            <p className="text-sm text-brand-muted">أدخل البيانات الأساسية للمريض.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="الاسم الأول"
            value={form.first_name}
            onChange={(v) => updateField('first_name', v)}
            placeholder="مثال: أحمد"
          />

          <Input
            label="اسم العائلة"
            value={form.last_name}
            onChange={(v) => updateField('last_name', v)}
            placeholder="مثال: محمد"
          />

          <Input
            label="البريد الإلكتروني"
            value={form.email}
            onChange={(v) => updateField('email', v)}
            placeholder="patient@test.com"
            type="email"
          />

          <Input
            label="رقم الهاتف"
            value={form.phone}
            onChange={(v) => updateField('phone', v)}
            placeholder="22223333"
          />

          <Input
            label="الرقم الوطني"
            value={form.national_id}
            onChange={(v) => updateField('national_id', v)}
            placeholder="اختياري"
          />

          <div>
            <label className="mb-2 block text-sm font-bold text-brand-text">الجنس</label>
            <select
              value={form.gender}
              onChange={(e) => updateField('gender', e.target.value)}
              className="w-full rounded-2xl border border-brand-border bg-brand-light px-4 py-3 text-sm outline-none focus:border-brand-primary"
            >
              <option value="">اختر الجنس</option>
              <option value="M">ذكر</option>
              <option value="F">أنثى</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-brand-text">العنوان</label>
            <textarea
              value={form.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="عنوان المريض..."
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
            {actionLoading ? 'جاري الحفظ...' : 'حفظ المريض'}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="rounded-2xl border border-brand-border bg-white px-5 py-3 text-sm font-bold text-brand-text"
          >
            إفراغ الحقول
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
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
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
