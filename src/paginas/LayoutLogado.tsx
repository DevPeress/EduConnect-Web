import type { ReactNode } from "react";
import Aside from "../components/Aside";

const LayoutLogado = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Aside />
      {children}
    </>
  );
};

export default LayoutLogado;
