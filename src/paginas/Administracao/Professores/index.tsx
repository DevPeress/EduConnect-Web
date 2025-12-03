import { useEffect, useState } from "react";
import ModoExibicao from "../../../components/ModoExibicao";
import type { Pessoa } from "../../../types/types";
import SelectProfessores from "../../../components/Administracao/SelectProfessores";
import { useCadastroProfessor } from "../../../context/CadastroProfessorContext";
import LayoutLogado from "../../LayoutLogado";
import Table from "../../../components/Table";
import Grid from "../../../components/Grid";
import { http } from "../../../utils/axios";

const ITENS_POR_PAGINA = 6;

const ProfessoresAdmin = () => {
  const { openMenu } = useCadastroProfessor();

  const [loading, setLoading] = useState<boolean>(true);
  const [modo, setModo] = useState<boolean>(() => {
    const cargo = localStorage.getItem("Exibir");
    return cargo ? true : false;
  });
  const [salas] = useState<string[]>(["Todas as Salas", "9º A", "9º B"]);
  const [selecionada, setSelecionada] = useState<string>("Todas as Salas");
  const [status, setStatus] = useState<string>("Todos os Status");
  const [professores, setProfessores] = useState<Pessoa[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);

  const head: string[] = [
    "Código",
    "Nome",
    "Turmas",
    "E-mail",
    "Telefone",
    "Status",
    "Ação",
  ];

  // Requisita os dados novos toda vez que status, categoria ou meses mudar
  useEffect(() => {
    http
      .get(`api/alunos/filtro/selecionada/${selecionada}/status/${status}`)
      .then(function (dados) {
        setTotal(dados.data.total);
        setProfessores(dados.data.dados);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, [selecionada, status]);

  // Atualiza sempre que os pagamentos mudar para página 1
  useEffect(() => {
    setPagina(1);
  }, [total]);

  const AdicionarProfessor = async () => {
    const dados = await openMenu();
    if (!dados) return;
    return setProfessores((prevDados) => [
      ...prevDados,
      {
        nome: dados.nome,
        turma: dados.turmas,
        email: dados.email,
        telefone: dados.telefone,
        status: dados.status,
        registro: dados.codigo,
        nasc: dados.nasc,
      },
    ]);
  };

  const maxPaginas = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

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

      {modo ? (
        <div className="grid grid-cols-3 overflow-hidden gap-x-6 gap-y-5 w-full">
          <Grid exibicao={professores} head={[]} />
        </div>
      ) : (
        <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
          <Table head={head} exibicao={professores} />
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
          Página {pagina} de {maxPaginas} ({total} professores)
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
