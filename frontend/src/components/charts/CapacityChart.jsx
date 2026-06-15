import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CapacityChart({ plants }) {
  const data = plants.map((plant) => ({
    name: plant.plant_name.replace(" Plant", ""),
    capacity: plant.capacity,
  }));

  if (data.length === 0) {
    return <p className="chart-empty">No capacity data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#bae6fd" />
        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
        <Tooltip
          formatter={(value) => [`${Number(value).toLocaleString()} L/day`, "Capacity"]}
          contentStyle={{
            borderRadius: 8,
            border: "1px solid #e0f2fe",
            background: "#ffffff",
          }}
        />
        <Bar dataKey="capacity" fill="#0284c7" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CapacityChart;
