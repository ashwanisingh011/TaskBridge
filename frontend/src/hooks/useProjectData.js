export const mockProjects = [
  {
    id: 'p1',
    key: 'TASK',
    name: 'TaskBridge Overhaul',
    description: 'Rebuilding TaskBridge to look like Jira.',
    lead: 'Jules',
  },
  {
    id: 'p2',
    key: 'WEB',
    name: 'Website Redesign',
    description: 'Updating the marketing website.',
    lead: 'Alice',
  }
];

export const mockUsers = [
  { id: 'u1', name: 'Jules', avatar: 'https://i.pravatar.cc/150?u=u1' },
  { id: 'u2', name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=u2' },
  { id: 'u3', name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=u3' }
];

export const mockIssues = [
  {
    id: 'i1',
    key: 'TASK-1',
    projectId: 'p1',
    title: 'Setup Next.js routing',
    description: 'We need to set up the app router with protected routes.',
    type: 'Story', // Epic, Story, Task, Bug
    priority: 'High', // Highest, High, Medium, Low
    status: 'Done', // To Do, In Progress, Review, Done
    assigneeId: 'u1',
    reporterId: 'u2',
    storyPoints: 5,
    sprintId: 's1',
  },
  {
    id: 'i2',
    key: 'TASK-2',
    projectId: 'p1',
    title: 'Create TopNavbar component',
    description: 'Global top navigation bar.',
    type: 'Task',
    priority: 'Medium',
    status: 'In Progress',
    assigneeId: 'u1',
    reporterId: 'u1',
    storyPoints: 3,
    sprintId: 's1',
  },
  {
    id: 'i3',
    key: 'TASK-3',
    projectId: 'p1',
    title: 'Implement drag and drop for Kanban',
    description: 'Use @hello-pangea/dnd to build the board.',
    type: 'Story',
    priority: 'Highest',
    status: 'To Do',
    assigneeId: null,
    reporterId: 'u1',
    storyPoints: 8,
    sprintId: 's1',
  },
  {
    id: 'i4',
    key: 'TASK-4',
    projectId: 'p1',
    title: 'Sidebar rendering bug',
    description: 'Sidebar does not collapse properly on mobile.',
    type: 'Bug',
    priority: 'High',
    status: 'Review',
    assigneeId: 'u3',
    reporterId: 'u2',
    storyPoints: 2,
    sprintId: 's1',
  },
  {
    id: 'i5',
    key: 'TASK-5',
    projectId: 'p1',
    title: 'Backlog page UI',
    description: 'Create the backlog view.',
    type: 'Story',
    priority: 'Medium',
    status: 'To Do',
    assigneeId: null,
    reporterId: 'u1',
    storyPoints: 5,
    sprintId: null, // In backlog
  }
];

export const mockSprints = [
  {
    id: 's1',
    projectId: 'p1',
    name: 'Sprint 1',
    state: 'active', // active, future, closed
    startDate: '2023-10-01',
    endDate: '2023-10-14',
  }
];

import { useState } from 'react';

export function useProjectData() {
  const [projects, setProjects] = useState(mockProjects);
  const [issues, setIssues] = useState(mockIssues);
  const [sprints, setSprints] = useState(mockSprints);
  const [users, setUsers] = useState(mockUsers);

  const getProjectByKey = (key) => projects.find((p) => p.key === key);

  const getIssuesByProject = (projectId) => issues.filter((i) => i.projectId === projectId);

  const getSprintsByProject = (projectId) => sprints.filter((s) => s.projectId === projectId);

  const updateIssue = (updatedIssue) => {
    setIssues((prev) => prev.map((i) => i.id === updatedIssue.id ? updatedIssue : i));
  };

  const getUser = (userId) => users.find((u) => u.id === userId);

  return {
    projects,
    issues,
    sprints,
    users,
    getProjectByKey,
    getIssuesByProject,
    getSprintsByProject,
    updateIssue,
    getUser,
    setIssues
  };
}
