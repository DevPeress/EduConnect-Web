import { z } from "zod";

export const cadastroDisciplinasSchema = z.object({
  registro: z.string(),
  nome: z.string(),
  descricao: z.string(),
});

export type CadastroDisciplinasInput = z.infer<typeof cadastroDisciplinasSchema>;
