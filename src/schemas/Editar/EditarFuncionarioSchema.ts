import { z } from "zod";

export const editarFuncionarioSchema = z.object({
  registro: z.string(),
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido!"),
  telefone: z.string().min(14, "Número de Telefone inválido!"),
  status: z.string(),
  nascimento: z.string(),
  endereco: z.string().min(5, "Endereço inválido!"),
  cpf: z.string().min(14, "CPF inválido!"),
  telefoneEmergencia: z
    .string()
    .min(14, "Número do Contato de Emergência inválido!"),
  nomeEmergencia: z
    .string()
    .min(14, "Número do Contato de Emergência inválido!"),
  foto: z.string(),
  cargo: z.string(),
  departamento: z.string(),
  supervisor: z.string(),
  turno: z
    .string()
    .refine(
      (value) => value !== "Selecionar o Turno",
      "Selecione um turno válido!",
    ),
  salario: z.number(),
});

export type EditarFuncionarioInput = z.infer<typeof editarFuncionarioSchema>;
