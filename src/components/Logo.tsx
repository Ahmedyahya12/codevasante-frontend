export default function Logo() {
  return (
    <div className="flex items-center gap-2">
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
        <p className="text-[11px] font-semibold text-brand-muted">نظام إدارة طبي</p>
      </div>
    </div>
  );
}
