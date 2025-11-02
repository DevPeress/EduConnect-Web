export interface ThemeType {
  toggleTheme: () => void;
  dark: boolean;
};

export interface LoginType {
  email: string;
  senha: string;
}

export interface PrivateRouteProps {
  isAuthenticated: boolean;
  userRole: string; 
  allowedRoles: string[]; 
  redirectTo?: string;
}