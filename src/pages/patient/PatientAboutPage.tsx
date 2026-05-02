import { CheckCircle2, HeartPulse, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  { title: 'الرعاية المتميزة', desc: 'نضع راحة المريض في المقدمة.', icon: HeartPulse },
  { title: 'الثقة والأمان', desc: 'نحافظ على خصوصية بيانات المرضى.', icon: ShieldCheck },
  { title: 'فريق متخصص', desc: 'أطباء وإداريون لخدمة المرضى.', icon: Users },
];

export default function PatientAboutPage() {
  return (
    <div className="bg-white">
      <section className="bg-brand-primary px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold">من نحن</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          CodevaClinic منصة طبية ذكية لتسهيل حجز المواعيد ومتابعة الخدمات الطبية.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
          alt="مركز طبي"
          className="h-[380px] w-full rounded-[28px] object-cover shadow-soft"
        />

        <div>
          <h2 className="text-3xl font-extrabold text-brand-text">رؤيتنا</h2>
          <p className="mt-4 leading-8 text-brand-muted">
            نهدف إلى تقديم تجربة طبية سهلة ومنظمة تساعد المرضى على الوصول إلى الطبيب المناسب وحجز
            المواعيد بدون تعقيد.
          </p>

          <div className="mt-6 grid gap-3">
            {[
              'حجز مواعيد سريع',
              'إدارة بيانات المرضى',
              'متابعة المواعيد',
              'تجربة استخدام بسيطة',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-brand-muted">
                <CheckCircle2 size={18} className="text-brand-secondary" />
                {item}
              </div>
            ))}
          </div>

          <Link
            to="/booking"
            className="mt-8 inline-flex rounded-xl bg-brand-primary px-6 py-3 font-extrabold text-white"
          >
            احجز موعدك الآن
          </Link>
        </div>
      </section>

      <section className="bg-brand-light py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div key={value.title} className="card p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigoCustom-100 text-brand-primary">
                  <Icon size={26} />
                </div>
                <h3 className="text-xl font-extrabold text-brand-text">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-brand-muted">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
