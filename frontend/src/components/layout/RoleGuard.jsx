import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRole } from "../../context/RoleContext";

function RoleGuard() {
  const { allowedPaths } = useRole();
  const { pathname } = useLocation();

  const isAllowed =
    allowedPaths.includes(pathname) ||
    allowedPaths.some((path) => path !== "/" && pathname.startsWith(`${path}/`));

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RoleGuard;
