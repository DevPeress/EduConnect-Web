import { Link } from "react-router-dom";
import type { NavAdmin } from "../../../../types/types";

const LinkAdmin = ({ item, paginaAtual }: { item: NavAdmin, paginaAtual: boolean }) => {
  return (
    <Link
      key={item.nome}
      to={"/login"}
      className="flex items-center gap-3 px-[11px] py-3 rounded-[10px] text-[14px] font-medium relative hover:bg-(--bg-hover) hover:text-(--text-primary)"
      style={{
        color: paginaAtual ? "white" : "var(--text-secondary)",
        boxShadow: paginaAtual ? "0 4px 12px rgba(59, 130, 246, 0.3)" : "",
        background: paginaAtual ? "var(--primary-color)" : "",
      }}
    >
      <img className="w-6 h-6" src={item.svg} alt="" />
      <span>{item.nome}</span>
    </Link>
  );
};

export default LinkAdmin;
