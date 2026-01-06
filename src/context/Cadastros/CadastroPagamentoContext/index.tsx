import { createContext, useContext, useState, type ReactNode } from "react";
import type { CadastroContextType } from "../../../types/types";
import {
  Flex1Context,
  Flex2Context,
  TituloContext,
} from "../../../components/Cadastros";
import toast from "react-hot-toast";
import { http } from "../../../utils/axios";
import {
  cadastroPagamentoSchema,
  type CadastroPagamentoInput,
} from "../../../schemas/Cadastro/pagementoSchema";

const CadastroPagamentoContext = createContext<
  CadastroContextType<CadastroPagamentoInput> | undefined
>(undefined);
export function CadastroPagamentoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<CadastroPagamentoInput>({
    aluno: "",
    descricao: "",
    valor: 0,
    observacoes: "",
    categoria: "",
    statuspagamento: "",
    metodo: "",
    dataVencimento: new Date().toISOString().split("T")[0],
    dataPagamento: "",
  });
  const [resolveCallback, setResolveCallback] = useState<
    ((data: true | null) => void) | null
  >(null);

  const openMenu = async (): Promise<CadastroPagamentoInput | null> => {
    setMenu(true);
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Confirm = async () => {
    const result = cadastroPagamentoSchema.safeParse(dados);
    if (!result.success) return toast.error(result.error.issues[0].message);

    if (resolveCallback) {
      await http
        .post("/api/financeiro", {
          AlunoRegistro: dados.aluno,
          Categoria: dados.categoria,
          Metodo: dados.metodo,
          Descricao: dados.descricao,
          Valor: dados.valor,
          DataVencimento: dados.dataVencimento,
          Pago: dados.statuspagamento === "Pago" ? true : false,
          dataPagamento:
            dados.dataPagamento !== "" ? dados.dataPagamento : null,
          Observacoes: dados.observacoes,
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
      aluno: "",
      descricao: "",
      valor: 0,
      observacoes: "",
      categoria: "",
      statuspagamento: "",
      metodo: "",
      dataVencimento: new Date().toISOString().split("T")[0],
      dataPagamento: "",
    });
    setMenu(false);
  };

  return (
    <CadastroPagamentoContext.Provider value={{ openMenu, setDados }}>
      {children}
      {menu && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 bg-[#000000B3] backdrop-blur-sm z-10 animate-fadeIn items-center justify-center p-5">
          <div
            className="bg-(--bg-card) border border-(--border-color) rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-hidden amimate-slideUp flex flex-col"
            style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
          >
            <TituloContext titulo="Registrar Pagamento" cancelar={Cancel} />

            <form className="p-7 overflow-y-auto flex-1">
              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">
                  Informações do Pagamento
                </h3>
                <Flex2Context
                  opcao1="Aluno"
                  opcao2="Categoria"
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
                  opcao1="Método do Pagameto"
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
    </CadastroPagamentoContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCadastroPagamento() {
  const context = useContext(CadastroPagamentoContext);
  if (!context) {
    throw new Error(
      "useCadastroPagamento deve ser usado dentro do CadastroPagamentoProvider"
    );
  }
  return context;
}
