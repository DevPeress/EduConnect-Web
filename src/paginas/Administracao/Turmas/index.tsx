import { useEffect, useState } from "react";
import type { Turmas } from "../../../types/types";
import { useCadastroAluno } from "../../../context/CadastroAlunoContext";
import LayoutLogado from "../../LayoutLogado";
import { Table } from "../../../components/Exibicao";
import { http } from "../../../utils/axios";
import Selects from "../../../components/Administracao/Selects";
import TrocaPagina from "../../../components/TrocaPagina";

const ITENS_POR_PAGINA = 6;

const TurmasAdmin = () => {
  const { openMenu } = useCadastroAluno();

  const [loading, setLoading] = useState<boolean>(false);
  const [turno, setTurno] = useState<string>("Todos os Turnos");
  const [status, setStatus] = useState<string>("Todos os Status");
  const [turmas, setTurmas] = useState<Turmas[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);

  const head: string[] = [
    "Código",
    "Nome",
    "Turno",
    "Professor",
    "Horário",
    "Capacidade",
    "Ação",
  ];

  // Requisita os dados novos toda vez que status, categoria ou meses mudar
  useEffect(() => {
    http
      .get(
        `api/turma/filtro/selecionada/${turno}/status/${status}/page/${pagina}`
      )
      .then(function (dados) {
        setTotal(dados.data.total);
        setTurmas(dados.data.dados);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, [turno, status, pagina]);

  // Atualiza sempre que os pagamentos mudar para página 1
  useEffect(() => {
    setPagina(1);
  }, [total]);

  const AdicionarAluno = async () => {
    const dados = await openMenu();
    if (!dados) return;
  };

  const maxPaginas: number = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

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
          <Selects
            selecionadoTurno={setTurno}
            selecionadoStatus={setStatus}
            tipo="Turmas"
          />
        </div>
      </div>

      <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
        <Table head={head} exibicao={turmas} />
      </div>

      <TrocaPagina
        nome="Turma"
        pagina={pagina}
        maxPagina={maxPaginas}
        total={total}
        trocaPagina={setPagina}
      />
    </LayoutLogado>
  );
};

export default TurmasAdmin;
