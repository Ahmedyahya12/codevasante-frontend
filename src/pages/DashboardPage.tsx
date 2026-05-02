import { CalendarDays, Stethoscope, Users, Video, DollarSign, Clock } from 'lucide-react';
import StatsCard from '@/components/StatsCard';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-brand-text">لوحة تحكم الطبيب</h2>
          <p className="mt-1 text-sm text-brand-muted">
            متابعة المواعيد، المرضى، الاستشارات والإحصائيات اليومية.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="btn-primary">+ موعد جديد</button>
          <button className="btn-secondary">جدولة التوفر</button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="إجمالي المواعيد"
          value="658"
          change="+95%"
          icon={CalendarDays}
          color="primary"
        />
        <StatsCard title="الاستشارات عن بعد" value="125" change="+21%" icon={Video} color="error" />
        <StatsCard title="المرضى" value="247" change="+25%" icon={Users} color="secondary" />
        <StatsCard
          title="الإيرادات"
          value="$55,124"
          change="+31%"
          icon={DollarSign}
          color="success"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[380px_1fr]">
        <div className="card p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-extrabold">الموعد القادم</h3>
            <span className="rounded-lg bg-brand-light px-3 py-1 text-xs font-bold">اليوم</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigoCustom-100 text-brand-primary">
              <Users size={22} />
            </div>
            <div>
              <p className="font-bold">أحمد ولد محمد</p>
              <p className="text-sm text-brand-muted">#AP455698</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 rounded-xl bg-brand-light p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-muted">نوع الزيارة</span>
              <span className="font-bold">استشارة عامة</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">القسم</span>
              <span className="font-bold">القلب</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">الوقت</span>
              <span className="font-bold">08:30 مساءً</span>
            </div>
          </div>

          <button className="mt-5 w-full rounded-xl bg-brand-primary py-3 text-sm font-bold text-white">
            بدء الموعد
          </button>
        </div>

        <div className="card p-5">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-extrabold">إحصائيات المواعيد</h3>
            <button className="btn-secondary">شهري</button>
          </div>

          <div className="flex h-[260px] items-end gap-3 overflow-x-auto pb-2">
            {[360, 260, 280, 350, 270, 340, 280, 190, 220, 200, 260, 420].map((item, index) => (
              <div key={index} className="flex min-w-[42px] flex-col items-center gap-2">
                <div
                  style={{ height: `${item / 2.1}px` }}
                  className="w-5 rounded-t-lg bg-brand-primary"
                />
                <span className="text-xs text-brand-muted">
                  {
                    [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                    ][index]
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {[
          ['إجمالي المرضى', '658', Users],
          ['استشارات الفيديو', '256', Video],
          ['مواعيد مؤجلة', '141', Clock],
          ['زيارات سابقة', '524', CalendarDays],
          ['حجوزات مباشرة', '21', Stethoscope],
          ['متابعة المرضى', '451', Users],
        ].map(([title, value, Icon]: any) => (
          <div key={title} className="card p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary text-white">
              <Icon size={19} />
            </div>
            <p className="text-sm text-brand-muted">{title}</p>
            <h4 className="text-2xl font-extrabold">{value}</h4>
            <p className="mt-1 text-xs font-bold text-successCustom-900">+31% الأسبوع الماضي</p>
          </div>
        ))}
      </section>
    </div>
  );
}
