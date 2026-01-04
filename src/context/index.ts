import { useCadastroAluno } from "./CadastroAlunoContext";
import { useCadastroFuncionario } from "./CadastroFuncionarioContext";
import { useCadastroPagamento } from "./CadastroPagamentoContext";
import { useCadastroProfessor } from "./CadastroProfessorContext";
import { useCadastroTurma } from "./CadastroTurmaContext";

export function useCadastroMenu() {
  const cadastroProfessor = useCadastroProfessor().openMenu;
  const cadastroAluno = useCadastroAluno().openMenu;
  const cadastroPagamento = useCadastroPagamento().openMenu;
  const cadastroTurma = useCadastroTurma().openMenu;
  const cadastroFuncionario = useCadastroFuncionario().openMenu;

  return {
    cadastroProfessor,
    cadastroAluno,
    cadastroPagamento,
    cadastroTurma,
    cadastroFuncionario,
  };
}
