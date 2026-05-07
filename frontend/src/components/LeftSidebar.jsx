"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, KanbanSquare, ListTodo, Settings, LayoutDashboard } from 'lucide-react';
import clsx from 'clsx';

export default function LeftSidebar({ projectKey }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Board', href: `/projects/${projectKey}/board`, icon: KanbanSquare },
    { name: 'Backlog', href: `/projects/${projectKey}/backlog`, icon: ListTodo },
    { name: 'Project Settings', href: `/projects/${projectKey}/settings`, icon: Settings },
  ];

  return (
    <div
      className={clsx(
        "bg-slate-50 border-r border-slate-200 flex flex-col transition-all duration-300 relative dark:bg-slate-950 dark:border-slate-800",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Resizer/Collapse button */}
      <div
        className="absolute -right-3 top-3 bg-white border border-slate-200 rounded-full p-0.5 cursor-pointer hover:bg-slate-100 shadow-sm z-10 text-slate-500 hover:text-blue-600 transition-colors dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-[#579DFF]"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </div>

      <div className="p-4 flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-md font-bold shrink-0 dark:bg-blue-950 dark:text-blue-200">
          {projectKey?.substring(0, 2).toUpperCase()}
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-semibold text-slate-800 truncate dark:text-slate-100">{projectKey} Project</div>
            <div className="text-xs text-slate-500 dark:text-slate-500">Software project</div>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-slate-200/50 text-blue-700 font-medium dark:bg-blue-950/50 dark:text-[#85B8FF]"
                  : "text-slate-600 hover:bg-slate-200/30 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
              )}
              title={collapsed ? item.name : undefined}
            >
              <Icon className={clsx("w-5 h-5 shrink-0", isActive ? "text-blue-600 dark:text-[#579DFF]" : "")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
