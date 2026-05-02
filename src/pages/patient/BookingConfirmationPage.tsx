import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CalendarCheck,
  CalendarDays,
  Clock,
  Download,
  Home,
  Printer,
  User,
  Wallet,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function BookingConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const pdfRef = useRef<HTMLDivElement>(null);

  const { appointment, doctor, patient, paymentMode } = location.state || {};

  if (!appointment) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 text-center">
        <div className="card max-w-md p-8">
          <h1 className="text-2xl font-extrabold text-brand-primary">
            لا توجد معلومات حجز
          </h1>
          <p className="mt-3 text-sm text-brand-muted">
            يرجى العودة إلى صفحة الحجز وإنشاء موعد جديد.
          </p>
          <button
            onClick={() => navigate('/booking')}
            className="mt-6 rounded-xl bg-brand-primary px-6 py-3 font-extrabold text-white"
          >
            العودة إلى الحجز
          </button>
        </div>
      </div>
    );
  }

  const handleExportPdf = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`codevasante-reservation-${appointment.id || 'confirmation'}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cyan-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CalendarCheck size={34} />
          </div>

          <h1 className="mt-4 text-3xl font-extrabold text-brand-primary sm:text-4xl">
            تم إرسال طلب الحجز بنجاح
          </h1>

          <p className="mt-3 text-sm text-brand-muted sm:text-base">
            تم تسجيل الموعد بحالة قيد الانتظار، وسيتم تأكيده من طرف العيادة.
          </p>
        </div>

        <div
          ref={pdfRef}
          dir="rtl"
          className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl"
        >
          <div className="bg-[#2E37A4] px-6 py-6 text-white sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">CodevaSanté</h2>
                <p className="mt-1 text-sm text-white/80">
                  نظام إدارة وحجز المواعيد الطبية
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl font-black text-[#2E37A4]">
                CS
              </div>
            </div>

            <div className="mt-6 grid gap-3 rounded-2xl bg-white/10 p-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-white/80">رقم الحجز</p>
                <p className="mt-1 text-xl font-black">
                  #{appointment.id || '---'}
                </p>
              </div>

              <div>
                <p className="text-sm text-white/80">حالة الحجز</p>
                <p className="mt-1 text-xl font-black">قيد الانتظار</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
            <Detail
              icon={<User size={20} />}
              title="المريض"
              value={patient?.full_name || appointment.patient_name}
            />

            <Detail
              icon={<User size={20} />}
              title="الطبيب"
              value={doctor?.full_name || appointment.doctor_name}
            />

            <Detail
              icon={<CalendarDays size={20} />}
              title="تاريخ الموعد"
              value={appointment.date}
            />

            <Detail
              icon={<Clock size={20} />}
              title="وقت الموعد"
              value={appointment.time}
            />

            <Detail
              icon={<Wallet size={20} />}
              title="طريقة الدفع"
              value={
                paymentMode === 'cash' || !paymentMode
                  ? 'الدفع نقداً داخل العيادة'
                  : paymentMode
              }
            />

            <Detail
              icon={<CalendarCheck size={20} />}
              title="تأكيد الموعد"
              value="في انتظار تأكيد العيادة"
            />

            <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
              <p className="text-sm font-extrabold text-slate-800">معلومات المريض</p>
              <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <p>البريد الإلكتروني: {patient?.email || '---'}</p>
                <p>الهاتف: {patient?.phone || '---'}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
              <p className="text-sm font-extrabold text-slate-800">معلومات الطبيب</p>
              <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <p>التخصص: {doctor?.specialty || '---'}</p>
                <p>سنوات الخبرة: {doctor?.years_of_experience ?? '---'}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#2E37A4]/5 p-4 sm:col-span-2">
              <p className="text-sm font-extrabold text-slate-800">سبب الزيارة</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {appointment.reason || 'لا توجد ملاحظات.'}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:col-span-2">
              <p className="text-sm font-extrabold text-amber-800">
                ملاحظة مهمة
              </p>
              <p className="mt-2 text-sm leading-7 text-amber-700">
                يرجى الحضور قبل الموعد بـ 10 دقائق. سيتم تأكيد الموعد من طرف العيادة.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 font-extrabold text-slate-700 hover:bg-slate-200"
          >
            <Printer size={18} />
            طباعة
          </button>

          <button
            onClick={handleExportPdf}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2E37A4] px-4 py-3 font-extrabold text-white hover:bg-[#252d8a]"
          >
            <Download size={18} />
            تصدير PDF
          </button>

          <button
            onClick={() => navigate('/patient/appointments')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 font-extrabold text-white hover:bg-indigoCustom-900"
          >
            <CalendarDays size={18} />
            مواعيدي
          </button>

          <button
            onClick={() => navigate('/patient/home')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary/10 px-4 py-3 font-extrabold text-brand-primary hover:bg-brand-primary/20"
          >
            <Home size={18} />
            الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string | number;
}) {
  return (
    <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#2E37A4] shadow-sm">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold text-slate-500">{title}</p>
        <p className="mt-1 text-sm font-extrabold text-slate-800">
          {value || '---'}
        </p>
      </div>
    </div>
  );
}
