import type { TrocaPaginas } from "../../types/types";

const TrocaPagina = ({
  nome,
  pagina,
  maxPagina,
  total,
  trocaPagina,
}: TrocaPaginas) => {
  return (
    <div className="flex justify-center items-center gap-5 mt-8 pt-5 border-t-2 border-(--border-color)">
      <button
        onClick={() => pagina > 1 && trocaPagina(pagina - 1)}
        className="py-2.5 px-4 bg-transparent border-2 border-(--border-color) text-(--text-primary) text-[14px] font-medium rounded-lg hover:bg-(--bg-input) hover:border-(--border-light)"
        disabled={pagina === 1}
      >
        Anterior
      </button>
      <div className="text-[14px] text-(--text-secondary)">
        Página {pagina} de {maxPagina} ({total} {nome})
      </div>
      <button
        onClick={() => pagina < maxPagina && trocaPagina(pagina + 1)}
        disabled={pagina === maxPagina}
        className="py-2.5 px-4 bg-transparent border-2 border-(--border-color) text-(--text-primary) text-[14px] font-medium rounded-lg hover:bg-(--bg-input) hover:border-(--border-light)"
      >
        Próximo
      </button>
    </div>
  );
};

export default TrocaPagina;
