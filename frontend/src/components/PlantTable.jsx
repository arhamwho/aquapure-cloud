function PlantTable({ plants = [] }) {
  if (plants.length === 0) {
    return <p className="widget-empty">No plants found</p>;
  }

  return (
    <div className="plant-table-wrapper">
      <table className="plant-table">
        <thead>
          <tr>
            <th>Plant Name</th>
            <th>City</th>
            <th>Status</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => (
            <tr key={plant.id}>
              <td>{plant.plant_name}</td>
              <td>{plant.city}</td>
              <td>
                <span
                  className={`status-badge status-badge--${plant.status?.toLowerCase()}`}
                >
                  {plant.status}
                </span>
              </td>
              <td>
                {plant.capacity != null
                  ? `${Number(plant.capacity).toLocaleString()} L/day`
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlantTable;
