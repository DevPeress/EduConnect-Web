import { createContext, useContext, useState, type ReactNode } from "react";
import {
  Flex1Context,
  Flex2Context,
  TituloContext,
} from "../../../components/TypeContext";
import { http } from "../../../utils/axios";
import type { EditarContextType } from "../../../types/types";
import {
  editarTurmaSchema,
  type EditarTurmaInput,
} from "../../../schemas/Editar/EditarTurmaShema";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const EditarTurmaContext = createContext<
  EditarContextType<EditarTurmaInput> | undefined
>(undefined);

export function EditarTurmaProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<EditarTurmaInput>({
    codigo: "",
    status: "Ativa",
    nome: "",
    ano: "2026",
    turno: "Selecionar o Turno",
    sala: "",
    capacidade: 0,
    professor: "",
    inicio: "",
    fim: "",
    dias: [],
    disciplinas: [],
    alunos: [],
  });

  const [resolveCallback, setResolveCallback] = useState<
    ((data: true | null) => void) | null
  >(null);

  const openMenu = async (
    registro: string,
  ): Promise<EditarTurmaInput | null> => {
    await http.get(`api/turma/${registro}`).then(function (dados) {
      const infos = dados.data;
      setDados({
        codigo: registro,
        status: infos.status,
        nome: infos.nome,
        ano: infos.anoLetivo,
        turno: infos.turno,
        sala: infos.sala,
        capacidade: infos.capacidade,
        professor: infos.professorResponsavel,
        inicio: infos.inicio,
        fim: infos.fim,
        dias: infos.dias,
        disciplinas: infos.disciplinas,
        alunos: infos.alunos,
      });
    });
    setMenu(true);
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Confirm = async () => {
    const result = editarTurmaSchema.safeParse(dados);
    if (!result.success) return toast.error(result.error.issues[0].message);

    if (resolveCallback) {
      await http
        .post("api/turma", {
          Registro: dados.codigo,
          Nome: dados.nome,
          Turno: dados.turno,
          Status: dados.status,
          AnoEletivo: dados.ano,
          Capacidade: dados.capacidade,
          ProfessorResponsavel: dados.professor,
          Inicio: dados.inicio,
          Fim: dados.fim,
          Sala: dados.sala,
          Dias: dados.dias,
          TurmaDisciplina: dados.disciplinas,
          Alunos: dados.alunos,
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
    <EditarTurmaContext.Provider value={{ openMenu, setDados }}>
      {children}
      {menu && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 bg-[#000000B3] backdrop-blur-sm z-10 animate-fadeIn items-center justify-center p-5">
          <div
            className="bg-(--bg-card) border border-(--border-color) rounded-2xl w-full max-w-175 max-h-[90vh] overflow-hidden amimate-slideUp flex flex-col"
            style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
          >
            <TituloContext titulo="Cadastrar Nova Turma" cancelar={Cancel} />

            <form className="p-7 overflow-y-auto flex-1">
              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Informações Básicas
                </h3>
                <Flex2Context
                  opcao1="Código"
                  opcao2="Status"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex2Context
                  opcao1="Nome da Turma"
                  opcao2="Ano Letivo"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex2Context
                  opcao1="Turno"
                  opcao2="Sala"
                  infos={dados}
                  setInfos={setDados}
                />
              </div>

              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Capacidade e Professor
                </h3>
                <Flex2Context
                  opcao1="Capacidade"
                  opcao2="Professor"
                  infos={dados}
                  setInfos={setDados}
                />
              </div>

              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Horários
                </h3>
                <Flex2Context
                  opcao1="Horário Início"
                  opcao2="Horário Fim"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex1Context
                  titulo="Dias da Semana"
                  infos={dados}
                  setInfos={setDados}
                  place="ex: Segunda, Terça, Quarta, Quinta, Sexta"
                />
              </div>

              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Disciplinas
                </h3>

                <Flex1Context
                  titulo="Disciplinas"
                  infos={dados}
                  setInfos={setDados}
                  place="ex: Matemática, Português"
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
                Salvar Turma
              </button>
            </div>
          </div>
        </div>
      )}
    </EditarTurmaContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEditarTurma() {
  const context = useContext(EditarTurmaContext);
  if (!context) {
    throw new Error(
      "useEditarTurma deve ser usado dentro do EditarTurmaProvider",
    );
  }
  return context;
}
