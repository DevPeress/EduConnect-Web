import { useLocation } from "react-router-dom";
import type { TablePropsTable } from "../../../types/types";
import { formatBRL, formatTelefone } from "../../../utils/codigos";
import { Head } from "../../../utils/head";
import { useState } from "react";
import ImgExibicao from "../imgExibicao";

const Table = ({ exibicao, excluir, editar }: TablePropsTable) => {
  const location = useLocation();
  const pagina = location.pathname;
  const head: string[] = Head(pagina);
  const [menuAberto, setMenuAberto] = useState<string>("");

  const VerificarCor = (tipo: string) => {
    switch (tipo) {
      case "Ativo":
      case "Pago":
      case "Liberado":
        return { bg: "rgba(16, 185, 129, 0.15)", color: "var(--green)" };

      case "Pendente":
        return { bg: "rgba(245, 158, 11, 0.15)", color: "var(--orange)" };
      case "Inativo":
      case "Cancelado":
        return {
          bg: "rgba(156, 163, 175, 0.15)",
          color: "var(--text-secondary)",
        };

      default:
        return { bg: "rgba(239, 68, 68, 0.15)", color: "var(--red)" };
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead className="bg-(--cabecalho)">
        <tr>
          {head.map((item) => (
            <th
              key={item}
              className="py-4 px-5 text-left text-[13px] font-semibold text-(--text-muted) uppercase leading-4 border-b-2 border-(--border-color)"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {exibicao.map((item) => {
          const registro: string = "aluno" in item ? item.aluno : item.registro;
          const dado1: string = "aluno" in item ? item.categoria : item.nome;
          const dado2: string[] | string =
            "turma" in item
              ? item.turma
              : "turno" in item
              ? item.turno
              : "cargo" in item
              ? item.cargo
              : "R$ " + formatBRL(item.valor);
          const dado3: string =
            "email" in item
              ? item.email
              : "professor" in item
              ? item.professor
              : "departamento" in item
              ? item.departamento
              : new Date(item.dataVencimento + "T00:00:00").toLocaleDateString(
                  "pt-BR"
                );
          const dado4: string =
            "dataAdmissao" in item
              ? new Date(item.dataAdmissao + "T00:00:00").toLocaleDateString(
                  "pt-BR"
                )
              : "dataPagamento" in item
              ? new Date(item.dataPagamento + "T00:00:00").toLocaleDateString(
                  "pt-BR"
                )
              : "telefone" in item
              ? formatTelefone(item.telefone)
              : "horario" in item
              ? item.horario
              : "Aguardando";
          const dado5: string | number =
            "horario" in item ? item.horario : item.status;

          return (
            <tr
              key={registro}
              className="hover:bg-(--bg-input) text-(--text-primary)"
            >
              <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                <span className="font-semibold text-(--primary-color) text-[13px]">
                  {"aluno" in item ? (
                    <ImgExibicao
                      tabela={true}
                      foto={item.foto}
                      nome={registro}
                      data={item.nasc}
                    />
                  ) : (
                    <>{registro}</>
                  )}
                </span>
              </td>
              <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                {"nasc" in item && "telefone" in item ? (
                  <ImgExibicao
                    tabela={true}
                    foto={item.foto}
                    nome={dado1}
                    data={item.nasc}
                  />
                ) : (
                  <>{dado1}</>
                )}
              </td>
              <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                {dado2}
              </td>
              <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                {dado3}
              </td>
              <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                {dado4}
              </td>
              <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                <span
                  className="inline-block py-1.5 px-3 rounded-[20px] text-[12px] font-semibold"
                  style={{
                    background: VerificarCor(dado5).bg,
                    color: VerificarCor(dado5).color,
                  }}
                >
                  {dado5}
                </span>
              </td>
              <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                <div>
                  {menuAberto == registro ? (
                    <div className="flex gap-2">
                      <button
                        className="hover:scale-110 hover:cursor-pointer"
                        onClick={() => {
                          if (menuAberto === registro) {
                            setMenuAberto("");
                            editar(registro);
                          } else {
                            setMenuAberto(registro);
                          }
                        }}
                      >
                        ✏️
                      </button>

                      <button
                        className="hover:scale-110 hover:cursor-pointer"
                        onClick={() => {
                          if (menuAberto === registro) {
                            setMenuAberto("");
                            excluir(registro);
                          } else {
                            setMenuAberto(registro);
                          }
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        setMenuAberto(menuAberto === registro ? "" : registro)
                      }
                      className="relative bg-transparent border-none text-(--text-secondary) cursor-pointer py-1 px-2 rounded-sm flex items-center justify-center"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle cx="12" cy="5" r="2"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                        <circle cx="12" cy="19" r="2"></circle>
                      </svg>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
