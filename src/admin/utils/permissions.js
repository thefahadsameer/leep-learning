export function getAdminRole() {
  const session = JSON.parse(localStorage.getItem("adminSession"));
  return session?.role || "viewer";
}

export function canApprove() {
  const role = getAdminRole();
  return role === "reviewer" || role === "super_admin";
}

export function canDelete() {
  const role = getAdminRole();
  return role === "super_admin";
}

export function canExport() {
  return true;
}
