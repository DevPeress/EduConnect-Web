import { createContext } from "react";
import type { CadastroAlunoInput } from "../../../schemas/Cadastro/CadastroAlunoSchema";

type CadastroFuncionarioContextType = {
  openMenu: () => Promise<CadastroAlunoInput | null>;
  setDados: React.Dispatch<React.SetStateAction<CadastroAlunoInput>>;
};

export const CadastroAlunoContext = createContext<
  CadastroFuncionarioContextType | undefined
>(undefined);
