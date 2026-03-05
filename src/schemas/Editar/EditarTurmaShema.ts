import { z } from "zod";

export const editarTurmaSchema = z.object({
  codigo: z.string(),
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  turno: z
    .string()
    .refine(
      (value) => value !== "Selecionar o Turno",
      "Selecione um turno válido!",
    ),
  status: z.string(),
  ano: z.string().min(3, "Ano Letivo inválido!"),
  capacidade: z.number(),
  professor: z.string().min(5, "Professor inválido!"),
  inicio: z.string(),
  fim: z.string(),
  sala: z.string().min(2, "Sala inválida!"),
  dias: z.array(z.string()),
  disciplinas: z.array(z.string()),
  alunos: z.array(z.string()),
});

export type EditarTurmaInput = z.infer<typeof editarTurmaSchema>;
