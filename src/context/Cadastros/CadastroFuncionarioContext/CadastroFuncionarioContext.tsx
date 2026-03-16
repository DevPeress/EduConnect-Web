import { createContext } from "react";
import type { CadastroFuncionarioInput } from "../../../schemas/Cadastro/CadastroFuncionarioSchema";

type CadastroFuncionarioContextType = {
  openMenu: () => Promise<CadastroFuncionarioInput | null>;
  setDados: React.Dispatch<React.SetStateAction<CadastroFuncionarioInput>>;
};

export const CadastroFuncionarioContext = createContext<
  CadastroFuncionarioContextType | undefined
>(undefined);
