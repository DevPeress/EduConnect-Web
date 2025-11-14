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
  nome: string;
  pagina: string;
  svg: () => JSX.Element;
};

export interface CardsAdminType {
  dado: string;
  total: number;
  aumento: number;
  porcentagem: number;
};

export interface AtividadeType {
  tipo: string;
  dado: string;
  horario: number;
};

export interface CalendarioType {
  dia: string;
  mes: string;
  tipo: string;
  horario: string;
};

export interface AlunosType {
  ra: string;
  nome: string;
  nasc: string;
  turma: string;
  email: string;
  telefone: string;
  status: string
  media: number;
};

export interface ProfessorType {
  codigo: string;
  nome: string;
  turmas: string[];
  email: string;
  telefone: string;
  status: string;
  nasc: string;
};

export type CadastroAlunoContextType = {
  openMenu: () => Promise<AlunoInput | null>;
  setDados: React.Dispatch<React.SetStateAction<AlunoInput>>;
};

export type CadastroProfessorContextType = {
  openMenu: () => Promise<CadastroProfessorType | null>;
  setDados: React.Dispatch<React.SetStateAction<CadastroProfessorType>>;
};

export interface CadastroProfessorType {
  codigo: string;
  status: string;
  nome: string;
  cpf: string;
  contratacao: string;
  disciplina: string;
  formacao: string;
  turmas: string[];
  email: string;
  telefone: string;
  emergencia: string;
  endereco: string;
  nasc: string;
};

export interface CalendarioEvento {
  title: string;
  start: Date;
  end: Date;
};

export interface SlotInfo {
  start: Date;
  end: Date;
  slots: Date[];
  action: "select" | "click" | "doubleClick";
}