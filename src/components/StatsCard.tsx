import type { LucideIcon } from 'lucide-react';

type StatsCardProps = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'success' | 'error';
};

const colors = {
  primary: 'bg-indigoCustom-100 text-brand-primary border-indigoCustom-300',
  secondary: 'bg-cyan-100 text-brand-secondary border-cyan-300',
  success: 'bg-successCustom-100 text-successCustom-900 border-successCustom-500',
  error: 'bg-errorCustom-100 text-errorCustom-900 border-errorCustom-500',
};

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  color = 'primary',
}: StatsCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-brand-muted">{title}</p>
          <h3 className="mt-2 text-2xl font-extrabold text-brand-text">{value}</h3>
        </div>

        <div className={`rounded-xl border p-3 ${colors[color]}`}>
          <Icon size={22} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span className="rounded-full bg-successCustom-100 px-2 py-1 text-xs font-bold text-successCustom-900">
          {change}
        </span>
        <span className="text-xs text-brand-muted">خلال آخر 7 أيام</span>
      </div>

      <div className="mt-4 flex h-12 items-end gap-1">
        {[30, 55, 40, 70, 48, 80, 60].map((h, index) => (
          <span
            key={index}
            style={{ height: `${h}%` }}
            className="w-2 rounded-full bg-brand-primary"
          />
        ))}
      </div>
    </div>
  );
}
