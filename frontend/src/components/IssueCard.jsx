"use client";

import { Draggable } from '@hello-pangea/dnd';
import { IssueTypeIcon } from './IssueIcon';
import { PriorityIcon } from './PriorityIcon';
import { useProjectData } from '@/hooks/useProjectData';
import Link from 'next/link';

export default function IssueCard({ issue, index, projectKey }) {
  const { getUser } = useProjectData();
  const assignee = issue.assigneeId ? getUser(issue.assigneeId) : null;

  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-3 rounded-md shadow-sm border border-slate-200 mb-2 cursor-grab hover:bg-slate-50 transition-colors ${snapshot.isDragging ? 'shadow-md ring-2 ring-blue-500 ring-opacity-50' : ''}`}
        >
          <div className="text-sm text-slate-800 mb-2 line-clamp-2">
            {issue.title}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <IssueTypeIcon type={issue.type} />
              <Link
                href={`/projects/${projectKey}/issues/${issue.key}`}
                className="text-xs font-medium text-slate-600 hover:text-blue-600 hover:underline"
                onClick={(e) => {
                  // Pre-empt drag if clicking the link
                  e.stopPropagation();
                }}
              >
                {issue.key}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <PriorityIcon priority={issue.priority} />

              {issue.storyPoints && (
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-semibold text-slate-600">
                  {issue.storyPoints}
                </div>
              )}

              {assignee ? (
                <div
                  className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-medium overflow-hidden ml-1"
                  title={assignee.name}
                >
                  {assignee.avatar ? (
                    <img src={assignee.avatar} alt={assignee.name} className="w-full h-full object-cover" />
                  ) : (
                    assignee.name.charAt(0).toUpperCase()
                  )}
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300 border-dashed flex items-center justify-center ml-1" title="Unassigned"></div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
