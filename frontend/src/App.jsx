import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import AppLayout from "./components/layout/AppLayout";
import RoleGuard from "./components/layout/RoleGuard";
import Dashboard from "./pages/Dashboard";
import PlantsPage from "./pages/PlantsPage";
import WaterQualityPage from "./pages/WaterQualityPage";
import MaintenancePage from "./pages/MaintenancePage";
import AlertsPage from "./pages/AlertsPage";
import ReportsPage from "./pages/ReportsPage";
import MonitoringPage from "./pages/MonitoringPage";
import PricingPage from "./pages/PricingPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import WorkflowPage from "./pages/WorkflowPage";
import "./App.css";

function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route element={<RoleGuard />}>
              <Route index element={<Dashboard />} />
              <Route path="plants" element={<PlantsPage />} />
              <Route path="water-quality" element={<WaterQualityPage />} />
              <Route path="maintenance" element={<MaintenancePage />} />
              <Route path="alerts" element={<AlertsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="monitoring" element={<MonitoringPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="architecture" element={<ArchitecturePage />} />
              <Route path="workflow" element={<WorkflowPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  );
}

export default App;
