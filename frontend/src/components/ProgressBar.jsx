function ProgressBar({ label, value, max = 100, unit = "%", variant = "default" }) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className="progress-card">
      <div className="progress-card__header">
        <span className="progress-card__label">{label}</span>
        <span className="progress-card__value">
          {value}
          {unit}
        </span>
      </div>
      <div className="progress-card__track">
        <div
          className={`progress-card__fill progress-card__fill--${variant}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="progress-card__percent">{percentage}% utilized</span>
    </div>
  );
}

export default ProgressBar;
