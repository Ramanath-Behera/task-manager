import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import EditTaskModal from '../components/EditTaskModal';
import Toast from '../components/Toast';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);

  // filters and search
  const [filter, setFilter] = useState('all'); // all | pending | completed
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  // add task form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState('');

  // edit modal
  const [editTask, setEditTask] = useState(null);

  // toast
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const fetchTasks = useCallback(async () => {
    try {
      const params = { sort };
      if (filter !== 'all') params.status = filter;
      if (search) params.search = search;

      const res = await api.get('/tasks', { params });
      setTasks(res.data.tasks);
    } catch (err) {
      showToast('Failed to load tasks', 'error');
    }
  }, [filter, search, sort]);

  const fetchStats = async () => {
    try {
      const res = await api.get('/tasks/stats');
      setStats(res.data);
    } catch (err) {
      console.log('Stats error:', err.message);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchStats()]);
      setLoading(false);
    };
    load();
  }, [fetchTasks]);

  // ── Add Task ────────────────────────────────────────────────
  const handleAddTask = async (e) => {
    e.preventDefault();
    setAddError('');

    if (!newTitle.trim()) {
      setAddError('Title is required');
      return;
    }

    setAddLoading(true);

    try {
      await api.post('/tasks', {
        title: newTitle,
        description: newDesc,
        priority: newPriority,
        dueDate: newDueDate || null,
      });

      // reset form
      setNewTitle('');
      setNewDesc('');
      setNewPriority('Medium');
      setNewDueDate('');
      setShowAddForm(false);

      await fetchTasks();
      await fetchStats();
      showToast('Task added!');
    } catch (err) {
      setAddError(err.response?.data?.message || 'Failed to add task');
    } finally {
      setAddLoading(false);
    }
  };

  // ── Toggle ───────────────────────────────────────────────────
  const handleToggle = async (taskId) => {
    try {
      const res = await api.patch(`/tasks/${taskId}/toggle`);
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? res.data.task : t))
      );
      fetchStats();
      showToast(res.data.task.completed ? 'Marked complete!' : 'Marked pending');
    } catch (err) {
      showToast('Failed to update task', 'error');
    }
  };

  // ── Delete ───────────────────────────────────────────────────
  const handleDelete = async (taskId) => {
    if (!confirm('Delete this task?')) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      fetchStats();
      showToast('Task deleted');
    } catch (err) {
      showToast('Failed to delete task', 'error');
    }
  };

  // ── Edit updated ─────────────────────────────────────────────
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    fetchStats();
    showToast('Task updated!');
  };

  // ── Delete completed ─────────────────────────────────────────
  const handleDeleteCompleted = async () => {
    if (!confirm('Delete all completed tasks?')) return;

    try {
      await api.delete('/tasks/completed');
      await fetchTasks();
      await fetchStats();
      showToast('Completed tasks deleted');
    } catch (err) {
      showToast('Failed', 'error');
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: stats.overdue > 0 ? '#dc2626' : '#ff5a5f' }}>
              {stats.overdue}
            </div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>

        {/* Add Task */}
        <div className="add-task-section">
          <div className="add-task-toggle">
            <button
              className="btn btn-primary"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? '✕ Cancel' : '+ Add Task'}
            </button>

            {stats.completed > 0 && (
              <button
                className="btn btn-danger btn-sm"
                style={{ marginLeft: '10px' }}
                onClick={handleDeleteCompleted}
              >
                Delete Completed
              </button>
            )}
          </div>

          {showAddForm && (
            <div className="add-task-form">
              <h3>New Task</h3>
              <form onSubmit={handleAddTask}>
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    placeholder="What do you need to do?"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Optional details"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Priority</label>
                    <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Due Date</label>
                    <input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                    />
                  </div>
                </div>

                {addError && <div className="error-msg">{addError}</div>}

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={addLoading}>
                    {addLoading ? 'Adding...' : 'Add Task'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Filter tabs */}
        <div className="filter-tabs">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">By Priority</option>
            <option value="dueDate">By Due Date</option>
          </select>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '40px' }}>📋</div>
            <p>No tasks found. Add one above!</p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggle}
                onEdit={setEditTask}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdated={handleTaskUpdated}
        />
      )}

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </>
  );
}

export default Dashboard;
