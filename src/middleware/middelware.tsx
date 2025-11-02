import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  userRole: string; 
  allowedRoles: string[]; 
  redirectTo?: string;
}

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
