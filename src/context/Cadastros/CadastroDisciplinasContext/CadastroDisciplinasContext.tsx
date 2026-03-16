import { createContext } from "react";
import type { CadastroDisciplinasInput } from "../../../schemas/Cadastro/CadastroDisciplinaSchema";

type CadastroFuncionarioContextType = {
  openMenu: () => Promise<CadastroDisciplinasInput | null>;
  setDados: React.Dispatch<React.SetStateAction<CadastroDisciplinasInput>>;
};

export const CadastroDisciplinasContext = createContext<
  CadastroFuncionarioContextType | undefined
>(undefined);
