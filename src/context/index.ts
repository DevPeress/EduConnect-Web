import { useCadastroAluno } from "./CadastroAlunoContext";
import { useCadastroPagamento } from "./CadastroPagamentoContext";
import { useCadastroProfessor } from "./CadastroProfessorContext";

export function useCadastroMenu() {
    const cadastroProfessor = useCadastroProfessor().openMenu;
    const cadastroAluno = useCadastroAluno().openMenu;
    const cadastroPagamento = useCadastroPagamento().openMenu;

    return {
        cadastroProfessor,
        cadastroAluno,
        cadastroPagamento
    };
}