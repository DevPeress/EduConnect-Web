import { useContext } from "react";
import { ThemeContext } from "./ThemeContext/ThemeContext";
import { EditarTurmaContext } from "./Editar/EditarTurmaContext/EditarTurmaContext";
import { EditarProfessorContext } from "./Editar/EditarProfessorContext/EditarProfessorContext";
import { EditarFuncionarioContext } from "./Editar/EditarFuncionarioContext/EditarFuncionarioContext";
import { EditarAlunoContext } from "./Editar/EditarAlunoContext/EditarAlunoContext";
import { CadastroTurmaContext } from "./Cadastros/CadastroTurmaContext/CadastroTurmaContext";
import { CadastroProfessorContext } from "./Cadastros/CadastroProfessorContext/CadastroProfessorContext";
import { CadastroPagamentoContext } from "./Cadastros/CadastroPagamentoContext/CadastroPagamentoContext";
import { CadastroFuncionarioContext } from "./Cadastros/CadastroFuncionarioContext/CadastroFuncionarioContext";
import { CadastroDisciplinasContext } from "./Cadastros/CadastroDisciplinasContext/CadastroDisciplinasContext";
import { CadastroAlunoContext } from "./Cadastros/CadastroAlunoContext/CadastroAlunoContext";
import { AuthContext } from "./AuthContext/AuthContext";
import { BoletimContext } from "./BoletimContext/BoletimContext";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro do ThemeProvider");
  }
  return context;
}

export function useEditarTurma() {
  const context = useContext(EditarTurmaContext);
  if (!context) {
    throw new Error(
      "useEditarTurma deve ser usado dentro do EditarTurmaProvider",
    );
  }
  return context;
}

export function useEditarProfessor() {
  const context = useContext(EditarProfessorContext);
  if (!context) {
    throw new Error(
      "useEditarProfessor deve ser usado dentro do EditarProfessorProvider",
    );
  }
  return context;
}

export function useEditarFuncionario() {
  const context = useContext(EditarFuncionarioContext);
  if (!context) {
    throw new Error(
      "useEditarFuncionario deve ser usado dentro do EditarFuncionarioProvider",
    );
  }
  return context;
}

export function useEditarAluno() {
  const context = useContext(EditarAlunoContext);
  if (!context) {
    throw new Error(
      "useEditarAluno deve ser usado dentro do EditarAlunoProvider",
    );
  }
  return context;
}

export function useCadastroTurma() {
  const context = useContext(CadastroTurmaContext);
  if (!context) {
    throw new Error(
      "useCadastroTurma deve ser usado dentro do CadastroTurmaProvider",
    );
  }
  return context;
}

export function useCadastroProfessor() {
  const context = useContext(CadastroProfessorContext);
  if (!context) {
    throw new Error(
      "useCadastroProfessor deve ser usado dentro do CadastroProfessorProvider",
    );
  }
  return context;
}

export function useCadastroPagamento() {
  const context = useContext(CadastroPagamentoContext);
  if (!context) {
    throw new Error(
      "useCadastroPagamento deve ser usado dentro do CadastroPagamentoProvider",
    );
  }
  return context;
}

export function useCadastroFuncionario() {
  const context = useContext(CadastroFuncionarioContext);
  if (!context) {
    throw new Error(
      "useCadastroFuncionario deve ser usado dentro do CadastroFuncionarioProvider",
    );
  }
  return context;
}

export function useCadastroDisciplinas() {
  const context = useContext(CadastroDisciplinasContext);
  if (!context) {
    throw new Error(
      "useCadastroDisciplinas deve ser usado dentro do CadastroDisciplinasProvider",
    );
  }
  return context;
}

export function useCadastroAluno() {
  const context = useContext(CadastroAlunoContext);
  if (!context) {
    throw new Error(
      "useCadastroAluno deve ser usado dentro do CadastroAlunoProvider",
    );
  }
  return context;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthContext");
  }
  return context;
}

export function useBoletim() {
  const context = useContext(BoletimContext);
  if (!context) {
    throw new Error("useBoletim deve ser usado dentro do BoletimContext");
  }
  return context;
}

export function useBoletimMenu() {
  const boletim = useBoletim().openMenu;

  return boletim;
}

export function useCadastroMenu() {
  const cadastroProfessor = useCadastroProfessor().openMenu;
  const cadastroAluno = useCadastroAluno().openMenu;
  const cadastroPagamento = useCadastroPagamento().openMenu;
  const cadastroTurma = useCadastroTurma().openMenu;
  const cadastroFuncionario = useCadastroFuncionario().openMenu;
  const cadastroDisciplinas = useCadastroDisciplinas().openMenu;

  return {
    cadastroProfessor,
    cadastroAluno,
    cadastroPagamento,
    cadastroTurma,
    cadastroFuncionario,
    cadastroDisciplinas,
  };
}

export function useEditarMenu() {
  const editarFuncionarioCtx = useEditarFuncionario();
  const editarTurmaCtx = useEditarTurma();
  const editarAlunoCtx = useEditarAluno();
  const editarProfessorCtx = useEditarProfessor();
  const editarPagamentoCtx = useEditarFuncionario();

  return {
    editarFuncionario: (registro: string) =>
      editarFuncionarioCtx.openMenu(registro),
    editarTurma: (registro: string) => editarTurmaCtx.openMenu(registro),
    editarAluno: (registro: string) => editarAlunoCtx.openMenu(registro),
    editarProfessor: (registro: string) =>
      editarProfessorCtx.openMenu(registro),
    editarPagamento: (registro: string) =>
      editarPagamentoCtx.openMenu(registro)
  };
}
