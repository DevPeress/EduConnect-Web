import { useState, type ReactNode } from "react";
import {
  Flex1Context,
  Flex2Context,
  TituloContext,
} from "../../../components/TypeContext";
import { http } from "../../../utils/axios";
import {
  editarProfessorSchema,
  type EditarProfessorInput,
} from "../../../schemas/Editar/EditarProfessorSchema";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { EditarProfessorContext } from "./EditarProfessorContext";

export function EditarProfessorProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<EditarProfessorInput>({
    codigo: "",
    status: "",
    nome: "",
    cpf: "",
    disciplina: "",
    formacao: "",
    turmas: [""],
    email: "",
    telefone: "",
    endereco: "",
    nasc: "",
    nomeEmergencia: "",
    telefoneEmergencia: "",
    salario: 0,
  });

  const [resolveCallback, setResolveCallback] = useState<
    ((data: true | null) => void) | null
  >(null);

  const openMenu = async (
    registro: string,
  ): Promise<EditarProfessorInput | null> => {
    await http.get(`api/professores/${registro}`).then(function (dados) {
      const infos = dados.data;
      setDados({
        codigo: infos.registro,
        status: infos.status,
        nome: infos.nome,
        cpf: infos.cpf,
        disciplina: infos.disciplinas,
        formacao: infos.formacao,
        turmas: infos.turmas,
        email: infos.email,
        telefone: infos.telefone,
        endereco: infos.endereco,
        nasc: infos.nasc,
        nomeEmergencia: infos.nomeEmergencia,
        telefoneEmergencia: infos.ContatoEmergencia,
        salario: infos.salario,
      });
    });
    setMenu(true);
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Confirm = async () => {
    const result = editarProfessorSchema.safeParse(dados);
    if (!result.success) return toast.error(result.error.issues[0].message);

    if (resolveCallback) {
      await http
        .post("api/professores", {
          Registro: dados.codigo,
          Status: dados.status,
          Nome: dados.nome,
          CPF: dados.cpf,
          Disciplina: dados.disciplina,
          Formacao: dados.formacao,
          Turmas: dados.turmas,
          Email: dados.email,
          Telefone: dados.telefone,
          Endereco: dados.endereco,
          Nasc: dados.nasc,
          NomeEmergencia: dados.nomeEmergencia,
          ContatoEmergencia: dados.telefoneEmergencia,
          Salario: dados.salario,
        })
        .then(function () {
          resolveCallback(true);
          setResolveCallback(null);
          toast.success("Cadastro realizado com sucesso!");
        })
        .catch(function (err) {
          const error = err as AxiosError;
          const msg = error?.response?.data as string;

          resolveCallback(null);
          toast.error(msg ?? "Erro ao cadastrar");
        })
        .finally(function () {
          setResolveCallback(null);
        });
    }
  };

  const Cancel = () => {
    if (resolveCallback) {
      resolveCallback(null);
      setResolveCallback(null);
    }
  };

  return (
    <EditarProfessorContext.Provider value={{ openMenu, setDados }}>
      {children}
      {menu && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 bg-[#000000B3] backdrop-blur-sm z-10 animate-fadeIn items-center justify-center p-5">
          <div
            className="bg-(--bg-card) border border-(--border-color) rounded-2xl w-full max-w-175 max-h-[90vh] overflow-hidden amimate-slideUp flex flex-col"
            style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
          >
            <TituloContext titulo="Editar Professor" cancelar={Cancel} />

            <form className="p-7 overflow-y-auto flex-1">
              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Informações Pessoais
                </h3>
                <Flex2Context
                  opcao1="Codigo"
                  opcao2="Status"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex2Context
                  opcao1="Data de Nascimento"
                  opcao2="CPF/Documento"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex1Context
                  titulo="Nome completo"
                  infos={dados}
                  setInfos={setDados}
                  place="ex: Fabrício Peres ..."
                />
              </div>

              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Profissional
                </h3>
                <Flex2Context
                  opcao1="Foto"
                  opcao2="Salario"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex2Context
                  opcao1="Disciplina Principal"
                  opcao2="Formação Academica"
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
                Salvar Funcionário
              </button>
            </div>
          </div>
        </div>
      )}
    </EditarProfessorContext.Provider>
  );
}