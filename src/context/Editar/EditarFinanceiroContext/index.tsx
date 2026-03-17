import { useState, type ReactNode } from "react";
import {
  Flex1Context,
  Flex2Context,
  TituloContext,
} from "../../../components/TypeContext";
import { http } from "../../../utils/axios";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { EditarFinanceiroContext } from "./EditarFinanceiroContext";
import {
  editarFinanceiroSchema,
  type EditarFinanceiroInput,
} from "../../../schemas/Editar/EditarFinanceiroSchema";

export function EditarAlunoProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<EditarFinanceiroInput>({
    registro: "",
    categoria: "Selecionar categoria",
    metodo: "Selecionar método",
    descricao: "",
    valor: 0,
    dataVencimento: "",
    statuspagamento: "false",
    cancelado: false,
    dataPagamento: "",
    observacoes: "",
    aluno: "",
  });

  const [resolveCallback, setResolveCallback] = useState<
    ((data: true | null) => void) | null
  >(null);

  const openMenu = async (
    registro: string,
  ): Promise<EditarFinanceiroInput | null> => {
    await http.get(`api/financeiro/${registro}`).then(function (dados) {
      const infos = dados.data;
      setDados({
        registro: infos.registro,
        categoria: infos.categoria,
        metodo: infos.metodo,
        descricao: infos.descricao,
        valor: infos.valor,
        dataVencimento: infos.dataVencimento,
        statuspagamento: infos.pago,
        cancelado: infos.cancelado,
        dataPagamento: infos.dataPagamento,
        observacoes: infos.observacoes,
        aluno: infos.aluno,
      });
    });
    setMenu(true);
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Confirm = async () => {
    const result = editarFinanceiroSchema.safeParse(dados);
    if (!result.success) return toast.error(result.error.issues[0].message);

    if (resolveCallback) {
      await http
        .post("api/Aluno", {
          registro: dados.registro,
          categoria: dados.categoria,
          metodo: dados.metodo,
          descricao: dados.descricao,
          valor: dados.valor,
          dataVencimento: dados.dataVencimento,
          pago: dados.statuspagamento === "Pago" ? true : false,
          cancelado: dados.cancelado,
          dataPagamento:
            dados.dataPagamento !== "" ? dados.dataPagamento : null,
          observacoes: dados.observacoes,
          aluno: dados.aluno,
        })
        .then(function () {
          resolveCallback(true);
          setResolveCallback(null);
          toast.success("Registro atualizado com sucesso!");
        })
        .catch(function (err) {
          const error = err as AxiosError;
          const msg = error?.response?.data as string;

          resolveCallback(null);
          toast.error(msg ?? "Erro ao atualizar");
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
    <EditarFinanceiroContext.Provider value={{ openMenu, setDados }}>
      {children}
      {menu && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 bg-[#000000B3] backdrop-blur-sm z-10 animate-fadeIn items-center justify-center p-5">
          <div
            className="bg-(--bg-card) border border-(--border-color) rounded-2xl w-full max-w-175 max-h-[90vh] overflow-hidden amimate-slideUp flex flex-col"
            style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
          >
            <TituloContext titulo="Registrar Pagamento" cancelar={Cancel} />

            <form className="p-7 overflow-y-auto flex-1">
              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Informações do Pagamento
                </h3>

                <Flex2Context
                  opcao1="Registro"
                  opcao2="Aluno"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex1Context
                  titulo="Descrição"
                  infos={dados}
                  setInfos={setDados}
                  place="ex: Mensalidade Dezembro 2025"
                />

                <Flex2Context
                  opcao1="Categoria"
                  opcao2="Método do Pagameto"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex2Context
                  opcao1="Valor"
                  opcao2="Vencimento"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex2Context
                  opcao1="Status do Pagamento"
                  opcao2="Data do Pagamento"
                  infos={dados}
                  setInfos={setDados}
                />

                <Flex2Context
                  opcao1="Cancelado"
                  opcao2="Observações"
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
                Salvar Pagamento
              </button>
            </div>
          </div>
        </div>
      )}
    </EditarFinanceiroContext.Provider>
  );
}
