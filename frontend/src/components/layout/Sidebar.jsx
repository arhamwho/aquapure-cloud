import { NavLink } from "react-router-dom";
import { useRole, ROLES } from "../../context/RoleContext";

function Sidebar({ open, onClose }) {
  const { currentRole, setCurrentRole, menuTitle, navItems, roleLabel } =
    useRole();

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <div className="sidebar__logo">AP</div>
          <div>
            <p className="sidebar__brand-name">AquaPure</p>
            <p className="sidebar__brand-tag">Operations Cloud</p>
          </div>
        </div>

        <div className="sidebar__scroll">
          <div className="sidebar__role-badge">
            <span className="sidebar__role-label">Role</span>
            <span className="sidebar__role-value">{roleLabel}</span>
          </div>

          <p className="sidebar__menu-title">{menuTitle}</p>

          <nav className="sidebar__nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                }
                onClick={onClose}
              >
                <span className="sidebar__icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="sidebar__demo">
            <label className="sidebar__demo-label" htmlFor="role-switcher">
              Demo: Switch Role
            </label>
            <select
              id="role-switcher"
              className="sidebar__role-select"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
            >
              <option value={ROLES.ADMIN}>Admin</option>
              <option value={ROLES.MANAGER}>Manager</option>
              <option value={ROLES.EXECUTIVE}>Executive</option>
            </select>
          </div>
        </div>

        <div className="sidebar__footer">
          <span className="sidebar__status-dot" />
          RBAC demo mode
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
