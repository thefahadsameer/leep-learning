import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("date_desc"); // 👈 NEW

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(stored);
  }, []);

  const saveApplications = (updated) => {
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedIds([]);

  const bulkUpdateStatus = (status) => {
    const updated = applications.map((app) =>
      selectedIds.includes(app.id)
        ? {
            ...app,
            status,
            auditTrail: [
              ...(app.auditTrail || []),
              {
                action: "STATUS_CHANGE",
                from: app.status,
                to: status,
                by: "Admin",
                at: new Date().toLocaleString(),
              },
            ],
          }
        : app
    );

    saveApplications(updated);
    clearSelection();
  };

  const bulkDelete = () => {
    if (!window.confirm("Delete selected applications?")) return;

    const updated = applications.filter(
      (app) => !selectedIds.includes(app.id)
    );

    saveApplications(updated);
    clearSelection();
  };

  /* ---------- FILTER + SEARCH ---------- */

  const filteredApplications = applications.filter((app) => {
    const matchesStatus =
      filterStatus === "All" || app.status === filterStatus;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      app.fullName.toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query) ||
      app.program.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  /* ---------- SORTING ---------- */

  const statusOrder = {
    New: 1,
    "In Review": 2,
    Approved: 3,
    Rejected: 4,
  };

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case "date_asc":
        return new Date(a.date) - new Date(b.date);
      case "date_desc":
        return new Date(b.date) - new Date(a.date);
      case "name_asc":
        return a.fullName.localeCompare(b.fullName);
      case "name_desc":
        return b.fullName.localeCompare(a.fullName);
      case "status":
        return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99);
      default:
        return 0;
    }
  });

  /* ---------- PAGINATION ---------- */

  const totalPages = Math.ceil(sortedApplications.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;

  const paginatedApplications = sortedApplications.slice(
    startIndex,
    startIndex + pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, searchQuery, pageSize, sortBy]);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Applications</h1>

      {/* Toolbar */}
      <div style={toolbar}>
        <input
          type="text"
          placeholder="Search by name, email, or program..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInput}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={select}
        >
          <option>All</option>
          <option>New</option>
          <option>In Review</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        {/* Sort Selector */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={select}
        >
          <option value="date_desc">Date: Newest first</option>
          <option value="date_asc">Date: Oldest first</option>
          <option value="name_asc">Name: A → Z</option>
          <option value="name_desc">Name: Z → A</option>
          <option value="status">Status</option>
        </select>

        {/* Page Size */}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          style={select}
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>

        {selectedIds.length > 0 && (
          <>
            <button
              onClick={() => bulkUpdateStatus("Approved")}
              style={approveBtn}
            >
              Approve
            </button>
            <button
              onClick={() => bulkUpdateStatus("Rejected")}
              style={rejectBtn}
            >
              Reject
            </button>
            <button onClick={bulkDelete} style={deleteBtn}>
              Delete
            </button>
            <button onClick={clearSelection} style={clearBtn}>
              Clear
            </button>
          </>
        )}
      </div>

      {/* Table */}
      <table style={table}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={th}></th>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Program</th>
            <th style={th}>Status</th>
            <th style={th}>Date</th>
          </tr>
        </thead>

        <tbody>
          {paginatedApplications.length === 0 ? (
            <tr>
              <td colSpan="6" style={emptyState}>
                No applications found
              </td>
            </tr>
          ) : (
            paginatedApplications.map((app) => (
              <tr
                key={app.id}
                onDoubleClick={() =>
                  navigate(`/admin/applications/${app.id}`)
                }
                style={{ cursor: "pointer" }}
              >
                <td style={td}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(app.id)}
                    onChange={() => toggleSelect(app.id)}
                  />
                </td>
                <td style={td}>{app.fullName}</td>
                <td style={td}>{app.email}</td>
                <td style={td}>{app.program}</td>
                <td style={td}>
                  <span style={statusPill(app.status)}>
                    {app.status || "New"}
                  </span>
                </td>
                <td style={td}>{app.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            style={pageBtn}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                ...pageBtn,
                ...(currentPage === i + 1 ? activePageBtn : {}),
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            style={pageBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Styles ---------- */

const toolbar = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  marginBottom: "18px",
  flexWrap: "wrap",
};

const searchInput = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "260px",
};

const select = {
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
};

const th = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

const emptyState = {
  padding: "20px",
  textAlign: "center",
  color: "#6b7280",
};

const pagination = {
  display: "flex",
  gap: "6px",
  marginTop: "20px",
  justifyContent: "center",
};

const pageBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
};

const activePageBtn = {
  background: "#2563eb",
  color: "#fff",
  borderColor: "#2563eb",
};

const approveBtn = {
  background: "#16a34a",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
};

const rejectBtn = {
  background: "#dc2626",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
};

const deleteBtn = {
  background: "#991b1b",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
};

const clearBtn = {
  background: "#e5e7eb",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
};

const statusPill = (status) => {
  const map = {
    Approved: "#dcfce7",
    Rejected: "#fee2e2",
    "In Review": "#fef9c3",
    New: "#e0f2fe",
  };

  return {
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    background: map[status] || "#e5e7eb",
  };
};

export default AdminApplications;
