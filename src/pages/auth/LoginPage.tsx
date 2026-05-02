import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Stethoscope,
  Users,
  Loader2,
} from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginThunk } from '@/store/auth/authThunks';
import { MySwal } from '@/utils/swal';

const doctorImage =
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop';

const getRedirectPath = (role?: string, isFirstLogin?: boolean) => {
  if (role === 'doctor' && isFirstLogin) return '/first-login/set-password';
  if (role === 'doctor') return '/doctor/dashboard';
  if (role === 'receptionist') return '/reception/dashboard';
  if (role === 'admin') return '/admin/dashboard';
  if (role === 'patient') return '/';

  return '/';
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (location.state?.message) {
      MySwal.fire({
        title: 'تنبيه',
        text: location.state.message,
        icon: 'success',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#2E37A4',
      });

      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, location.state, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      MySwal.fire({
        title: 'بيانات ناقصة',
        text: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.',
        icon: 'warning',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#2E37A4',
      });
      return;
    }

    const result = await dispatch(loginThunk(formData));

    if (loginThunk.fulfilled.match(result)) {
      const user = result.payload.user;

      await MySwal.fire({
        title: 'تم تسجيل الدخول بنجاح',
        text: `مرحباً ${user?.full_name || user?.first_name || user?.email || ''}`,
        icon: 'success',
        confirmButtonText: 'متابعة',
        confirmButtonColor: '#2E37A4',
      });

      navigate(getRedirectPath(user?.role, user?.is_first_login), {
        replace: true,
      });

      return;
    }

    MySwal.fire({
      title: 'فشل تسجيل الدخول',
      text: (result.payload as string) || 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
      icon: 'error',
      confirmButtonText: 'حسناً',
      confirmButtonColor: '#2E37A4',
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] px-4 py-8" dir="rtl">
      <div className="mx-auto grid min-h-[82vh] max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-xl lg:grid-cols-2">
        <div className="order-2 flex items-center justify-center p-6 md:p-10 lg:order-1">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <span className="inline-flex rounded-2xl bg-[#2E37A4]/10 px-6 py-3 text-sm font-bold text-[#2E37A4]">
                تسجيل الدخول
              </span>

              <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
                أهلاً بعودتك
              </h1>

              <p className="mt-3 text-sm text-gray-500">
                ادخل بياناتك للوصول إلى لوحة التحكم أو حساب المريض.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-900">
                  البريد الإلكتروني
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="doctor@clinic.com"
                    className="w-full rounded-2xl border border-gray-200 bg-[#F4F7FF] px-4 py-3 pl-12 text-left text-gray-900 outline-none transition focus:border-[#2E37A4] focus:ring-4 focus:ring-[#2E37A4]/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-900">
                  كلمة المرور
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className="w-full rounded-2xl border border-gray-200 bg-[#F4F7FF] px-12 py-3 text-left text-gray-900 outline-none transition focus:border-[#2E37A4] focus:ring-4 focus:ring-[#2E37A4]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#2E37A4]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link
                  to="/forgot-password"
                  className="font-bold text-[#2E37A4] hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>

                <label className="flex cursor-pointer items-center gap-2 text-gray-500">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#2E37A4] focus:ring-[#2E37A4]"
                  />
                  تذكرني
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2E37A4] px-5 py-3 font-bold text-white shadow-lg shadow-[#2E37A4]/20 transition hover:bg-[#252d8d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <Loader2 className="animate-spin" size={20} />}
                {loading ? 'جاري الدخول...' : 'دخول'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              ليس لديك حساب؟{' '}
              <Link
                to="/register"
                className="font-bold text-[#2E37A4] hover:underline"
              >
                إنشاء حساب مريض
              </Link>
            </p>

            <div className="mt-8 rounded-2xl border border-sky-200 bg-sky-50 px-5 py-4 text-center text-sm leading-7 text-gray-600">
              <strong className="text-gray-900">ملاحظة:</strong> الطبيب أو الإدارة يتم
              إنشاء حسابهم من طرف إدارة العيادة، أما المريض يمكنه إنشاء حساب مباشرة.
            </div>
          </div>
        </div>

        <Link to="/" className="order-1 hidden bg-[#2E37A4] p-8 lg:order-2 lg:block">
          <div className="h-full rounded-[24px]">
            <div className="mb-6 overflow-hidden rounded-[24px] bg-white/10">
              <img
                src={doctorImage}
                alt="CodevaClinic Doctor"
                className="h-[300px] w-full object-cover"
              />
            </div>

            <div className="rounded-[28px] bg-[#4653D7] p-8 text-white">
              <div className="mb-6 flex items-center gap-2">
                <div className="relative h-9 w-9">
                  <div className="absolute left-3 top-0 h-9 w-3 rounded-full bg-brand-primary" />
                  <div className="absolute left-0 top-3 h-3 w-9 rounded-full bg-brand-primary" />
                  <div className="absolute right-0 top-3 h-3 w-5 rounded-full bg-brand-secondary" />
                  <div className="absolute left-3 top-3 h-3 w-3 rounded-sm bg-white" />
                </div>

                <div>
                  <h1 className="text-lg font-extrabold leading-none text-white">
                    Codeva<span className="text-brand-secondary">Clinic</span>
                  </h1>
                  <p className="text-[11px] font-semibold text-white/80">
                    نظام إدارة طبي
                  </p>
                </div>
              </div>

              <h3 className="text-3xl font-extrabold leading-relaxed">
                مرحباً بك في CodevaClinic
              </h3>

              <p className="mt-3 leading-8 text-white/80">
                نظام ذكي لإدارة العيادات، المواعيد، المرضى، الاستشارات ولوحات التحكم
                الطبية.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/10 p-4 text-center">
                  <ShieldCheck className="mx-auto mb-2" size={26} />
                  <p className="font-bold">آمن</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 text-center">
                  <Stethoscope className="mx-auto mb-2" size={26} />
                  <p className="font-bold">الأطباء</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 text-center">
                  <Users className="mx-auto mb-2" size={26} />
                  <p className="font-bold">المرضى</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
