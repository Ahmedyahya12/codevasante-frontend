import { BadgeCheck, Clock, Star, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Doctor } from '@/services/doctorService';

type Props = {
  doctor: Doctor;
};

const getImageUrl = (image?: string | null) => {
  if (!image) return null;

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

  return `${apiBaseUrl}${image}`;
};

export default function DoctorCard({ doctor }: Props) {
  const imageUrl = getImageUrl(doctor.image);
  const firstLetter = doctor.full_name?.trim()?.charAt(0) || 'ط';

  return (
    <article className="group overflow-hidden rounded-[26px] border border-brand-border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-brand-primary/10 via-white to-brand-light">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={doctor.full_name || 'طبيب'}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-primary text-4xl font-extrabold text-white shadow-lg">
              {firstLetter}
            </div>
          </div>
        )}

        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-brand-primary shadow-sm">
          {doctor.available ? 'متاح الآن' : 'غير متاح'}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold text-brand-text">{doctor.full_name || 'طبيب'}</h3>

            <p className="mt-1 text-sm font-bold text-brand-primary">
              {doctor.specialty || 'تخصص غير محدد'}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-bold text-yellow-600">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            4.9
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-7 text-brand-muted">
          {doctor.bio || 'لا توجد نبذة متاحة عن الطبيب حالياً.'}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-brand-light p-3">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-muted">
              <Clock size={15} />
              الخبرة
            </div>
            <p className="mt-1 text-sm font-extrabold text-brand-text">
              {doctor.years_of_experience || 0} سنوات
            </p>
          </div>

          <div className="rounded-2xl bg-brand-light p-3">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-muted">
              <UserRound size={15} />
              لكل موعد
            </div>
            <p className="mt-1 text-sm font-extrabold text-brand-text">
              {doctor.max_patients_per_slot || 1} مريض
            </p>
          </div>
        </div>

        <Link
          to={`/doctors-list/${doctor.id}`}
          className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-brand-primary bg-white px-4 py-3 text-sm font-extrabold text-brand-primary transition hover:bg-brand-primary hover:text-white"
        >
          <BadgeCheck size={17} />
          عرض التفاصيل
        </Link>
      </div>
    </article>
  );
}
