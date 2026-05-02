// src/pages/reception/ReceptionPatientsPage.tsx
import { useEffect, useState } from 'react';
import { Search, UserPlus, UserRound } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { searchReceptionPatientsThunk } from '@/store/receptionPatients/receptionPatientsThunks';
import { Link } from 'react-router-dom';

export default function ReceptionPatientsPage() {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');

  const { patients, loading, error } = useAppSelector((state) => state.receptionPatients);

  useEffect(() => {
    dispatch(searchReceptionPatientsThunk(''));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(searchReceptionPatientsThunk(query));
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-text">المرضى</h1>
          <p className="mt-2 text-sm text-brand-muted">البحث عن المرضى وإدارة ملفاتهم.</p>
        </div>

        <Link to="/reception/create-patient" className="btn-primary flex items-center gap-2">
          <UserPlus size={17} />
          إضافة مريض
        </Link>
      </div>

      <div className="flex max-w-xl items-center gap-2 rounded-2xl border border-brand-border bg-white px-4 py-3 shadow-soft">
        <Search size={18} className="text-brand-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="بحث بالاسم أو الهاتف أو البريد..."
          className="w-full bg-transparent text-sm outline-none"
        />
        <button
          onClick={handleSearch}
          className="rounded-xl bg-brand-primary px-4 py-2 text-sm font-bold text-white"
        >
          بحث
        </button>
      </div>

      {loading ? (
        <div>جاري البحث...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="rounded-3xl border border-brand-border bg-white p-5 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigoCustom-100 text-brand-primary">
                  <UserRound size={24} />
                </div>

                <div>
                  <h3 className="font-extrabold text-brand-text">
                    {patient.full_name || 'مريض بدون اسم'}
                  </h3>
                  <p className="text-sm text-brand-muted">{patient.email || '-'}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-brand-light p-4">
                <Row label="الهاتف" value={patient.phone || '-'} />
                <Row label="الرقم الوطني" value={patient.national_id || '-'} />
              </div>
            </div>
          ))}

          {patients.length === 0 && <p className="text-sm text-brand-muted">لا توجد نتائج.</p>}
        </div>
      )}
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
