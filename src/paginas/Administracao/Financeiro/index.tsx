import { useEffect, useState } from "react";
import type { CardsFinanceiroType, Financeiro } from "../../../types/types";
import LayoutLogado from "../../LayoutLogado";
import { Grid, Table, ModoExibicao } from "../../../components/Exibicao";
import CardsFinanceiro from "../../../components/Administracao/CardsFinanceiro";
import { http } from "../../../utils/axios";
import Selects from "../../../components/Administracao/Selects";
import { useCadastroMenu } from "../../../context";
import TrocaPagina from "../../../components/TrocaPagina";

const ITENS_POR_PAGINA = 6;

const FinanceiroAdmin = () => {
  const { cadastroPagamento } = useCadastroMenu();

  const [loading, setLoading] = useState<boolean>(true);
  const [modo, setModo] = useState<boolean>(() => {
    const cargo = localStorage.getItem("Exibir");
    return cargo ? true : false;
  });
  const [status, setStatus] = useState<string>("Todos os Status");
  const [categorias, setCategorias] = useState<string>("Todas as Categorias");
  const [meses, setMeses] = useState<string>("Todos os Meses");
  const [tipo, setTipo] = useState<CardsFinanceiroType[]>([]);
  const [pagamentos, setPagamentos] = useState<Financeiro[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);

  // API para requisitar os Dados
  const Pesquisa = () => {
    http
      .get(
        `api/financeiro/filtro/categoria/${categorias}/status/${status}/data/${meses}/page/${pagina}`
      )
      .then(function (dados) {
        setTotal(dados.data.total);
        setPagamentos(dados.data.dados);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  //API para requisitar os dados
  const Dados = () => {
    http
      .get("api/financeiro/Dashboard")
      .then(function (dados) {
        setTipo(dados.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Requisita os dados novos toda vez que status, categoria ou meses mudar
  useEffect(() => {
    Pesquisa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorias, meses, pagina, status]);

  // Atualiza sempre que os pagamentos mudar para página 1
  useEffect(() => {
    setPagina(1);
  }, [pagamentos]);

  const maxPaginas = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

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

  return (
    <LayoutLogado
      titulo="Gestão Financeira"
      desc="Controle de pagamentos e mensalidades"
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

        <div className="flex gap-2 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] p-1.5">
          <ModoExibicao
            modoExibir={modo}
            trocarModo={() => setModo((m) => !m)}
          />
        </div>
      </div>

      {modo ? (
        <div className="grid grid-cols-3 overflow-hidden gap-x-6 gap-y-5 w-full">
          <Grid exibicao={pagamentos} />
        </div>
      ) : (
        <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
          <Table exibicao={pagamentos} />
        </div>
      )}

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

export default FinanceiroAdmin;
