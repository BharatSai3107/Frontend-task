'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Edit3, LogOut, Search, User, Filter, X, CheckCircle2,
  Clock, AlertCircle, Home, ListTodo, Settings, Bell, HelpCircle, 
  ChevronDown, Calendar, UserCircle, MoreVertical, Grid3x3, Table2
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [search, setSearch] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', status: 'Pending' as const, priority: 'Medium' as const });
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'board'>('table');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await api.get('/auth/user');
      setUser(userRes.data);
      setProfileForm({ name: userRes.data.name, email: userRes.data.email });
      
      const params = new URLSearchParams();
      if (filterStatus) params.append('status', filterStatus);
      if (filterPriority) params.append('priority', filterPriority);
      if (search) params.append('search', search);
      
      const tasksRes = await api.get(`/tasks?${params.toString()}`);
      setTasks(tasksRes.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        Cookies.remove('token');
        router.push('/login');
      } else {
        toast.error('Failed to load data');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterStatus, filterPriority]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/tasks', taskForm);
      toast.success('Task created successfully!');
      setIsTaskModalOpen(false);
      setTaskForm({ title: '', description: '', status: 'Pending', priority: 'Medium' });
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    
    setLoading(true);
    try {
      await api.put(`/tasks/${editingTask._id}`, taskForm);
      toast.success('Task updated successfully!');
      setIsTaskModalOpen(false);
      setEditingTask(null);
      setTaskForm({ title: '', description: '', status: 'Pending', priority: 'Medium' });
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted successfully!');
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Failed to delete task');
    }
  };

  const handleUpdateStatus = async (taskId: string, newStatus: 'Pending' | 'In Progress' | 'Completed') => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      toast.success('Task status updated!');
      fetchData();
    } catch (err: any) {
      toast.error('Failed to update status');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put('/auth/profile', profileForm);
      setUser(res.data);
      toast.success('Profile updated successfully!');
      setIsProfileModalOpen(false);
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
    setTaskForm({ title: '', description: '', status: 'Pending', priority: 'Medium' });
  };

  const handleLogout = () => {
    Cookies.remove('token');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'In Progress':
        return 'status-in-progress';
      default:
        return 'status-pending';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      default:
        return 'priority-low';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = !search || 
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    pending: tasks.filter(t => t.status === 'Pending').length,
  };

  const progressPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen flex dashboard-bg">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-transparent border-r border-transparent flex flex-col transition-all duration-300 sticky top-0 h-screen`}>
        {/* Centered App Name/Logo */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4 border-b border-gray-200 gap-2">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mb-2">
            <ListTodo className="w-7 h-7 text-white" />
          </div>
          {sidebarOpen && (
            <>
              <div className="font-extrabold text-2xl text-primary-700 tracking-wide mb-1">Wheller</div>
              <div className="text-xs text-gray-500 mb-2 mt-2">Task Management</div>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto scrollbar-thin">
          <a href="/" className="flex items-center gap-3 px-3 py-2 bg-primary-50 text-primary-700 rounded-lg font-semibold hover:bg-primary-100 transition">
            <Home className="w-5 h-5" />
            {sidebarOpen && <span>Home</span>}
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-primary-50 rounded-lg font-semibold transition">
            <ListTodo className="w-5 h-5" />
            {sidebarOpen && <span>My Work</span>}
          </a>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{user?.name}</div>
                  <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-transparent border-b border-transparent sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.total} tasks total
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <HelpCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {stats.total > 0 && (
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span className="font-semibold">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="px-6 py-3 bg-transparent border-t border-transparent action-bar">
            <button
              onClick={() => {
                setEditingTask(null);
                setTaskForm({ title: '', description: '', status: 'Pending', priority: 'Medium' });
                setIsTaskModalOpen(true);
              }}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Task
            </button>

            <div className="flex-1 min-w-[220px] max-w-md">
              <div className="relative flex items-center w-full">
                <span className="absolute left-4 flex items-center h-full">
                  <Search className="text-gray-400 w-5 h-5 pointer-events-none" />
                </span>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-center"
                  style={{ minHeight: '44px' }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('table')}
                  className={`btn-icon ${viewMode === 'table' ? 'bg-primary-600 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <Table2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('board')}
                  className={`btn-icon ${viewMode === 'board' ? 'bg-primary-600 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <ListTodo className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-6">Create your first task to get started</p>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Task
              </button>
            </div>
          ) : viewMode === 'table' ? (
            /* Table View */
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Task</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTasks.map((task) => (
                      <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{task.title}</div>
                            {task.description && (
                              <div className="text-sm text-gray-500 mt-1 line-clamp-1">{task.description}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={task.status}
                            onChange={(e) => handleUpdateStatus(task._id, e.target.value as any)}
                            className={`status-badge ${getStatusBadgeClass(task.status)} border-0 cursor-pointer`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`priority-badge ${getPriorityBadgeClass(task.priority)}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(task)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Board/Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 flex-1">{task.title}</h3>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(task)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {task.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                  )}

                  <div className="flex items-center gap-2 mb-3">
                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateStatus(task._id, e.target.value as any)}
                      className={`status-badge ${getStatusBadgeClass(task.status)} border-0 cursor-pointer text-xs`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <span className={`priority-badge ${getPriorityBadgeClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 pt-3 border-t border-gray-200">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Task Modal */}
      <AnimatePresence>
        {isTaskModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            style={{ minHeight: '100vh', minWidth: '100vw' }}
            onClick={closeTaskModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl w-full max-w-md mx-auto my-auto flex flex-col border border-blue-100"
              style={{
                boxShadow: '0 12px 48px 0 rgba(24,31,42,0.28)',
                background: '#fff',
                color: '#181F2A',
                border: '1.5px solid #2563eb',
                zIndex: 1000
              }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h2>
                <button
                  onClick={closeTaskModal}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    className="input-field"
                    placeholder="Task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                    className="input-field min-h-[100px] resize-none"
                    placeholder="Task description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={taskForm.status}
                      onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value as any })}
                      className="input-field"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as any })}
                      className="input-field"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeTaskModal}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editingTask ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            style={{ minHeight: '100vh', minWidth: '100vw' }}
            onClick={() => setIsProfileModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl w-full max-w-md mx-auto my-auto flex flex-col border border-blue-100"
              style={{
                boxShadow: '0 12px 48px 0 rgba(24,31,42,0.28)',
                background: '#fff',
                color: '#181F2A',
                border: '1.5px solid #2563eb',
                zIndex: 1000
              }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
