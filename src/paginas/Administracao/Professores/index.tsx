import { useEffect, useMemo, useState } from "react";
import ModoExibicao from "../../../components/ModoExibicao";
import type { ProfessorType } from "../../../types/types";
import SelectProfessores from "../../../components/Administracao/SelectProfessores";
import { useCadastroProfessor } from "../../../context/CadastroProfessorContext";
import LayoutLogado from "../../LayoutLogado";
import Table from "../../../components/Table";

const ITENS_POR_PAGINA = 6;

const ProfessoresAdmin = () => {
  const { openMenu } = useCadastroProfessor();

  const [loading] = useState<boolean>(false);
  const [modo, setModo] = useState<boolean>(false);
  const [salas] = useState<string[]>(["Todas as Salas", "9º A", "9º B"]);
  const [selecionada, setSelecionada] = useState<string>("Todas as Salas");
  const [status, setStatus] = useState<string>("Todos os Status");
  const [pesquisa] = useState<string>("");
  const [pagina, setPagina] = useState(1);

  const head: string[] = [
    "Código",
    "Nome",
    "Turmas",
    "E-mail",
    "Telefone",
    "Status",
    "Ação",
  ];

  const [professores, setProfessores] = useState<ProfessorType[]>([
    {
      nome: "Fabrício Peres",
      turmas: ["9º A"],
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Ativo",
      registro: "01",
      nasc: new Date(),
    },
  ]);

  const ProfessoresFiltrados = useMemo(() => {
    const termo = pesquisa.toLowerCase();
    return professores.filter((itens) => {
      // Agrupa todas as variáveis referentes aos professores em uma única variável.
      const conteudo = `
        ${itens.registro.toLowerCase()}
        ${itens.nome.toLowerCase()}
        ${itens.nasc}
        ${itens.turmas}
        ${itens.email.toLowerCase()}
        ${itens.telefone.toLowerCase()}
        ${itens.status.toLowerCase()}
        `;

      // Avalia a variável de Turma selecionada para determinar o filtro a ser aplicado.
      const correspondeTurma =
        selecionada === "Todas as Salas" || itens.turmas.includes(selecionada);

      // Avalia a variável de Status selecionada para determinar o filtro a ser aplicado.
      const correspondeStatus =
        status === "Todos os Status" ||
        itens.status.toLowerCase() === status.toLowerCase();

      // Valida se o termo pesquisado está contido nas informações do aluno para exibição combinada com a turma e o status.
      const correspondetes =
        conteudo.includes(termo) && correspondeTurma && correspondeStatus;
      return correspondetes;
    });
  }, [professores, pesquisa, selecionada, status]);

  useEffect(() => {
    setPagina(1);
  }, [ProfessoresFiltrados.length]);

  const AdicionarProfessor = async () => {
    const dados = await openMenu();
    if (!dados) return;
    return setProfessores((prevDados) => [
      ...prevDados,
      {
        nome: dados.nome,
        turmas: dados.turmas,
        email: dados.email,
        telefone: dados.telefone,
        status: dados.status,
        registro: dados.codigo,
        nasc: dados.nasc,
      },
    ]);
  };

  const maxPaginas = Math.max(
    1,
    Math.ceil(ProfessoresFiltrados.length / ITENS_POR_PAGINA)
  );

  const inicio = (pagina - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const exibicao = ProfessoresFiltrados.slice(inicio, fim);

  return (
    <LayoutLogado
      titulo="Gerenciamento de Professores"
      desc="Visualize e Gerencie as informações dos professores"
      botao={{
        ativo: true,
        mensagem: "Novo Professor",
        adicionar: AdicionarProfessor,
      }}
      load={loading}
    >
      <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
        <div className="flex gap-3 flex-wrap">
          <SelectProfessores
            salas={salas}
            selecionada={setSelecionada}
            status={setStatus}
          />
        </div>

        <div className="flex gap-2 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] p-1.5">
          <ModoExibicao modoExibir={modo} trocarModo={() => setModo(!modo)} />
        </div>
      </div>

      <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
        <Table head={head} exibicao={exibicao} />
      </div>

      <div className="flex justify-center items-center gap-5 mt-8 pt-5 border-t-2 border-(--border-color)">
        <button
          onClick={() => pagina > 1 && setPagina(pagina - 1)}
          className="py-2.5 px-4 bg-transparent border-2 border-(--border-color) text-(--text-primary) text-[14px] font-medium rounded-lg hover:bg-(--bg-input) hover:border-(--border-light)"
          disabled={pagina === 1}
        >
          Anterior
        </button>
        <div className="text-[14px] text-(--text-secondary)">
          Página {pagina} de {maxPaginas} ({ProfessoresFiltrados.length}{" "}
          professores)
        </div>
        <button
          onClick={() => pagina < maxPaginas && setPagina(pagina + 1)}
          className="py-2.5 px-4 bg-transparent border-2 border-(--border-color) text-(--text-primary) text-[14px] font-medium rounded-lg hover:bg-(--bg-input) hover:border-(--border-light)"
          disabled={pagina === maxPaginas}
        >
          Próximo
        </button>
      </div>
    </LayoutLogado>
  );
};

export default ProfessoresAdmin;
