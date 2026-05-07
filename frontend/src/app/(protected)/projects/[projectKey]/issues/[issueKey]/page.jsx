"use client";

import { use, useState, useEffect } from 'react';
import { useProjectData } from '@/hooks/useProjectData';
import { IssueTypeIcon } from '@/components/IssueIcon';
import { PriorityIcon } from '@/components/PriorityIcon';
import { Share2, MoreHorizontal, Eye, ThumbsUp, X, Check, Paperclip, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function IssuePage({ params }) {
  const unwrappedParams = use(params);
  const projectKey = unwrappedParams.projectKey;
  const issueKey = unwrappedParams.issueKey;

  const { issues, getUser, updateIssue, getProjectByKey } = useProjectData();
  const [issue, setIssue] = useState(null);
  const [project, setProject] = useState(null);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descValue, setDescValue] = useState('');

  useEffect(() => {
    const p = getProjectByKey(projectKey);
    if(p.id !== project?.id) setProject(p);

    const foundIssue = issues.find(i => i.key === issueKey && i.projectId === p?.id);
    if (foundIssue) {
      setIssue(foundIssue);
      setDescValue(foundIssue.description || '');
    }
  }, [projectKey, issueKey, issues]);

  if (!issue || !project) return <div className="p-4 text-slate-500 dark:text-slate-400">Loading issue...</div>;

  const assignee = issue.assigneeId ? getUser(issue.assigneeId) : null;
  const reporter = issue.reporterId ? getUser(issue.reporterId) : null;

  const handleSaveDesc = () => {
    updateIssue({ ...issue, description: descValue });
    setIsEditingDesc(false);
  };

  const handleStatusChange = (e) => {
    updateIssue({ ...issue, status: e.target.value });
  };

  return (
    <div className="flex flex-col h-full bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      {/* Top Header */}
      <div className="px-4 pt-4 pb-4 flex items-center justify-between border-b border-transparent dark:border-slate-800">
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-500">
          <Link href={`/projects/${projectKey}/board`} className="hover:underline">Projects</Link>
          <span>/</span>
          <Link href={`/projects/${projectKey}/board`} className="hover:underline">{project.name}</Link>
          <span>/</span>
          <div className="flex items-center gap-1.5 text-slate-700 font-medium ml-1 dark:text-slate-300">
            <IssueTypeIcon type={issue.type} />
            <span>{issue.key}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <button className="p-1.5 hover:bg-slate-100 rounded-sm transition-colors flex items-center gap-1.5 text-sm dark:hover:bg-slate-900">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="p-1.5 hover:bg-slate-100 rounded-sm transition-colors flex items-center gap-1.5 text-sm dark:hover:bg-slate-900">
            <Eye className="w-4 h-4" /> 1
          </button>
          <button className="p-1.5 hover:bg-slate-100 rounded-sm transition-colors flex items-center gap-1.5 text-sm dark:hover:bg-slate-900">
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-slate-100 rounded-sm transition-colors dark:hover:bg-slate-900">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col lg:flex-row gap-10">
        {/* Left Column - Main Content */}
        <div className="flex-[2] min-w-0">
          <h1 className="text-2xl font-semibold mb-4 hover:bg-slate-50 p-1 -ml-1 rounded-sm cursor-text transition-colors dark:hover:bg-slate-900">
            {issue.title}
          </h1>

          <div className="flex items-center gap-2 mb-4 text-sm text-slate-600 font-medium dark:text-slate-300">
            <button className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-sm transition-colors dark:bg-slate-900 dark:hover:bg-slate-800">
              <Paperclip className="w-4 h-4" /> Attach
            </button>
            <button className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-sm transition-colors dark:bg-slate-900 dark:hover:bg-slate-800">
              <LinkIcon className="w-4 h-4" /> Link issue
            </button>
          </div>

          <div className="mb-5">
            <h3 className="font-semibold text-slate-800 mb-3 dark:text-slate-100">Description</h3>
            {isEditingDesc ? (
              <div className="space-y-3">
                <textarea
                  value={descValue}
                  onChange={(e) => setDescValue(e.target.value)}
                  className="w-full min-h-[150px] p-3 border border-blue-500 rounded-sm outline-none resize-y text-sm focus:ring-1 focus:ring-blue-500 bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 dark:border-[#579DFF]"
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveDesc}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-sm text-sm font-medium transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { setIsEditingDesc(false); setDescValue(issue.description); }}
                    className="text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-sm text-sm font-medium transition-colors dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingDesc(true)}
                className="text-slate-700 text-sm min-h-[100px] hover:bg-slate-50 p-2 -ml-2 rounded-sm cursor-text transition-colors dark:text-slate-300 dark:hover:bg-slate-900"
              >
                {issue.description || <span className="text-slate-400 italic dark:text-slate-500">Add a description...</span>}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800 mb-4 dark:text-slate-100">Activity</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-medium shrink-0">
                J
              </div>
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full h-10 px-3 border border-slate-300 rounded-sm text-sm bg-white text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="text-center py-3 text-sm text-slate-500 border border-slate-200 border-dashed rounded-sm bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              No recent activity
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="flex-1 max-w-sm">
          <div className="mb-4">
            <select
              value={issue.status}
              onChange={handleStatusChange}
              className="w-auto bg-slate-100 hover:bg-slate-200 border border-transparent font-semibold text-slate-700 text-sm rounded-sm px-3 py-1.5 outline-none transition-colors appearance-none cursor-pointer uppercase tracking-wider dark:bg-blue-950/50 dark:text-[#85B8FF] dark:hover:bg-blue-950 dark:border-blue-900/40"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="border border-slate-200 rounded-sm dark:border-slate-800">
            <div className="px-4 py-3 font-semibold text-sm border-b border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900">
              Details
            </div>
            <div className="p-4 space-y-4 text-sm">
              <div className="flex">
                <div className="w-1/3 text-slate-500 font-medium dark:text-slate-500">Assignee</div>
                <div className="w-2/3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-medium overflow-hidden">
                    {assignee ? (
                      assignee.avatar ? (
                        <img src={assignee.avatar} alt={assignee.name} className="w-full h-full object-cover" />
                      ) : (
                        assignee.name.charAt(0).toUpperCase()
                      )
                    ) : null}
                  </div>
                  <span className="text-slate-700 hover:bg-slate-100 px-1 py-0.5 rounded-sm cursor-pointer dark:text-slate-300 dark:hover:bg-slate-900">
                    {assignee ? assignee.name : 'Unassigned'}
                  </span>
                </div>
              </div>

              <div className="flex">
                <div className="w-1/3 text-slate-500 font-medium dark:text-slate-500">Reporter</div>
                <div className="w-2/3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-400 text-white flex items-center justify-center text-[10px] font-medium overflow-hidden">
                    {reporter ? (
                      reporter.avatar ? (
                        <img src={reporter.avatar} alt={reporter.name} className="w-full h-full object-cover" />
                      ) : (
                        reporter.name.charAt(0).toUpperCase()
                      )
                    ) : null}
                  </div>
                  <span className="text-slate-700 hover:bg-slate-100 px-1 py-0.5 rounded-sm cursor-pointer dark:text-slate-300 dark:hover:bg-slate-900">
                    {reporter ? reporter.name : 'Unknown'}
                  </span>
                </div>
              </div>

              <div className="flex">
                <div className="w-1/3 text-slate-500 font-medium dark:text-slate-500">Priority</div>
                <div className="w-2/3 flex items-center gap-2 hover:bg-slate-100 px-1 py-0.5 rounded-sm cursor-pointer -ml-1 w-max dark:hover:bg-slate-900">
                  <PriorityIcon priority={issue.priority} />
                  <span className="text-slate-700 dark:text-slate-300">{issue.priority}</span>
                </div>
              </div>

              <div className="flex">
                <div className="w-1/3 text-slate-500 font-medium dark:text-slate-500">Sprint</div>
                <div className="w-2/3">
                  <span className="text-blue-600 hover:underline cursor-pointer dark:text-[#579DFF]">
                    {issue.sprintId ? 'Sprint 1' : 'None'}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-1/3 text-slate-500 font-medium dark:text-slate-500">Story point</div>
                <div className="w-2/3">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                    {issue.storyPoints || '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
