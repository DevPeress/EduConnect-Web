import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ThemeType {
  dark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState<boolean>(true);

  function toggleTheme() {
    setDark(prev => !prev);
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <html lang="pt-br" className={dark ? 'dark' : 'light'}>
        <body>
          {children}
        </body>
      </html>
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