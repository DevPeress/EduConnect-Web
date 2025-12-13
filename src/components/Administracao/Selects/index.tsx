import type { SelectProps } from "../../../types/types";

const Retornos = (tipo: string) => {
    switch (tipo) {
        case "Professor":
            return ["Trabalhando", "Férias", "Afastado", "Desligado"]
        case "Alunos":
            return ["Ativo", "Inativo", "Suspenso"]
        case "Turmas":
            return ["Ativa", "Inativa", "Conclúida"]
        case "Status":
            return ["Pago", "Pendente", "Atrasado", "Cancelado"];
    }
}

const Selects = ({ salas, selecionada, status, tipo }: SelectProps) => {
    return (
        <>
            <select
                onChange={(e) => selecionada(e.target.value)}
                className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
            >
                {salas.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </select>
            <select
                onChange={(e) => status(e.target.value)}
                className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
            >
                <option>Todos os Status</option>
                {Retornos(tipo)?.map((tipos) => (<option>{tipos}</option>))}
            </select>
        </>
    );
};

export default Selects;
