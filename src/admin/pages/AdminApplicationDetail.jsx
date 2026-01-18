import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);

  const adminSession =
    JSON.parse(localStorage.getItem("adminSession")) || {};
  const role = adminSession.role || "viewer";
  const adminEmail = adminSession.email || "Admin";

  const canModifyStatus = role === "reviewer" || role === "super_admin";
  const canExportAudit = role === "super_admin";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("applications")) || [];
    const found = stored.find((app) => app.id === id);
    setApplication(found || null);
  }, [id]);

  if (!application) {
    return <p style={{ padding: "24px" }}>Application not found.</p>;
  }

  const {
    fullName,
    email,
    phone,
    address,
    program,
    date,
    status,
    auditTrail = [],
  } = application;

  function updateStatus(newStatus) {
    if (!canModifyStatus || newStatus === status) return;

    const stored = JSON.parse(localStorage.getItem("applications")) || [];

    const updated = stored.map((app) => {
      if (app.id !== id) return app;

      return {
        ...app,
        status: newStatus,
        auditTrail: [
          ...(app.auditTrail || []),
          {
            action: "STATUS_CHANGE",
            from: app.status,
            to: newStatus,
            by: adminEmail,
            at: new Date().toLocaleString(),
          },
        ],
      };
    });

    localStorage.setItem("applications", JSON.stringify(updated));
    setApplication(updated.find((app) => app.id === id));
  }

  function exportAudit() {
    if (!canExportAudit) return;

    const blob = new Blob([JSON.stringify(auditTrail, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit_${id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={container}>
      <button onClick={() => navigate("/admin/applications")} style={backBtn}>
        ← Back to Applications
      </button>

      <h1 style={title}>Application Detail</h1>

      {/* Applicant Info */}
      <section style={card}>
        <h3 style={sectionTitle}>Applicant Information</h3>
        <InfoRow label="Full Name" value={fullName} />
        <InfoRow label="Email" value={email} />
        <InfoRow label="Phone" value={phone} />
        <InfoRow label="Address" value={address} />
        <InfoRow label="Program" value={program} />
        <InfoRow label="Submitted At" value={date} />
      </section>

      {/* Status */}
      <section style={card}>
        <h3 style={sectionTitle}>Application Status</h3>

        <div style={buttonRow}>
          <button
            style={approveBtn}
            disabled={!canModifyStatus}
            onClick={() => updateStatus("Approved")}
          >
            Approve
          </button>

          <button
            style={rejectBtn}
            disabled={!canModifyStatus}
            onClick={() => updateStatus("Rejected")}
          >
            Reject
          </button>

          <button
            style={reviewBtn}
            disabled={!canModifyStatus}
            onClick={() => updateStatus("In Review")}
          >
            Mark In Review
          </button>
        </div>

        <p style={{ marginTop: "10px" }}>
          <strong>Current Status:</strong> {status}
        </p>
      </section>

      {/* Audit Trail Timeline */}
      <section style={card}>
        <div style={auditHeader}>
          <h3 style={sectionTitle}>Audit Trail</h3>
          <button
            style={exportBtn}
            disabled={!canExportAudit}
            onClick={exportAudit}
          >
            Export Audit Log
          </button>
        </div>

        {auditTrail.length === 0 ? (
          <p>No audit history.</p>
        ) : (
          <div style={timeline}>
            {auditTrail.map((entry, index) => (
              <div key={index} style={timelineItem}>
                <div style={timelineDot}></div>

                <div style={timelineContent}>
                  <div style={timelineTitle}>
                    Status changed from{" "}
                    <strong>{entry.from}</strong> →{" "}
                    <strong>{entry.to}</strong>
                  </div>

                  <div style={timelineMeta}>
                    By <strong>{entry.by}</strong> · {entry.at}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------- Components ---------- */

function InfoRow({ label, value }) {
  return (
    <div style={infoRow}>
      <div style={infoLabel}>{label}</div>
      <div>{value}</div>
    </div>
  );
}

/* ---------- Styles ---------- */

const container = {
  maxWidth: "1000px",
  padding: "24px",
};

const title = {
  marginBottom: "24px",
};

const sectionTitle = {
  marginBottom: "12px",
};

const card = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
};

const infoRow = {
  display: "flex",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

const infoLabel = {
  width: "200px",
  fontWeight: "600",
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const auditHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const timeline = {
  marginTop: "20px",
  borderLeft: "2px solid #e5e7eb",
  paddingLeft: "20px",
};

const timelineItem = {
  position: "relative",
  marginBottom: "20px",
};

const timelineDot = {
  position: "absolute",
  left: "-9px",
  top: "4px",
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  background: "#2563eb",
};

const timelineContent = {
  paddingLeft: "10px",
};

const timelineTitle = {
  fontSize: "15px",
};

const timelineMeta = {
  fontSize: "13px",
  color: "#6b7280",
  marginTop: "4px",
};

const backBtn = {
  background: "none",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  marginBottom: "12px",
};

const approveBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
};

const rejectBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
};

const reviewBtn = {
  background: "#d97706",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
};

const exportBtn = {
  background: "#111827",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
};

export default AdminApplicationDetail;
