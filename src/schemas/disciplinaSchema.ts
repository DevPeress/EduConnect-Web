import { z } from "zod";

export const cadastroDisciplinasSchema = z.object({
  registro: z.string(),
  nome: z.string().min(3, "Nome da disciplina muito pequena!"),
  descricao: z.string(),
});

export type CadastroDisciplinasInput = z.infer<typeof cadastroDisciplinasSchema>;
