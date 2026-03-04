import {
  NavDashBoard,
  NavTurmas,
  NavNotas,
  NavCalendario,
  NavFinanceiro,
  NavRelatorios,
} from "../../../assets/HTML";
import type { Nav } from "../../../types/types";
import LinkPaginas from "../LinkPaginas/LinkPaginas";

const Paginas: Nav[] = [
  { nome: "DashBoard", pagina: "/alunos/dashboard", svg: NavDashBoard },
  { nome: "Turmas", pagina: "/alunos/turmas", svg: NavTurmas },
  { nome: "Notas", pagina: "/alunos/notas", svg: NavNotas },
  {
    nome: "Calendário",
    pagina: "/alunos/calendario",
    svg: NavCalendario,
  },
  {
    nome: "Financeiro",
    pagina: "/alunos/financeiro",
    svg: NavFinanceiro,
  },
  {
    nome: "Relatórios",
    pagina: "/alunos/relatorio",
    svg: NavRelatorios,
  },
];

const NavAlunos = ({ pagina }: { pagina: string }) => {
  return (
    <nav className="flex-1 px-3.5 py-3.5">
      <div className="mb-4">
        <span className="block text-[11px] font-semibold text-(--text-muted) uppercase leading-[0.5px] px-2 py-1 mb-5">
          Principal
        </span>
        {Paginas.slice(0, 2).map((item) => {
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
        {Paginas.slice(3, 6).map((item) => {
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

export default NavAlunos;
