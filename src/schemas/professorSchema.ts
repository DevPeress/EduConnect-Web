import { z } from "zod";

export const cadastroProfessorSchema = z.object({
    codigo: z.string(),
    status: z.string(),
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    cpf: z.string().min(14, "CPF inválido!"),
    contratacao: z.date(),
    disciplina: z.string().min(1, "Disciplina inválida ou não digitada!"),
    formacao: z.string().min(1, "Disciplina inválida ou não digitada!"),
    turmas: z.array(z.string()),
    email: z.string().email("E-mail inválido!"),
    telefone: z.string().min(14, "Número de Telefone inválido!"),
    endereco: z.string().min(5, "Endereço inválido!"),
    nasc: z.date(),
    nomeEmergencia: z.string().min(3, "Nome do Contato de Emergência deve ter no mínimo 3 caracteres!"),
    telefoneEmergencia: z.string().min(14, "Número do Contato de Emergência inválido!")
})

export type CadastroProfessorInput = z.infer<typeof cadastroProfessorSchema>;
