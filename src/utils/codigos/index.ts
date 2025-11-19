// Converter o valor recebido para o formato monetário brasileiro (BRL).
function formatBRL(value: number | string) {
  const numero = Number(value);
  return numero.toLocaleString("pt-BR");
}

// Formatando o valor para o formato válido de CPF.
function formatCPF(value: string) {
  const v = value.replace(/\D/g, "").slice(0, 11); // só números, máximo 11 dígitos

  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
  if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9, 11)}`;
}

// Formatando o valor para o formato válido de Telefone.
function formatTelefone(value: string) {
  const v = value.replace(/\D/g, "").slice(0, 11); // só números, máximo 11 dígitos

  if (v.length <= 2) return `(${v}`;
  if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  if (v.length <= 10)
    return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
  return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
}

function IdentificarTipo(dado: string) {
  switch (dado) {
    case "Nome completo":
      return "nome";
    case "Endereço":
      return "endereco";
    case "Matrícula":
      return "matricula";
    case "Código":
      return "codigo";
    case "Status":
      return "status";
    case "Data de Nascimento":
      return "nascimento";
    case "Data de Contratação":
      return "contratacao";
    case "Turma":
      return "turma";
    case "E-mail":
      return "email";
    case "Telefone":
      return "telefone";
    case "Disciplina Principal":
      return "disciplina";
    case "Formação Academica":
      return "formacao";
    case "Telefone de Emergência":
      return "emergencia";
    case "CPF/Documento":
      return "cpf";
    case "Nome do Contato de Emergência":
      return "nomeEmergencia";
    case "Telefone do Contato de Emergência":
      return "telefoneEmergencia";
    default:
      return "";
  }
}

export { formatBRL, formatCPF, formatTelefone, IdentificarTipo };
