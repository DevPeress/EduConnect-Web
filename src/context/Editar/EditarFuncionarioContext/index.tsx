import { createContext, useContext, useState, type ReactNode } from "react";
import {
  CadastroFlex1,
  CadastroFlex2,
  CadastroTitulo,
} from "../../../components/Cadastros";
import { http } from "../../../utils/axios";
import type { EditarContextType } from "../../../types/types";
import type { CadastroFuncionarioInput } from "../../../schemas/Cadastro/funcionarioSchema";
import type { EditarFuncionarioInput } from "../../../schemas/Editar/EditarFuncionarioSchema";

const EditarFuncionarioContext = createContext<
  EditarContextType<EditarFuncionarioInput> | undefined
>(undefined);

export function EditarFuncionaroProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<EditarFuncionarioInput>({
    registro: "",
    nome: "",
    email: "",
    telefone: "",
    status: "",
    nasc: "",
    endereco: "",
    cpf: "",
    contatoEmergencia: "",
    foto: "",
    cargo: "",
    departamento: "",
    supervisor: "",
    turno: "",
    salario: 0,
  });

  const [resolveCallback, setResolveCallback] = useState<
    ((data: CadastroFuncionarioInput | null) => void) | null
  >(null);

  const openMenu = async (
    registro: string
  ): Promise<EditarFuncionarioInput | null> => {
    await http.get(`api/funcionarios/${registro}`).then(function (dados) {
      const infos: EditarFuncionarioInput = dados.data;
      setDados({
        registro: registro,
        nome: infos.nome,
        email: infos.email,
        telefone: infos.telefone,
        status: infos.status,
        nasc: infos.nasc,
        endereco: infos.endereco,
        cpf: infos.cpf,
        contatoEmergencia: infos.contatoEmergencia,
        foto: infos.foto,
        cargo: infos.cargo,
        departamento: infos.departamento,
        supervisor: infos.supervisor,
        turno: infos.turno,
        salario: infos.salario,
      });
    });
    setMenu(true);
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Cancel = () => {
    if (resolveCallback) {
      resolveCallback(null);
      setResolveCallback(null);
    }
  };

  return (
    <EditarFuncionarioContext.Provider value={{ openMenu, setDados }}>
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
