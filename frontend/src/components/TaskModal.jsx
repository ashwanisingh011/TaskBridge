"use client";
import { useState, useEffect } from 'react';
import api from '../api/axios';

const initialForm = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
};

const TaskModal = ({ isOpen, onClose, taskToEdit, refreshTasks }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setForm({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        status: taskToEdit.status || 'todo',
        priority: taskToEdit.priority || 'medium',
        dueDate: taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : '',
      });
    } else {
      setForm(initialForm);
    }
    setError('');
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.dueDate) {
        delete payload.dueDate;
      }

      if (taskToEdit) {
        await api.put(`/tasks/${taskToEdit._id}`, payload);
      } else {
        await api.post('/tasks', payload);
      }
      if (refreshTasks) refreshTasks();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            {taskToEdit ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none dark:hover:text-white"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-slate-200 text-slate-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="Optional description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-slate-200 text-slate-700 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-slate-200 text-slate-700 mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-slate-200 text-slate-700 mb-1">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-700 border border-slate-300 dark:text-slate-200 rounded hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Saving…' : taskToEdit ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
