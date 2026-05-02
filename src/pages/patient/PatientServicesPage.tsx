import {
  Activity,
  Baby,
  Bone,
  Check,
  FlaskConical,
  HeartPulse,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'أمراض القلب',
    desc: 'تشخيص ومتابعة أمراض القلب والشرايين باستخدام وسائل حديثة.',
    icon: HeartPulse,
    color: 'bg-brand-primary',
    items: ['تخطيط القلب', 'متابعة ضغط الدم', 'استشارة قلبية'],
  },
  {
    title: 'الأمراض العصبية',
    desc: 'متابعة الحالات العصبية وتقديم الاستشارات المتخصصة.',
    icon: Activity,
    color: 'bg-brand-secondary',
    items: ['تشخيص أولي', 'متابعة علاجية', 'إرشادات طبية'],
  },
  {
    title: 'جراحة العظام',
    desc: 'فحص وعلاج مشاكل العظام والمفاصل والإصابات الرياضية.',
    icon: Bone,
    color: 'bg-successCustom-900',
    items: ['آلام المفاصل', 'إصابات رياضية', 'متابعة بعد العلاج'],
  },
  {
    title: 'طب الأطفال',
    desc: 'رعاية صحية شاملة للأطفال ومتابعة النمو.',
    icon: Baby,
    color: 'bg-pink-500',
    items: ['فحص عام', 'متابعة النمو', 'استشارات للأطفال'],
  },
  {
    title: 'المختبرات الطبية',
    desc: 'تحاليل وفحوصات طبية لمساعدة الطبيب في التشخيص.',
    icon: FlaskConical,
    color: 'bg-infoCustom',
    items: ['تحاليل الدم', 'تحاليل هرمونية', 'فحوصات عامة'],
  },
  {
    title: 'الأشعة التشخيصية',
    desc: 'خدمات تصوير طبي لدعم التشخيص والمتابعة.',
    icon: ShieldCheck,
    color: 'bg-orangeCustom',
    items: ['أشعة رقمية', 'سونار', 'تقارير طبية'],
  },
];

export default function PatientServicesPage() {
  return (
    <div className="bg-white" dir="rtl">
      <section className="bg-gradient-to-b from-white to-cyan-100/40 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-brand-primary">الخدمات الطبية</h1>

        <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
          تعرف على أهم الخدمات الطبية المتوفرة، ثم انتقل إلى قائمة الأطباء لاختيار الطبيب المناسب
          وحجز الموعد.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pt-14 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-white ${service.color}`}
              >
                <Icon size={22} />
              </div>

              <h3 className="text-xl font-extrabold text-brand-primary">{service.title}</h3>

              <p className="mt-3 text-sm leading-7 text-brand-muted">{service.desc}</p>

              <div className="mt-5 grid gap-2">
                {service.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-brand-muted">
                    <Check size={16} className="text-brand-secondary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-l from-brand-primary to-brand-secondary p-8 text-white shadow-xl">
          <h2 className="text-2xl font-extrabold">هل تريد حجز موعد طبي؟</h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/85">
            بعد الاطلاع على الخدمات، يمكنك الانتقال إلى قائمة الأطباء واختيار الطبيب المناسب حسب
            التخصص والمواعيد المتاحة.
          </p>

          <Link
            to="/booking"
            className="mt-6 inline-flex animate-bounce items-center gap-2 rounded-2xl bg-white px-7 py-3 text-sm font-extrabold text-brand-primary shadow-lg transition hover:scale-105 hover:bg-cyan-50"
          >
            احجز موعد
            <ArrowLeft size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
