"use client";

import { useEffect, useState, use } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import BacklogList from '@/components/BacklogList';
import { useProjectData } from '@/hooks/useProjectData';
import { Search } from 'lucide-react';

export default function BacklogPage({ params }) {
  const unwrappedParams = use(params);
  const projectKey = unwrappedParams.projectKey;

  const { getProjectByKey, getSprintsByProject, issues, updateIssue } = useProjectData();
  const [project, setProject] = useState(null);
  const [sprintIssues, setSprintIssues] = useState([]);
  const [backlogIssues, setBacklogIssues] = useState([]);
  const [sprint, setSprint] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const p = getProjectByKey(projectKey);
    if (p) {
      if(p.id !== project?.id) setProject(p);
      const s = getSprintsByProject(p.id)[0];
      if (s) setSprint(s);

      const pIssues = issues.filter(i => i.projectId === p.id);

      // Assuming 's1' is the active sprint, others are backlog
      setSprintIssues(pIssues.filter(i => i.sprintId === s?.id));
      setBacklogIssues(pIssues.filter(i => !i.sprintId));
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

    // Find the issue
    let draggedIssue;
    if (source.droppableId === 'sprint-active') {
      draggedIssue = sprintIssues.find(i => i.id === draggableId);
    } else {
      draggedIssue = backlogIssues.find(i => i.id === draggableId);
    }

    if (!draggedIssue) return;

    // Moving between lists
    const isMovingToSprint = destination.droppableId === 'sprint-active';
    const newSprintId = isMovingToSprint ? sprint?.id : null;

    // Update local state
    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list (just visual for now, we aren't saving strict order index)
      const list = source.droppableId === 'sprint-active' ? [...sprintIssues] : [...backlogIssues];
      list.splice(source.index, 1);
      list.splice(destination.index, 0, draggedIssue);

      if (source.droppableId === 'sprint-active') {
        setSprintIssues(list);
      } else {
        setBacklogIssues(list);
      }
    } else {
      // Moving between lists
      if (source.droppableId === 'sprint-active') {
        const newSprintIssues = [...sprintIssues];
        newSprintIssues.splice(source.index, 1);
        setSprintIssues(newSprintIssues);

        const newBacklogIssues = [...backlogIssues];
        newBacklogIssues.splice(destination.index, 0, { ...draggedIssue, sprintId: newSprintId });
        setBacklogIssues(newBacklogIssues);
      } else {
        const newBacklogIssues = [...backlogIssues];
        newBacklogIssues.splice(source.index, 1);
        setBacklogIssues(newBacklogIssues);

        const newSprintIssues = [...sprintIssues];
        newSprintIssues.splice(destination.index, 0, { ...draggedIssue, sprintId: newSprintId });
        setSprintIssues(newSprintIssues);
      }
    }

    // Update global mock state
    updateIssue({ ...draggedIssue, sprintId: newSprintId });
  };

  if (!project) return <div className="p-8">Loading backlog...</div>;

  const filterIssues = (issueList) => issueList.filter(issue =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-8 pt-6 pb-4">
        <div className="text-sm text-slate-500 mb-2">Projects / {project.name}</div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-4">Backlog</h1>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search backlog"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 text-sm border border-slate-300 rounded-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
            <Search className="w-4 h-4 absolute left-2.5 top-2 text-slate-500" />
          </div>

          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center text-xs z-10">J</div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-green-500 text-white flex items-center justify-center text-xs z-0">A</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <DragDropContext onDragEnd={onDragEnd}>
          {sprint && (
            <BacklogList
              listId="sprint-active"
              title={sprint.name}
              issues={filterIssues(sprintIssues)}
              projectKey={projectKey}
              sprintInfo={{ startDate: sprint.startDate, endDate: sprint.endDate }}
            />
          )}

          <BacklogList
            listId="backlog"
            title="Backlog"
            issues={filterIssues(backlogIssues)}
            projectKey={projectKey}
          />
        </DragDropContext>
      </div>
    </div>
  );
}
