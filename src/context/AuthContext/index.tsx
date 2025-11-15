import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import type { AuthContextType } from "../../types/types";

const AuthContext = createContext<AuthContextType>({
  cargo: "",
  token: "",
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cargo, setCargo] = useState<string>("Administrador");
  const [token, setToken] = useState<string>("sadsadsa");

  useEffect(() => {
    const savedCargo = localStorage.getItem("Role");
    const savedToken = localStorage.getItem("Token");

    if (savedCargo && savedToken) {
      setCargo(savedCargo);
      setToken(savedToken);
    }
  }, []);

  const setAuth = (cargo: string, token: string) => {
    setCargo(cargo);
    setToken(token);
    localStorage.setItem("Role", cargo);
    localStorage.setItem("Token", token);
  };

  return (
    <AuthContext.Provider value={{ cargo, token, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro do AuthContext");
  }
  return context;
}
