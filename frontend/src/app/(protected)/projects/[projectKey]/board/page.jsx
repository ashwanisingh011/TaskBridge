"use client";

import { useEffect, useState, use } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from '@/components/KanbanColumn';
import { useProjectData } from '@/hooks/useProjectData';
import { Search } from 'lucide-react';

const STATUS_COLUMNS = [
  { id: 'To Do', title: 'To Do' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Review', title: 'Review' },
  { id: 'Done', title: 'Done' }
];

export default function BoardPage({ params }) {
  const unwrappedParams = use(params);
  const projectKey = unwrappedParams.projectKey;

  const { getProjectByKey, issues, updateIssue } = useProjectData();
  const [project, setProject] = useState(null);
  const [boardIssues, setBoardIssues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const p = getProjectByKey(projectKey);
    if (p) {
      if(p.id !== project?.id) setProject(p);
      // Filter issues for this project and only those in an active sprint (or just any sprint for mock purposes)
      // For now, we'll just show all issues that aren't purely backlog, or just all issues for simplicity
      const pIssues = issues.filter(i => i.projectId === p.id && i.sprintId !== null);
      setBoardIssues(pIssues);
    }
  }, [projectKey, issues]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedIssue = boardIssues.find(i => i.id === draggableId);
    if (!draggedIssue) return;

    const newStatus = destination.droppableId;

    // Update local state for immediate feedback
    const updatedIssues = boardIssues.map(i =>
      i.id === draggableId ? { ...i, status: newStatus } : i
    );

    setBoardIssues(updatedIssues);

    // Update global mock state
    updateIssue({ ...draggedIssue, status: newStatus });
  };

  if (!project) return <div className="p-4">Loading board...</div>;

  const filteredIssues = boardIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-4 pt-4 pb-4 border-b border-slate-200">
        <div className="text-sm text-slate-500 mb-2">Projects / {project.name}</div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-4">{projectKey} board</h1>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search board"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 text-sm border border-slate-300 rounded-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
            <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-500" />
          </div>

          <div className="flex -space-x-2">
            {/* Mock avatars */}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center text-xs z-10">J</div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-green-500 text-white flex items-center justify-center text-xs z-0">A</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden p-3">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex items-start gap-4 h-full pb-4">
            {STATUS_COLUMNS.map(column => (
              <KanbanColumn
                key={column.id}
                columnId={column.id}
                title={column.title}
                issues={filteredIssues.filter(i => i.status === column.id)}
                projectKey={projectKey}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
