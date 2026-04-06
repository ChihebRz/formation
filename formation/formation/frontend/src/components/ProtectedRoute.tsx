import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AppRole } from "@/lib/rbac";
interface ProtectedRouteProps {
  allowedRoles?: AppRole[];
  redirectTo?: string;
}
const ProtectedRoute = ({ allowedRoles, redirectTo = "/forbidden" }: ProtectedRouteProps) => {
  const { isAuthenticated, userRole } = useAuth();
  const normalizedRole = userRole?.trim().toLowerCase();

  const canAccess = !allowedRoles || (normalizedRole !== undefined && allowedRoles.includes(normalizedRole as AppRole));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!canAccess) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
