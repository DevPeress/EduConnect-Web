import type { Acessos } from "../../types/types";

export const Options: Acessos[] = [
    { logado: false, pagina: "/login", mensagem: "Ir para o Login" },
    { logado: true, pagina: "/login", mensagem: "Ir para Área Administrativa", cargos: ["Admin"] },
]