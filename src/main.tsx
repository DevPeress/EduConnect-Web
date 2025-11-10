import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext/index.tsx'
import { AuthProvider } from './context/AuthContext/index.tsx'
import { CadastroAlunoProvider } from './context/CadastroAlunoContext/index.tsx'
import { CadastroProfessorProvider } from './context/CadastroProfessorContext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CadastroAlunoProvider>
          <CadastroProfessorProvider>
            <App />
          </CadastroProfessorProvider>
        </CadastroAlunoProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
