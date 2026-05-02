// src/pages/DoctorProfilePage.tsx
import { FormEvent, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Save, Stethoscope } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchDoctorProfileThunk,
  updateDoctorProfileThunk,
} from '@/store/doctorProfile/doctorProfileThunks';

export default function DoctorProfilePage() {
  const dispatch = useAppDispatch();

  const { profile, loading, actionLoading, error } = useAppSelector((state) => state.doctorProfile);

  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [years, setYears] = useState(0);
  const [bio, setBio] = useState('');

  useEffect(() => {
    dispatch(fetchDoctorProfileThunk());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setSpecialty(profile.specialty || '');
      setPhone(profile.phone || '');
      setYears(profile.years_of_experience || 0);
      setBio(profile.bio || '');
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('specialty', specialty);
    formData.append('phone', phone);
    formData.append('years_of_experience', String(years));
    formData.append('bio', bio);

    const res = await dispatch(updateDoctorProfileThunk(formData));

    if (updateDoctorProfileThunk.fulfilled.match(res)) {
      Swal.fire('تم بنجاح', 'تم تحديث الملف الطبي.', 'success');
    } else {
      Swal.fire('خطأ', res.payload as string, 'error');
    }
  };

  if (loading) return <div className="p-6">جاري تحميل الملف...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 lg:p-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-text">ملفي الطبي</h1>
        <p className="mt-1 text-sm text-brand-muted">تحديث بيانات الطبيب التي تظهر للمرضى.</p>
      </div>

      <div className="rounded-3xl border border-brand-border bg-white p-5 shadow-soft">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigoCustom-100 text-brand-primary">
            <Stethoscope size={28} />
          </div>

          <div>
            <h2 className="font-extrabold text-brand-text">{profile?.full_name}</h2>
            <p className="text-sm text-brand-muted">{profile?.email}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="التخصص" value={specialty} onChange={setSpecialty} />
          <Input label="رقم الهاتف" value={phone} onChange={setPhone} />
          <Input
            label="سنوات الخبرة"
            value={String(years)}
            onChange={(value) => setYears(Number(value))}
            type="number"
          />

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-brand-text">نبذة عن الطبيب</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-32 w-full rounded-2xl border border-brand-border bg-brand-light px-4 py-3 text-sm outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <button
          disabled={actionLoading}
          className="btn-primary mt-6 flex items-center gap-2 disabled:opacity-60"
        >
          <Save size={17} />
          {actionLoading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
        </button>
      </div>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-brand-text">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-brand-border bg-brand-light px-4 py-3 text-sm outline-none focus:border-brand-primary"
      />
    </div>
  );
}
