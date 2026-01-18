import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "220px",
        background: "#1e1e2f",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Admin</h2>

      <p style={{ cursor: "pointer" }} onClick={() => navigate("/admin/dashboard")}>
        Dashboard
      </p>

      <p style={{ cursor: "pointer" }} onClick={() => navigate("/admin/applications")}>
        Applications
      </p>

      <p style={{ cursor: "pointer" }} onClick={() => navigate("/admin/settings")}>
        Settings
      </p>
    </div>
  );
}

export default AdminSidebar;
