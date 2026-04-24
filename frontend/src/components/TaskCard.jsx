const PRIORITY_COLORS = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug flex-1">{task.title}</h3>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${PRIORITY_COLORS[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
      )}

      {formattedDate && (
        <p className="text-xs text-gray-400">Due: {formattedDate}</p>
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
          onClick={() => onDelete(task._id)}
          className="text-xs text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
