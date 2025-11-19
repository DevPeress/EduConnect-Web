import type { Acessos } from "../../types/types";

// Função responsável por verificar se o usuário está logado. 
// Caso não esteja, redireciona para a página de login. 
// Se estiver autenticado, valida o cargo e redireciona para a página correspondente.
export const Options: Acessos[] = [
    { logado: false, pagina: "/login", mensagem: "Ir para o Login" },
    { logado: true, pagina: "/admin/dashboard", mensagem: "Ir para Área Administrativa", cargos: ["Administrador", "Funcionário"] },
    { logado: true, pagina: "/professor/dashboard", mensagem: "Ir para Área do Professor", cargos: ["Professor"] },
]