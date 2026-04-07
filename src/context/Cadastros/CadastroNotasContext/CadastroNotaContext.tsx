import { createContext } from "react";
import type { CadastroNotaInput } from "../../../schemas/Cadastro/CadastroNotaSchema";

type CadastroNotaContextType = {
  openMenu: () => Promise<CadastroNotaInput | null>;
  setDados: React.Dispatch<React.SetStateAction<CadastroNotaInput>>;
};

export const CadastroNotaContext = createContext<
  CadastroNotaContextType | undefined
>(undefined);
