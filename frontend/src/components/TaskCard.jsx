"use client";
import api from '../api/axios';

const PRIORITY_COLORS = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
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
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${isOverdue ? 'border-red-500' : 'border-gray-100 dark:border-gray-700'} p-4 flex flex-col gap-2 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white leading-snug flex-1">{task.title}</h3>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${PRIORITY_COLORS[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
      )}

      {isOverdue && (
        <p className="text-xs font-bold text-red-500">OVERDUE</p>
      )}
      {daysRemaining !== null && (
        <p className="text-xs text-gray-400">Due in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}</p>
      )}

      {task.status && (
        <p className="text-xs text-gray-400 capitalize">{task.status}</p>
      )}

      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={() => onEdit(task)}
          className="text-xs text-indigo-600 hover:underline"
        >
          Edit
        </button>
        <span className="text-gray-300">|</span>
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
