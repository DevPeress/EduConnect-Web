import { createContext } from "react";

type BoletimContextType = {
  openMenu: () => Promise<string | null>;
};

export const BoletimContext = createContext<BoletimContextType | undefined>(
  undefined
);