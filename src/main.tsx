import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext/index.tsx'
import { AuthProvider } from './context/AuthContext/index.tsx'
import { CadastroAlunoProvider } from './context/CadastroAlunoContext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CadastroAlunoProvider>
          <App />
        </CadastroAlunoProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
