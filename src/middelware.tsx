import { Navigate, Outlet } from "react-router-dom";
import type { PrivateRouteProps } from "./types/types";

const PrivateRoute = ({ isAuthenticated, userRole, allowedRoles, redirectTo = "/login" }: PrivateRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" replace />; 
  }

  return <Outlet />;
};

export default PrivateRoute;
