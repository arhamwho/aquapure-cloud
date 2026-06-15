import { useEffect, useState } from "react";
import {
  getPlants,
  getAlerts,
  getMaintenance,
  getWaterQuality,
} from "../services/api";
import StatCard from "../components/StatCard";
import PlantTable from "../components/PlantTable";
import WaterQualityChart from "../components/charts/WaterQualityChart";
import PlantStatusChart from "../components/charts/PlantStatusChart";
import CapacityChart from "../components/charts/CapacityChart";
import ActiveAlertsWidget from "../components/widgets/ActiveAlertsWidget";
import MaintenanceTasksWidget from "../components/widgets/MaintenanceTasksWidget";

function Dashboard() {
  const [plants, setPlants] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [waterQuality, setWaterQuality] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
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
            "Failed to load dashboard data. Start the backend: cd backend && npm run dev"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const totalPlants = plants.length;
  const runningPlants = plants.filter((p) => p.status === "Running").length;
  const maintenancePlants = plants.filter((p) => p.status === "Maintenance").length;
  const openAlerts = alerts.filter((a) => a.status === "Open").length;
  const pendingMaintenance = maintenance.filter((m) => m.status === "Pending").length;
  const avgWaterQuality =
    waterQuality.length > 0
      ? (
          waterQuality.reduce((sum, r) => sum + r.quality_score, 0) /
          waterQuality.length
        ).toFixed(1)
      : "—";

  const plantMap = Object.fromEntries(
    plants.map((p) => [p.id, p.plant_name])
  );

  const maintenanceWithPlants = maintenance.map((item) => ({
    ...item,
    plantName: plantMap[item.plant_id],
  }));

  const openAlertsList = alerts.filter((a) => a.status === "Open");

  if (loading) {
    return (
      <div className="dashboard__state">
        <div className="spinner" />
        <p>Loading operations data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard__state dashboard__state--error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <section className="stats-grid stats-grid--five">
        <StatCard
          title="Total Plants"
          value={totalPlants}
          subtitle="Registered facilities"
          variant="total"
          icon="◉"
        />
        <StatCard
          title="Running Plants"
          value={runningPlants}
          subtitle="Operational now"
          variant="running"
          icon="✓"
        />
        <StatCard
          title="Open Alerts"
          value={openAlerts}
          subtitle="Requires attention"
          variant="alerts"
          icon="!"
        />
        <StatCard
          title="Pending Maintenance"
          value={pendingMaintenance}
          subtitle="Awaiting action"
          variant="pending"
          icon="⚙"
        />
        <StatCard
          title="Avg Water Quality"
          value={avgWaterQuality}
          subtitle="Quality score index"
          variant="quality"
          icon="◎"
        />
      </section>

      <section className="charts-grid">
        <div className="panel">
          <div className="panel__header">
            <h2>Water Quality Analytics</h2>
            <span className="panel__tag">{waterQuality.length} readings</span>
          </div>
          <div className="panel__body">
            <WaterQualityChart records={waterQuality} />
          </div>
        </div>

        <div className="panel">
          <div className="panel__header">
            <h2>Plant Status Overview</h2>
            <span className="panel__tag">Live</span>
          </div>
          <div className="panel__body">
            <PlantStatusChart
              running={runningPlants}
              maintenance={maintenancePlants}
            />
          </div>
        </div>
      </section>

      <section className="charts-grid">
        <div className="panel">
          <div className="panel__header">
            <h2>Capacity by Plant</h2>
            <span className="panel__tag">L/day</span>
          </div>
          <div className="panel__body">
            <CapacityChart plants={plants} />
          </div>
        </div>

        <div className="widgets-column">
          <div className="panel">
            <div className="panel__header">
              <h2>Active Alerts</h2>
              <span className="panel__tag panel__tag--alert">
                {openAlerts} open
              </span>
            </div>
            <div className="panel__body panel__body--compact">
              <ActiveAlertsWidget alerts={openAlertsList} />
            </div>
          </div>

          <div className="panel">
            <div className="panel__header">
              <h2>Maintenance Tasks</h2>
              <span className="panel__tag">{maintenance.length} total</span>
            </div>
            <div className="panel__body panel__body--compact">
              <MaintenanceTasksWidget tasks={maintenanceWithPlants} />
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <h2>Plant Operations</h2>
          <span className="panel__count">{totalPlants} facilities</span>
        </div>
        <PlantTable plants={plants} />
      </section>
    </div>
  );
}

export default Dashboard;
