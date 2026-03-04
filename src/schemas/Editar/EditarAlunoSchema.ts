import { z } from "zod";

export const editarAlunoSchema = z.object({
  matricula: z.string(),
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres!"),
  email: z.string().email("E-mail inválido!"),
  telefone: z.string().min(14, "Número de Telefone inválido!"),
  status: z.string(),
  nascimento: z.string("Data de Nascimento Inválida!"),
  endereco: z.string().min(5, "Endereço inválido!"),
  cpf: z.string().min(14, "CPF inválido!"),
  nomeEmergencia: z
    .string()
    .min(3, "Nome do Contato de Emergência deve ter no mínimo 3 caracteres!"),
  telefoneEmergencia: z
    .string()
    .min(14, "Número do Contato de Emergência inválido!"),
  turma: z
    .string()
    .refine(
      (value) => value !== "Selecionar Turma",
      "Selecione uma turma válida!",
    ),
});

export type EditarAlunoInput = z.infer<typeof editarAlunoSchema>;
