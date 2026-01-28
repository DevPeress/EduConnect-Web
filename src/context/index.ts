import { useCadastroAluno } from "./Cadastros/CadastroAlunoContext";
import { useCadastroDisciplinas } from "./Cadastros/CadastroDisciplinasContext";
import { useCadastroFuncionario } from "./Cadastros/CadastroFuncionarioContext";
import { useCadastroPagamento } from "./Cadastros/CadastroPagamentoContext";
import { useCadastroProfessor } from "./Cadastros/CadastroProfessorContext";
import { useCadastroTurma } from "./Cadastros/CadastroTurmaContext";
import { useEditarAluno } from "./Editar/EditarAlunoContext";
import { useEditarFuncionario } from "./Editar/EditarFuncionarioContext";
import { useEditarProfessor } from "./Editar/EditarProfessorSchema";
import { useEditarTurma } from "./Editar/EditarTurmaContext";

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

  return {
    editarFuncionario: (registro: string) =>
      editarFuncionarioCtx.openMenu(registro),
    editarTurma: (registro: string) => editarTurmaCtx.openMenu(registro),
    editarAluno: (registro: string) => editarAlunoCtx.openMenu(registro),
    editarProfessor: (registro: string) =>
      editarProfessorCtx.openMenu(registro),
  };
}
