import { useEffect, useState } from "react";
import PageState from "../components/PageState";
import ProgressBar from "../components/ProgressBar";

const INITIAL_METRICS = {
  cpu: 42,
  memory: 68,
  storage: 55,
  network: 31,
};

function MonitoringPage() {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: randomInRange(35, 72),
        memory: randomInRange(58, 82),
        storage: randomInRange(50, 65),
        network: randomInRange(22, 48),
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageState loading={loading} error="">
      <div className="page-stack">
        <section className="panel reports-header">
          <div className="reports-header__content">
            <div>
              <p className="reports-header__eyebrow">Infrastructure Monitoring</p>
              <h2 className="reports-header__title">System Resource Usage</h2>
              <p className="reports-header__desc">
                Live CloudWatch-style metrics for EC2 application server resources.
              </p>
            </div>
            <span className="panel__tag">Auto-refresh 4s</span>
          </div>
        </section>

        <section className="monitoring-grid">
          <ProgressBar
            label="CPU Usage"
            value={metrics.cpu}
            variant="cpu"
          />
          <ProgressBar
            label="Memory Usage"
            value={metrics.memory}
            variant="memory"
          />
          <ProgressBar
            label="Storage Usage"
            value={metrics.storage}
            variant="storage"
          />
          <ProgressBar
            label="Network Usage"
            value={metrics.network}
            variant="network"
          />
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Health Summary</h2>
            <span className="panel__tag">All systems normal</span>
          </div>
          <div className="summary-table-wrapper">
            <table className="plant-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Current</th>
                  <th>Threshold</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <MetricRow label="CPU Usage" value={metrics.cpu} threshold="80%" />
                <MetricRow label="Memory Usage" value={metrics.memory} threshold="85%" />
                <MetricRow label="Storage Usage" value={metrics.storage} threshold="90%" />
                <MetricRow label="Network Usage" value={metrics.network} threshold="75%" />
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageState>
  );
}

function MetricRow({ label, value, threshold }) {
  const status = value >= parseInt(threshold, 10) ? "Warning" : "Normal";

  return (
    <tr>
      <td>{label}</td>
      <td>{value}%</td>
      <td>{threshold}</td>
      <td>
        <span className={`status-badge status-badge--${status.toLowerCase()}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default MonitoringPage;
