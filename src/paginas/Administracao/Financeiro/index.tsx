import { useEffect, useMemo, useState } from "react";
import SelectAlunos from "../../../components/Administracao/SelectAlunos";
import ModoExibicao from "../../../components/ModoExibicao";
import type { Pessoa } from "../../../types/types";
import { useCadastroAluno } from "../../../context/CadastroAlunoContext";
import LayoutLogado from "../../LayoutLogado";
import Table from "../../../components/Table";
import Grid from "../../../components/Grid";
import { http } from "../../../utils/axios";

const ITENS_POR_PAGINA = 6;

const FinanceiroAdmin = () => {
  const { openMenu } = useCadastroAluno();

  const [loading, setLoading] = useState<boolean>(false);
  const [modo, setModo] = useState<boolean>(() => {
    const cargo = localStorage.getItem("Exibir");
    return cargo ? true : false;
  });
  const [salas] = useState<string[]>(["Todas as Salas", "9º A", "9º B"]);
  const [selecionada, setSelecionada] = useState<string>("Todas as Salas");
  const [status, setStatus] = useState<string>("Todos os Status");
  const [pesquisa] = useState<string>("");
  const [pagina, setPagina] = useState(1);

  const head: string[] = [
    "Matrícula",
    "Nome",
    "Turma",
    "E-mail",
    "Telefone",
    "Status",
    "Ação",
  ];

  const [alunos, setAlunos] = useState<Pessoa[]>([]);

  const AlunosFiltrados = useMemo(() => {
    const termo = pesquisa.toLowerCase();
    return alunos.filter((itens) => {
      // Agrupa todas as variáveis referentes aos alunos em uma única variável.
      const conteudo = `
        ${itens.registro.toLowerCase()}
        ${itens.nome.toLowerCase()}
        ${itens.nasc}
        ${itens.turma}
        ${itens.email.toLowerCase()}
        ${itens.telefone.toLowerCase()}
        ${itens.status.toLowerCase()}
        `;

      // Avalia a variável de Turma selecionada para determinar o filtro a ser aplicado.
      const correspondeTurma =
        selecionada === "Todas as Salas" || itens.turma.includes(selecionada);

      // Avalia a variável de Status selecionada para determinar o filtro a ser aplicado.
      const correspondeStatus =
        status === "Todos os Status" ||
        itens.status.toLowerCase() === status.toLowerCase();

      // Valida se o termo pesquisado está contido nas informações do aluno para exibição combinada com a turma e o status.
      const correspondetes =
        conteudo.includes(termo) && correspondeTurma && correspondeStatus;
      return correspondetes;
    });
  }, [alunos, pesquisa, selecionada, status]);

  useEffect(() => {
    setPagina(1);
  }, [AlunosFiltrados.length]);

  useEffect(() => {
    http
      .get("api/alunos")
      .then(function (dados) {
        setAlunos(dados.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  const AdicionarAluno = async () => {
    const dados = await openMenu();
    if (!dados) return;
    return setAlunos((prevDados) => [
      ...prevDados,
      {
        registro: dados.matricula,
        nome: dados.nome,
        nasc: dados.nascimento,
        turma: dados.turma,
        email: dados.email,
        telefone: dados.telefone,
        status: dados.status,
      },
    ]);
  };

  const maxPaginas = Math.max(
    1,
    Math.ceil(AlunosFiltrados.length / ITENS_POR_PAGINA)
  );

  const inicio = (pagina - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const exibicao = AlunosFiltrados.slice(inicio, fim);

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
        <div className="bg-(--bg-card) border border-(--border-color) rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 bg-[#10B98126] text-(--green)">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div>
            <h3 className="text-[13px] text-(--text-muted) font-medium mb-1">
              Recebido
            </h3>
            <div className="text-2xl font-bold text-(--text-primary)">
              R$ 0,00
            </div>
          </div>
        </div>

        <div className="bg-(--bg-card) border border-(--border-color) rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 bg-[#EF444426] text-(--red)">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div>
            <h3 className="text-[13px] text-(--text-muted) font-medium mb-1">
              Pendente
            </h3>
            <div className="text-2xl font-bold text-(--text-primary)">
              R$ 0,00
            </div>
          </div>
        </div>

        <div className="bg-(--bg-card) border border-(--border-color) rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 bg-[#F59E0B26] text-(--orange)">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div>
            <h3 className="text-[13px] text-(--text-muted) font-medium mb-1">
              Atrasado
            </h3>
            <div className="text-2xl font-bold text-(--text-primary)">
              R$ 0,00
            </div>
          </div>
        </div>

        <div className="bg-(--bg-card) border border-(--border-color) rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 bg-[#3B82F626] text-(--blue)">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-[13px] text-(--text-muted) font-medium mb-1">
              Total
            </h3>
            <div className="text-2xl font-bold text-(--text-primary)">
              R$ 0,00
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
        <div className="flex gap-3 flex-wrap">
          <SelectAlunos
            salas={salas}
            selecionada={setSelecionada}
            status={setStatus}
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
          Página {pagina} de {maxPaginas} ({AlunosFiltrados.length} alunos)
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
