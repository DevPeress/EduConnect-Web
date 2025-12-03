import type { TablePropsGrid } from "../../types/types";
import { formatBRL, formatTelefone } from "../../utils/codigos";

const Grid = ({ exibicao }: TablePropsGrid) => {
  const Img = ({
    foto,
    nome,
    data,
    registro,
  }: {
    foto: string;
    nome: string;
    data: string;
    registro: string;
  }) => {
    return (
      <div className="flex flex-col items-center gap-3">
        <img
          className="w-35 h-35 rounded-[50%] object-cover border-2 border-(--border-color) mt-2"
          src={foto}
          alt="Imagem do Aluno"
        />
        <div className="px-5 border-b-2 border-(--border-color) text-[14px]">
          <span className="font-semibold text-(--primary-color) text-[13px]">
            {registro}
          </span>
        </div>
        <div className="text-center">
          <p className="font-semibold">{nome}</p>
          <p className="text-[12px] text-(--text-muted)">
            {new Date(data + "T00:00:00").toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    );
  };

  const VerificarCor = (tipo: string) => {
    if (tipo === "Ativo" || tipo === "Pago" || tipo === "Liberado") {
      return { bg: "rgba(16, 185, 129, 0.15)", color: "var(--green)" };
    } else if (tipo === "Pendente") {
      return { bg: "rgba(245, 158, 11, 0.15)", color: "var(--orange)" };
    } else if (tipo === "Inativo" || tipo === "Cancelado") {
      return {
        bg: "rgba(156, 163, 175, 0.15)",
        color: "var(--text-secondary)",
      };
    } else {
      return { bg: "rgba(239, 68, 68, 0.15)", color: "var(--red)" };
    }
  };

  return (
    <>
      {exibicao.map((item) => {
        const registro: string = "aluno" in item ? item.aluno : item.registro;
        const dado2: string[] | string =
          "turma" in item
            ? item.turma
            : "cargo" in item
            ? item.cargo
            : "R$ " + formatBRL(item.valor);
        const dado3: string =
          "email" in item
            ? item.email
            : "departamento" in item
            ? item.departamento
            : item.dataVencimento;
        const dado4: string =
          "telefone" in item
            ? formatTelefone(item.telefone)
            : "data" in item
            ? item.data
            : item.dataPagamento;
        const dado5: string = item.status;

        return (
          <div
            key={item.registro}
            className="grid grid-cols-2 w-125 h-63 bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden hover:bg-(--bg-input) text-(--text-primary) items-center"
          >
            <Img
              registro={item.registro}
              nome={registro}
              data={item.nasc}
              foto="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1000"
            />

            <div className="flex flex-col items-center gap-3">
              <div className="text-left">
                <div className="px-6.5 border-b-2 border-(--border-color) text-[14px]">
                  <span className="text-[14px] font-bold text-(--text-primary)">
                    {"turma" in item
                      ? "Informações na Escola"
                      : "Informações do Pagamento"}
                  </span>
                </div>
                <p className="text-[14px] text-(--text-muted)">
                  {"turma" in item ? (
                    <>
                      Turma: <span className="text-[12px]">{dado2}</span>
                    </>
                  ) : (
                    <>
                      Valor: <span className="text-[12px]">{dado2}</span>
                    </>
                  )}
                </p>
                <p className="text-[14px] text-(--text-muted)">
                  Status:{" "}
                  <span
                    className="text-[12px]"
                    style={{
                      color: VerificarCor(dado5).color,
                    }}
                  >
                    {dado5}
                  </span>
                </p>
              </div>

              <div className="text-left">
                <div className="px-5 border-b-2 border-(--border-color) text-[14px]">
                  <span className="text-[14px] font-bold text-(--text-primary)">
                    {"turma" in item
                      ? "Informações de Contato"
                      : "Informações do Pagamento"}
                  </span>
                </div>
                <p className="text-[14px] text-(--text-muted)">
                  {"turma" in item ? (
                    <>
                      E-mail: <span className="text-[12px]">{dado3}</span>
                    </>
                  ) : (
                    <>
                      Vencimento: <span className="text-[12px]">{dado3}</span>
                    </>
                  )}
                </p>
                <p className="text-[14px] text-(--text-muted)">
                  {"turma" in item ? (
                    <>
                      Telefone: <span className="text-[12px]">{dado4}</span>
                    </>
                  ) : (
                    <>
                      Pagamento: <span className="text-[12px]">{dado4}</span>
                    </>
                  )}
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="py-2 px-6 rounded-[10px] text-[14px] font-semibold cursor-pointer border-none flex items-center gap-2 bg-(--bg-body) text-(--text-primary) border border-(--border-color) hover:bg-(--bg-sidebar) hover:scale-110"
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="py-2 px-6 rounded-[10px] text-[14px] font-semibold cursor-pointer border-none flex items-center gap-2 bg-(--alert-color) text-(--text-secondary) border border-(--primary-color) hover:bg-(--red) hover:text-black -translate-y-0.5 hover:scale-110"
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Grid;
