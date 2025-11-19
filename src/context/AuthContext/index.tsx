import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { AuthContextType } from "../../types/types";

const AuthContext = createContext<AuthContextType>({
  cargo: "",
  token: "",
  setAuth: () => { },
  removeAuth: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cargo, setCargo] = useState<string>(() => {
    const cargo = localStorage.getItem("Cargo");
    return cargo ? cargo : "";
  });
  const [token, setToken] = useState<string>(() => {
    const id = localStorage.getItem("Token");
    return id ? cargo : "";
  });

  const setAuth = (cargo: string, token: string) => {
    setCargo(cargo);
    setToken(token);
    localStorage.setItem("Role", cargo);
    localStorage.setItem("Token", token);
  };

  const removeAuth = () => {
    localStorage.removeItem("Cargo");
    localStorage.removeItem("Token");
  }

  return (
    <AuthContext.Provider value={{ cargo, token, setAuth, removeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthContext");
  }
  return context;
}
