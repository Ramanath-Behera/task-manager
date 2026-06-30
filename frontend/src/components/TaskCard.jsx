function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const priorityClass = {
    High: 'badge-high',
    Medium: 'badge-medium',
    Low: 'badge-low',
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)}
      />

      <div className="task-content">
        <div className="task-title">{task.title}</div>

        {task.description && (
          <div className="task-description">{task.description}</div>
        )}

        <div className="task-meta">
          <span className={`badge ${priorityClass[task.priority]}`}>
            {task.priority}
          </span>

          {task.dueDate && (
            <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
              {isOverdue ? '⚠ Overdue · ' : '📅 '}
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button className="btn btn-secondary btn-sm" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
