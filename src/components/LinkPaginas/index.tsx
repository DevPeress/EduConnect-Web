import { Link } from "react-router-dom";
import type { Nav } from "../../types/types";

const LinkPaginas = ({
  item,
  paginaAtual,
}: {
  item: Nav;
  paginaAtual: boolean;
}) => {
  return (
    <Link
      to={item.pagina}
      className="flex items-center gap-3 px-[11px] py-3 rounded-[10px] text-[14px] font-medium relative hover:bg-(--bg-hover) hover:text-(--text-primary)"
      style={{
        color: paginaAtual ? "white" : "var(--text-primary)",
        boxShadow: paginaAtual ? "0 4px 12px rgba(59, 130, 246, 0.3)" : "",
        background: paginaAtual ? "var(--primary-color)" : "",
      }}
    >
      {item.svg && <item.svg />}
      <span>{item.nome}</span>
    </Link>
  );
};

export default LinkPaginas;
