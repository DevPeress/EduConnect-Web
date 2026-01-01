export const Head = (tipo: string): string[] => {
  let tipos: string[] = [];

  switch (tipo) {
    case "/admin/financeiro":
      tipos = [
        "Aluno",
        "Categoria",
        "Valor",
        "Vencimento",
        "Pagamento",
        "Status",
      ];
      break;

    case "/admin/turmas":
      tipos = ["Código", "Nome", "Turno", "Professor", "Horário", "Capacidade"];
      break;

    case "/admin/professores":
      tipos = ["Código", "Nome", "Turmas", "E-mail", "Telefone", "Status"];
      break;

    case "/admin/alunos":
      tipos = ["Matrícula", "Nome", "Turma", "E-mail", "Telefone", "Status"];
      break;

    case "/admin/funcionarios":
      tipos = [
        "Código",
        "Nome",
        "Cargo",
        "Departamento",
        "Data de Admissão",
        "Status",
      ];
      break;
  }

  return [...tipos, "Ação"];
};
