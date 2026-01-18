import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "240px",
          background: "#0f172a",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Admin</h2>

        <NavLink
          to="/admin/dashboard"
          style={({ isActive }) => ({
            color: isActive ? "#38bdf8" : "#cbd5f5",
            marginBottom: "12px",
            textDecoration: "none",
          })}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/applications"
          style={({ isActive }) => ({
            color: isActive ? "#38bdf8" : "#cbd5f5",
            marginBottom: "12px",
            textDecoration: "none",
          })}
        >
          Applications
        </NavLink>

        <NavLink
          to="/admin/settings"
          style={({ isActive }) => ({
            color: isActive ? "#38bdf8" : "#cbd5f5",
            marginBottom: "12px",
            textDecoration: "none",
          })}
        >
          Settings
        </NavLink>

        <div style={{ flexGrow: 1 }} />

        <button
          onClick={handleLogout}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
