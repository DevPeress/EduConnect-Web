import type { CadastroAlunoInput } from "../schemas/alunoSchema";
import type { CadastroPagamentoInput } from "../schemas/pagementoSchema";
import type { CadastroProfessorInput } from "../schemas/professorSchema";

export interface ThemeType {
  toggleTheme: () => void;
  dark: boolean;
}

export interface PrivateRouteProps {
  isAuthenticated: boolean;
  userRole: string;
  allowedRoles: string[];
  redirectTo?: string;
}

export interface LoginResponse {
  cargo: string;
  token: string;
}

export interface AuthContextType {
  cargo: string;
  token: boolean;
  loading: boolean;
  removeAuth: () => void;
}

export interface AuthPaginas {
  logado: boolean;
  cargo: string;
}

export interface Acessos {
  logado: boolean;
  pagina: string;
  mensagem: string;
  cargos?: string[];
}

export interface Nav {
  nome: string;
  pagina: string;
  svg: () => JSX.Element;
}

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
}

export interface CardsFinanceiroType {
  dado: string;
  total: number;
}

export interface AtividadeType {
  tipo: string;
  dado: string;
  horario: number;
}

export interface CalendarioType {
  dia: string;
  mes: string;
  tipo: string;
  horario: string;
}

export interface Pessoa {
  registro: string;
  nome: string;
  email: string;
  telefone: string;
  status: string;
  turma: string | string[];
  nasc: string;
}

export interface Funcionario {
  registro: string;
  nome: string;
  cargo: string;
  data: string;
  departamento: string;
  status: string;
  nasc: string;
}

export interface Financeiro {
  registro: string;
  aluno: string;
  nasc: string;
  categoria: string;
  valor: number;
  dataVencimento: string;
  dataPagamento: string;
  status: string;
  mes: string;
}

export interface Turmas {
  registro: string;
  nome: string;
  turno: string;
  professor: string;
  horario: string;
  capacidade: number;
}

export interface CadastroContextType<
  T extends CadastroProfessorInput | CadastroAlunoInput | CadastroPagamentoInput
> {
  openMenu: () => Promise<T | null>;
  setDados: React.Dispatch<React.SetStateAction<T>>;
}

export interface CalendarioEvento {
  title: string;
  start: Date;
  end: Date;
}

export interface SlotInfo {
  start: Date;
  end: Date;
  slots: Date[];
  action: "select" | "click" | "doubleClick";
}

export interface CadastroFlexProps<
  T extends CadastroAlunoInput | CadastroProfessorInput | CadastroPagamentoInput
> {
  infos: T;
  setInfos: React.Dispatch<React.SetStateAction<T>>;
}

export interface SelectProps {
  tipo: string;
  salas?: string[];
  selecionadaSala?: (valor: string) => void;
  selecionadoStatus?: (valor: string) => void;
  selecionadoTurno?: (valor: string) => void;
  selecionadoPagamento?: (valor: string) => void;
  selecionadoCategorias?: (valor: string) => void;
  selecionadoMeses?: (valor: string) => void;
}

export interface TablePropsTable {
  head: string[];
  exibicao: Pessoa[] | Financeiro[] | Turmas[] | Funcionario[];
}

export interface TablePropsGrid {
  head: string[];
  exibicao: Pessoa[] | Financeiro[] | Funcionario[];
}
