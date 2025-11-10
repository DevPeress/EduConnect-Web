import toast from "react-hot-toast";
import type { CadastroAlunoType } from "../../types/types";

const ValidarAluno = (dados: CadastroAlunoType) => {
  const email = dados.email;
  const nome = dados.nome;
  const telefone = dados.telefone;
  const endereco = dados.endereco;
  const nascimento = dados.nascimento;
  const turma = dados.turma;

  if (!nome || nome.length < 3) {
    toast.error("Nome inválido!");
    return false;
  }

  if (!nascimento) {
    toast.error("Data de Nascimento inválida!");
    return false;
  }

  if (turma == "Selecionar Turma") {
    toast.error("Seleciona a turma do aluno!");
    return false;
  }

  if (!email.includes("@") && !email.includes(".com")) {
    toast.error("E-mail inválido!");
    return false;
  }

  if (!telefone || telefone.length < 14) {
    toast.error("Telefone inválido!");
    return false;
  }

  if (!endereco || endereco.length < 5) {
    toast.error("Endereço inválido!");
    return false;
  }

  return true;
};

export default ValidarAluno;
