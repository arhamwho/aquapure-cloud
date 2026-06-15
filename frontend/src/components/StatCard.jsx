function StatCard({ title, value, subtitle, variant = "default", icon }) {
  return (
    <div className={`stat-card stat-card--${variant}`}>
      <div className="stat-card__top">
        <p className="stat-card__title">{title}</p>
        {icon && <span className="stat-card__icon">{icon}</span>}
      </div>
      <p className="stat-card__value">{value}</p>
      {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
    </div>
  );
}

export default StatCard;
