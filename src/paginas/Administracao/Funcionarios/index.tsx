import { useEffect, useState } from "react";
import type { Funcionario } from "../../../types/types";
import LayoutLogado from "../../LayoutLogado";
import Table from "../../../components/Table";
import { http } from "../../../utils/axios";
import Selects from "../../../components/Administracao/Selects";
import TrocaPagina from "../../../components/TrocaPagina";
import { useCadastroMenu, useEditarMenu } from "../../../context";
import toast from "react-hot-toast";

const ITENS_POR_PAGINA = 6;

const FuncionariosAdmin = () => {
  const { cadastroFuncionario } = useCadastroMenu();
  const { editarFuncionario } = useEditarMenu();

  const [loading, setLoading] = useState<boolean>(true);
  const [selecionada, setSelecionada] = useState<string>(
    "Todos os Departamentos",
  );
  const [status, setStatus] = useState<string>("Todos os Status");
  const [ano, setAno] = useState<string>("Todos os Anos");
  const [pesquisa, setPesquisa] = useState<string>("");
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [departamentos, setDepartamentos] = useState<string[]>([]);
  const [anos, setAnos] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);

  // Requisita os dados novos toda vez que status, categoria ou meses mudar
  const Pesquisa = () => {
    const pesquisaFinal = pesquisa == "" ? "Todos" : pesquisa;
    const params = new URLSearchParams({
      selecionada,
      status,
      page: String(pagina),
      ano,
      pesquisa: pesquisaFinal,
    });

    const url = `api/funcionarios/filtro?${params.toString()}`;

    http
      .get(url)
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
  }, [pagina, status, anos, selecionada, pesquisa]);

  // Atualiza sempre que os pagamentos mudar para página 1
  useEffect(() => {
    setPagina(1);
  }, [total]);

  useEffect(() => {
    http.get("api/funcionarios/pegarInformativos").then(function (dados) {
      setAnos(dados.data.anos);
      setDepartamentos(dados.data.departamentos);
    });
  }, []);

  const AdicionarFuncionario = async () => {
    const dados = await cadastroFuncionario();
    if (!dados || funcionarios.length > 5) return;
    return Pesquisa();
  };

  const Excluir = async (Registro: string) => {
    http
      .delete(`api/funcionarios/${Registro}`)
      .then(function () {
        toast.success("Funcionário deletado com sucesso!");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Não foi possivel deletar o Funcionário");
      })
      .finally(function () {
        Pesquisa();
      });
  };

  const Editar = async (Registro: string) => {
    const dados = await editarFuncionario(Registro);
    if (!dados) return;
    return Pesquisa();
  };

  const maxPaginas = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

  return (
    <LayoutLogado
      titulo="Gerenciamento de Funcionários"
      desc="Visualize e Gerencie as informações dos funcionários"
      exibirPesquisa={{
        exibir: true,
        valor: pesquisa,
        set: setPesquisa,
      }}
      botao={{
        ativo: true,
        mensagem: "Novo Funcionário",
        adicionar: AdicionarFuncionario,
      }}
      load={loading}
    >
      <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
        <div className="flex gap-3 flex-wrap">
          <Selects
            selecionadoDepartamento={setSelecionada}
            selecionadoStatus={setStatus}
            selecionadoAno={setAno}
            tipo="Funcionarios"
            anos={anos}
            departamento={departamentos}
          />
        </div>
      </div>

      <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
        <Table exibicao={funcionarios} excluir={Excluir} editar={Editar} />
      </div>

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
