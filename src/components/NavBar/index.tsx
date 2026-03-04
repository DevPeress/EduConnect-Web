import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavAdministrador from "./Administrador";
import NavFuncionario from "./Funcionario";
import NavProfessores from "./Professor";
import NavAlunos from "./Alunos";

const NavBar = () => {
  const location = useLocation();
  const pagina = location.pathname;

  const auth = useAuth();
  const cargo = auth.cargo;

  return cargo === "Administrador" ? (
    <NavAdministrador pagina={pagina} />
  ) : cargo === "Funcionário" ? (
    <NavFuncionario pagina={pagina} />
  ) : cargo === "Professor" ? (
    <NavProfessores pagina={pagina} />
  ) : cargo === "Aluno" ? (
    <NavAlunos pagina={pagina} />
  ) : null;
};

export default NavBar;
