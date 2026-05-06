"use client";
import { useParams } from 'next/navigation';
import LeftSidebar from '@/components/LeftSidebar';

export default function ProjectLayout({ children }) {
  const params = useParams();

  return (
    <div className="flex w-full h-full">
      <LeftSidebar projectKey={params.projectKey} />
      <div className="flex-1 overflow-auto bg-white">
        {children}
      </div>
    </div>
  );
}
