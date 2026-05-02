// src/layouts/ReceptionLayout.tsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import ReceptionSidebar from '@/components/reception/ReceptionSidebar';
import ReceptionHeader from '@/components/reception/ReceptionHeader';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollArrows from '@/components/ScrollArrows';

export default function ReceptionLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-light text-brand-text" dir="rtl">
      <ScrollToTop />

      <div className="flex">
        <ReceptionSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="min-w-0 flex-1">
          <ReceptionHeader onMenuClick={() => setSidebarOpen(true)} />

          <main className="p-4 sm:p-5 lg:p-6">
            <ScrollArrows />
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
