import { createContext } from "react";
import type { CadastroProfessorInput } from "../../../schemas/Cadastro/CadastroProfessorSchema";

type CadastroProfessorContextType = {
  openMenu: () => Promise<CadastroProfessorInput | null>;
  setDados: React.Dispatch<React.SetStateAction<CadastroProfessorInput>>;
};

export const CadastroProfessorContext = createContext<
  CadastroProfessorContextType | undefined
>(undefined);
