import { BrowserRouter, Route, Routes } from "react-router-dom"
import NaoEncontrada from "./paginas/NaoEncontrada"
import Login from "./paginas/Login"
import Inicial from "./paginas/Inicial"
import SemAcesso from "./paginas/SemAcesso"
import { AuthProvider, useAuth } from "./context/AuthContext"

function App() {
  const auth = useAuth();

  const setAuth = (cargo: string, token: string) => {
    auth.setAuth(cargo, token);
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Inicial /> } />
          <Route path="/login" element={ <Login TrocarInfos={setAuth} /> }  />

          {/* 
          <Route element={<PrivateRoute isAuthenticated={isLoggedIn} userRole={userRole} allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          */}
          
          {/* Página de sem acesso */}
          <Route path="/not-authorized" element={ <SemAcesso /> } />
          {/* Página não encontrada */}
          <Route path="*" element={ <NaoEncontrada /> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
