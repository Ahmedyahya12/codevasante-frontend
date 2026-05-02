// src/pages/doctor/PatientsPage.tsx
import { useEffect, useMemo, useState } from 'react';
import { Search, UserRound } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDoctorPatientsThunk } from '@/store/doctorPatients/doctorPatientsThunks';

export default function PatientsPage() {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');

  const { patients, loading, error } = useAppSelector((state) => state.doctorPatients);

  const safePatients = Array.isArray(patients) ? patients : [];

  useEffect(() => {
    dispatch(fetchDoctorPatientsThunk());
  }, [dispatch]);

  const filteredPatients = useMemo(() => {
    return safePatients.filter((item: any) => {
      const patient = item?.patient || item;

      const text = `
        ${patient?.full_name || ''}
        ${patient?.email || ''}
        ${patient?.phone || ''}
      `;

      return text.toLowerCase().includes(query.toLowerCase());
    });
  }, [safePatients, query]);

  if (loading) return <div className="p-6">جاري تحميل المرضى...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6 p-4 lg:p-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-text">مرضاي</h1>
        <p className="mt-1 text-sm text-brand-muted">قائمة المرضى المرتبطين بك.</p>
      </div>

      <div className="flex max-w-md items-center gap-2 rounded-2xl border border-brand-border bg-white px-4 py-3 shadow-soft">
        <Search size={18} className="text-brand-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="بحث عن مريض..."
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredPatients.map((item: any) => {
          const patient = item?.patient || item;

          return (
            <div
              key={item?.id || patient?.id}
              className="rounded-3xl border border-brand-border bg-white p-5 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigoCustom-100 text-brand-primary">
                  <UserRound size={24} />
                </div>

                <div>
                  <h3 className="font-extrabold text-brand-text">
                    {patient?.full_name || 'مريض بدون اسم'}
                  </h3>
                  <p className="text-sm text-brand-muted">{patient?.email || '-'}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-brand-light p-4">
                <Row label="الهاتف" value={patient?.phone || '-'} />
                <Row label="تاريخ الربط" value={item?.created_at?.slice(0, 10) || '-'} />
              </div>
            </div>
          );
        })}

        {filteredPatients.length === 0 && (
          <p className="text-sm text-brand-muted">لا توجد نتائج.</p>
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
