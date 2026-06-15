import { useEffect, useState } from "react";
import {
  getPlants,
  getAlerts,
  getMaintenance,
  getWaterQuality,
} from "../services/api";
import PageState from "../components/PageState";
import StatCard from "../components/StatCard";
import { exportOperationalSummaryPDF } from "../utils/exportOperationalSummary";

function ReportsPage() {
  const [plants, setPlants] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [waterQuality, setWaterQuality] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const [plantsRes, alertsRes, maintenanceRes, waterQualityRes] =
          await Promise.all([
            getPlants(),
            getAlerts(),
            getMaintenance(),
            getWaterQuality(),
          ]);

        setPlants(plantsRes.data || []);
        setAlerts(alertsRes.data || []);
        setMaintenance(maintenanceRes.data || []);
        setWaterQuality(waterQualityRes.data || []);
      } catch (err) {
        setError(
          err.response?.data?.error ||
            err.message ||
            "Failed to load report data"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const summary = {
    totalPlants: plants.length,
    runningPlants: plants.filter((p) => p.status === "Running").length,
    maintenanceTasks: maintenance.length,
    openAlerts: alerts.filter((a) => a.status === "Open").length,
    avgWaterQuality:
      waterQuality.length > 0
        ? (
            waterQuality.reduce((sum, r) => sum + r.quality_score, 0) /
            waterQuality.length
          ).toFixed(1)
        : "—",
  };

  function handleExportPDF() {
    setExporting(true);
    try {
      exportOperationalSummaryPDF({
        summary,
        plants,
        alerts,
        maintenance,
        waterQuality,
      });
    } finally {
      setExporting(false);
    }
  }

  return (
    <PageState loading={loading} error={error}>
      <div className="reports-page">
        <section className="panel reports-header">
          <div className="reports-header__content">
            <div>
              <p className="reports-header__eyebrow">Reports & Analytics</p>
              <h2 className="reports-header__title">Operational Summary</h2>
              <p className="reports-header__desc">
                Live snapshot of plant operations, maintenance, alerts, and
                water quality performance.
              </p>
            </div>
            <button
              type="button"
              className="export-btn"
              onClick={handleExportPDF}
              disabled={exporting}
            >
              {exporting ? "Exporting..." : "Export PDF"}
            </button>
          </div>
        </section>

        <section className="stats-grid stats-grid--five">
          <StatCard
            title="Total Plants"
            value={summary.totalPlants}
            subtitle="Registered facilities"
            variant="total"
            icon="◉"
          />
          <StatCard
            title="Running Plants"
            value={summary.runningPlants}
            subtitle="Operational now"
            variant="running"
            icon="✓"
          />
          <StatCard
            title="Maintenance Tasks"
            value={summary.maintenanceTasks}
            subtitle="Total logged tasks"
            variant="pending"
            icon="⚙"
          />
          <StatCard
            title="Open Alerts"
            value={summary.openAlerts}
            subtitle="Requires attention"
            variant="alerts"
            icon="!"
          />
          <StatCard
            title="Average Water Quality"
            value={summary.avgWaterQuality}
            subtitle="Quality score index"
            variant="quality"
            icon="◎"
          />
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Summary Breakdown</h2>
            <span className="panel__tag">Live data</span>
          </div>
          <div className="summary-table-wrapper">
            <table className="plant-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Plants</td>
                  <td>{summary.totalPlants}</td>
                  <td>/api/plants</td>
                </tr>
                <tr>
                  <td>Running Plants</td>
                  <td>{summary.runningPlants}</td>
                  <td>Plants with status Running</td>
                </tr>
                <tr>
                  <td>Maintenance Tasks</td>
                  <td>{summary.maintenanceTasks}</td>
                  <td>/api/maintenance</td>
                </tr>
                <tr>
                  <td>Open Alerts</td>
                  <td>{summary.openAlerts}</td>
                  <td>/api/alerts</td>
                </tr>
                <tr>
                  <td>Average Water Quality</td>
                  <td>{summary.avgWaterQuality}</td>
                  <td>/api/water-quality</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageState>
  );
}

export default ReportsPage;
