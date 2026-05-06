"use client";

import { Droppable } from '@hello-pangea/dnd';
import IssueCard from './IssueCard';

export default function KanbanColumn({ columnId, title, issues, projectKey }) {
  return (
    <div className="flex flex-col bg-slate-50 rounded-md w-[280px] shrink-0 max-h-full">
      <div className="p-3 pb-2 flex items-center justify-between sticky top-0 bg-slate-50 rounded-t-md z-10">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate mr-2">
          {title} <span className="text-slate-400 font-normal ml-1">{issues.length}</span>
        </h3>
      </div>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 min-h-[150px] overflow-y-auto ${snapshot.isDraggingOver ? 'bg-slate-100' : ''}`}
          >
            {issues.map((issue, index) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                index={index}
                projectKey={projectKey}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
