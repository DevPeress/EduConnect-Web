import { z } from "zod";

export const editarFinanceiroSchema = z.object({
  registro: z.string(),
  categoria: z
    .string()
    .refine(
      (value) => value !== "Selecionar categoria",
      "Selecione uma categoria válida!",
    ),
  metodo: z
    .string()
    .refine(
      (value) => value !== "Selecionar método",
      "Selecione um método válido!",
    ),
  descricao: z.string().min(5, "Descrição inválida!"),
  valor: z.number().min(1, "Valor inválido!"),
  dataVencimento: z.string(),
  pago: z.boolean(),
  cancelado: z.boolean(),
  dataPagamento: z.string(),
  observacoes: z.string(),
  aluno: z.string(),
});

export type EditarFinanceiroInput = z.infer<typeof editarFinanceiroSchema>;
