import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/useAuth';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

const COLUMNS = [
  { key: 'todo', label: 'To Do', color: 'bg-slate-100', headerColor: 'bg-slate-200 text-slate-700' },
  { key: 'in-progress', label: 'In Progress', color: 'bg-blue-50', headerColor: 'bg-blue-100 text-blue-700' },
  { key: 'done', label: 'Done', color: 'bg-green-50', headerColor: 'bg-green-100 text-green-700' },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setError('');
        const { data } = await api.get('/tasks');
        if (!cancelled) setTasks(data);
      } catch {
        if (!cancelled) setError('Failed to load tasks. Please refresh the page.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const handleSaved = (savedTask, mode) => {
    if (mode === 'add') {
      setTasks((prev) => [savedTask, ...prev]);
    } else {
      setTasks((prev) => prev.map((t) => (t._id === savedTask._id ? savedTask : t)));
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch {
      alert('Failed to delete task. Please try again.');
    }
  };

  const openAdd = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const grouped = COLUMNS.reduce((acc, col) => {
    acc[col.key] = tasks.filter((t) => t.status === col.key);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-indigo-600">TaskBridge</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:block">Hello, {user?.name}</span>
          <button
            onClick={logout}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">My Tasks</h2>
            <p className="text-sm text-gray-500 mt-0.5">{tasks.length} task{tasks.length !== 1 ? 's' : ''} total</p>
          </div>
          <button
            onClick={openAdd}
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            + Add Task
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLUMNS.map(({ key, label, color, headerColor }) => (
              <div key={key} className={`rounded-xl ${color} p-4`}>
                <div className={`flex items-center justify-between mb-4 px-3 py-1.5 rounded-lg ${headerColor}`}>
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-xs font-medium bg-white/60 px-2 py-0.5 rounded-full">
                    {grouped[key].length}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {grouped[key].length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-6">No tasks here</p>
                  ) : (
                    grouped[key].map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <TaskModal
          task={editingTask}
          onClose={closeModal}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};

export default Dashboard;
