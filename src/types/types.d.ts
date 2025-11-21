import type { CadastroAlunoInput } from "../schemas/alunoSchema";
import type { CadastroProfessorInput } from "../schemas/professorSchema";

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

export interface AuthPaginas {
  logado: boolean;
  cargo: string
}

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

export interface Pessoa {
  registro: string;
  nome: string;
  email: string;
  telefone: string;
  status: string;
  nasc: Date;
}

export interface AlunosType extends Pessoa {
  turma: string;
}

export interface ProfessorType extends Pessoa {
  turmas: string[],
}

export interface CadastroContextType<T extends CadastroProfessorInput | CadastroAlunoInput> {
  openMenu: () => Promise<T | null>;
  setDados: React.Dispatch<React.SetStateAction<T>>
}

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

export interface CadastroFlexProps<T extends CadastroAlunoInput | CadastroProfessorInput> {
  infos: T;
  setInfos: React.Dispatch<React.SetStateAction<T>>;
}

export interface SelectProps {
  salas: string[];
  selecionada: (valor: string) => void;
  status: (valor: string) => void;
}