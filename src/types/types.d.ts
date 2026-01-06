import type { CadastroAlunoInput } from "../schemas/Cadastro/alunoSchema";
import type { CadastroFuncionarioInput } from "../schemas/Cadastro/funcionarioSchema";
import type { CadastroPagamentoInput } from "../schemas/Cadastro/pagementoSchema";
import type { CadastroProfessorInput } from "../schemas/Cadastro/professorSchema";
import type { CadastroTurmaInput } from "../schemas/Cadastro/turmaSchema";

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

export interface AuthContextType {
  cargo: string;
  token: boolean;
  loading: boolean;
  removeAuth: () => void;
  AtualizarAuth: () => void;
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
  foto: string;
}

export interface Funcionario {
  registro: string;
  nome: string;
  cargo: string;
  dataAdmissao: string;
  departamento: string;
  status: string;
  nasc: string;
  foto: string;
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
  foto: string;
}

export interface Turmas {
  registro: string;
  nome: string;
  turno: string;
  professor: string;
  horario: string;
  capacidade: number;
}

export interface Disciplinas {
  registro: string;
  nome: string;
  descricao: string;
  dataCriacao: string;
}

export interface CadastroContextType<
  T extends
    | CadastroProfessorInput
    | CadastroAlunoInput
    | CadastroPagamentoInput
    | CadastroTurmaInput
    | CadastroFuncionarioInput
    | CadastroDisciplinasInput
> {
  openMenu: () => Promise<T | null>;
  setDados: React.Dispatch<React.SetStateAction<T>>;
}

export interface EditarContextType<T extends EditarContextType> {
  openMenu: (valor: string) => Promise<T | null>;
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

export interface FlexContext<
  T extends
    | CadastroAlunoInput
    | CadastroProfessorInput
    | CadastroPagamentoInput
    | CadastroTurmaInput
    | CadastroFuncionarioInput
    | CadastroDisciplinasInput
> {
  infos: T;
  setInfos: React.Dispatch<React.SetStateAction<T>>;
}

export interface SelectProps {
  tipo: string;
  anos?: string[];
  salas?: string[];
  departamento?: string[];
  selecionadaSala?: (valor: string) => void;
  selecionadoStatus?: (valor: string) => void;
  selecionadoTurno?: (valor: string) => void;
  selecionadoPagamento?: (valor: string) => void;
  selecionadoCategorias?: (valor: string) => void;
  selecionadoMeses?: (valor: string) => void;
  selecionadoAno?: (valor: string) => void;
  selecionadoDepartamento?: (valor: string) => void;
}

export interface TablePropsTable {
  exibicao: Pessoa[] | Financeiro[] | Turmas[] | Funcionario[];
  excluir: (valor: string) => void;
}

export interface TablePropsGrid {
  exibicao: Pessoa[] | Financeiro[] | Funcionario[];
  excluir: (valor: string) => void;
}

export interface TrocaPaginas {
  nome: string;
  pagina: number;
  maxPagina: number;
  total: number;
  trocaPagina: (valor: number) => void;
}
