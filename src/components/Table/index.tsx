import type { TableProps } from "../../types/types";
import { formatBRL, formatTelefone } from "../../utils/codigos";

const Table = ({ head, exibicao }: TableProps) => {
  const Img = ({
    foto,
    nome,
    data,
  }: {
    foto: string;
    nome: string;
    data: string;
  }) => {
    return (
      <div className="flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-[50%] object-cover border-2 border-(--border-color)"
          src={foto}
          alt="Imagem da Pessoa"
        />
        <div>
          <p className="font-semibold">{nome}</p>
          <p className="text-[12px] text-(--text-muted)">
            {new Date(data + "T00:00:00").toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    );
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
            "turma" in item ? item.turma : item.categoria;
          const dado3: string =
            "email" in item ? item.email : formatBRL(item.valor);
          const dado4: string =
            "telefone" in item
              ? formatTelefone(item.telefone)
              : item.vencimento;

          return (
            <tr
              key={item.registro}
              className="hover:bg-(--bg-input) text-(--text-primary)"
            >
              <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                <span className="font-semibold text-(--primary-color) text-[13px]">
                  {"aluno" in item ? (
                    <Img
                      foto="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=60"
                      nome={registro}
                      data={item.nasc}
                    />
                  ) : (
                    <>{registro}</>
                  )}
                </span>
              </td>
              <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                {"aluno" in item ? (
                  <>{dado1}</>
                ) : (
                  <Img
                    foto="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=60"
                    nome={dado1}
                    data={item.nasc}
                  />
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
                    background:
                      item.status === "Ativo" ||
                      item.status === "Pago" ||
                      item.status === "Liberado"
                        ? "rgba(16, 185, 129, 0.15)"
                        : item.status === "Pendente"
                        ? "rgba(245, 158, 11, 0.15)"
                        : item.status === "Inativo" ||
                          item.status === "Cancelado"
                        ? "rgba(156, 163, 175, 0.15)"
                        : "rgba(239, 68, 68, 0.15)",
                    color:
                      item.status === "Ativo" ||
                      item.status === "Pago" ||
                      item.status === "Liberado"
                        ? "var(--green)"
                        : item.status === "Pendente"
                        ? "var(--orange)"
                        : item.status === "Inativo" ||
                          item.status === "Cancelado"
                        ? "var(--text-secondary)"
                        : "var(--red)",
                  }}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                <button className="relative bg-transparent border-none text-(--text-secondary) cursor-pointer py-1 px-2 rounded-sm flex items-center justify-center">
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
                <div className="absolute top-full r-0 bg-(--bg-card) border-2 border-(--border-color) rounded-[10px] min-w-40 z-10 opacity-0 hidden -translate-y-2.5 mt-1">
                  <div className="block py-2.5 px-4 text-(--text-primary) text-[13px] hover:text-(--primary-color) pl-5">
                    Editar
                  </div>
                  <div className="block py-2.5 px-4 text-(--text-primary) text-[13px] hover:text-(--red) pl-5">
                    Deletar
                  </div>
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
