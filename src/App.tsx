import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaoEncontrada from "./paginas/NaoEncontrada";
import Login from "./paginas/Login";
import Inicial from "./paginas/Inicial";
import SemAcesso from "./paginas/SemAcesso";
import { useAuth } from "./context/AuthContext";
import InicioAdm from "./paginas/Administracao/Inicio";
import AlunosAdmin from "./paginas/Administracao/Alunos";
import ProfessoresAdmin from "./paginas/Administracao/Professores";
import CalendarioAdm from "./paginas/Administracao/Calendario";
import PrivateRoute from "./middleware";
import FinanceiroAdmin from "./paginas/Administracao/Financeiro";
import TurmasAdmin from "./paginas/Administracao/Turmas";
import FuncionariosAdmin from "./paginas/Administracao/Funcionarios";
import DisciplinasAdmin from "./paginas/Administracao/Disciplinas";

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
          <Route path="/admin/dashboard" element={<InicioAdm />} />
          <Route path="/admin/alunos" element={<AlunosAdmin />} />
          <Route path="/admin/professores" element={<ProfessoresAdmin />} />
          <Route path="/admin/turmas" element={<TurmasAdmin />} />
          <Route path="/admin/calendario" element={<CalendarioAdm />} />
          <Route path="/admin/financeiro" element={<FinanceiroAdmin />} />
        </Route>

        {/* Acesso Admin */}
        <Route
          element={
            <PrivateRoute
              isAuthenticated={user}
              userRole={cargo}
              allowedRoles={["Administrador", "Funcionário"]}
            />
          }
        >
          <Route path="/admin/funcionarios" element={<FuncionariosAdmin />} />
          <Route path="/admin/disciplinas" element={<DisciplinasAdmin />} />
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
