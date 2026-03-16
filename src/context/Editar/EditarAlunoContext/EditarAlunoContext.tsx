import { createContext } from "react";
import type { EditarContextType } from "../../../types/types";
import type { EditarAlunoInput } from "../../../schemas/Editar/EditarAlunoSchema";

export const EditarAlunoContext = createContext<
  EditarContextType<EditarAlunoInput> | undefined
>(undefined);