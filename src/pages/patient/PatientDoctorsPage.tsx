import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Stethoscope } from 'lucide-react';
import DoctorCard from '@/components/doctors/DoctorCard';
import { fetchDoctorsThunk, fetchDoctorSpecialtiesThunk } from '@/store/doctors/doctorThunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function PatientDoctorsPage() {
  const dispatch = useAppDispatch();

  const { doctors, specialties, loading, error, specialtiesLoading } = useAppSelector(
    (state) => state.doctors
  );

  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    dispatch(fetchDoctorSpecialtiesThunk());
    dispatch(fetchDoctorsThunk());
  }, [dispatch]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      dispatch(
        fetchDoctorsThunk({
          search: search.trim() || undefined,
          specialty: selectedSpecialty || undefined,
        })
      );
    }, 400);

    return () => window.clearTimeout(timer);
  }, [dispatch, search, selectedSpecialty]);

  const countLabel = useMemo(() => {
    if (loading) return 'جاري التحميل...';
    return `عدد الأطباء: ${doctors.length}`;
  }, [loading, doctors.length]);

  return (
    <div className="min-h-screen bg-brand-light">
      <section className="relative overflow-hidden bg-gradient-to-l from-[#1E2A78] via-[#2E37A4] to-[#0F766E] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15">
            <Stethoscope size={32} />
          </div>

          <h1 className="text-4xl font-extrabold md:text-5xl">الأطباء</h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
            تصفح قائمة الأطباء، شاهد التفاصيل، ثم احجز الموعد المناسب حسب أوقات الطبيب المتاحة.
          </p>

          <div className="mx-auto mt-8 grid max-w-4xl gap-3 rounded-3xl bg-white p-2 shadow-xl md:grid-cols-[1fr_260px_auto]">
            <div className="flex items-center gap-3 px-4">
              <Search size={20} className="text-brand-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث باسم الطبيب أو التخصص..."
                className="w-full bg-transparent py-3 text-sm text-brand-text outline-none"
              />
            </div>

            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="rounded-2xl border border-brand-border bg-brand-light px-4 py-3 text-sm font-bold text-brand-text outline-none"
            >
              <option value="">كل التخصصات</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() =>
                dispatch(
                  fetchDoctorsThunk({
                    search: search.trim() || undefined,
                    specialty: selectedSpecialty || undefined,
                  })
                )
              }
              className="hidden items-center justify-center gap-2 rounded-2xl bg-brand-primary px-5 py-3 text-sm font-extrabold text-white md:flex"
            >
              <SlidersHorizontal size={17} />
              بحث
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-brand-text">قائمة الأطباء</h2>
            <p className="mt-1 text-sm text-brand-muted">
              {specialtiesLoading ? 'جاري تحميل التخصصات...' : countLabel}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-[26px] border border-brand-border bg-white shadow-soft"
              />
            ))}
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-brand-border bg-white p-10 text-center shadow-soft">
            <p className="font-bold text-brand-text">لا توجد نتائج مطابقة</p>
            <p className="mt-2 text-sm text-brand-muted">جرّب البحث باسم آخر أو تخصص مختلف.</p>
          </div>
        )}
      </section>
    </div>
  );
}
