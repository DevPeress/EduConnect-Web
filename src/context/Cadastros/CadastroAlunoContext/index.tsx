import { createContext, useContext, useState, type ReactNode } from "react";
import type { ContextType } from "../../../types/types";
import {
  Flex1Context,
  Flex2Context,
  TituloContext,
} from "../../../components/TypeContext";
import toast from "react-hot-toast";
import {
  cadastroAlunoSchema,
  type CadastroAlunoInput,
} from "../../../schemas/Cadastro/CadastroAlunoSchema";
import { http } from "../../../utils/axios";

const CadastroAlunoContext = createContext<
  ContextType<CadastroAlunoInput> | undefined
>(undefined);
export function CadastroAlunoProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<CadastroAlunoInput>({
    matricula: "",
    status: "Ativo",
    nome: "",
    cpf: "",
    turma: "Selecionar Turma",
    email: "",
    telefone: "",
    endereco: "",
    nascimento: new Date().toISOString().split("T")[0],
    nomeEmergencia: "",
    telefoneEmergencia: "",
  });
  const [resolveCallback, setResolveCallback] = useState<
    ((data: true | null) => void) | null
  >(null);

  const openMenu = async (): Promise<CadastroAlunoInput | null> => {
    const matriculaNova = await http.get("api/alunos/Cadastro");
    setMenu(true);
    setDados((prevDados) => ({ ...prevDados, matricula: matriculaNova.data }));
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Confirm = async () => {
    const result = cadastroAlunoSchema.safeParse(dados);
    if (!result.success) return toast.error(result.error.issues[0].message);

    if (resolveCallback) {
      await http
        .post("/api/alunos", {
          Registro: dados.matricula,
          Nome: dados.nome,
          Email: dados.email,
          Telefone: dados.telefone,
          Status: dados.status,
          Nasc: dados.nascimento,
          Endereco: dados.endereco,
          Cpf: dados.cpf,
          ContatoEmergencia: dados.telefoneEmergencia,
          Turma: dados.turma,
          Media: 0,
          DataMatricula: dados.nascimento,
          Foto: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
        })
        .then(function () {
          resolveCallback(true);
          toast.success("Cadastro realizado com sucesso!");
        })
        .catch(function (error) {
          console.log(error);
          resolveCallback(null);
          toast.error("Não foi possível realizar o cadastro!");
        })
        .finally(function () {
          setResolveCallback(null);
          ResetarDados();
        });
    }
  };

  const Cancel = () => {
    if (resolveCallback) {
      resolveCallback(null);
      setResolveCallback(null);
    }
    ResetarDados();
  };

  const ResetarDados = () => {
    setDados({
      matricula: "",
      status: "",
      nome: "",
      cpf: "",
      turma: "",
      email: "",
      telefone: "",
      endereco: "",
      nascimento: new Date().toISOString().split("T")[0],
      nomeEmergencia: "",
      telefoneEmergencia: "",
    });
    setMenu(false);
  };

  return (
    <CadastroAlunoContext.Provider value={{ openMenu, setDados }}>
      {children}
      {menu && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 bg-[#000000B3] backdrop-blur-sm z-10 animate-fadeIn items-center justify-center p-5">
          <div
            className="bg-(--bg-card) border border-(--border-color) rounded-2xl w-full max-w-175 max-h-[90vh] overflow-hidden amimate-slideUp flex flex-col"
            style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
          >
            <TituloContext titulo="Cadastrar Novo Aluno" cancelar={Cancel} />

            <form className="p-7 overflow-y-auto flex-1">
              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Informações Pessoais
                </h3>
                <Flex2Context
                  opcao1="Matrícula"
                  opcao2="Status"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex2Context
                  opcao1="Nome completo"
                  opcao2="CPF/Documento"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex2Context
                  opcao1="Data de Nascimento"
                  opcao2="Turma"
                  infos={dados}
                  setInfos={setDados}
                />
              </div>

              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Contato
                </h3>
                <Flex2Context
                  opcao1="E-mail"
                  opcao2="Telefone"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex1Context
                  titulo="Endereço"
                  infos={dados}
                  setInfos={setDados}
                  place="Rua, número, bairro, cidade - Estado"
                />
              </div>

              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Contato de Emergência
                </h3>
                <Flex2Context
                  opcao1="Nome do Contato de Emergência"
                  opcao2="Telefone do Contato de Emergência"
                  infos={dados}
                  setInfos={setDados}
                />
              </div>
            </form>
            <div className="py-5 px-7 border-t border-(--border-color) flex justify-end gap-3 bg-[#0000001A]">
              <button
                onClick={Cancel}
                type="button"
                className="py-3 px-6 rounded-[10px] text-[14px] font-semibold cursor-pointer border-none flex items-center gap-2 bg-transparent text-(--text-secondary) border border-(--border-color) hover:bg-(--alert-color) hover:text-(--text-secondary)"
              >
                Cancelar
              </button>
              <button
                onClick={Confirm}
                type="submit"
                className="py-3 px-6 rounded-[10px] text-[14px] font-semibold cursor-pointer border-none flex items-center gap-2 bg-(--primary-color) text-white border border-(--primary-color) hover:bg-(--primary-hover) -translate-y-0.5"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Salvar Aluno
              </button>
            </div>
          </div>
        </div>
      )}
    </CadastroAlunoContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCadastroAluno() {
  const context = useContext(CadastroAlunoContext);
  if (!context) {
    throw new Error(
      "useCadastroAluno deve ser usado dentro do CadastroAlunoProvider",
    );
  }
  return context;
}
