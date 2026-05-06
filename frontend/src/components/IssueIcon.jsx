"use client";

import { Zap, Book, CheckSquare, Bug } from 'lucide-react';
import clsx from 'clsx';

export const IssueTypeIcon = ({ type, className }) => {
  switch (type) {
    case 'Epic':
      return <div className={clsx("w-5 h-5 rounded-sm bg-purple-600 flex items-center justify-center", className)}><Zap className="w-3 h-3 text-white" /></div>;
    case 'Story':
      return <div className={clsx("w-5 h-5 rounded-sm bg-green-500 flex items-center justify-center", className)}><Book className="w-3 h-3 text-white" /></div>;
    case 'Bug':
      return <div className={clsx("w-5 h-5 rounded-sm bg-red-500 flex items-center justify-center", className)}><Bug className="w-3 h-3 text-white" /></div>;
    case 'Task':
    default:
      return <div className={clsx("w-5 h-5 rounded-sm bg-blue-500 flex items-center justify-center", className)}><CheckSquare className="w-3 h-3 text-white" /></div>;
  }
};
