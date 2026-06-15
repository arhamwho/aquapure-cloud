import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 10000,
});

export async function getPlants() {
  const response = await api.get("/api/plants");
  return response.data;
}

export async function getAlerts() {
  const response = await api.get("/api/alerts");
  return response.data;
}

export async function getMaintenance() {
  const response = await api.get("/api/maintenance");
  return response.data;
}

export async function getWaterQuality() {
  const response = await api.get("/api/water-quality");
  return response.data;
}

export default api;
