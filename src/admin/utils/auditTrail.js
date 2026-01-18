export function createAuditEntry({ from, to }) {
  const adminSession = JSON.parse(localStorage.getItem("adminSession"));

  const now = new Date();
  const timestamp = now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return {
    action: "STATUS_CHANGE",
    from,
    to,
    by: adminSession?.username || "Admin",
    at: timestamp,
  };
}
