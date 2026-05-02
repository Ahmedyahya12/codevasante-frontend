import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollArrows from '@/components/ScrollArrows';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-light text-brand-text">
      <ScrollToTop />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="min-w-0 flex-1">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="p-4 sm:p-5 lg:p-6">
            <ScrollArrows />
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
