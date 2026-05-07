"use client";
import api from '../api/axios';

const PRIORITY_COLORS = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-amber-950 dark:text-amber-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200',
};

const TaskCard = ({ task, onEdit, refreshTasks }) => {
  let isOverdue = false;
  let daysRemaining = null;

  if (task.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    if (due < today) {
      isOverdue = true;
    } else {
      const diffTime = due - today;
      daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }
  const handleDelete = async () => {
    if (window.confirm('Delete this task?')) {
      try {
        await api.delete(`/tasks/${task._id}`);
        if (refreshTasks) refreshTasks();
      } catch (err) {
        alert('Failed to delete task.');
      }
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-lg shadow-sm border ${isOverdue ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} p-4 flex flex-col gap-2 hover:shadow-md transition-shadow dark:hover:border-slate-700`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-white leading-snug flex-1">{task.title}</h3>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${PRIORITY_COLORS[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2 dark:text-slate-400">{task.description}</p>
      )}

      {isOverdue && (
        <p className="text-xs font-bold text-red-500">OVERDUE</p>
      )}
      {daysRemaining !== null && (
        <p className="text-xs text-slate-400 dark:text-slate-500">Due in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}</p>
      )}

      {task.status && (
        <p className="text-xs text-slate-400 capitalize dark:text-slate-500">{task.status}</p>
      )}

      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={() => onEdit(task)}
          className="text-xs text-blue-600 hover:underline dark:text-[#579DFF]"
        >
          Edit
        </button>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <button
          onClick={handleDelete}
          className="text-xs text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
