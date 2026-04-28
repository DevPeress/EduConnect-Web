import { useCallback, useEffect, useState } from "react";
import type { Notas } from "../../types/types";
import LayoutLogado from "../LayoutLogado";
import Table from "../../components/Table";
import { http } from "../../utils/axios";
import Selects from "../../components/Selects";
import TrocaPagina from "../../components/TrocaPagina";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useCadastroMenu, useEditarMenu } from "../../context";

const ITENS_POR_PAGINA = 6;

const NotasPage = () => {
  const { cadastroNota } = useCadastroMenu();
  const { editarNota } = useEditarMenu();

  const [loading, setLoading] = useState<boolean>(true);
  const [salas, setSalas] = useState<string[]>([]);
  const [selecionada, setSelecionada] = useState<string>("Todas as Salas");
  const [status, setStatus] = useState<string>("Todos os Status");
  const [ano, setAno] = useState<string>("Todos os Anos");
  const [pesquisa, setPesquisa] = useState<string>("");
  const [notas, setNotas] = useState<Notas[]>([]);
  const [anos, setAnos] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);

  // Requisita os dados novos toda vez que status, categoria ou meses mudar
  const Pesquisa = useCallback(() => {
    const pesquisaFinal = pesquisa == "" ? "Todos" : pesquisa;
    const params = new URLSearchParams({
      selecionada,
      status,
      page: String(pagina),
      ano,
      pesquisa: pesquisaFinal,
    });

    const url = `api/notas/filtro?${params.toString()}`;

    http
      .get(url)
      .then(function (dados) {
        setTotal(dados.data.total);
        setNotas(dados.data.dados);
      })
      .catch(function (err) {
        const error = err as AxiosError;
        const msg = error?.response?.data as string;

        toast.error(msg ?? "Erro ao obter lista de notas");
      })
      .finally(function () {
        setLoading(false);
      });
  }, [ano, pagina, pesquisa, selecionada, status]);

  useEffect(() => {
    Pesquisa();
  }, [Pesquisa]);

  // Atualiza sempre que os pagamentos mudar para página 1
  useEffect(() => {
    setPagina(1);
  }, [total]);

  useEffect(() => {
    http.get("api/notas/pegarInformativos").then(function (dados) {
      setAnos(dados.data.anos);
      setSalas(dados.data.salas);
    });
  }, []);

  const AdicionarNota = async () => {
    const dados = await cadastroNota();
    if (!dados || notas.length > 5) return;
    return Pesquisa();
  };

  const Excluir = async (Registro: string) => {
    http
      .delete(`api/notas/${Number(Registro)}`)
      .then(function () {
        toast.success("Nota deletada com sucesso!");
      })
      .catch(function (err) {
        const error = err as AxiosError;
        const msg = error?.response?.data as string;

        toast.error(msg ?? "Erro ao deletar nota");
      })
      .finally(function () {
        Pesquisa();
      });
  };

  const Editar = async (Registro: string) => {
    const dados = await editarNota(Registro);
    if (!dados) return;
    return Pesquisa();
  };

  const maxPaginas = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

  return (
    <LayoutLogado
      titulo="Gerenciamento de Notas"
      desc="Visualize e Gerencie as informações das notas"
      exibirPesquisa={{
        exibir: true,
        valor: pesquisa,
        set: setPesquisa,
      }}
      botao={{
        ativo: true,
        mensagem: "Nova Nota",
        adicionar: AdicionarNota,
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
        <Table exibicao={notas} excluir={Excluir} editar={Editar} />
      </div>

      <TrocaPagina
        nome="Notas"
        pagina={pagina}
        maxPagina={maxPaginas}
        total={total}
        trocaPagina={setPagina}
      />
    </LayoutLogado>
  );
};

export default NotasPage;
