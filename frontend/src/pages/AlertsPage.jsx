import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";
import PageState from "../components/PageState";

function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const response = await getAlerts();
        setAlerts(response.data || []);
      } catch (err) {
        setError(err.response?.data?.error || err.message || "Failed to load alerts");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const openCount = alerts.filter((a) => a.status === "Open").length;

  return (
    <PageState loading={loading} error={error}>
      <section className="panel">
        <div className="panel__header">
          <h2>System Alerts</h2>
          <span className="panel__tag panel__tag--alert">{openCount} open</span>
        </div>
        <div className="plant-table-wrapper">
          <table className="plant-table">
            <thead>
              <tr>
                <th>Message</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.message}</td>
                  <td>
                    <span
                      className={`severity-badge severity-badge--${alert.severity.toLowerCase()}`}
                    >
                      {alert.severity}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge status-badge--${alert.status.toLowerCase()}`}
                    >
                      {alert.status}
                    </span>
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

export default AlertsPage;
