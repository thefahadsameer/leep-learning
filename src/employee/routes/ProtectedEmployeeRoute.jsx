import { Navigate } from "react-router-dom";

function ProtectedEmployeeRoute({ children }) {
  const session = localStorage.getItem("employeeSession");

  if (!session) {
    return <Navigate to="/employee/login" replace />;
  }

  return children;
}

export default ProtectedEmployeeRoute;
