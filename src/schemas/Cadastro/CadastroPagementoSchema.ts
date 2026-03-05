import { z } from "zod";

export const cadastroPagamentoSchema = z.object({
  aluno: z.string(),
  descricao: z.string().min(5, "Descrição inválida!"),
  valor: z.number().min(1, "Valor inválido!"),
  observacoes: z.string(),
  categoria: z
    .string()
    .refine(
      (value) => value !== "Selecionar categoria",
      "Selecione uma categoria válida!",
    ),
  statuspagamento: z
    .string()
    .refine(
      (value) => value !== "Selecionar status",
      "Selecione um status válido!",
    ),
  metodo: z
    .string()
    .refine(
      (value) => value !== "Selecionar método",
      "Selecione um método válido!",
    ),
  dataVencimento: z.string(),
  dataPagamento: z.string(),
});

export type CadastroPagamentoInput = z.infer<typeof cadastroPagamentoSchema>;
