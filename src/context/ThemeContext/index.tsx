import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";
import type { ThemeType } from "../../types/types";
import { AuthProvider } from "../AuthContext";

const ThemeContext = createContext<ThemeType | undefined>(undefined);

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
      <AuthProvider>{children}</AuthProvider>
      <Toaster toastOptions={{}} />
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro do ThemeProvider");
  }
  return context;
}
