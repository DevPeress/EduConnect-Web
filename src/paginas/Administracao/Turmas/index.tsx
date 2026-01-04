import { useEffect, useState } from "react";
import type { Turmas } from "../../../types/types";
import LayoutLogado from "../../LayoutLogado";
import { Table } from "../../../components/Exibicao";
import { http } from "../../../utils/axios";
import Selects from "../../../components/Administracao/Selects";
import TrocaPagina from "../../../components/TrocaPagina";
import { useCadastroMenu } from "../../../context";

const ITENS_POR_PAGINA = 6;

const TurmasAdmin = () => {
  const { cadastroTurma } = useCadastroMenu();

  const [loading, setLoading] = useState<boolean>(false);
  const [turno, setTurno] = useState<string>("Todos os Turnos");
  const [status, setStatus] = useState<string>("Todos os Status");
  const [ano, setAno] = useState<string>("Todos os Anos");
  const [turmas, setTurmas] = useState<Turmas[]>([]);
  const [anos, setAnos] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);

  const Pesquisa = () => {
    http
      .get(
        `api/turma/filtro/turno/${turno}/status/${status}/page/${pagina}/ano/${ano}`
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
  };

  // Requisita os dados novos toda vez que status, categoria ou meses mudar
  useEffect(() => {
    Pesquisa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turno, status, pagina, ano]);

  // Atualiza sempre que os pagamentos mudar para página 1
  useEffect(() => {
    setPagina(1);
  }, [total]);

  useEffect(() => {
    http.get("api/turma/pegarInformativos").then(function (dados) {
      setAnos(dados.data);
    });
  }, []);

  const AdicionarTurma = async () => {
    const dados = await cadastroTurma();
    if (!dados || turmas.length < 6) return;
    return Pesquisa();
  };

  const maxPaginas: number = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

  return (
    <LayoutLogado
      titulo="Gerenciamento de Turmas"
      desc="Visualize e Gerencie as turmas da Escola"
      botao={{
        ativo: true,
        mensagem: "Novo Turma",
        adicionar: AdicionarTurma,
      }}
      load={loading}
    >
      <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
        <div className="flex gap-3 flex-wrap">
          <Selects
            selecionadoTurno={setTurno}
            selecionadoStatus={setStatus}
            selecionadoAno={setAno}
            tipo="Turmas"
            anos={anos}
          />
        </div>
      </div>

      <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
        <Table exibicao={turmas} />
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
