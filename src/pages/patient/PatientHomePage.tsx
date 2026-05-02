import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Baby,
  Bone,
  CalendarDays,
  Check,
  ClipboardList,
  HeartPulse,
  Info,
  PhoneCall,
  Search,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DoctorCard from '@/components/doctors/DoctorCard';
import { Doctor, doctorService } from '@/services/doctorService';

const services = [
  {
    title: 'أمراض القلب',
    desc: 'تشخيص ومتابعة أمراض القلب والشرايين.',
    icon: HeartPulse,
    color: 'bg-brand-primary',
  },
  {
    title: 'طب الأطفال',
    desc: 'رعاية طبية شاملة للأطفال ومتابعة النمو.',
    icon: Baby,
    color: 'bg-pink-500',
  },
  {
    title: 'جراحة العظام',
    desc: 'علاج مشاكل العظام والمفاصل والإصابات.',
    icon: Bone,
    color: 'bg-successCustom-900',
  },
];

const doctors = [
  {
    name: 'د. أحمد محمد علي',
    specialty: 'استشاري أمراض القلب',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'د. فاطمة أحمد سالم',
    specialty: 'استشارية النساء والولادة',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'د. محمد حسن إبراهيم',
    specialty: 'استشاري طب الأطفال',
    img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=900&auto=format&fit=crop',
  },
];

