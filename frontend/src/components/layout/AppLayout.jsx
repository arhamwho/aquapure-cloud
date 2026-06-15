import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const PAGE_META = {
  "/": {
    title: "Operations Dashboard",
    subtitle: "Real-time water treatment monitoring",
  },
  "/plants": {
    title: "Plants",
    subtitle: "Manage facilities and operational capacity",
  },
  "/water-quality": {
    title: "Water Quality",
    subtitle: "Monitor pH, chlorine, and quality scores",
  },
  "/maintenance": {
    title: "Maintenance",
    subtitle: "Track tasks and technician assignments",
  },
  "/alerts": {
    title: "Alerts",
    subtitle: "Review open and resolved system alerts",
  },
  "/reports": {
    title: "Reports",
    subtitle: "Operational reports and analytics",
  },
  "/monitoring": {
    title: "Monitoring",
    subtitle: "CPU, memory, storage, and network metrics",
  },
  "/pricing": {
    title: "Pricing",
    subtitle: "AWS monthly cost estimation",
  },
  "/architecture": {
    title: "Architecture",
    subtitle: "AWS deployment design and data flow",
  },
  "/workflow": {
    title: "Workflow Management",
    subtitle: "Task approval and completion pipeline",
  },
};

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] || PAGE_META["/"];

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-layout__main">
        <TopBar
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
