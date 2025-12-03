import { useEffect, useState } from "react";
import SelectFinanceiro from "../../../components/Administracao/SelectFinanceiro";
import ModoExibicao from "../../../components/ModoExibicao";
import type { CardsFinanceiroType, Financeiro } from "../../../types/types";
import LayoutLogado from "../../LayoutLogado";
import Table from "../../../components/Table";
import Grid from "../../../components/Grid";
import CardsFinanceiro from "../../../components/Administracao/CardsFinanceiro";
import { http } from "../../../utils/axios";

const ITENS_POR_PAGINA = 6;

const FinanceiroAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
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

  const head: string[] = [
    "Aluno",
    "Categoria",
    "Valor",
    "Vencimento",
    "Pagamento",
    "Status",
    "Ação",
  ];

  // Requisita os dados novos toda vez que status, categoria ou meses mudar
  useEffect(() => {
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
  }, [categorias, meses, pagina, status]);

  // Atualiza sempre que os pagamentos mudar para página 1
  useEffect(() => {
    setPagina(1);
  }, [pagamentos]);

  const maxPaginas = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

  // Dados do DashBoard
  useEffect(() => {
    http
      .get("api/financeiro/dashboard")
      .then(function (dados) {
        setTipo(dados.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  return (
    <LayoutLogado
      titulo="Gestão Financeira"
      desc="Controle de pagamentos e mensalidades"
      botao={{
        ativo: false,
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
          <SelectFinanceiro
            Categoria={setCategorias}
            Meses={setMeses}
            Status={setStatus}
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
          <Grid exibicao={pagamentos} head={[]} />
        </div>
      ) : (
        <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
          <Table head={head} exibicao={pagamentos} />
        </div>
      )}

      <div className="flex justify-center items-center gap-5 mt-8 pt-5 border-t-2 border-(--border-color)">
        <button
          onClick={() => pagina > 1 && setPagina(pagina - 1)}
          className="py-2.5 px-4 bg-transparent border-2 border-(--border-color) text-(--text-primary) text-[14px] font-medium rounded-lg hover:bg-(--bg-input) hover:border-(--border-light)"
          disabled={pagina === 1}
        >
          Anterior
        </button>
        <div className="text-[14px] text-(--text-secondary)">
          Página {pagina} de {maxPaginas} ({total} pagamentos)
        </div>
        <button
          onClick={() => pagina < maxPaginas && setPagina(pagina + 1)}
          disabled={pagina === maxPaginas}
          className="py-2.5 px-4 bg-transparent border-2 border-(--border-color) text-(--text-primary) text-[14px] font-medium rounded-lg hover:bg-(--bg-input) hover:border-(--border-light)"
        >
          Próximo
        </button>
      </div>
    </LayoutLogado>
  );
};

export default FinanceiroAdmin;
