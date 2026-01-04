import { z } from "zod";

export const cadastroTurmaSchema = z.object({
  matricula: z.string(),
  status: z.string(),
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres!"),
  ano: z.string().min(3, "Ano Letivo inválido!"),
  turno: z
    .string()
    .refine(
      (value) => value !== "Selecionar o Turno",
      "Selecione um turno válido!"
    ),
  sala: z.string().min(2, "Sala inválida!"),
  capacidade: z.number(),
  professor: z.string().min(5, "Professor inválido!"),
  inicio: z.string(),
  fim: z.string(),
  dias: z.string(),
  disciplinas: z.string(),
});

export type CadastroTurmaInput = z.infer<typeof cadastroTurmaSchema>;
