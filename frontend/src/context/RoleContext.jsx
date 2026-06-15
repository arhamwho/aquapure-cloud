import { createContext, useContext, useMemo, useState } from "react";
import { role as DEFAULT_ROLE, ROLES, getMenuForRole } from "../config/rbac";

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(DEFAULT_ROLE);

  const value = useMemo(() => {
    const menu = getMenuForRole(currentRole);

    return {
      currentRole,
      setCurrentRole,
      menuTitle: menu.title,
      menuDescription: menu.description,
      navItems: menu.navItems,
      allowedPaths: menu.allowedPaths,
      roleLabel: currentRole.charAt(0).toUpperCase() + currentRole.slice(1),
    };
  }, [currentRole]);

  return (
    <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return context;
}

export { ROLES };
