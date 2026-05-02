// src/components/common/ScrollArrows.tsx
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

export default function ScrollArrows() {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setShowTop(scrollTop > 280);
      setShowBottom(scrollTop + windowHeight < fullHeight - 280);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const buttonClass =
    'group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-[#2E37A4] to-[#00D3C7] text-white shadow-[0_12px_30px_rgba(46,55,164,0.28)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_18px_40px_rgba(46,55,164,0.38)] active:scale-95';

  const iconClass =
    'transition-transform duration-300 group-hover:scale-110';

  return (
    <div className="fixed bottom-6 left-5 z-50 flex flex-col gap-3 sm:bottom-8 sm:left-8">
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="الرجوع إلى الأعلى"
          className={`${buttonClass} animate-[scrollArrowIn_0.35s_ease-out]`}
        >
          <ArrowUp size={22} className={`${iconClass} animate-bounce`} />
        </button>
      )}

      {showBottom && (
        <button
          type="button"
          onClick={scrollToBottom}
          aria-label="النزول إلى الأسفل"
          className={`${buttonClass} animate-[scrollArrowIn_0.35s_ease-out]`}
        >
          <ArrowDown size={22} className={`${iconClass} animate-bounce`} />
        </button>
      )}

      <style>{`
        @keyframes scrollArrowIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
