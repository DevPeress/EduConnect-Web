import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthContextType } from "../../types/types";
import { http } from "../../utils/axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cargo, setCargo] = useState<string>("");
  const [token, setToken] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      await http
        .get("/api/auth/usuario")
        .then(function (dados) {
          setCargo(dados.data.role);
          setToken(dados.data.id != null ? true : false);
        })
        .catch(() => {
          setCargo("");
          setToken(false);
        });
    }

    checkAuth(); 
  }, []);

  return (
    <AuthContext.Provider value={{ cargo, token }}>
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
