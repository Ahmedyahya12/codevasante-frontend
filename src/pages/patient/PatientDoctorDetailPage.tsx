import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Clock,
  Mail,
  Phone,
  Stethoscope,
  UserRound,
} from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDoctorDetailThunk } from '@/store/doctors/doctorThunks';
import { clearDoctorDetail } from '@/store/doctors/doctorSlice';

export default function PatientDoctorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [imageError, setImageError] = useState(false);

  const { doctorDetail, detailLoading, detailError } = useAppSelector((state) => state.doctors);

  useEffect(() => {
    if (id) dispatch(fetchDoctorDetailThunk(Number(id)));

    return () => {
      dispatch(clearDoctorDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    setImageError(false);
  }, [doctorDetail?.image]);

  const handleBooking = () => {
    if (!doctorDetail) return;

    navigate(`/booking?doctor=${doctorDetail.id}`, {
      state: {
        selectedDoctor: doctorDetail,
      },
    });
  };

  if (detailLoading) {
    return (
      <div className="min-h-screen bg-brand-light px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[380px_1fr]">
          <div className="h-[620px] animate-pulse rounded-[32px] bg-white shadow-soft" />
          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-[32px] bg-white shadow-soft" />
            <div className="h-72 animate-pulse rounded-[32px] bg-white shadow-soft" />
          </div>
        </div>
      </div>
    );
  }

  if (detailError || !doctorDetail) {
    return (
      <div className="min-h-screen bg-brand-light px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-red-100 bg-white p-8 text-center shadow-soft">
          <p className="text-lg font-extrabold text-red-600">
            {detailError || 'لم يتم العثور على الطبيب'}
          </p>

          <Link
            to="/doctors-list"
            className="mt-5 inline-flex rounded-2xl bg-brand-primary px-5 py-3 text-sm font-extrabold text-white"
          >
            الرجوع إلى الأطباء
          </Link>
        </div>
      </div>
    );
  }

  const showImage = Boolean(doctorDetail.image && !imageError);
  const firstLetter = doctorDetail.full_name?.trim()?.charAt(0) || 'ط';

  return (
    <div className="min-h-screen bg-brand-light">
      <section className="bg-gradient-to-l from-[#1E2A78] via-[#2E37A4] to-[#0F766E] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/doctors-list"
            className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/25"
          >
            <ArrowRight size={17} />
            الرجوع إلى الأطباء
          </Link>
        </div>
      </section>

      <main className="mx-auto -mt-10 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <aside className="overflow-hidden rounded-[32px] border border-brand-border bg-white shadow-soft">
            <div className="relative h-80 overflow-hidden bg-gradient-to-br from-brand-primary/10 via-white to-brand-light">
              {showImage ? (
                <img
                  src={doctorDetail.image || ''}
                  alt={doctorDetail.full_name || 'طبيب'}
                  loading="lazy"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-brand-primary text-5xl font-extrabold text-white shadow-lg">
                    {firstLetter}
                  </div>
                </div>
              )}

              <div className="absolute right-5 top-5 rounded-full bg-white/95 px-4 py-1.5 text-xs font-extrabold text-brand-primary shadow-sm">
                {doctorDetail.available ? 'متاح للحجز' : 'غير متاح حالياً'}
              </div>
            </div>

            <div className="p-6 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-extrabold text-green-700">
                <BadgeCheck size={15} />
                {doctorDetail.available ? 'متاح للحجز' : 'غير متاح حالياً'}
              </div>

              <h1 className="text-2xl font-extrabold text-brand-text">
                {doctorDetail.full_name || 'طبيب'}
              </h1>

              <p className="mt-2 text-sm font-extrabold text-brand-primary">
                {doctorDetail.specialty || 'تخصص غير محدد'}
              </p>

              <div className="mt-6 space-y-3 text-right">
                <InfoRow
                  icon={Clock}
                  label="سنوات الخبرة"
                  value={`${doctorDetail.years_of_experience || 0} سنوات`}
                />
                <InfoRow
                  icon={UserRound}
                  label="عدد المرضى لكل موعد"
                  value={`${doctorDetail.max_patients_per_slot || 1} مريض`}
                />
                <InfoRow icon={Phone} label="الهاتف" value={doctorDetail.phone} />
                <InfoRow icon={Mail} label="البريد الإلكتروني" value={doctorDetail.email} />
              </div>

              <button
                type="button"
                onClick={handleBooking}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary px-5 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:opacity-95"
              >
                <CalendarDays size={18} />
                احجز موعد مع الطبيب
              </button>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[32px] border border-brand-border bg-white p-7 shadow-soft">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand-primary">
                  <Stethoscope size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-brand-text">نبذة عن الطبيب</h2>
                  <p className="text-sm text-brand-muted">معلومات عامة وخبرة الطبيب</p>
                </div>
              </div>

              <p className="text-sm leading-8 text-brand-muted">
                {doctorDetail.bio || 'لا توجد نبذة متاحة عن الطبيب حالياً.'}
              </p>
            </div>

            <div className="rounded-[32px] border border-brand-border bg-white p-7 shadow-soft">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-brand-text">أوقات الطبيب</h2>
                  <p className="mt-1 text-sm text-brand-muted">
                    يتم عرض الأوقات المتاحة داخل صفحة الحجز حسب التاريخ المختار.
                  </p>
                </div>

                <CalendarDays className="text-brand-primary" size={28} />
              </div>

              <div className="rounded-3xl border border-brand-border bg-brand-light p-6">
                <p className="text-sm leading-8 text-brand-muted">
                  يمكنك حجز موعد بسهولة مع هذا الطبيب. بعد الضغط على زر{' '}
                  <span className="font-extrabold text-brand-primary">"احجز موعد"</span>، اختر
                  التاريخ المناسب، وسيتم عرض الأوقات المتاحة بشكل مباشر حسب جدول الطبيب.
                </p>

                <p className="mt-3 text-xs font-bold text-brand-muted">
                  يتم تحديث المواعيد تلقائياً حسب توفر الطبيب.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-brand-light p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-primary">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-xs font-bold text-brand-muted">{label}</p>
        <p className="text-sm font-extrabold text-brand-text">{value || 'غير محدد'}</p>
      </div>
    </div>
  );
}
