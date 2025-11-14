import { Navigate, Outlet } from "react-router-dom";
import type { PrivateRouteProps } from "./types/types";

// Middleware para autenticação e verificação de permissões em rotas privadas.

const PrivateRoute = ({ isAuthenticated, userRole, allowedRoles, redirectTo = "/login" }: PrivateRouteProps) => {
  // Valida a autenticação do usuário, garantindo a presença de um token válido.
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  // Valida o cargo do usuário e garante que ele tenha permissão para acessar a rota solicitada.
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" replace />; 
  }
  // Autoriza o acesso à página solicitada.
  return <Outlet />;
};

export default PrivateRoute;
