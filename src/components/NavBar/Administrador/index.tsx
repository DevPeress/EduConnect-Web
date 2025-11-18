import type { Nav } from "../../../types/types";
import Calendario from "../Icons/Calendario";
import LinkPaginas from "../../LinkPaginas";
import Alunos from "../Icons/Alunos";
import DashBoard from "../Icons/DashBoard";
import Financeiro from "../Icons/Financeiro";
import Notas from "../Icons/Notas";
import Professores from "../Icons/Professores";
import Relatorios from "../Icons/Relatorios";
import Turmas from "../Icons/Turmas";

const Admin: Nav[] = [
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

const NavAdministrador = ({ pagina }: { pagina: string }) => {
  return (
    <nav className="flex-1 px-3.5 py-3.5">
      <div className="mb-4">
        <span className="block text-[11px] font-semibold text-(--text-muted) uppercase leading-[0.5px] px-2 py-1 mb-5">
          Principal
        </span>
        {Admin.slice(0, 4).map((item) => {
          const paginaAtual: boolean = pagina === item.pagina;

          return (
            <LinkPaginas
              key={item.nome}
              item={item}
              paginaAtual={paginaAtual}
            />
          );
        })}
      </div>

      <div>
        <span className="block text-[11px] font-semibold text-(--text-muted) uppercase leading-[0.5px] px-2 py-1 mb-1">
          Acadêmico
        </span>
        {Admin.slice(4, 8).map((item) => {
          const paginaAtual: boolean = pagina === item.pagina;

          return (
            <LinkPaginas
              key={item.nome}
              item={item}
              paginaAtual={paginaAtual}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default NavAdministrador;
