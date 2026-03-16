import { createContext } from "react";
import type { CadastroTurmaInput } from "../../../schemas/Cadastro/CadastroTurmaSchema";

type CadastroTurmaContextType = {
  openMenu: () => Promise<CadastroTurmaInput | null>;
  setDados: React.Dispatch<React.SetStateAction<CadastroTurmaInput>>;
};

export const CadastroTurmaContext = createContext<
  CadastroTurmaContextType | undefined
>(undefined);
