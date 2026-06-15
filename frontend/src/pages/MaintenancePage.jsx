import { useEffect, useState } from "react";
import { getMaintenance, getPlants } from "../services/api";
import PageState from "../components/PageState";

function MaintenancePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const [maintenanceRes, plantsRes] = await Promise.all([
          getMaintenance(),
          getPlants(),
        ]);

        const plantMap = Object.fromEntries(
          (plantsRes.data || []).map((p) => [p.id, p.plant_name])
        );

        setTasks(
          (maintenanceRes.data || []).map((item) => ({
            ...item,
            plantName: plantMap[item.plant_id] || `Plant #${item.plant_id}`,
          }))
        );
      } catch (err) {
        setError(err.response?.data?.error || err.message || "Failed to load maintenance data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <PageState loading={loading} error={error}>
      <section className="panel">
        <div className="panel__header">
          <h2>Maintenance Logs</h2>
          <span className="panel__count">{tasks.length} tasks</span>
        </div>
        <div className="plant-table-wrapper">
          <table className="plant-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Plant</th>
                <th>Assigned To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.plantName}</td>
                  <td>{task.assigned_to}</td>
                  <td>
                    <span className="task-badge">{task.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageState>
  );
}

export default MaintenancePage;
