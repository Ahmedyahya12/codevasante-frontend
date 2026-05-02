import { Outlet } from 'react-router-dom';
import PatientNavbar from '@/components/patient/PatientNavbar';
import PatientFooter from '@/components/patient/PatientFooter';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollArrows from '@/components/ScrollArrows';

export default function PatientLayout() {
  return (
    <div className="min-h-screen bg-white text-brand-text" dir="rtl">
      <ScrollToTop />
      <PatientNavbar />

      <main>
         <ScrollArrows />
        <Outlet />
      </main>

      <PatientFooter />
    </div>
  );
}
