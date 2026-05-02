import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-light p-6">
      <div className="card max-w-md p-8 text-center">
        <h1 className="text-4xl font-extrabold text-brand-primary">404</h1>
        <p className="mt-3 text-brand-muted">الصفحة غير موجودة</p>
        <Link to="/" className="btn-primary mt-5 inline-block">
          الرجوع إلى لوحة التحكم
        </Link>
      </div>
    </div>
  );
}
