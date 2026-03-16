import { createContext } from "react";
import type { EditarContextType } from "../../../types/types";
import type { EditarTurmaInput } from "../../../schemas/Editar/EditarTurmaShema";

export const EditarTurmaContext = createContext<
  EditarContextType<EditarTurmaInput> | undefined
>(undefined);
