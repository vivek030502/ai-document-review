export default function StatCard({
  label,
  value,
  change,
  changeType = "positive",
}) {
  return (
    <div className="card stat-card">

      <div className="stat-label">
        {label}
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className={`stat-change ${changeType}`}>
        {change}
      </div>

    </div>
  );
}