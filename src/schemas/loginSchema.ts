import z from "zod";

export const loginSchema = z.object({
    email: z.string().email("E-mail ou senha estão incorretos!"),
    senha: z.string().min(5, "E-mail ou senha estão incorretos!")
})

export type LoginInput = z.infer<typeof loginSchema>