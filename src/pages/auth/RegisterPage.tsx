import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  User,
  UserPlus,
} from 'lucide-react';

import Logo from '@/components/Logo';
import RegisterLogo from "@/assets/register_patient.png";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerPatientThunk } from '@/store/auth/authThunks';
import { MySwal } from '@/utils/swal';

const STORAGE_KEY = 'codevaclinic_patient_register_draft';

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
  date_of_birth: string;
  gender: '' | 'M' | 'F';
  address: string;
};

const initialFormData: FormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  password_confirm: '',
  date_of_birth: '',
  gender: '',
  address: '',
};

export default function RegisterPatientPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...initialFormData, ...JSON.parse(saved) } : initialFormData;
    } catch {
      return initialFormData;
    }
  });

  useEffect(() => {
    const safeData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      address: formData.address,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeData));
  }, [formData]);

  const progress = useMemo(() => (step / 3) * 100, [step]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showAlert = (
    title: string,
    text: string,
    icon: 'warning' | 'error'
  ) => {
    return MySwal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'حسناً',
      confirmButtonColor: '#2E37A4',
    });
  };

  const validateStep = async () => {
    if (step === 1) {
      if (
        !formData.first_name.trim() ||
        !formData.last_name.trim() ||
        !formData.email.trim()
      ) {
        await showAlert(
          'بيانات ناقصة',
          'يرجى إدخال الاسم والبريد الإلكتروني.',
          'warning'
        );
        return false;
      }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        await showAlert(
          'بريد غير صالح',
          'يرجى إدخال بريد إلكتروني صحيح.',
          'error'
        );
        return false;
      }
    }

    if (step === 2) {
      return true;
    }

    if (step === 3) {
      if (!formData.password || !formData.password_confirm) {
        await showAlert(
          'كلمة المرور مطلوبة',
          'يرجى إدخال كلمة المرور وتأكيدها.',
          'warning'
        );
        return false;
      }

      if (formData.password.length < 8) {
        await showAlert(
          'كلمة المرور ضعيفة',
          'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل.',
          'error'
        );
        return false;
      }

      if (formData.password !== formData.password_confirm) {
        await showAlert(
          'كلمتا المرور غير متطابقتين',
          'يرجى التأكد من تطابق كلمة المرور.',
          'error'
        );
        return false;
      }
    }

    return true;
  };

  const nextStep = async () => {
    const isValid = await validateStep();
    if (!isValid) return;

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step !== 3) {
      await nextStep();
      return;
    }

    const isValid = await validateStep();
    if (!isValid) return;

    const result = await dispatch(
      registerPatientThunk({
        ...formData,
        date_of_birth: formData.date_of_birth || null,
        gender: formData.gender,
      })
    );

    if (registerPatientThunk.fulfilled.match(result)) {
      localStorage.removeItem(STORAGE_KEY);

      await MySwal.fire({
        title: 'تم إنشاء الحساب بنجاح',
        text: 'يمكنك الآن تسجيل الدخول إلى حسابك.',
        icon: 'success',
        confirmButtonText: 'تسجيل الدخول',
        confirmButtonColor: '#2E37A4',
      });

      navigate('/login');
    } else {
      MySwal.fire({
        title: 'فشل إنشاء الحساب',
        text: (result.payload as string) || 'حدث خطأ أثناء إنشاء الحساب.',
        icon: 'error',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#2E37A4',
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-light p-4 md:p-8" dir="rtl">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-soft lg:grid-cols-2">
        <Link to="/" className="relative hidden bg-brand-primary p-8 text-white lg:block">
          <img src={RegisterLogo} alt="doctor" className="h-72 w-full rounded-3xl object-cover" />

          <div className="absolute inset-x-8 bottom-8 rounded-3xl bg-indigoCustom-900/80 p-7 backdrop-blur">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative h-9 w-9">
                <div className="absolute left-3 top-0 h-9 w-3 rounded-full bg-brand-primary" />
                <div className="absolute left-0 top-3 h-3 w-9 rounded-full bg-brand-primary" />
                <div className="absolute right-0 top-3 h-3 w-5 rounded-full bg-brand-secondary" />
                <div className="absolute left-3 top-3 h-3 w-3 rounded-sm bg-white" />
              </div>

              <div>
                <h1 className="text-lg font-extrabold leading-none text-brand-text">
                  Codeva<span className="text-brand-secondary">Clinic</span>
                </h1>
                <p className="text-[11px] font-semibold text-brand-white">نظام إدارة طبي</p>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight">إنشاء حساب مريض</h2>

            <p className="mt-3 text-sm leading-7 text-indigoCustom-100">
              أنشئ حسابك بخطوات بسيطة، واحجز موعدك الطبي بسهولة داخل CodevaClinic.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <StepCard active={step >= 1} label="المعلومات" />
              <StepCard active={step >= 2} label="الملف الطبي" />
              <StepCard active={step >= 3} label="الحماية" />
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <span className="inline-flex rounded-2xl bg-brand-primary/10 px-6 py-3 text-sm font-bold text-brand-primary">
                إنشاء حساب مريض
              </span>

              <h1 className="mt-4 text-3xl font-extrabold text-brand-text">مرحباً بك</h1>

              <p className="mt-3 text-sm text-brand-muted">أكمل الخطوات التالية لإنشاء حسابك.</p>
            </div>

            <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-brand-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      icon={<User size={18} />}
                      label="الاسم الأول"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />

                    <Input
                      icon={<User size={18} />}
                      label="اسم العائلة"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </div>

                  <Input
                    icon={<Mail size={18} />}
                    label="البريد الإلكتروني"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <Input
                    icon={<Phone size={18} />}
                    label="رقم الهاتف"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="تاريخ الميلاد"
                      name="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                    />

                    <div>
                      <label className="mb-2 block text-sm font-bold text-brand-text">الجنس</label>

                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-gray-200 bg-[#F4F7FF] px-4 py-3 text-sm outline-none ring-0 transition focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
                      >
                        <option value="">اختر الجنس</option>
                        <option value="M">ذكر</option>
                        <option value="F">أنثى</option>
                      </select>
                    </div>
                  </div>

                  <Input
                    label="العنوان"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />

                  <div className="rounded-2xl bg-[#F4F7FF] p-4 text-sm leading-7 text-brand-muted">
                    يمكنك ترك هذه المعلومات فارغة وتحديثها لاحقاً من الملف الشخصي.
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <PasswordInput
                    label="كلمة المرور"
                    name="password"
                    value={formData.password}
                    showPassword={showPassword}
                    onToggle={() => setShowPassword((prev) => !prev)}
                    onChange={handleChange}
                  />

                  <PasswordInput
                    label="تأكيد كلمة المرور"
                    name="password_confirm"
                    value={formData.password_confirm}
                    showPassword={showPassword}
                    onToggle={() => setShowPassword((prev) => !prev)}
                    onChange={handleChange}
                  />

                  <div className="rounded-2xl bg-[#F4F7FF] p-4 text-sm leading-7 text-brand-muted">
                    يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل. بعد الضغط على إنشاء الحساب سيتم
                    تحويلك إلى صفحة تسجيل الدخول.
                  </div>
                </>
              )}

              <div className="flex items-center gap-3 pt-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={loading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3.5 text-sm font-extrabold text-brand-text transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <ArrowRight size={18} />
                    رجوع
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={loading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-primary py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-indigoCustom-900 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    التالي
                    <ArrowLeft size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-primary py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:bg-indigoCustom-900 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <UserPlus size={18} />
                    )}
                    {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
                  </button>
                )}
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-brand-muted">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="font-extrabold text-brand-primary">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCard({ active, label }: { active: boolean; label: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3 text-center">
      <div
        className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full ${
          active ? 'bg-white text-brand-primary' : 'bg-white/10 text-white'
        }`}
      >
        <Check size={18} />
      </div>
      <p className="text-xs font-bold">{label}</p>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  icon,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-brand-text">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#F4F7FF] px-4 py-3 transition focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10">
        {icon && <span className="text-brand-muted">{icon}</span>}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none border-0 bg-transparent text-sm outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );
}

function PasswordInput({
  label,
  name,
  value,
  showPassword,
  onToggle,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  showPassword: boolean;
  onToggle: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-brand-text">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-[#F4F7FF] px-4 py-3 transition focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10">
        <Lock size={18} className="text-brand-muted" />

        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none border-0 bg-transparent text-left text-sm outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0"
        />

        <button
          type="button"
          onClick={onToggle}
          className="text-brand-muted transition hover:text-brand-primary"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
