import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, initialized } = useAuthStore();
  const location = useLocation();

  if (!initialized) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles.length > 0) {
    const roles = user?.roles || [];
    const userRole = user?.role || "";
    const hasAccess = allowedRoles.some((role) => {
      const normalizedRole = String(role).toLowerCase();
      return (
        String(userRole).toLowerCase() === normalizedRole ||
        roles.some((item) => String(item).toLowerCase() === normalizedRole)
      );
    });

    if (!hasAccess) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
