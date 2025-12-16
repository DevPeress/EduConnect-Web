import { useState } from "react"

export const Head = (tipo: string) => {
    const [tipos, setTipos] = useState<string[]>([])

    switch (tipo) {
        case "/admin/financeiro":
            setTipos(["Aluno", "Categoria", "Valor", "Vencimento", "Pagamento", "Status"])
            break
        case "/admin/turmas":
            setTipos(["Código", "Nome", "Turno", "Professor", "Horário", "Capacidade"])
            break
        case "/admin/professores":
            setTipos(["Código", "Nome", "Turmas", "E-mail", "Telefone", "Status"])
            break
        case "/admin/alunos":
            setTipos(["Matrícula", "Nome", "Turma", "E-mail", "Telefone", "Status"])
            break
        case "/admin/funcionarios":
            setTipos(["Código", "Nome", "Cargo", "Departamento", "Data de Admissão", "Status"])
            break
    }
    setTipos((prevDados) => [...prevDados, "Ação"])
    return tipos
}