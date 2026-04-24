import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/useAuth';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const loadTasks = async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    try {
      setError('');
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch {
      setError('Failed to load tasks. Please refresh the page.');
    } finally {
      if (showSpinner) setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(true);
  }, []);

// handleDelete moved to TaskCard

  const openAdd = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  const columns = [
    { key: 'todo', label: 'To Do', color: 'bg-slate-100 dark:bg-slate-800/50', headerColor: 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200', items: todoTasks },
    { key: 'in-progress', label: 'In Progress', color: 'bg-blue-50 dark:bg-blue-900/20', headerColor: 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200', items: inProgressTasks },
    { key: 'done', label: 'Done', color: 'bg-green-50 dark:bg-green-900/20', headerColor: 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200', items: doneTasks },
  ];

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setIsDarkMode(isDark);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-indigo-600">TaskBridge</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-lg p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">Hello, {user?.name}</span>
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
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">My Tasks</h2>
            <p className="text-sm text-gray-500 mt-0.5">{tasks.length} task{tasks.length !== 1 ? 's' : ''} total</p>
          </div>
          <button
            onClick={openAdd}
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create New Task
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {columns.map(({ key, label, color, headerColor, items }) => (
              <div key={key} className={`rounded-xl ${color} p-4`}>
                <div className={`flex items-center justify-between mb-4 px-3 py-1.5 rounded-lg ${headerColor}`}>
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-xs font-medium bg-white/60 px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {items.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-6">No tasks here</p>
                  ) : (
                    items.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={openEdit}
                        refreshTasks={() => loadTasks(false)}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        taskToEdit={editingTask}
        refreshTasks={() => loadTasks(false)}
      />
    </div>
  );
};

export default Dashboard;
