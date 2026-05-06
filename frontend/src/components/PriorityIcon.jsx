"use client";

import { ArrowUp, ChevronUp, Pause, ChevronDown, ArrowDown } from 'lucide-react';
import clsx from 'clsx';

export const PriorityIcon = ({ priority, className }) => {
  switch (priority) {
    case 'Highest':
      return <ArrowUp className={clsx("w-4 h-4 text-red-600", className)} />;
    case 'High':
      return <ChevronUp className={clsx("w-4 h-4 text-red-500", className)} />;
    case 'Medium':
      return <Pause className={clsx("w-4 h-4 text-orange-500 transform rotate-90", className)} />;
    case 'Low':
      return <ChevronDown className={clsx("w-4 h-4 text-blue-500", className)} />;
    case 'Lowest':
      return <ArrowDown className={clsx("w-4 h-4 text-blue-400", className)} />;
    default:
      return <Pause className={clsx("w-4 h-4 text-slate-400 transform rotate-90", className)} />;
  }
};
