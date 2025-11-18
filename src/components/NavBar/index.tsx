import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavAdministrador from "./Administrador";

const NavBar = () => {
  const location = useLocation();
  const pagina = location.pathname;

  const auth = useAuth();
  const cargo = auth.cargo;

  return cargo === "Administrador" ? <NavAdministrador pagina={pagina}/> : null
};

export default NavBar;
