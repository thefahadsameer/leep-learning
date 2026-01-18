import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    inReview: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem("applications")) || [];

    setStats({
      total: apps.length,
      new: apps.filter((a) => a.status === "New").length,
      inReview: apps.filter((a) => a.status === "In Review").length,
      approved: apps.filter((a) => a.status === "Approved").length,
      rejected: apps.filter((a) => a.status === "Rejected").length,
    });
  }, []);

  return (
    <div style={container}>
      <h1 style={title}>Admin Dashboard</h1>

      <div style={grid}>
        <StatCard label="Total Applications" value={stats.total} color="#2563eb" />
        <StatCard label="New" value={stats.new} color="#0ea5e9" />
        <StatCard label="In Review" value={stats.inReview} color="#d97706" />
        <StatCard label="Approved" value={stats.approved} color="#16a34a" />
        <StatCard label="Rejected" value={stats.rejected} color="#dc2626" />
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({ label, value, color }) {
  return (
    <div style={{ ...card, borderTop: `4px solid ${color}` }}>
      <p style={cardLabel}>{label}</p>
      <h2 style={cardValue}>{value}</h2>
    </div>
  );
}

/* ---------- Styles ---------- */

const container = {
  padding: "20px",
};

const title = {
  marginBottom: "24px",
};

const grid = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const card = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "20px",
  width: "220px",
  minHeight: "110px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const cardLabel = {
  fontSize: "14px",
  color: "#6b7280",
  marginBottom: "6px",
};

const cardValue = {
  fontSize: "28px",
  fontWeight: "700",
};

export default AdminDashboard;
