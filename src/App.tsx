import { BrowserRouter, Route, Routes } from "react-router-dom"
import NaoEncontrada from "./paginas/NaoEncontrada"
import Login from "./paginas/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="login" element={ <Login /> } />
        
        <Route path="*" element={ <NaoEncontrada /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
