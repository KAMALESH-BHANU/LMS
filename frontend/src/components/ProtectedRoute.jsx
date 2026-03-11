import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const firstLogin = localStorage.getItem("firstLogin") === "true";
  const location = useLocation();

  // Not logged in
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // Force first login users to change password
  if (firstLogin && location.pathname !== "/change-password") {
    return <Navigate to="/change-password" replace />;
  }

  // Role restriction
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;