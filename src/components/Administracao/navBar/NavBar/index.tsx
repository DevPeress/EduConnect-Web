import { useLocation } from "react-router-dom";
import type { NavAdmin } from "../../../../types/types";
import LinkAdmin from "../LinkAdmin";
import DashBoard from "../Icons/DashBoard";
import Alunos from "../Icons/Alunos";
import Professores from "../Icons/Professores";
import Turmas from "../Icons/Turmas";
import Notas from "../Icons/Notas";
import Calendario from "../Icons/Calendario";
import Financeiro from "../Icons/Financeiro";
import Relatorios from "../Icons/Relatorios";

const NavBarAdmin = () => {
  const location = useLocation();
  const Principal: NavAdmin[] = [
    { to: "/login", nome: "DashBoard", pagina: "/admin", svg: DashBoard },
    { to: "/login", nome: "Alunos", pagina: "/admin/alunos", svg: Alunos },
    {
      to: "/login",
      nome: "Professores",
      pagina: "/admin/professores",
      svg: Professores,
    },
    { to: "/login", nome: "Turmas", pagina: "/admin/turmos", svg: Turmas },

    { to: "/login", nome: "Notas", pagina: "/admin/notas", svg: Notas },
    {
      to: "/login",
      nome: "Calendário",
      pagina: "/admin/calendario",
      svg: Calendario,
    },
    {
      to: "/login",
      nome: "Financeiro",
      pagina: "/admin/financeiro",
      svg: Financeiro,
    },
    {
      to: "/login",
      nome: "Relatórios",
      pagina: "/admin/relatorio",
      svg: Relatorios,
    },
  ];

  return (
    <nav className="flex-1 px-3.5 py-4">
      <div className="mb-6">
        <span className="block text-[11px] font-semibold text-(--text-muted) uppercase leading-[0.5px] px-2 py-2 mb-2">
          Principal
        </span>
        {Principal.slice(0, 4).map((item) => {
          const paginaAtual: boolean = location.pathname === item.pagina;

          return (
            <LinkAdmin key={item.nome} item={item} paginaAtual={paginaAtual} />
          );
        })}
      </div>

      <div className="mb-6">
        <span className="block text-[11px] font-semibold text-(--text-muted) uppercase leading-[0.5px] px-2 py-2 mb-2">
          Acadêmico
        </span>
        {Principal.splice(4, 8).map((item) => {
          const paginaAtual: boolean = location.pathname === item.pagina;

          return (
            <LinkAdmin key={item.nome} item={item} paginaAtual={paginaAtual} />
          );
        })}
      </div>
    </nav>
  );
};

export default NavBarAdmin;
