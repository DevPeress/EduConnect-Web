import { useEffect, useState } from "react";
import type { Funcionario } from "../../../types/types";
import { useCadastroProfessor } from "../../../context/CadastroProfessorContext";
import LayoutLogado from "../../LayoutLogado";
import { Grid, Table, ModoExibicao } from "../../../components/Exibicao";
import { http } from "../../../utils/axios";
import Selects from "../../../components/Administracao/Selects";
import TrocaPagina from "../../../components/TrocaPagina";

const ITENS_POR_PAGINA = 6;

const FuncionariosAdmin = () => {
  const { openMenu } = useCadastroProfessor();

  const [loading, setLoading] = useState<boolean>(true);
  const [modo, setModo] = useState<boolean>(() => {
    const cargo = localStorage.getItem("Exibir");
    return cargo ? true : false;
  });
  const [selecionada, setSelecionada] = useState<string>("Todos os Departamentos");
  const [status, setStatus] = useState<string>("Todos os Status");
  const [ano, setAno] = useState<string>("Todos os Anos");
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [anos, setAnos] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);

  // Requisita os dados novos toda vez que status, categoria ou meses mudar
  const Pesquisa = () => {
    http
      .get(`api/funcionarios/filtro/selecionada/${selecionada}/status/${status}/page/${pagina}/ano/${ano}`)
      .then(function (dados) {
        setTotal(dados.data.total);
        setFuncionarios(dados.data.dados);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };
  useEffect(() => {
    Pesquisa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, status, anos, selecionada]);

  // Atualiza sempre que os pagamentos mudar para página 1
  useEffect(() => {
    setPagina(1);
  }, [total]);

  useEffect(() => {
    http.get("api/funcionarios/pegarAnos").then(function (dados) {
      setAnos(dados.data);
    });
  }, []);

  const AdicionarFuncionario = async () => {
    const dados = await openMenu();
    if (!dados || funcionarios.length < 6) return;
    return Pesquisa();
  };

  const maxPaginas = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

  return (
    <LayoutLogado
      titulo="Gerenciamento de Funcionários"
      desc="Visualize e Gerencie as informações dos funcionários"
      botao={{
        ativo: true,
        mensagem: "Novo Professor",
        adicionar: AdicionarFuncionario,
      }}
      load={loading}
    >
      <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
        <div className="flex gap-3 flex-wrap">
          <Selects
            selecionadoCategorias={setSelecionada}
            selecionadoStatus={setStatus}
            selecionadoAno={setAno}
            tipo="Funcionarios"
            anos={anos}
          />
        </div>

        <div className="flex gap-2 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] p-1.5">
          <ModoExibicao modoExibir={modo} trocarModo={() => setModo(!modo)} />
        </div>
      </div>

      {modo ? (
        <div className="grid grid-cols-3 overflow-hidden gap-x-6 gap-y-5 w-full">
          <Grid exibicao={funcionarios} />
        </div>
      ) : (
        <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
          <Table exibicao={funcionarios} />
        </div>
      )}

      <TrocaPagina
        nome="Funcionários"
        pagina={pagina}
        maxPagina={maxPaginas}
        total={total}
        trocaPagina={setPagina}
      />
    </LayoutLogado>
  );
};

export default FuncionariosAdmin;
