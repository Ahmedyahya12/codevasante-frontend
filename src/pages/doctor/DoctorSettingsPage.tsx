// src/pages/DoctorSettingsPage.tsx
import { Bell, Lock, Save } from 'lucide-react';

export default function DoctorSettingsPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-text">الإعدادات</h1>
        <p className="mt-1 text-sm text-brand-muted">إعدادات الحساب والتنبيهات وكلمة المرور.</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-3xl border border-brand-border bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <Bell className="text-brand-primary" />
            <h2 className="font-extrabold text-brand-text">التنبيهات</h2>
          </div>

          <SettingRow title="تنبيه قبل الموعد" desc="إظهار تنبيه قبل بداية الموعد." />
          <SettingRow title="تنبيه المواعيد الجديدة" desc="إشعار عند إنشاء موعد جديد." />
          <SettingRow title="تنبيه إلغاء موعد" desc="إشعار عند إلغاء موعد من طرف المريض." />

          <button className="btn-primary mt-5 flex items-center gap-2">
            <Save size={17} />
            حفظ الإعدادات
          </button>
        </div>

        <div className="rounded-3xl border border-brand-border bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <Lock className="text-brand-primary" />
            <h2 className="font-extrabold text-brand-text">تغيير كلمة المرور</h2>
          </div>

          <Input label="كلمة المرور الحالية" />
          <Input label="كلمة المرور الجديدة" />
          <Input label="تأكيد كلمة المرور" />

          <button className="btn-primary mt-5 flex items-center gap-2">
            <Save size={17} />
            تحديث كلمة المرور
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-2xl bg-brand-light p-4">
      <div>
        <h3 className="text-sm font-bold text-brand-text">{title}</h3>
        <p className="mt-1 text-xs text-brand-muted">{desc}</p>
      </div>

      <input type="checkbox" defaultChecked className="h-5 w-5 accent-indigo-700" />
    </div>
  );
}

function Input({ label }: { label: string }) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-bold text-brand-text">{label}</label>
      <input
        type="password"
        className="w-full rounded-2xl border border-brand-border bg-brand-light px-4 py-3 text-sm outline-none focus:border-brand-primary"
      />
    </div>
  );
}
