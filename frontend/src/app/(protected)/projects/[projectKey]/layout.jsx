"use client";
import { useParams } from 'next/navigation';
import LeftSidebar from '@/components/LeftSidebar';

export default function ProjectLayout({ children }) {
  const params = useParams();

  return (
    <div className="flex w-full h-full bg-white dark:bg-slate-950">
      <LeftSidebar projectKey={params.projectKey} />
      <div className="flex-1 overflow-auto bg-white dark:bg-slate-950">
        {children}
      </div>
    </div>
  );
}
