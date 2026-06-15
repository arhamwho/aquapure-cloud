export const role = "admin";

export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  EXECUTIVE: "executive",
};

export const NAV_ITEMS = {
  dashboard: { to: "/", label: "Dashboard", icon: "▣" },
  plants: { to: "/plants", label: "Plants", icon: "◉" },
  waterQuality: { to: "/water-quality", label: "Water Quality", icon: "◎" },
  maintenance: { to: "/maintenance", label: "Maintenance", icon: "⚙" },
  alerts: { to: "/alerts", label: "Alerts", icon: "!" },
  reports: { to: "/reports", label: "Reports", icon: "▤" },
  monitoring: { to: "/monitoring", label: "Monitoring", icon: "◈" },
  pricing: { to: "/pricing", label: "Pricing", icon: "$" },
  architecture: { to: "/architecture", label: "Architecture", icon: "⬡" },
  workflow: { to: "/workflow", label: "Workflow", icon: "⇄" },
};

export const ROLE_MENUS = {
  admin: {
    title: "Admin Menu",
    description: "Full system access",
    items: [
      "dashboard",
      "plants",
      "waterQuality",
      "maintenance",
      "alerts",
      "reports",
      "monitoring",
      "pricing",
      "architecture",
      "workflow",
    ],
  },
  manager: {
    title: "Manager Menu",
    description: "Operations and facility management",
    items: [
      "dashboard",
      "plants",
      "waterQuality",
      "maintenance",
      "alerts",
      "monitoring",
      "workflow",
    ],
  },
  executive: {
    title: "Executive Menu",
    description: "High-level overview and reports",
    items: ["dashboard", "reports", "monitoring", "pricing", "architecture"],
  },
};

export function getMenuForRole(userRole) {
  const menu = ROLE_MENUS[userRole] || ROLE_MENUS.admin;
  return {
    ...menu,
    navItems: menu.items.map((key) => NAV_ITEMS[key]),
    allowedPaths: menu.items.map((key) => NAV_ITEMS[key].to),
  };
}
