import { z } from "zod";

export const editarNotaSchema = z.object({
  registro: z.string().min(3, "Registro incompleto"),
  nota: z.number().min(0, "Nota deve ser no mínimo 0").max(10, "Nota deve ser no máximo 10"),
});

export type EditarNotaInput = z.infer<typeof editarNotaSchema>;
