"use client";
import ProtectedRoute from '@/components/ProtectedRoute';
import TopNavbar from '@/components/TopNavbar';

export default function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
        <TopNavbar />
        <main className="flex-1 flex overflow-hidden">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
