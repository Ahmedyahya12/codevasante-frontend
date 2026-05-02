import { Mail, MapPin, Phone, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const socialLinks = [
  { label: 'f', name: 'Facebook' },
  { label: '𝕏', name: 'Twitter' },
  { label: '◎', name: 'Instagram' },
  { label: 'in', name: 'LinkedIn' },
];

export default function PatientFooter() {
  return (
    <footer className="border-t border-brand-border bg-brand-light">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />

          <p className="mt-4 max-w-sm text-sm leading-7 text-brand-muted">
            CodevaClinic منصة طبية ذكية تساعد المرضى على حجز المواعيد ومتابعة الخدمات الطبية بسهولة.
          </p>

          <div className="mt-5 flex gap-2">
            {socialLinks.map((item) => (
              <span
                key={item.name}
                title={item.name}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-extrabold text-brand-primary shadow-sm transition hover:bg-brand-primary hover:text-white"
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-extrabold text-brand-text">روابط مهمة</h3>

          <div className="grid gap-3 text-sm text-brand-muted">
            <Link to="/" className="hover:text-brand-primary">
              الرئيسية
            </Link>
            <Link to="/services" className="hover:text-brand-primary">
              الخدمات الطبية
            </Link>
            <Link to="/doctors-list" className="hover:text-brand-primary">
              الأطباء
            </Link>
            <Link to="/booking" className="hover:text-brand-primary">
              حجز موعد
            </Link>
            <Link to="/about" className="hover:text-brand-primary">
              من نحن
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-extrabold text-brand-text">خدماتنا</h3>

          <div className="grid gap-3 text-sm text-brand-muted">
            <span>طب القلب</span>
            <span>الأعصاب</span>
            <span>طب الأطفال</span>
            <span>النساء والولادة</span>
            <span>التحاليل الطبية</span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-extrabold text-brand-text">تواصل معنا</h3>

          <div className="grid gap-4 text-sm text-brand-muted">
            <div className="flex gap-3">
              <MapPin size={18} className="text-brand-primary" />
              <span>نواكشوط، موريتانيا</span>
            </div>

            <div className="flex gap-3">
              <Phone size={18} className="text-brand-primary" />
              <span>+222 44 00 00 00</span>
            </div>

            <div className="flex gap-3">
              <Mail size={18} className="text-brand-primary" />
              <span>info@codevaclinic.com</span>
            </div>

            <div className="flex gap-3">
              <Stethoscope size={18} className="text-brand-primary" />
              <span>خدمة طبية على مدار الأسبوع</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border py-5 text-center text-sm text-brand-muted">
        © 2026 CodevaClinic. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
