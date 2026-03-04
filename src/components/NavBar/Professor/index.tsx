import {
  NavDashBoard,
  NavAlunos,
  NavTurmas,
  NavNotas,
  NavCalendario,
} from "../../../assets/HTML";
import type { Nav } from "../../../types/types";
import LinkPaginas from "../LinkPaginas/LinkPaginas";

const Paginas: Nav[] = [
  { nome: "DashBoard", pagina: "/professores/dashboard", svg: NavDashBoard },
  { nome: "Alunos", pagina: "/professores/alunos", svg: NavAlunos },
  { nome: "Turmas", pagina: "/professores/turmas", svg: NavTurmas },
  { nome: "Notas", pagina: "/professores/notas", svg: NavNotas },
  {
    nome: "Calendário",
    pagina: "/admin/calendario",
    svg: NavCalendario,
  }
];

const NavProfessores = ({ pagina }: { pagina: string }) => {
  return (
    <nav className="flex-1 px-3.5 py-3.5">
      <div className="mb-4">
        <span className="block text-[11px] font-semibold text-(--text-muted) uppercase leading-[0.5px] px-2 py-1 mb-5">
          Principal
        </span>
        {Paginas.slice(0, 4).map((item) => {
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
        {Paginas.slice(5, 8).map((item) => {
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

export default NavProfessores;
