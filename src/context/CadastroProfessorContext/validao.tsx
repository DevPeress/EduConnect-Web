import toast from "react-hot-toast";
import type { CadastroProfessorType } from "../../types/types";

const ValidarProfessor = (dados: CadastroProfessorType) => {
  const email = dados.email;
  const nome = dados.nome;
  const telefone = dados.telefone;
  const endereco = dados.endereco;
  const nascimento = dados.nasc;
  const contracao = dados.contratacao;
  const cpf = dados.cpf;
  const formacao = dados.formacao;
  const emergencia = dados.emergencia;

  if (!nome || nome.length < 3) {
    toast.error("Nome inválido!");
    return false;
  }

  if (!nascimento) {
    toast.error("Data de Nascimento inválida!");
    return false;
  }

  if (!contracao) {
    toast.error("Data de Contratação inválida!");
    return false;
  }

  if (!cpf || cpf.length < 14) {
    toast.error("CPF inválido!");
    return false;
  }

  if (!formacao || formacao.length < 2) {
    toast.error("Formação Academica inválida!");
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

   if (!emergencia || emergencia.length < 14) {
    toast.error("Telefone de emergência inválido!");
    return false;
  }

  if (!endereco || endereco.length < 5) {
    toast.error("Endereço inválido!");
    return false;
  }

  return true;
};

export default ValidarProfessor;
