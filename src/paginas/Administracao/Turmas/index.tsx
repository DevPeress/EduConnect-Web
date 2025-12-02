import { useEffect, useState } from "react";
import SelectTurmas from "../../../components/Administracao/SelectTurmas";
import ModoExibicao from "../../../components/ModoExibicao";
import type { Pessoa } from "../../../types/types";
import { useCadastroAluno } from "../../../context/CadastroAlunoContext";
import LayoutLogado from "../../LayoutLogado";
import Table from "../../../components/Table";
import Grid from "../../../components/Grid";
import { http } from "../../../utils/axios";

const ITENS_POR_PAGINA = 6;

const TurmasAdmin = () => {
  const { openMenu } = useCadastroAluno();

  const [loading, setLoading] = useState<boolean>(false);
  const [modo, setModo] = useState<boolean>(() => {
    const cargo = localStorage.getItem("Exibir");
    return cargo ? true : false;
  });
  const [turno, setTurno] = useState<string>("Todos os Turnos");
  const [status, setStatus] = useState<string>("Todos os Status");
  const [pagina, setPagina] = useState(1);

  const head: string[] = [
    "Código",
    "Nome",
    "Turno",
    "Professor",
    "Horário",
    "Capacidade",
    "Ação",
  ];

  const [turmas, setTurmas] = useState<Pessoa[]>([]);

  useEffect(() => {
    http
      .get(`filtro/turno=${turno}&status=${status}`)
      .then(function (dados) {
        setTurmas(dados.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, [status, turno]);

  useEffect(() => {
    setPagina(1);
  }, [turmas.length]);

  const AdicionarAluno = async () => {
    const dados = await openMenu();
    if (!dados) return;
  };

  const maxPaginas = Math.max(1, Math.ceil(turmas.length / ITENS_POR_PAGINA));

  const inicio = (pagina - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const exibicao = turmas.slice(inicio, fim);

  return (
    <LayoutLogado
      titulo="Gerenciamento de Turmas"
      desc="Visualize e Gerencie as turmas da Escola"
      botao={{
        ativo: true,
        mensagem: "Novo Turma",
        adicionar: AdicionarAluno,
      }}
      load={loading}
    >
      <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
        <div className="flex gap-3 flex-wrap">
          <SelectTurmas Turno={setTurno} Status={setStatus} />
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
          Página {pagina} de {maxPaginas} ({turmas.length} turmas)
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

export default TurmasAdmin;
