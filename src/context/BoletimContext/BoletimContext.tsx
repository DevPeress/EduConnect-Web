import { createContext } from "react";

type BoletimContextType = {
  openMenu: () => Promise<true | null>;
};

export const BoletimContext = createContext<BoletimContextType | undefined>(
  undefined
);