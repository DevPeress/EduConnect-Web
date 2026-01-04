import { createContext, useContext, useState, type ReactNode } from "react";
import type { CadastroContextType } from "../../types/types";
import {
  CadastroFlex1,
  CadastroFlex2,
  CadastroTitulo,
} from "../../components/Cadastros";
import toast from "react-hot-toast";
import {
  cadastroTurmaSchema,
  type CadastroTurmaInput,
} from "../../schemas/turmaSchema";
import { http } from "../../utils/axios";

const CadastroTurmaContext = createContext<
  CadastroContextType<CadastroTurmaInput> | undefined
>(undefined);
export function CadastroTurmaProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<CadastroTurmaInput>({
    matricula: "",
    status: "Ativa",
    nome: "",
    ano: "2026",
    turno: "Selecionar o Turno",
    sala: "",
    capacidade: 0,
    professor: "",
    inicio: "",
    fim: "",
    dias: "",
    disciplinas: "",
  });
  const [resolveCallback, setResolveCallback] = useState<
    ((data: CadastroTurmaInput | null) => void) | null
  >(null);

  const openMenu = async (): Promise<CadastroTurmaInput | null> => {
    const matriculaNova = await http.get("api/turma/Cadastro");
    setMenu(true);
    setDados((prevDados) => ({ ...prevDados, matricula: matriculaNova.data }));
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Confirm = async () => {
    const result = cadastroTurmaSchema.safeParse(dados);
    if (!result.success) return toast.error(result.error.issues[0].message);

    if (resolveCallback) {
      await http
        .post("/api/turma", {
          matricula: "",
          status: "Ativa",
          nome: "",
          ano: "2026",
          turno: "Selecionar o Turno",
          sala: "",
          capacidade: 0,
          professor: "",
          inicio: "",
          fim: "",
          dias: "",
          disciplinas: "",
        })
        .then(function () {
          resolveCallback(dados);
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
      status: "Ativa",
      nome: "",
      ano: "2026",
      turno: "Selecionar o Turno",
      sala: "",
      capacidade: 0,
      professor: "",
      inicio: "",
      fim: "",
      dias: "",
      disciplinas: "",
    });
    setMenu(false);
  };

  return (
    <CadastroTurmaContext.Provider value={{ openMenu, setDados }}>
      {children}
      {menu && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 bg-[#000000B3] backdrop-blur-sm z-10 animate-fadeIn items-center justify-center p-5">
          <div
            className="bg-(--bg-card) border border-(--border-color) rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-hidden amimate-slideUp flex flex-col"
            style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
          >
            <CadastroTitulo titulo="Cadastrar Nova Turma" cancelar={Cancel} />

            <form className="p-7 overflow-y-auto flex-1">
              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Informações Básicas
                </h3>
                <CadastroFlex2
                  opcao1="Código"
                  opcao2="Status"
                  infos={dados}
                  setInfos={setDados}
                />

                <CadastroFlex2
                  opcao1="Nome da Turma"
                  opcao2="Ano Letivo"
                  infos={dados}
                  setInfos={setDados}
                />

                <CadastroFlex2
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
                <CadastroFlex2
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
                <CadastroFlex2
                  opcao1="Horário Início"
                  opcao2="Horário Fim"
                  infos={dados}
                  setInfos={setDados}
                />

                <CadastroFlex1
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

                <CadastroFlex1
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
    </CadastroTurmaContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCadastroTurma() {
  const context = useContext(CadastroTurmaContext);
  if (!context) {
    throw new Error(
      "useCadastroTurma deve ser usado dentro do CadastroTurmaProvider"
    );
  }
  return context;
}
