import { useState, type ReactNode } from "react";
import {
  Flex1Context,
  Flex2Context,
  TituloContext,
} from "../../../components/TypeContext";
import toast from "react-hot-toast";
import { http } from "../../../utils/axios";
import type { AxiosError } from "axios";
import { CadastroNotaContext } from "./CadastroNotaContext";
import { cadastroNotaSchema, type CadastroNotaInput } from "../../../schemas/Cadastro/CadastroNotaSchema";

export function CadastroNotaProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<CadastroNotaInput>({
    alunoRegistro: "",
    nota: 0,
    materia: "Selecionar Matéria",
  });
  const [resolveCallback, setResolveCallback] = useState<
    ((data: true | null) => void) | null
  >(null);

  const openMenu = async (): Promise<CadastroNotaInput | null> => {
    const disciplinasValidas = await http.get(
      "api/disciplinas/pegarDisciplinas",
    );
    setMenu(true);
    setDados((prevDados) => ({
      ...prevDados,
      disciplinasValidas: disciplinasValidas.data,
    }));
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Confirm = async () => {
    const result = cadastroNotaSchema.safeParse(dados);
    if (!result.success) return toast.error(result.error.issues[0].message);

    if (resolveCallback) {
      await http
        .post("/api/notas", {
          Registro: dados.alunoRegistro,
          Nota: dados.nota,
          Materia: dados.materia,
        })
        .then(function () {
          resolveCallback(true);
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
      alunoRegistro: "",
      nota: 0,
      materia: "Selecionar Matéria",
    });
    setMenu(false);
  };

  return (
    <CadastroNotaContext.Provider value={{ openMenu, setDados }}>
      {children}
      {menu && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 bg-[#000000B3] backdrop-blur-sm z-10 animate-fadeIn items-center justify-center p-5">
          <div
            className="bg-(--bg-card) border border-(--border-color) rounded-2xl w-full max-w-175 max-h-[90vh] overflow-hidden amimate-slideUp flex flex-col"
            style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
          >
            <TituloContext titulo="Cadastrar Nova Nota" cancelar={Cancel} />

            <form className="p-7 overflow-y-auto flex-1">
              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Informações da Nota
                </h3>
                <Flex2Context
                  opcao1="Matricula do Aluno"
                  opcao2="Nota"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex1Context
                  titulo="Matéria"
                  infos={dados}
                  setInfos={setDados}
                  place="Selecione a matéria"
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
                Salvar Nota
              </button>
            </div>
          </div>
        </div>
      )}
    </CadastroNotaContext.Provider>
  );
}
