export interface ThemeType {
  toggleTheme: () => void;
  dark: boolean;
};

export interface LoginType {
  email: string;
  senha: string;
};

export interface PrivateRouteProps {
  isAuthenticated: boolean;
  userRole: string; 
  allowedRoles: string[]; 
  redirectTo?: string;
};

export interface LoginResponse {
  cargo: string;
  token: string;
};

export interface LoginProps {
  TrocarInfos: (cargo: string, token: string) => void
};

export interface AuthContextType {
  cargo: string;
  token: string;
  setAuth: (cargo: string, token: string) => void;
};

export interface Acessos {
  logado: boolean;
  pagina: string;
  mensagem: string;
  cargos?: string[];
};

export interface NavAdmin {
  to: string,
  nome: string,
  pagina: string,
  svg: string
}