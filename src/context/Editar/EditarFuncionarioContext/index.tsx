import { createContext, useContext, type ReactNode } from "react";
import {
  CadastroFlex1,
  CadastroFlex2,
  CadastroTitulo,
} from "../../../components/Cadastros";
import { http } from "../../../utils/axios";

const EditarFuncionarioContext = createContext(undefined);

export function EditarFuncionaroProvider({ children }: { childre: ReactNode }) {
  const [menu, setMenu] = useState<boolean>(false);

  const [resolveCallback, setResolveCallback] = useState<
    ((data: CadastroFuncionarioInput | null) => void) | null
  >(null);

  const openMenu = async (): Promise<CadastroFuncionarioInput | null> => {
    const matriculaNova = await http.get("api/funcionarios/Cadastro");
    setMenu(true);
    setDados((prevDados) => ({ ...prevDados, registro: matriculaNova.data }));
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Cancel = () => {
    if (resolveCallback) {
      resolveCallback(null);
      setResolveCallback(null);
    }
    ResetarDados();
  };

  return (
    <EditarFuncionarioContext.Provider value={{}}>
      {children}
      {menu && <></>}
    </EditarFuncionarioContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEditarFuncionario() {
  const context = useContext(EditarFuncionarioContext);
  if (!context) {
    throw new Error(
      "useEditarFuncionario deve ser usado dentro do EditarFuncionarioProvider"
    );
  }
  return context;
}
