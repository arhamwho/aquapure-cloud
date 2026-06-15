import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function WaterQualityChart({ records = [] }) {
  const data = records.map((record, index) => ({
    label: `Plant ${record.plant_id}`,
    ph: Number(record.ph),
    chlorine: Number(record.chlorine),
    score: record.quality_score,
    key: record.id || index,
  }));

  if (data.length === 0) {
    return <p className="chart-empty">No water quality data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#bae6fd" />
        <XAxis dataKey="label" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: "1px solid #e0f2fe",
            background: "#ffffff",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="ph"
          name="pH Level"
          stroke="#0284c7"
          strokeWidth={2}
          dot={{ fill: "#0284c7", r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="chlorine"
          name="Chlorine (mg/L)"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={{ fill: "#0ea5e9", r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WaterQualityChart;
