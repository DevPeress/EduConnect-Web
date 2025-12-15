import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthContextType } from "../../types/types";
import { http } from "../../utils/axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cargo, setCargo] = useState<string>("");
  const [token, setToken] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await http.get("/api/auth/usuario");

        setCargo(data.role);
        setToken(true);
      } catch {
        setCargo("");
        setToken(false);
        localStorage.removeItem("usuario");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const removeAuth = async () => {
    setCargo("");
    setToken(false);
    localStorage.removeItem("usuario");
    await http.delete("/api/auth/usuario");
  };

  return (
    <AuthContext.Provider value={{ cargo, token, loading, removeAuth }}>
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
