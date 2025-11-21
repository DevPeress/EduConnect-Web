import type { TableProps } from "../../types/types";

const Grid = ({ exibicao }: TableProps) => {
  return (
    <>
      {exibicao.map((item) => (
        <div
          key={item.registro}
          className="grid grid-cols-2 w-125 h-63 bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden hover:bg-(--bg-input) text-(--text-primary) items-center"
        >
          <div className="flex flex-col items-center gap-3">
            <img
              className="w-35 h-35 rounded-[50%] object-cover border-2 border-(--border-color) mt-2"
              src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Imagem do Aluno"
            />
            <div className="px-5 border-b-2 border-(--border-color) text-[14px]">
              <span className="font-semibold text-(--primary-color) text-[13px]">
                {item.registro}
              </span>
            </div>
            <div className="text-center">
              <p className="font-semibold">{item.nome}</p>
              <p className="text-[12px] text-(--text-muted)">
                {item.nasc.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="text-left">
              <div className="px-6.5 border-b-2 border-(--border-color) text-[14px]">
                <span className="text-[14px] font-bold text-(--text-primary)">
                  Informações na Escola
                </span>
              </div>
              <p className="text-[14px] text-(--text-muted)">
                Turma: <span className="text-[12px]">{item.turma}</span>
              </p>
              <p className="text-[14px] text-(--text-muted)">
                Status:{" "}
                <span
                  className="text-[12px]"
                  style={{
                    color:
                      item.status === "Ativo"
                        ? "var(--green)"
                        : item.status === "Inativo"
                        ? "var(--text-secondary)"
                        : "var(--red)",
                  }}
                >
                  {item.status}
                </span>
              </p>
            </div>

            <div className="text-left">
              <div className="px-5 border-b-2 border-(--border-color) text-[14px]">
                <span className="text-[14px] font-bold text-(--text-primary)">
                  Informações de Contato
                </span>
              </div>
              <p className="text-[14px] text-(--text-muted)">
                E-mail: <span className="text-[12px]">{item.email}</span>
              </p>
              <p className="text-[14px] text-(--text-muted)">
                Telefone: <span className="text-[12px]">{item.telefone}</span>
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
      ))}
    </>
  );
};

export default Grid;
