import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const adminSession = JSON.parse(localStorage.getItem("adminSession"));

  if (!adminSession || !adminSession.role) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;
