import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  Mail,
  Phone,
  Stethoscope,
  User,
  Wallet,
} from 'lucide-react';

import axiosInstance from '@/services/axiosInstance';
import { Doctor, doctorService } from '@/services/doctorService';
import { useAppSelector } from '@/store/hooks';

type LocationState = {
  selectedDoctor?: Doctor;
};

export default function PatientBookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const doctorIdFromQuery = searchParams.get('doctor');
  const doctorFromState = (location.state as LocationState | null)?.selectedDoctor;

  const [specialties, setSpecialties] = useState<string[]>([]);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);

  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | ''>(
    doctorFromState?.id || (doctorIdFromQuery ? Number(doctorIdFromQuery) : '')
  );

  const [date, setDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [timeMessage, setTimeMessage] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const { user } = useAppSelector((state) => state.auth);

const patientName =
  user?.full_name ||
  `${user?.first_name || ''} ${user?.last_name || ''}`.trim() ||
  'المريض';

const patientPhone = user?.phone || 'غير متوفر';
const patientEmail = user?.email || 'غير متوفر';

  const selectedDoctor = useMemo(() => {
    if (!selectedDoctorId) return null;
    return allDoctors.find((doctor) => doctor.id === selectedDoctorId) || null;
  }, [allDoctors, selectedDoctorId]);

  const doctorsBySpecialty = useMemo(() => {
    if (!selectedSpecialty) return [];
    return allDoctors.filter((doctor) => doctor.specialty === selectedSpecialty);
  }, [allDoctors, selectedSpecialty]);

  const getBackendErrorMessage = (err: any) => {
    const data = err?.response?.data;

    console.log('appointment backend error:', data);

    if (!data) return 'تعذر إنشاء الحجز. تأكد من الاتصال بالخادم وحاول مرة أخرى.';
    if (typeof data === 'string') return data;
    if (data.detail) return data.detail;
    if (data.error) return data.error;
    if (data.message) return data.message;

    const firstKey = Object.keys(data)[0];
    if (firstKey && Array.isArray(data[firstKey])) {
      return `${firstKey}: ${data[firstKey][0]}`;
    }

    return JSON.stringify(data);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setError(null);
        setLoadingSpecialties(true);
        setLoadingDoctors(true);

        const [specialtiesData, doctorsData] = await Promise.all([
          doctorService.getSpecialties(),
          doctorService.getDoctors(),
        ]);

        let finalDoctors = doctorsData;

        if (doctorFromState) {
          const exists = finalDoctors.some((d) => d.id === doctorFromState.id);
          finalDoctors = exists ? finalDoctors : [doctorFromState, ...finalDoctors];
        }

        if (doctorIdFromQuery && !finalDoctors.some((d) => d.id === Number(doctorIdFromQuery))) {
          const detailDoctor = await doctorService.getDoctorById(Number(doctorIdFromQuery));
          finalDoctors = [detailDoctor, ...finalDoctors];
        }

        setSpecialties(specialtiesData);
        setAllDoctors(finalDoctors);

        const preselectedId =
          doctorFromState?.id || (doctorIdFromQuery ? Number(doctorIdFromQuery) : null);

        if (preselectedId) {
          const preselectedDoctor = finalDoctors.find((d) => d.id === preselectedId);

          if (preselectedDoctor) {
            setSelectedSpecialty(preselectedDoctor.specialty || '');
            setSelectedDoctorId(preselectedDoctor.id);
          }
        }
      } catch {
        setError('تعذر تحميل بيانات الحجز.');
      } finally {
        setLoadingSpecialties(false);
        setLoadingDoctors(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (!selectedDoctorId || !date) {
      setAvailableTimes([]);
      setTime('');
      setTimeMessage(null);
      return;
    }

    const loadAvailability = async () => {
      try {
        setLoadingTimes(true);
        setError(null);
        setTime('');
        setTimeMessage(null);

        const data = await doctorService.getDoctorAvailability(Number(selectedDoctorId), date);

        setAvailableTimes(data.available_times || []);

        if (!data.available_times?.length) {
          setTimeMessage(data.message || 'لا توجد أوقات متاحة في هذا التاريخ.');
        }
      } catch {
        setAvailableTimes([]);
        setTimeMessage('تعذر تحميل الأوقات المتاحة لهذا الطبيب.');
      } finally {
        setLoadingTimes(false);
      }
    };

    loadAvailability();
  }, [selectedDoctorId, date]);

  const handleSpecialtyChange = async (value: string) => {
    setSelectedSpecialty(value);
    setSelectedDoctorId('');
    setDate('');
    setTime('');
    setAvailableTimes([]);
    setTimeMessage(null);

    if (!value) return;

    try {
      setLoadingDoctors(true);
      const doctorsData = await doctorService.getDoctors({ specialty: value });

      setAllDoctors((prev) => {
        const merged = [...prev];

        doctorsData.forEach((doctor) => {
          const exists = merged.some((item) => item.id === doctor.id);
          if (!exists) merged.push(doctor);
        });

        return merged;
      });
    } catch {
      setError('تعذر تحميل أطباء هذا التخصص.');
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleDoctorChange = (value: string) => {
    setSelectedDoctorId(value ? Number(value) : '');
    setDate('');
    setTime('');
    setAvailableTimes([]);
    setTimeMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSpecialty) return setError('يرجى اختيار التخصص.');
    if (!selectedDoctorId) return setError('يرجى اختيار الطبيب.');
    if (!date) return setError('يرجى اختيار تاريخ الموعد.');
    if (!time) return setError('يرجى اختيار الوقت المتاح.');

    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        doctor: Number(selectedDoctorId),
        appointment_date: date,
        appointment_time: time,
        reason: reason.trim() || 'استشارة طبية',
      };

      console.log('appointment payload:', payload);

      const { data } = await axiosInstance.post('/appointments/create/', payload);

      const appointment = data?.data || data;

      navigate('/booking/confirmation', {
        replace: true,
        state: {
          appointment,
          doctor: selectedDoctor,
          date,
          time,
          reason: payload.reason,
        },
      });
    } catch (err: any) {
      setError(getBackendErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <section className="bg-gradient-to-b from-white to-brand-light px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-brand-primary md:text-5xl">حجز موعد</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-brand-muted md:text-base">
          اختر التخصص والطبيب والتاريخ المناسب، ثم اختر أحد الأوقات المتاحة.
        </p>
      </section>

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[1fr_520px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[24px] border border-brand-border bg-white p-7 shadow-soft"
          >
            <h2 className="mb-7 text-2xl font-extrabold text-brand-text">معلومات الحجز</h2>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600">
                {error}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <Field icon={User}>
                <input
                  value={patientName}
                  readOnly
                  className="w-full cursor-not-allowed bg-transparent text-sm font-bold text-brand-muted outline-none"
                />
              </Field>

              <Field icon={Phone}>
                <input
                  value={patientPhone}
                  readOnly
                  className="w-full cursor-not-allowed bg-transparent text-sm font-bold text-brand-muted outline-none"
                />
              </Field>

              <Field icon={Mail} className="md:col-span-2">
                <input
                  value={patientEmail}
                  readOnly
                  className="w-full cursor-not-allowed bg-transparent text-sm font-bold text-brand-muted outline-none"
                />
              </Field>

              <Field icon={User}>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  disabled={loadingDoctors || !selectedSpecialty}
                  className="w-full bg-transparent text-sm font-bold text-brand-text outline-none"
                >
                  <option value="">
                    {loadingDoctors ? 'جاري تحميل الأطباء...' : 'اختر الطبيب'}
                  </option>

                  {doctorsBySpecialty.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.full_name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field icon={CalendarDays}>
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setTime('');
                  }}
                  disabled={!selectedDoctorId}
                  className="w-full bg-transparent text-sm font-bold text-brand-text outline-none"
                />
              </Field>

              <Field icon={Clock}>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={!selectedDoctorId || !date || loadingTimes}
                  className="w-full bg-transparent text-sm font-bold text-brand-text outline-none"
                >
                  <option value="">
                    {loadingTimes ? 'جاري تحميل الأوقات...' : 'اختر الوقت المتاح'}
                  </option>

                  {availableTimes.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {timeMessage && (
              <p className="mt-4 rounded-2xl bg-yellow-50 p-4 text-sm font-bold text-yellow-700">
                {timeMessage}
              </p>
            )}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-extrabold text-brand-text">
                سبب الزيارة
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder="اكتب سبب الزيارة أو الأعراض باختصار..."
                className="w-full resize-none rounded-2xl border border-brand-border bg-brand-light px-4 py-3 text-sm font-bold text-brand-text outline-none focus:border-brand-primary"
              />
            </div>

            <div className="mt-7">
              <h3 className="mb-3 text-sm font-extrabold text-brand-text">طريقة الدفع</h3>

              <div className="grid gap-3 md:grid-cols-3">
                <PaymentOption
                  active
                  icon={Wallet}
                  title="الدفع نقداً"
                  desc="متاح حالياً داخل العيادة"
                />
                <PaymentOption icon={CreditCard} title="Bankili" desc="قريباً" />
                <PaymentOption icon={CreditCard} title="Masrivi / Sedad" desc="قريباً" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary px-5 py-4 text-sm font-extrabold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  جاري تأكيد الحجز...
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  تأكيد الحجز
                </>
              )}
            </button>
          </form>

          <aside className="space-y-6">
            <InfoCard title="ساعات العمل">
              <p>السبت - الخميس: 08:00 - 22:00</p>
              <p>الجمعة: 14:00 - 22:00</p>
              <p>الطوارئ: 24/7</p>
            </InfoCard>

            <InfoCard title="معلومات التواصل">
              <p dir="ltr">+222 44 00 00 00</p>
              <p>info@codevaclinic.com</p>
              <p>نواكشوط - موريتانيا</p>
            </InfoCard>

            <div className="rounded-[22px] bg-errorCustom-900 p-6 text-white shadow-soft">
              <h3 className="text-xl font-extrabold">حالة طارئة؟</h3>
              <p className="mt-2 text-sm text-white/80">اتصل مباشرة برقم الطوارئ.</p>
              <a
                href="tel:997"
                className="mt-5 inline-flex rounded-xl bg-white px-6 py-3 font-extrabold text-errorCustom-900"
              >
                اتصل على 997
              </a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Field({
  icon: Icon,
  children,
  className = '',
}: {
  icon: any;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl bg-[#F4F6F8] px-4 py-4 ${className}`}>
      <Icon size={20} className="text-brand-muted" />
      {children}
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-brand-border bg-white p-7 text-right shadow-soft">
      <h3 className="mb-5 text-2xl font-extrabold text-brand-text">{title}</h3>
      <div className="space-y-3 text-sm font-medium text-brand-muted">{children}</div>
    </div>
  );
}

function PaymentOption({
  active,
  icon: Icon,
  title,
  desc,
}: {
  active?: boolean;
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 text-center ${
        active
          ? 'border-brand-primary bg-white text-brand-primary'
          : 'border-transparent bg-[#F4F6F8] text-brand-muted opacity-70'
      }`}
    >
      <div className="mb-2 flex items-center justify-center gap-2 font-extrabold">
        <Icon size={17} />
        {title}
      </div>
      <p className="text-xs font-bold">{desc}</p>
    </div>
  );
}
