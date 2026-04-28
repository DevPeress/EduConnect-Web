import { useCallback, useEffect, useState } from "react";
import type { CardsFinanceiroType, Financeiro } from "../../types/types";
import LayoutLogado from "../LayoutLogado";
import Table from "../../components/Table";
import CardsFinanceiro from "../../components/Administracao/CardsFinanceiro";
import { http } from "../../utils/axios";
import Selects from "../../components/Selects";
import { useCadastroMenu, useEditarMenu } from "../../context";
import TrocaPagina from "../../components/TrocaPagina";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const ITENS_POR_PAGINA = 6;

const FinanceiroPage = () => {
  const { cadastroPagamento } = useCadastroMenu();
  const { editarPagamento } = useEditarMenu();

  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("Todos os Status");
  const [categorias, setCategorias] = useState<string>("Todas as Categorias");
  const [meses, setMeses] = useState<string>("Todos os Meses");
  const [pesquisa, setPesquisa] = useState<string>("");
  const [tipo, setTipo] = useState<CardsFinanceiroType[]>([]);
  const [pagamentos, setPagamentos] = useState<Financeiro[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);

  // API para requisitar os Dados
  const Pesquisa = useCallback(() => {
    const pesquisaFinal = pesquisa == "" ? "Todos" : pesquisa;
    const params = new URLSearchParams({
      categoria: categorias,
      status,
      data: meses,
      page: String(pagina),
      pesquisa: pesquisaFinal,
    });

    const url = `api/financeiro/filtro?${params.toString()}`;

    http
      .get(url)
      .then(function (dados) {
        setTotal(dados.data.total);
        setPagamentos(dados.data.dados);
      })
      .catch(function (err) {
        const error = err as AxiosError;
        const msg = error?.response?.data as string;

        toast.error(msg ?? "Erro ao obter lista do financeiro");
      })
      .finally(function () {
        setLoading(false);
      });
  }, [categorias, meses, pagina, pesquisa, status]);

  //API para requisitar os dados
  const Dados = () => {
    http
      .get("api/financeiro/Dashboard")
      .then(function (dados) {
        setTipo(dados.data);
      })
      .catch(function (err) {
        const error = err as AxiosError;
        const msg = error?.response?.data as string;

        toast.error(msg ?? "Erro ao obter dados do dashboard");
      });
  };

  // Requisita os dados novos toda vez que status, categoria ou meses mudar
  useEffect(() => {
    Pesquisa();
  }, [Pesquisa]);

  // Atualiza sempre que os pagamentos mudar para página 1
  useEffect(() => {
    setPagina(1);
  }, [pagamentos]);

  // Dados do DashBoard
  useEffect(() => {
    Dados();
  }, []);

  // Adiciona um pagamento novo
  const AdicionarPagamento = async () => {
    const dados = await cadastroPagamento();
    if (!dados) return;
    Dados();
    if (pagamentos.length < 5) {
      Pesquisa();
    }
  };

  const Excluir = async (Registro: string) => {
    http
      .delete(`api/financeiro/${Registro}`)
      .then(function () {
        toast.success("Fatura deletada com sucesso!");
      })
      .catch(function (err) {
        const error = err as AxiosError;
        const msg = error?.response?.data as string;

        toast.error(msg ?? "Erro ao deletar fatura");
      })
      .finally(function () {
        Pesquisa();
      });
  };

  const Editar = async (Registro: string) => {
    const dados = await editarPagamento(Registro);
    if (!dados) return;
    return Pesquisa();
  };

  const maxPaginas = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

  return (
    <LayoutLogado
      titulo="Gestão Financeira"
      desc="Controle de pagamentos e mensalidades"
      exibirPesquisa={{
        exibir: true,
        valor: pesquisa,
        set: setPesquisa,
      }}
      botao={{
        ativo: true,
        mensagem: "Novo Pagamento",
        adicionar: AdicionarPagamento,
      }}
      load={loading}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 mb-8">
        {tipo.map((item, index) => (
          <CardsFinanceiro key={index} dados={item} />
        ))}
      </div>
      <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
        <div className="flex gap-3 flex-wrap">
          <Selects
            selecionadoCategorias={setCategorias}
            selecionadoMeses={setMeses}
            selecionadoPagamento={setStatus}
            tipo="Financeiro"
          />
        </div>
      </div>

      <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
        <Table exibicao={pagamentos} excluir={Excluir} editar={Editar} />
      </div>

      <TrocaPagina
        nome="Pagamentos"
        pagina={pagina}
        maxPagina={maxPaginas}
        total={total}
        trocaPagina={setPagina}
      />
    </LayoutLogado>
  );
};

export default FinanceiroPage;
