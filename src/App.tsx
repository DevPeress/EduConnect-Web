import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaoEncontrada from "./paginas/NaoEncontrada";
import Login from "./paginas/Login";
import Inicial from "./paginas/Inicial";
import SemAcesso from "./paginas/SemAcesso";
import { AuthProvider, useAuth } from "./context/AuthContext";
import InicioAdm from "./paginas/Administracao/Inicio";
import AlunosAdmin from "./paginas/Administracao/Alunos";
import ProfessoresAdmin from "./paginas/Administracao/Professores";

function App() {
  const auth = useAuth();
  const user: boolean = auth.token.length > 2;
  const cargo = auth.cargo;

  const setAuth = (cargo: string, token: string) => {
    auth.setAuth(cargo, token);
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Inicial Logado={user} Cargo={cargo} /> } />
          <Route path="/login" element={ <Login TrocarInfos={setAuth} /> }  />

          {/*
          <Route element={<PrivateRoute isAuthenticated={user} userRole={cargo} allowedRoles={['Admin']} />}>
          </Route>
          */}
          <Route path="/admin/dashboard" element={<InicioAdm />} />
          <Route path="/admin/alunos" element={<AlunosAdmin />} />
          <Route path="/admin/professores" element={<ProfessoresAdmin />} />
          {/* Página de sem acesso */}
          <Route path="/not-authorized" element={ <SemAcesso Logado={user} Cargo={cargo} /> } />
          {/* Página não encontrada */}
          <Route path="*" element={ <NaoEncontrada Logado={user} Cargo={cargo} /> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
