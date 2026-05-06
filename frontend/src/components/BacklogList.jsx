"use client";

import { Droppable } from '@hello-pangea/dnd';
import { Draggable } from '@hello-pangea/dnd';
import { IssueTypeIcon } from './IssueIcon';
import { PriorityIcon } from './PriorityIcon';
import { useProjectData } from '@/hooks/useProjectData';
import Link from 'next/link';

const BacklogIssueItem = ({ issue, index, projectKey }) => {
  const { getUser } = useProjectData();
  const assignee = issue.assigneeId ? getUser(issue.assigneeId) : null;

  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex items-center gap-3 p-2 bg-white border border-slate-200 group hover:bg-slate-50 transition-colors -mt-[1px] first:mt-0 ${snapshot.isDragging ? 'shadow-lg ring-1 ring-blue-500 z-10' : ''}`}
        >
          <IssueTypeIcon type={issue.type} />

          <Link
            href={`/projects/${projectKey}/issues/${issue.key}`}
            className="text-xs font-medium text-slate-600 hover:text-blue-600 hover:underline shrink-0 w-16"
          >
            {issue.key}
          </Link>

          <div className="text-sm text-slate-800 truncate flex-1">
            {issue.title}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {issue.storyPoints && (
              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-semibold text-slate-600">
                {issue.storyPoints}
              </div>
            )}

            <PriorityIcon priority={issue.priority} />

            <div className="text-xs text-slate-500 w-20 text-right uppercase">
              {issue.status}
            </div>

            <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300 border-dashed flex items-center justify-center ml-2 overflow-hidden">
              {assignee ? (
                assignee.avatar ? (
                  <img src={assignee.avatar} alt={assignee.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] font-medium text-slate-600">{assignee.name.charAt(0)}</span>
                )
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default function BacklogList({ listId, title, issues, projectKey, sprintInfo }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-4">
          <h2 className="font-semibold text-slate-800">{title}</h2>
          {sprintInfo && (
            <span className="text-xs text-slate-500">
              {sprintInfo.startDate} - {sprintInfo.endDate}
            </span>
          )}
          <span className="text-xs font-medium bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
            {issues.length} issues
          </span>
        </div>

        {listId === 'sprint-active' && (
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 text-sm rounded-sm transition-colors">
            Complete sprint
          </button>
        )}
        {listId === 'backlog' && (
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 text-sm rounded-sm transition-colors">
            Create sprint
          </button>
        )}
      </div>

      <Droppable droppableId={listId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[60px] rounded-sm transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50/50' : ''}`}
          >
            {issues.length === 0 ? (
              <div className="border border-slate-200 border-dashed rounded-sm p-4 text-center text-sm text-slate-500 bg-slate-50">
                Plan your sprint by dragging issues here
              </div>
            ) : (
              issues.map((issue, index) => (
                <BacklogIssueItem
                  key={issue.id}
                  issue={issue}
                  index={index}
                  projectKey={projectKey}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
