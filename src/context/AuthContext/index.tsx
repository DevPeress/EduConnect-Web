import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { http } from "../../utils/axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [cargo, setCargo] = useState<string>("");
  const [token, setToken] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, [refresh]);

  const removeAuth = async () => {
    setCargo("");
    setToken(false);
    localStorage.removeItem("usuario");
    await http.post("/api/auth/logout");
  };

  const AtualizarAuth = () => {
    setRefresh(!refresh);
  };

  return (
    <AuthContext.Provider
      value={{ cargo, token, loading, removeAuth, AtualizarAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
