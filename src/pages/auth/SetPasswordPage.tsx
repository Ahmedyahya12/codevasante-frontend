import { FormEvent, useEffect, useState } from 'react';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPasswordThunk } from '@/store/auth/authThunks';
import { clearAuthError, clearSetPasswordSuccess } from '@/store/auth/authSlice';

export default function SetPasswordPage() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error, setPasswordSuccess } = useAppSelector((state) => state.auth);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    dispatch(clearAuthError());
    dispatch(clearSetPasswordSuccess());
  }, [dispatch]);

  useEffect(() => {
    if (setPasswordSuccess) {
      const timer = setTimeout(() => {
        navigate('/login', {
          replace: true,
          state: {
            message: 'تم تعيين كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول.',
          },
        });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [setPasswordSuccess, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!uidb64 || !token) {
      setLocalError('رابط التفعيل غير صالح.');
      return;
    }

    if (password.length < 8) {
      setLocalError('كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('كلمتا المرور غير متطابقتين.');
      return;
    }

    dispatch(
      setPasswordThunk({
        uidb64,
        token,
        password,
        confirm_password: confirmPassword,
      })
    );
  };

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 py-10"
    >
      <section className="w-full max-w-xl rounded-[32px] bg-white px-6 py-10 shadow-xl sm:px-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#2E37A4]/10 text-[#2E37A4]">
            <LockKeyhole className="h-10 w-10" />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900">تعيين كلمة المرور</h1>

          <p className="mt-3 text-base leading-7 text-gray-500">
            أدخل كلمة مرور جديدة لتفعيل حسابك والبدء في استخدام المنصة.
          </p>
        </div>

        {setPasswordSuccess && (
          <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            تم تعيين كلمة المرور بنجاح. سيتم تحويلك إلى تسجيل الدخول...
          </div>
        )}

        {(localError || error) && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {localError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              كلمة المرور الجديدة
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 pl-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#2E37A4] focus:bg-white focus:ring-4 focus:ring-[#2E37A4]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#2E37A4]"
              >
                {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">تأكيد كلمة المرور</label>

            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="أعد إدخال كلمة المرور"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 pl-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#2E37A4] focus:bg-white focus:ring-4 focus:ring-[#2E37A4]/10"
              />

              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#2E37A4]"
              >
                {showConfirm ? <EyeOff size={21} /> : <Eye size={21} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#2E37A4] px-5 py-4 text-base font-bold text-white shadow-lg shadow-[#2E37A4]/25 transition hover:bg-[#252d8d] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'جاري التفعيل...' : 'تعيين كلمة المرور'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-sm font-bold text-[#2E37A4] transition hover:underline">
            العودة إلى تسجيل الدخول
          </Link>
        </div>
      </section>
    </main>
  );
}
