"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useProjectData } from '@/hooks/useProjectData';

export default function ProjectsDashboard() {
  const { projects } = useProjectData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">Projects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Create project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.key}/board`}
            className="group block border border-slate-200 rounded-md p-5 bg-white hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-md font-bold text-lg">
                {project.key.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{project.name}</h3>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{project.key}</div>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4 h-10 line-clamp-2">{project.description}</p>

            <div className="text-xs text-slate-500">
              Lead: <span className="font-medium text-slate-700">{project.lead}</span>
            </div>
          </Link>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">Create Project</h2>
            <p className="text-slate-600 mb-6 text-sm">
              This is a dummy modal for creating projects. The actual implementation will be wired up to the backend later.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors font-medium"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
