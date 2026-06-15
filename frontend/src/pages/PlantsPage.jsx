import { useEffect, useState } from "react";
import { getPlants } from "../services/api";
import PageState from "../components/PageState";
import PlantTable from "../components/PlantTable";

function PlantsPage() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const response = await getPlants();
        setPlants(response.data || []);
      } catch (err) {
        setError(err.response?.data?.error || err.message || "Failed to load plants");
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
          <h2>All Plants</h2>
          <span className="panel__count">{plants.length} facilities</span>
        </div>
        <PlantTable plants={plants} />
      </section>
    </PageState>
  );
}

export default PlantsPage;
