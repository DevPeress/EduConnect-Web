import { useCadastroAluno } from "./CadastroAlunoContext";
import { useCadastroPagamento } from "./CadastroPagamentoContext";
import { useCadastroProfessor } from "./CadastroProfessorContext";
import { useCadastroTurma } from "./CadastroTurmaContext";

export function useCadastroMenu() {
  const cadastroProfessor = useCadastroProfessor().openMenu;
  const cadastroAluno = useCadastroAluno().openMenu;
  const cadastroPagamento = useCadastroPagamento().openMenu;
  const cadastroTurma = useCadastroTurma().openMenu;

  return {
    cadastroProfessor,
    cadastroAluno,
    cadastroPagamento,
    cadastroTurma,
  };
}
