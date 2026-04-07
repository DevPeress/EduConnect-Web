import { z } from "zod";

export const cadastroNotaSchema = z.object({
  alunoRegistro: z.string().min(3, "Registro incompleto"),
  nota: z.number().min(0, "Nota deve ser no mínimo 0").max(10, "Nota deve ser no máximo 10"),
  materia: z
    .string()
    .refine(
      (value) => value !== "Selecionar Matéria",
      "Selecione uma matéria válida!",
    )
});

export type CadastroNotaInput = z.infer<typeof cadastroNotaSchema>;
