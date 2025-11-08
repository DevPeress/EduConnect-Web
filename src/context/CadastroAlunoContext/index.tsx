import { createContext, useContext, useState } from "react";
import type { CadastroAlunoContextType, CadastroAlunoType } from "../../types/types";

const CadastroAlunoContext = createContext<CadastroAlunoContextType | undefined>(undefined);
export function CadastroAlunoProvider() {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<CadastroAlunoType>({
    nome: "", idade: 0
  })
  const [resolveCallback, setResolveCallback] = useState<((data: CadastroAlunoType  | null) => void) | null>(null);

  const Confirm = () => {
    if (resolveCallback) resolveCallback({ nome: dados.nome, idade: dados.idade });
  }

  return (
    <CadastroAlunoContext.Provider value={{ setMenu }}>
      {menu ? 
        <> 
          <div onChange={() => setResolveCallback(null)}></div>
          <div onChange={() => setDados({ nome: "", idade: 0 })}></div>
          <button onClick={Confirm}></button>
        </>
        : null
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
