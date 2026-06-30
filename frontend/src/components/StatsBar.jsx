import './StatsBar.css';

const StatsBar = ({ stats }) => {
  return (
    <div className="stats-bar">
      <div className="stat-card">
        <span className="stat-number">{stats.total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-card completed">
        <span className="stat-number">{stats.completed}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat-card pending">
        <span className="stat-number">{stats.pending}</span>
        <span className="stat-label">Pending</span>
      </div>
      <div className="stat-card overdue">
        <span className="stat-number">{stats.overdue}</span>
        <span className="stat-label">Overdue</span>
      </div>
    </div>
  );
};

export default StatsBar;
