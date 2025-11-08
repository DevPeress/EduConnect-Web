import { createContext, useContext, useState } from "react";
import type { CadastroAlunoContextType, CadastroAlunoType } from "../../types/types";

const CadastroAlunoContext = createContext<CadastroAlunoContextType | undefined>(undefined);
export function CadastroAlunoProvider() {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<CadastroAlunoType>({
    matricula: 0, status: "", nome: "", turma: "", email: "", telefone: "", endereco: ""
  })
  const [resolveCallback, setResolveCallback] = useState<((data: CadastroAlunoType | null) => void) | null>(null);

  const openMenu = (): Promise<CadastroAlunoType | null> => {
    setMenu(true);
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Confirm = () => {
    if (resolveCallback) {
      resolveCallback(dados);
      setResolveCallback(null);
    }
    setMenu(false);
  };

  const Cancel = () => {
    if (resolveCallback) {
      resolveCallback(null);
      setResolveCallback(null);
    }
    setMenu(false);
  };

  return (
    <CadastroAlunoContext.Provider value={{ openMenu, setDados }}>
      {menu && (
        <>
          <div onChange={() => setResolveCallback(null)} onClick={Cancel}></div>
          <div onChange={() => setDados({ matricula: 0, status: "", nome: "", turma: "", email: "", telefone: "", endereco: "" })}></div>
          <button onClick={Confirm}></button>
        </>
      )
      }
    </CadastroAlunoContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCadastroAluno() {
  const context = useContext(CadastroAlunoContext);
  if (!context) {
    throw new Error("useCadastroAluno deve ser usado dentro do CadastroAlunoProvider");
  }
  return context;
}
