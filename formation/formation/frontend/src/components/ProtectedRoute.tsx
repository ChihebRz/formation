import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AppRole, canAccessRole, normalizeRole } from "@/lib/rbac";
interface ProtectedRouteProps {
  allowedRoles?: AppRole[];
  redirectTo?: string;
}
const ProtectedRoute = ({ allowedRoles, redirectTo = "/forbidden" }: ProtectedRouteProps) => {
  const { isAuthenticated, userRole } = useAuth();
  const normalizedRole = normalizeRole(userRole);
  const canAccess = !allowedRoles || canAccessRole(allowedRoles, normalizedRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!canAccess) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
