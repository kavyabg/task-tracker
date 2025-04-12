import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask
} from '../api/tasks';

export default function Dashboard() {
  const navigate = useNavigate(); // 🧭

  // Add this function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // 🔐 Clear token
    navigate('/login', { replace: true });
  };
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', priority: 'medium' });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');

  const loadTasks = async () => {
    try {
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (err) {
      console.error('Error loading tasks:', err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTask(editingId, formData);
      } else {
        await createTask(formData);
      }
      setFormData({ title: '', priority: 'medium' });
      setEditingId(null);
      loadTasks();
    } catch (err) {
      console.error('Submit Error:', err);
    }
  };

  const handleEdit = (task) => {
    setFormData({ title: task.title, priority: task.priority });
    setEditingId(task._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  const handleStatusToggle = async (task) => {
    try {
      await updateTask(task._id, {
        status: task.status === 'pending' ? 'completed' : 'pending',
      });
      loadTasks();
    } catch (err) {
      console.error('Status Toggle Error:', err);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'all' ? true : task.status === filter
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 space-y-6 hidden sm:block">
        <h2 className="text-2xl font-bold mb-6">Task Tracker</h2>
        <nav className="space-y-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="block w-full text-left hover:text-blue-100"
          >
            📋 Dashboard
          </button>
          <button
            onClick={() =>
              document.getElementById('taskForm')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="block w-full text-left hover:text-blue-100"
          >
            ➕ Add Task
          </button>
          <button
  onClick={handleLogout}
  className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
>
  Logout
</button>
        </nav>
      </aside>
  
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 space-y-6">
          <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300">
            📋 Task Dashboard
          </h1>
  
          {/* Add/Edit Task Form */}
          <form
            id="taskForm"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <input
              type="text"
              placeholder="Task title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 rounded border"
              required
            />
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="p-2 rounded border"
            >
              <option value="high">🔥 High</option>
              <option value="medium">⚡ Medium</option>
              <option value="low">🌱 Low</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
          </form>
  
          {/* Filter */}
          <div className="text-center space-x-2">
            {['all', 'pending', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
  
          {/* Task List */}
          <ul className="space-y-3">
            {filteredTasks.length === 0 ? (
              <p className="text-center text-gray-500">No tasks to show.</p>
            ) : (
              filteredTasks.map((task) => (
                <li
                  key={task._id}
                  className="flex justify-between items-center p-3 border rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div>
                    <h3
                      className={`font-semibold ${
                        task.status === 'completed' ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Priority: <span className="capitalize">{task.priority}</span> | Status:{' '}
                      <span className="capitalize">{task.status}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusToggle(task)}
                      className="text-sm px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                    >
                      {task.status === 'pending' ? 'Mark Done' : 'Undo'}
                    </button>
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-sm px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );  
}
