import { useEffect, useMemo, useState } from "react";
import SelectFinanceiro from "../../../components/Administracao/SelectFinanceiro";
import ModoExibicao from "../../../components/ModoExibicao";
import type { CardsFinanceiroType, Financeiro } from "../../../types/types";
import { useCadastroAluno } from "../../../context/CadastroAlunoContext";
import LayoutLogado from "../../LayoutLogado";
import Table from "../../../components/Table";
import Grid from "../../../components/Grid";
import CardsFinanceiro from "../../../components/Administracao/CardsFinanceiro";

const ITENS_POR_PAGINA = 6;

const FinanceiroAdmin = () => {
  const { openMenu } = useCadastroAluno();

  const [loading] = useState<boolean>(false);
  const [modo, setModo] = useState<boolean>(() => {
    const cargo = localStorage.getItem("Exibir");
    return cargo ? true : false;
  });
  const [status, setStatus] = useState<string>("Todos os Status");
  const [categorias, setCategorias] = useState<string>("Todos os Categorias");
  const [meses, setMeses] = useState<string>("Todos os Meses");
  const [pesquisa] = useState<string>("");
  const [pagina, setPagina] = useState(1);

  const head: string[] = [
    "Aluno",
    "Categoria",
    "Valor",
    "Vencimento",
    "Pagamento",
    "Status",
    "Ação",
  ];

  const [tipo] = useState<CardsFinanceiroType[]>([
    { dado: "Recebido", total: 0 },
    { dado: "Pendente", total: 0 },
    { dado: "Atrasado", total: 0 },
    { dado: "Total", total: 0 },
  ]);
  const [pagamentos] = useState<Financeiro[]>([
    {
      registro: "1",
      aluno: "Fabrício Peres",
      nasc: "01/12/2025",
      categoria: "Mensalidade",
      valor: 1000,
      vencimento: "02/12/2025",
      pagamento: 1000,
      status: "Liberado",
      mes: "Dezembro",
    },
  ]);

  const PagamentosFiltrados = useMemo(() => {
    const termo = pesquisa.toLowerCase();
    return pagamentos.filter((itens) => {
      // Agrupa todas as variáveis referentes aos pagamentos em uma única variável.
      const conteudo = `
        ${itens.aluno.toLowerCase()}
        ${itens.categoria.toLowerCase()}
        ${itens.valor}
        ${itens.vencimento.toLowerCase()}
        ${itens.pagamento}
        ${itens.status.toLowerCase()}
        `;

      // Avalia a variável de Meses selecionada para determinar o filtro a ser aplicado.
      const correspondeTurma =
        meses === "Todos os Meses" || itens.mes.includes(meses);

      // Avalia a variável de Categorias selecionada para determinar o filtro a ser aplicado.
      const correspondeCategoria =
        categorias === "Todos os Categorias" ||
        itens.categoria.includes(categorias);

      // Avalia a variável de Status selecionada para determinar o filtro a ser aplicado.
      const correspondeStatus =
        status === "Todos os Status" ||
        itens.status.toLowerCase() === status.toLowerCase();

      // Valida se o termo pesquisado está contido nas informações do aluno para exibição combinada com a turma e o status.
      const correspondetes =
        conteudo.includes(termo) &&
        correspondeTurma &&
        correspondeStatus &&
        correspondeCategoria;
      return correspondetes;
    });
  }, [pagamentos, categorias, meses, pesquisa, status]);

  useEffect(() => {
    setPagina(1);
  }, [PagamentosFiltrados.length]);

  const AdicionarAluno = async () => {
    const dados = await openMenu();
    if (!dados) return;
  };

  const maxPaginas = Math.max(
    1,
    Math.ceil(PagamentosFiltrados.length / ITENS_POR_PAGINA)
  );

  const inicio = (pagina - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const exibicao = PagamentosFiltrados.slice(inicio, fim);

  return (
    <LayoutLogado
      titulo="Gestão Financeira"
      desc="Controle de pagamentos e mensalidades"
      botao={{
        ativo: false,
        mensagem: "Novo Pagamento",
        adicionar: AdicionarAluno,
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
          <Grid exibicao={exibicao} head={[]} />
        </div>
      ) : (
        <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
          <Table head={head} exibicao={exibicao} />
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
          Página {pagina} de {maxPaginas} ({PagamentosFiltrados.length}{" "}
          pagamentos)
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
