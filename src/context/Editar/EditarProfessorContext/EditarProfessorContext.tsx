import { createContext } from "react";
import type { EditarContextType } from "../../../types/types";
import type { EditarProfessorInput } from "../../../schemas/Editar/EditarProfessorSchema";

export const EditarProfessorContext = createContext<
  EditarContextType<EditarProfessorInput> | undefined
>(undefined);