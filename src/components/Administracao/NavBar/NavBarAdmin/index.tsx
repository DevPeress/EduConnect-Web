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
    { nome: "DashBoard", pagina: "/admin/dashboard", svg: DashBoard },
    { nome: "Alunos", pagina: "/admin/alunos", svg: Alunos },
    {
      nome: "Professores",
      pagina: "/admin/professores",
      svg: Professores,
    },
    { nome: "Turmas", pagina: "/admin/turmos", svg: Turmas },

    { nome: "Notas", pagina: "/admin/notas", svg: Notas },
    {
      nome: "Calendário",
      pagina: "/admin/calendario",
      svg: Calendario,
    },
    {
      nome: "Financeiro",
      pagina: "/admin/financeiro",
      svg: Financeiro,
    },
    {
      nome: "Relatórios",
      pagina: "/admin/relatorio",
      svg: Relatorios,
    },
  ];

  return (
    <nav className="flex-1 px-3.5 py-3.5">
      <div className="mb-4">
        <span className="block text-[11px] font-semibold text-(--text-muted) uppercase leading-[0.5px] px-2 py-1 mb-1">
          Principal
        </span>
        {Principal.slice(0, 4).map((item) => {
          const paginaAtual: boolean = location.pathname === item.pagina;

          return (
            <LinkAdmin key={item.nome} item={item} paginaAtual={paginaAtual} />
          );
        })}
      </div>

      <div>
        <span className="block text-[11px] font-semibold text-(--text-muted) uppercase leading-[0.5px] px-2 py-1 mb-1">
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
