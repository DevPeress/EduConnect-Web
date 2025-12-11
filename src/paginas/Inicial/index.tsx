import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Options } from "../../utils/paginação";
import type { AuthPaginas } from "../../types/types";

const Inicial = ({ logado, cargo }: AuthPaginas) => {
  const navegar = useNavigate();

  useEffect(() => {
    if (!logado) {
      navegar("/login");
      return;
    }

    const opcao = Options.find((option) => option.cargos?.includes(cargo));
    navegar(opcao ? opcao.pagina : "/not-authorized");
  }, [logado, cargo, navegar]);

  return null;
};

export default Inicial;
