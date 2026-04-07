import { createContext } from "react";
import type { EditarContextType } from "../../../types/types";
import type { EditarNotaInput } from "../../../schemas/Editar/EditarNotaSchema";

export const EditarNotaContext = createContext<
  EditarContextType<EditarNotaInput> | undefined
>(undefined);