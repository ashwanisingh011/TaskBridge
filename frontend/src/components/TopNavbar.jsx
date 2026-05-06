"use client";

import { useAuth } from '@/context/useAuth';
import { Search, Bell, HelpCircle, Settings, Grid } from 'lucide-react';
import Link from 'next/link';

export default function TopNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4 text-slate-800 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link href="/projects" className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700">
          <Grid className="w-5 h-5" />
          <span className="text-xl">TaskBridge</span>
        </Link>

        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link href="/projects" className="hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors text-slate-700">Projects</Link>
          <button className="hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors text-slate-700">Filters</button>
          <button className="hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors text-slate-700">Dashboards</button>
          <button className="hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors text-slate-700">Teams</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors ml-2">Create</button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-8 pl-8 pr-3 text-sm bg-slate-100 border border-transparent focus:border-blue-500 focus:bg-white rounded-md outline-none transition-all"
          />
          <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-500" />
        </div>

        <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600">
          <Settings className="w-5 h-5" />
        </button>

        <div className="relative group cursor-pointer ml-2">
          {user ? (
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full font-medium text-sm">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          ) : (
            <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
          )}
          <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-white border border-slate-200 shadow-lg rounded-md w-32 overflow-hidden">
            <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
