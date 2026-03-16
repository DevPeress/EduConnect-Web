import { createContext } from "react";
import type { CadastroPagamentoInput } from "../../../schemas/Cadastro/CadastroPagementoSchema";

type CadastroTurmaContextType = {
  openMenu: () => Promise<CadastroPagamentoInput | null>;
  setDados: React.Dispatch<React.SetStateAction<CadastroPagamentoInput>>;
};

export const CadastroPagamentoContext = createContext<
  CadastroTurmaContextType | undefined
>(undefined);
