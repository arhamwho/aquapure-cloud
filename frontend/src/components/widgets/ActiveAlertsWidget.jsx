function ActiveAlertsWidget({ alerts = [] }) {
  if (alerts.length === 0) {
    return <p className="widget-empty">No active alerts</p>;
  }

  return (
    <div className="widget-list">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`widget-list__item widget-list__item--${alert.severity.toLowerCase()}`}
        >
          <div className="widget-list__dot" />
          <div>
            <p className="widget-list__text">{alert.message}</p>
            <span className="widget-list__meta">{alert.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActiveAlertsWidget;
