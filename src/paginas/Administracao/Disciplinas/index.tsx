import { useEffect, useState } from "react";
import type { Disciplinas } from "../../../types/types";
import LayoutLogado from "../../LayoutLogado";
import { http } from "../../../utils/axios";
import TrocaPagina from "../../../components/TrocaPagina";
import { useCadastroMenu } from "../../../context";
import toast from "react-hot-toast";

const ITENS_POR_PAGINA = 6;

const DisciplinasAdmin = () => {
  const { cadastroDisciplinas } = useCadastroMenu();

  const [loading, setLoading] = useState<boolean>(true);
  const [disciplinas, setDisciplinas] = useState<Disciplinas[]>([]);
  const [pesquisa, setPesquisa] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);

  const Pesquisa = () => {
    http
      .get(`api/disciplinas/filtro/page/${pagina}/pesquisa/${pesquisa}`)
      .then(function (dados) {
        setTotal(dados.data.total);
        setDisciplinas(dados.data.dados);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  const Deletar = (Registro: string) => {
    http
      .delete(`api/disciplinas/${Registro}`)
      .then(function () {
        Pesquisa();
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Não foi possível realizar a exclusão da disciplina!");
      });
  };

  useEffect(() => {
    Pesquisa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina, pesquisa]);

  // Atualiza sempre que os pagamentos mudar para página 1
  useEffect(() => {
    setPagina(1);
  }, [total]);

  const AdicionarDisciplina = async () => {
    const dados = await cadastroDisciplinas();
    if (!dados || disciplinas.length < 9) return;
    return Pesquisa();
  };

  const maxPaginas: number = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));

  return (
    <LayoutLogado
      titulo="Gerenciamento de Disciplinas"
      desc="Visualize e Gerencie as disciplinas da Escola"
      exibirPesquisa={{
        exibir: true,
        valor: pesquisa,
        set: setPesquisa,
      }}
      botao={{
        ativo: true,
        mensagem: "Nova Disciplinas",
        adicionar: AdicionarDisciplina,
      }}
      load={loading}
    >
      <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
        <table className="w-full border-collapse">
          <thead className="bg-(--cabecalho)">
            <tr>
              <th className="py-4 px-5 text-left text-[13px] font-semibold text-(--text-muted) uppercase leading-4 border-b-2 border-(--border-color)">
                Registro
              </th>
              <th className="py-4 px-5 text-left text-[13px] font-semibold text-(--text-muted) uppercase leading-4 border-b-2 border-(--border-color)">
                Nome
              </th>
              <th className="py-4 px-5 text-left text-[13px] font-semibold text-(--text-muted) uppercase leading-4 border-b-2 border-(--border-color)">
                Descrição
              </th>
              <th className="py-4 px-5 text-left text-[13px] font-semibold text-(--text-muted) uppercase leading-4 border-b-2 border-(--border-color)">
                Data de Criação
              </th>
              <th className="py-4 px-5 text-left text-[13px] font-semibold text-(--text-muted) uppercase leading-4 border-b-2 border-(--border-color)">
                Remover
              </th>
            </tr>
          </thead>

          <tbody>
            {disciplinas.map((item) => (
              <tr
                key={item.registro}
                className="hover:bg-(--bg-input) text-(--text-primary)"
              >
                <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                  {item.registro}
                </td>
                <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                  {item.nome}
                </td>
                <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                  {item.descricao}
                </td>
                <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                  {new Date(item.dataCriacao + "T00:00:00").toLocaleDateString(
                    "pt-BR"
                  )}
                </td>
                <td
                  className="py-4 px-5 border-b-2 border-(--border-color) text-[14px] hover:cursor-pointer"
                  onClick={() => Deletar(item.registro)}
                >
                  ❌
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TrocaPagina
        nome="Disciplinas"
        pagina={pagina}
        maxPagina={maxPaginas}
        total={total}
        trocaPagina={setPagina}
      />
    </LayoutLogado>
  );
};

export default DisciplinasAdmin;
