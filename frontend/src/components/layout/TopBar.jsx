import { useRole } from "../../context/RoleContext";

function TopBar({ title, subtitle, onMenuClick }) {
  const { roleLabel, menuTitle } = useRole();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button type="button" className="topbar__menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <div>
          <h1 className="topbar__title">{title}</h1>
          {subtitle && <p className="topbar__subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="topbar__right">
        <span className="topbar__role-chip">{roleLabel} · {menuTitle}</span>
        <span className="topbar__date">{today}</span>
        <div className="topbar__badge">Live</div>
      </div>
    </header>
  );
}

export default TopBar;
