import { createContext } from "react";
import type { EditarFuncionarioInput } from "../../../schemas/Editar/EditarFuncionarioSchema";
import type { EditarContextType } from "../../../types/types";

export const EditarFuncionarioContext = createContext<
  EditarContextType<EditarFuncionarioInput> | undefined
>(undefined);