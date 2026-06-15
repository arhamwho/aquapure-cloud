function MaintenanceTasksWidget({ tasks = [] }) {
  if (tasks.length === 0) {
    return <p className="widget-empty">No maintenance tasks</p>;
  }

  return (
    <div className="widget-list">
      {tasks.map((item) => (
        <div key={item.id} className="widget-list__item widget-list__item--neutral">
          <div className="widget-list__dot widget-list__dot--blue" />
          <div className="widget-list__row">
            <div>
              <p className="widget-list__text">{item.task}</p>
              <span className="widget-list__meta">
                {item.plantName || `Plant #${item.plant_id}`} · {item.assigned_to}
              </span>
            </div>
            <span className="task-badge">{item.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MaintenanceTasksWidget;