export default function PatientHomePage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorsLoading, setDoctorsLoading] = useState(false);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setDoctorsLoading(true);
        const data = await doctorService.getDoctors();
        setDoctors(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to load doctors', error);
      } finally {
        setDoctorsLoading(false);
      }
    };

    loadDoctors();
  }, []);
  return (
    <div className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-b from-white to-cyan-100/40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex rounded-full bg-indigoCustom-100 px-4 py-2 text-sm font-extrabold text-brand-primary">
              منصة CodevaClinic الطبية
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.25] text-brand-text sm:text-5xl">
              احجز موعدك الطبي <br />
              <span className="text-brand-primary">بسهولة وسرعة</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-brand-muted">
              اختر الطبيب المناسب، احجز الموعد، وتابع خدماتك الطبية من مكان واحد.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/booking" className="btn-primary flex items-center gap-2 px-6 py-3">
                <CalendarDays size={18} />
                احجز موعدك الآن
              </Link>

              <a
                href="tel:997"
                className="rounded-xl bg-errorCustom-900 px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-red-700"
              >
                طوارئ 997
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <HeroStat value="+1500" label="مريض" />
              <HeroStat value="+45" label="طبيب" />
              <HeroStat value="24/7" label="متابعة" />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[32px] bg-white p-4 shadow-soft">
              <img
                src="https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?semt=ais_hybrid&w=740&q=80"
                alt="استشارة طبية"
                className="h-[420px] w-full rounded-[24px] object-cover"
              />
            </div>

            <div className="absolute -bottom-5 right-6 rounded-2xl bg-white px-5 py-4 shadow-soft">
              <p className="text-xs font-bold text-brand-muted">نسبة رضا المرضى</p>
              <p className="text-2xl font-extrabold text-brand-secondary">98%</p>
            </div>

            <div className="absolute -top-5 left-6 rounded-2xl bg-white px-5 py-4 shadow-soft">
              <p className="text-xs font-bold text-brand-muted">موعد سريع</p>
              <p className="text-xl font-extrabold text-brand-primary">اليوم</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="-mt-8 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 rounded-[28px] border border-brand-border bg-white p-4 shadow-soft md:grid-cols-3">
          <QuickAction
            icon={<Search size={22} />}
            title="ابحث عن طبيب"
            desc="اختر الطبيب حسب التخصص"
            to="/doctors-list"
          />
          <QuickAction
            icon={<CalendarDays size={22} />}
            title="احجز موعد"
            desc="حدد التاريخ والوقت"
            to="/booking"
          />
          <QuickAction
            icon={<HeartPulse size={22} />}
            title="الخدمات الطبية"
            desc="شاهد الخدمات المتاحة"
            to="/services"
          />
        </div>
      </section>

      {/* SERVICES RESUME */}
      <section className="py-16">
        <SectionHeader
          badge="الخدمات"
          title="خدمات طبية أساسية"
          subtitle="ملخص سريع لأهم الخدمات. للمزيد انتقل إلى صفحة الخدمات."
          link="/services"
          linkLabel="عرض جميع الخدمات"
        />

        <div className="mx-auto mt-10 grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="card p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-white ${service.color}`}
                >
                  <Icon size={22} />
                </div>

                <h3 className="text-xl font-extrabold text-brand-primary">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* EMERGENCY STRIP 1 */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[26px] border border-errorCustom-100 bg-errorCustom-100 p-6">
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-right">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-errorCustom-900 text-white">
                <AlertTriangle size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-errorCustom-900">خدمات الطوارئ</h3>
                <p className="text-sm text-errorCustom-900/80">
                  للحالات الطبية العاجلة، اتصل مباشرة بفريق الطوارئ.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-errorCustom-900">
                إسعاف سريع
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-errorCustom-900">
                عناية عاجلة
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-errorCustom-900">
                24/7
              </span>
            </div>

            <a
              href="tel:997"
              className="rounded-2xl bg-errorCustom-900 px-8 py-3 font-extrabold text-white shadow-lg hover:bg-red-700"
            >
              اتصل على 997
            </a>
          </div>
        </div>
      </section>

      {/* DOCTORS RESUME */}
      {/* DOCTORS RESUME */}
      <section className="bg-brand-light py-16">
        <SectionHeader
          badge="الأطباء"
          title="أطباء متاحون للحجز"
          subtitle="اختر الطبيب المناسب واحجز الموعد حسب التخصص."
          link="/doctors-list"
          linkLabel="عرض جميع الأطباء"
        />

        <div className="mx-auto mt-10 grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {doctorsLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[420px] animate-pulse rounded-[26px] border border-brand-border bg-white shadow-soft"
              />
            ))
          ) : doctors.length > 0 ? (
            doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
          ) : (
            <div className="col-span-full rounded-[28px] border border-brand-border bg-white p-10 text-center shadow-soft">
              <p className="font-bold text-brand-text">لا يوجد أطباء متاحون حالياً</p>
              <p className="mt-2 text-sm text-brand-muted">
                يرجى المحاولة لاحقاً أو التواصل مع العيادة.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="py-16">
        <SectionHeader
          badge="طريقة الاستخدام"
          title="احجز موعدك في 3 خطوات"
          subtitle="تجربة بسيطة وواضحة للمريض من البداية حتى تأكيد الحجز."
        />

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <StepCard
            number="1"
            icon={<Search size={22} />}
            title="اختر الطبيب"
            desc="ابحث حسب الاسم أو التخصص."
          />
          <StepCard
            number="2"
            icon={<CalendarDays size={22} />}
            title="حدد الموعد"
            desc="اختر التاريخ والوقت المناسب."
          />
          <StepCard
            number="3"
            icon={<ClipboardList size={22} />}
            title="تابع حجزك"
            desc="راجع مواعيدك من حسابك."
          />
        </div>
      </section>

      {/* ABOUT RESUME */}
      <section className="bg-brand-light py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="card p-8">
            <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-extrabold text-brand-secondary">
              من نحن
            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-brand-text">
              منصة طبية لتسهيل تجربة المريض
            </h2>

            <p className="mt-4 leading-8 text-brand-muted">
              CodevaClinic تساعد المرضى على الوصول للطبيب المناسب وحجز المواعيد بطريقة سهلة ومنظمة.
            </p>

            <div className="mt-6 grid gap-3">
              {['أطباء متخصصون', 'حجز مواعيد سريع', 'متابعة بسيطة', 'تجربة استخدام واضحة'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2 text-brand-muted">
                    <Check size={18} className="text-brand-secondary" />
                    {item}
                  </div>
                )
              )}
            </div>

            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-extrabold text-white"
            >
              معرفة المزيد
              <ArrowLeft size={17} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <MiniFeature icon={<ShieldCheck />} title="حماية البيانات" />
            <MiniFeature icon={<Users />} title="فريق متخصص" />
            <MiniFeature icon={<Activity />} title="متابعة مستمرة" />
            <MiniFeature icon={<Info />} title="واجهة سهلة" />
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="bg-brand-primary py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-right">
          <div>
            <h2 className="text-3xl font-extrabold">هل تحتاج لاستشارة طبية؟</h2>
            <p className="mt-2 text-white/80">احجز موعدك الآن مع أفضل الأطباء المتخصصين.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/booking"
              className="rounded-xl bg-white px-6 py-3 font-extrabold text-brand-primary"
            >
              احجز الآن
            </Link>

            <a
              href="tel:+22244000000"
              className="rounded-xl bg-brand-secondary px-6 py-3 font-extrabold text-white"
            >
              اتصل بنا
            </a>
          </div>
        </div>
      </section>

      {/* EMERGENCY BLOCK 2 */}
      <section className="bg-gradient-to-b from-white to-cyan-100/50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] bg-errorCustom-900 p-8 text-center text-white shadow-soft">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <PhoneCall size={28} />
          </div>

          <h2 className="text-3xl font-extrabold">حالة طارئة؟</h2>
          <p className="mt-3 text-white/85">
            في الحالات الطبية العاجلة، لا تنتظر الحجز العادي. اتصل مباشرة.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="tel:997"
              className="rounded-2xl bg-white px-8 py-3 text-lg font-extrabold text-errorCustom-900"
            >
              اتصل على 997
            </a>

            <a
              href="tel:+22244000000"
              className="rounded-2xl bg-white/15 px-8 py-3 text-lg font-extrabold text-white"
            >
              رقم العيادة
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  desc,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  to: string;
}) {
  return (
    <Link to={to} className="group rounded-2xl bg-brand-light p-5 transition hover:bg-indigoCustom-100">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-primary shadow-sm">
        {icon}
      </div>

      <h3 className="text-lg font-extrabold text-brand-text">{title}</h3>
      <p className="mt-1 text-sm text-brand-muted">{desc}</p>

      <div className="mt-4 flex items-center gap-2 text-sm font-extrabold text-brand-primary">
        التفاصيل
        <ArrowLeft size={16} className="transition group-hover:-translate-x-1" />
      </div>
    </Link>
  );
}

function SectionHeader({
  badge,
  title,
  subtitle,
  link,
  linkLabel,
}: {
  badge: string;
  title: string;
  subtitle: string;
  link?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-right">
      <div>
        <span className="inline-flex rounded-full bg-indigoCustom-100 px-4 py-2 text-sm font-extrabold text-brand-primary">
          {badge}
        </span>

        <h2 className="mt-4 text-3xl font-extrabold text-brand-text">{title}</h2>
        <p className="mt-2 max-w-xl text-brand-muted">{subtitle}</p>
      </div>

      {link && (
        <Link
          to={link}
          className="inline-flex items-center gap-2 rounded-xl border border-brand-border bg-white px-5 py-3 text-sm font-extrabold text-brand-primary shadow-sm hover:bg-brand-light"
        >
          {linkLabel}
          <ArrowLeft size={17} />
        </Link>
      )}
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-white p-4 text-center shadow-sm">
      <p className="text-2xl font-extrabold text-brand-primary">{value}</p>
      <p className="text-sm text-brand-muted">{label}</p>
    </div>
  );
}

function StepCard({
  number,
  icon,
  title,
  desc,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="card p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigoCustom-100 text-brand-primary">
        {icon}
      </div>

      <span className="mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-sm font-extrabold text-white">
        {number}
      </span>

      <h3 className="text-lg font-extrabold text-brand-text">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-brand-muted">{desc}</p>
    </div>
  );
}

function MiniFeature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="rounded-[22px] border border-brand-border bg-white p-6 text-center shadow-soft">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-brand-secondary">
        {icon}
      </div>

      <h3 className="font-extrabold text-brand-text">{title}</h3>
    </div>
  );
}
