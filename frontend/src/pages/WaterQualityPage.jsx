import { useEffect, useState } from "react";
import { getWaterQuality } from "../services/api";
import PageState from "../components/PageState";
import WaterQualityChart from "../components/charts/WaterQualityChart";

function WaterQualityPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const response = await getWaterQuality();
        setRecords(response.data || []);
      } catch (err) {
        setError(err.response?.data?.error || err.message || "Failed to load water quality data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <PageState loading={loading} error={error}>
      <div className="page-stack">
        <section className="panel">
          <div className="panel__header">
            <h2>Quality Trends</h2>
            <span className="panel__tag">{records.length} readings</span>
          </div>
          <div className="panel__body">
            <WaterQualityChart records={records} />
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Quality Records</h2>
          </div>
          <div className="plant-table-wrapper">
            <table className="plant-table">
              <thead>
                <tr>
                  <th>Plant ID</th>
                  <th>pH</th>
                  <th>Chlorine</th>
                  <th>Quality Score</th>
                  <th>Recorded At</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>Plant #{record.plant_id}</td>
                    <td>{record.ph}</td>
                    <td>{record.chlorine} mg/L</td>
                    <td>
                      <span className="quality-score">{record.quality_score}</span>
                    </td>
                    <td>
                      {record.created_at
                        ? new Date(record.created_at).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageState>
  );
}

export default WaterQualityPage;
