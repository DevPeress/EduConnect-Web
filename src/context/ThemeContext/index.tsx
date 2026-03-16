import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";
import { CadastroAlunoProvider } from "../Cadastros/CadastroAlunoContext";
import { CadastroProfessorProvider } from "../Cadastros/CadastroProfessorContext";
import { CadastroPagamentoProvider } from "../Cadastros/CadastroPagamentoContext";
import { CadastroTurmaProvider } from "../Cadastros/CadastroTurmaContext";
import { CadastroFuncionarioProvider } from "../Cadastros/CadastroFuncionarioContext";
import { CadastroDisciplinasProvider } from "../Cadastros/CadastroDisciplinasContext";
import { EditarFuncionarioProvider } from "../Editar/EditarFuncionarioContext";
import { EditarTurmaProvider } from "../Editar/EditarTurmaContext";
import { EditarAlunoProvider } from "../Editar/EditarAlunoContext";
import { EditarProfessorProvider } from "../Editar/EditarProfessorContext";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Gerencia a temática selecionada, salvando-a no localStorage para uso posterior.
  const [dark, setDark] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  function toggleTheme() {
    setDark((prev) => !prev);
  }

  useEffect(() => {
    // Ao carregar o site, o contexto é inicializado e verifica se uma temática já está armazenada.
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <CadastroAlunoProvider>
        <CadastroProfessorProvider>
          <CadastroPagamentoProvider>
            <CadastroTurmaProvider>
              <CadastroFuncionarioProvider>
                <CadastroDisciplinasProvider>
                  <EditarFuncionarioProvider>
                    <EditarTurmaProvider>
                      <EditarAlunoProvider>
                        <EditarProfessorProvider>
                          {children}
                        </EditarProfessorProvider>
                      </EditarAlunoProvider>
                    </EditarTurmaProvider>
                  </EditarFuncionarioProvider>
                </CadastroDisciplinasProvider>
              </CadastroFuncionarioProvider>
            </CadastroTurmaProvider>
          </CadastroPagamentoProvider>
        </CadastroProfessorProvider>
      </CadastroAlunoProvider>

      <Toaster toastOptions={{}} />
    </ThemeContext.Provider>
  );
}
