import { BrowserRouter, Route, Routes } from "react-router-dom"
import NaoEncontrada from "./paginas/NaoEncontrada"
import Login from "./paginas/Login"
import Inicial from "./paginas/Inicial"
import SemAcesso from "./paginas/SemAcesso"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={ <Inicial /> } />
        <Route path="login" element={ <Login /> } />

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
  )
}

export default App
