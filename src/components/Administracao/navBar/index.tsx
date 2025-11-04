import { Link, useLocation } from "react-router-dom";
import DashBoard from '../../../assets/DashBoard.svg';
import Alunos from '../../../assets/Alunos.svg';
import Professores from '../../../assets/Professores.svg';
import Turmas from '../../../assets/Turmas.svg';
import Notas from '../../../assets/Notas.svg';
import Calendario from '../../../assets/Calendario.svg';
import Financeiro from '../../../assets/Financeiro.svg';
import Relatorio from '../../../assets/Relatorios.png';
import type { NavAdmin } from "../../../types/types";

const NavBarAdmin = () => {
  const location = useLocation();
  const Principal: NavAdmin[] = [
    { to: "/login", nome: "DashBoard", pagina: "/admin", svg: DashBoard },
    { to: "/login", nome: "Alunos", pagina: "/admin/alunos", svg: Alunos },
    { to: "/login", nome: "Professores", pagina: "/admin/professores", svg: Professores },
    { to: "/login", nome: "Turmas", pagina: "/admin/turmos", svg: Turmas },
    
    { to: "/login", nome: "Notas", pagina: "/admin/notas", svg: Notas },
    { to: "/login", nome: "Calendário", pagina: "/admin/calendario", svg: Calendario },
    { to: "/login", nome: "Financeiro", pagina: "/admin/financeiro", svg: Financeiro },
    { to: "/login", nome: "Relatórios", pagina: "/admin/relatorio", svg: Relatorio },
  ];

  return (
    <nav className="flex-1 px-6 py-6">
        <div className="mb-6">
            <span className="block text-[11px] font-semibold text-(--text-muted) uppercase leading-[0.5px] px-2 py-2 mb-2">Principal</span>
            {Principal.slice(0,4).map((item) => {
                const paginaAtual: boolean = location.pathname === item.pagina;

                return (
                    <Link
                        key={item.nome}
                        to={"/login"}
                        className="flex items-center gap-3 px-[11px] py-3 rounded-[10px] text-[14px] font-medium relative hover:bg-(--bg-hover) hover:text-(--text-primary)"
                        style={{
                            color: paginaAtual ? "white" : "var(--text-secondary)",
                            boxShadow: paginaAtual
                            ? "0 4px 12px rgba(59, 130, 246, 0.3)"
                            : "",
                            background: paginaAtual ? "var(--primary-color)" : "",
                        }}
                    >
                    <img className="w-5 h-5" src={item.svg} alt="" />
                    <span>{item.nome}</span>
                    </Link>
                );
            })}
        </div>

        <div className="mb-6">
            <span className="block text-[11px] font-semibold text-(--text-muted) uppercase leading-[0.5px] px-2 py-2 mb-2">Acadêmico</span>
            {Principal.splice(4,8).map((item) => {
                const paginaAtual: boolean = location.pathname === item.pagina;

                return (
                    <Link
                        key={item.nome}
                        to={"/login"}
                        className="flex items-center gap-3 px-[11px] py-3 rounded-[10px] text-[14px] font-medium relative hover:bg-(--bg-hover) hover:text-(--text-primary)"
                        style={{
                            color: paginaAtual ? "white" : "var(--text-secondary)",
                            boxShadow: paginaAtual
                            ? "0 4px 12px rgba(59, 130, 246, 0.3)"
                            : "",
                            background: paginaAtual ? "var(--primary-color)" : "",
                        }}
                    >
                    <img className="w-5 h-5" src={item.svg} alt="" />
                    <span>{item.nome}</span>
                    </Link>
                );
            })}
        </div>
    </nav>
  );
};

export default NavBarAdmin;
