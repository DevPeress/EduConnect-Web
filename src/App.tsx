import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaoEncontrada from "./paginas/NaoEncontrada";
import Login from "./paginas/Login";
import Inicial from "./paginas/Inicial";
import SemAcesso from "./paginas/SemAcesso";
import InicioPage from "./paginas/Inicio";
import AlunosPage from "./paginas/Alunos";
import ProfessoresPage from "./paginas/Professores";
import CalendarioPage from "./paginas/Calendario";
import PrivateRoute from "./middleware";
import FinanceiroPage from "./paginas/Financeiro";
import TurmasPage from "./paginas/Turmas";
import FuncionariosPage from "./paginas/Funcionarios";
import DisciplinasPage from "./paginas/Disciplinas";
import { useAuth } from "./context";
import NotasPage from "./paginas/Notas";

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <div />;
  }

  const user: boolean = auth.token;
  const cargo: string = auth.cargo;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicial logado={user} cargo={cargo} />} />
        <Route path="/login" element={<Login logado={user} cargo={cargo} />} />

        {/* Acesso Alunos, Admin e Funcionario*/}
        <Route
          element={
            <PrivateRoute
              isAuthenticated={user}
              userRole={cargo}
              allowedRoles={["Aluno", "Administrador", "Funcionário"]}
            />
          }
        >
          <Route path="/alunos/dashboard" element={<InicioPage />} />
          <Route path="/alunos/alunos" element={<AlunosPage />} />
          <Route path="/alunos/professores" element={<ProfessoresPage />} />
          <Route path="/alunos/turmas" element={<TurmasPage />} />
          <Route path="/alunos/calendario" element={<CalendarioPage />} />
          <Route path="/alunos/financeiro" element={<FinanceiroPage />} />
          <Route path="/alunos/notas" element={<NotasPage />} />
        </Route>

        {/* Acesso Professores, Admin e Funcionario*/}
        <Route
          element={
            <PrivateRoute
              isAuthenticated={user}
              userRole={cargo}
              allowedRoles={["Professor", "Administrador", "Funcionário"]}
            />
          }
        >
          <Route path="/professores/dashboard" element={<InicioPage />} />
          <Route path="/professores/alunos" element={<AlunosPage />} />
          <Route
            path="/professores/professores"
            element={<ProfessoresPage />}
          />
          <Route path="/professores/turmas" element={<TurmasPage />} />
          <Route path="/professores/calendario" element={<CalendarioPage />} />
          <Route path="/professores/financeiro" element={<FinanceiroPage />} />
          <Route path="/professores/notas" element={<NotasPage />} />
        </Route>

        {/* Acesso Admin e Funcionario*/}
        <Route
          element={
            <PrivateRoute
              isAuthenticated={user}
              userRole={cargo}
              allowedRoles={["Administrador", "Funcionário"]}
            />
          }
        >
          <Route path="/admin/dashboard" element={<InicioPage />} />
          <Route path="/admin/alunos" element={<AlunosPage />} />
          <Route path="/admin/professores" element={<ProfessoresPage />} />
          <Route path="/admin/turmas" element={<TurmasPage />} />
          <Route path="/admin/calendario" element={<CalendarioPage />} />
          <Route path="/admin/financeiro" element={<FinanceiroPage />} />
          <Route path="/admin/notas" element={<NotasPage />} />
        </Route>

        {/* Acesso Admin */}
        <Route
          element={
            <PrivateRoute
              isAuthenticated={user}
              userRole={cargo}
              allowedRoles={["Administrador"]}
            />
          }
        >
          <Route path="/admin/funcionarios" element={<FuncionariosPage />} />
          <Route path="/admin/disciplinas" element={<DisciplinasPage />} />
        </Route>

        {/* Página de sem acesso */}
        <Route
          path="/not-authorized"
          element={<SemAcesso logado={user} cargo={cargo} />}
        />
        {/* Página não encontrada */}
        <Route
          path="*"
          element={<NaoEncontrada logado={user} cargo={cargo} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
