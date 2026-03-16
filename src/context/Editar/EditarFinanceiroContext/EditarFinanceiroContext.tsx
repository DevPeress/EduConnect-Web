import { createContext } from "react";
import type { EditarContextType } from "../../../types/types";
import type { EditarFinanceiroInput } from "../../../schemas/Editar/EditarFinanceiroSchema";

export const EditarFinanceiroContext = createContext<
  EditarContextType<EditarFinanceiroInput> | undefined
>(undefined);
