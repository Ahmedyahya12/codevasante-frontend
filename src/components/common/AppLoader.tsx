import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import medicalLoader from '@/assets/lottie/medical-loader.json';

export default function AppLoader() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: medicalLoader,
    });

    return () => anim.destroy();
  }, []);

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-40 w-40 sm:h-52 sm:w-52" ref={containerRef} />

        <div className="text-center">
          <h2 className="text-lg font-black text-[#2E37A4]">CodevaClinic</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">جاري تحميل النظام...</p>
        </div>
      </div>
    </div>
  );
}
