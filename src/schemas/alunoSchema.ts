import { z } from "zod";

export const cadastroAlunoSchema = z.object({
    matricula: z.string(),
    status: z.string(),
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres!"),
    cpf: z.string().min(14, "CPF inválido!"),
    turma: z.string().refine(
        (value) => value !== "Selecionar Turma",
        "Selecione uma turma válida!"
    ),
    email: z.string().email("E-mail inválido!"),
    telefone: z.string().min(14, "Número de Telefone inválido!"),
    endereco: z.string().min(5, "Endereço inválido!"),
    nascimento: z.date("Data de Nascimento Inválida!"),
    nomeEmergencia: z.string().min(3, "Nome do Contato de Emergência deve ter no mínimo 3 caracteres!"),
    telefoneEmergencia: z.string().min(14, "Número do Contato de Emergência inválido!")
})

export type CadastroAlunoInput = z.infer<typeof cadastroAlunoSchema>;
