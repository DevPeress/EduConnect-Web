export interface ThemeType {
  toggleTheme: () => void;
  dark: boolean;
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
  removeAuth: () => void;
};

export interface Acessos {
  logado: boolean;
  pagina: string;
  mensagem: string;
  cargos?: string[];
};

export interface Nav {
  nome: string;
  pagina: string;
  svg: () => JSX.Element;
};

export interface MainProps {
  titulo: string;
  desc: string;
  children: ReactNode;
  botao: { ativo: boolean; adicionar?: () => void; mensagem?: string };
  load?: boolean;
}

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
  openMenu: () => Promise<CadastroAlunoInput | null>;
  setDados: React.Dispatch<React.SetStateAction<CadastroAlunoInput>>;
};

export type CadastroProfessorContextType = {
  openMenu: () => Promise<CadastroProfessorInput | null>;
  setDados: React.Dispatch<React.SetStateAction<CadastroProfessorInput>>;
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

export interface CadastroFlex1Props<T extends CadastroAlunoType | CadastroProfessorType> {
  titulo: string;
  infos: T;
  setInfos: React.Dispatch<React.SetStateAction<T>>;
  place: string;
};

export interface CadastroFlex2Props<T extends CadastroAlunoType | CadastroProfessorType> {
  opcao1: string;
  opcao2: string;
  infos: T;
  setInfos: React.Dispatch<React.SetStateAction<T>>;
};