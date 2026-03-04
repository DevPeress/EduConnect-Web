import { useEffect, useState } from "react";
import type { Pessoa } from "../../../types/types";
import LayoutLogado from "../../LayoutLogado";
import Table from "../../../components/Table";
import { http } from "../../../utils/axios";
import Selects from "../../../components/Administracao/Selects";
import { useCadastroMenu, useEditarMenu } from "../../../context";
import TrocaPagina from "../../../components/TrocaPagina";
import toast from "react-hot-toast";

const ITENS_POR_PAGINA = 6;

const AlunosAdmin = () => {
  const { cadastroAluno } = useCadastroMenu();
  const { editarAluno } = useEditarMenu();

  const [loading, setLoading] = useState<boolean>(true);
  const [salas, setSalas] = useState<string[]>([]);
  const [selecionada, setSelecionada] = useState<string>("Todas as Salas");
  const [status, setStatus] = useState<string>("Todos os Status");
  const [ano, setAno] = useState<string>("Todos os Anos");
  const [pesquisa, setPesquisa] = useState<string>("");
  const [alunos, setAlunos] = useState<Pessoa[]>([]);
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

    const url = `api/alunos/filtro?${params.toString()}`;

    http
      .get(url)
      .then(function (dados) {
        setTotal(dados.data.total);
        setAlunos(dados.data.dados);
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
  }, [pagina, selecionada, status, ano, pesquisa]);

  // Atualiza sempre que os pagamentos mudar para página 1
  useEffect(() => {
    setPagina(1);
  }, [total]);

  useEffect(() => {
    http.get("api/alunos/pegarInformativos").then(function (dados) {
      setAnos(dados.data.anos);
      setSalas(dados.data.salas);
    });
  }, []);

  const AdicionarAluno = async () => {
    const dados = await cadastroAluno();
    if (!dados || alunos.length > 5) return;
    return Pesquisa();
  };

  const Excluir = async (Registro: string) => {
    http
      .delete(`api/funcionarios/${Registro}`)
      .then(function () {
        toast.success("Aluno deletado com sucesso!");
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Não foi possivel deletar o Aluno!");
      })
      .finally(function () {
        Pesquisa();
      });
  };

  const Editar = async (Registro: string) => {
    const dados = await editarAluno(Registro);
    if (!dados) return;
    return Pesquisa();
  };

  const maxPaginas = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

  return (
    <LayoutLogado
      titulo="Gerenciamento de Alunos"
      desc="Visualize e Gerencie as informações dos estudantes"
      exibirPesquisa={{
        exibir: true,
        valor: pesquisa,
        set: setPesquisa,
      }}
      botao={{
        ativo: true,
        mensagem: "Novo Aluno",
        adicionar: AdicionarAluno,
      }}
      load={loading}
    >
      <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
        <div className="flex gap-3 flex-wrap">
          <Selects
            salas={salas}
            selecionadaSala={setSelecionada}
            selecionadoStatus={setStatus}
            selecionadoAno={setAno}
            tipo="Alunos"
            anos={anos}
          />
        </div>
      </div>

      <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
        <Table exibicao={alunos} excluir={Excluir} editar={Editar} />
      </div>

      <TrocaPagina
        nome="Alunos"
        pagina={pagina}
        maxPagina={maxPaginas}
        total={total}
        trocaPagina={setPagina}
      />
    </LayoutLogado>
  );
};

export default AlunosAdmin;
