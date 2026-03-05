import { z } from "zod";

export const cadastroFuncionarioSchema = z.object({
  registro: z.string(),
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido!"),
  telefone: z.string().min(14, "Número de Telefone inválido!"),
  status: z.string(),
  nasc: z.string(),
  endereco: z.string().min(5, "Endereço inválido!"),
  cpf: z.string().min(14, "CPF inválido!"),
  telefoneEmergencia: z
    .string()
    .min(14, "Número do Contato de Emergência inválido!"),
  cargo: z.string(),
  departamento: z.string(),
  supervisor: z.string(),
  turno: z
    .string()
    .refine(
      (value) => value !== "Selecionar o Turno",
      "Selecione um turno válido!",
    ),
});

export type CadastroFuncionarioInput = z.infer<
  typeof cadastroFuncionarioSchema
>;
