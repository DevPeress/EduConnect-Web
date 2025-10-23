import { BrowserRouter, Route, Routes } from "react-router-dom"
import NaoEncontrada from "./paginas/NaoEncontrada"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={ <NaoEncontrada /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
