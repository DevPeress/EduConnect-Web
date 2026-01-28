import type { SelectProps } from "../../../types/types";

const Retornos = (tipo: string) => {
  switch (tipo) {
    case "Professor":
      return ["Trabalhando", "Férias", "Afastado", "Desligado"];
    case "Alunos":
      return ["Ativo", "Inativo", "Suspenso"];
    case "Turmas":
      return ["Ativa", "Inativa", "Conclúida", "Encerrada"];
    case "Status":
      return ["Pago", "Pendente", "Atrasado", "Cancelado"];
    case "Funcionarios":
      return ["Ativo", "Inativo", "Suspenso"];

    // Financeiro
    case "Pagamento":
      return ["Todos os Status", "Pago", "Pendente", "Atrasado", "Cancelado"];
    case "Categorias":
      return ["Todas as Categorias", "Mensalidade", "Material", "Extra"];
    case "Meses":
      return [
        "Todos os Meses",
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
    default:
      return [];
  }
};

const Turnos = () => {
  return ["Matinal", "Vespertino", "Noturno"];
};

const Selects = ({
  anos,
  tipo,
  salas,
  departamento,
  selecionadaSala,
  selecionadoStatus,
  selecionadoTurno,
  selecionadoPagamento,
  selecionadoCategorias,
  selecionadoMeses,
  selecionadoAno,
  selecionadoDepartamento,
}: SelectProps) => {
  return (
    <>
      {departamento && selecionadoDepartamento && (
        <select
          onChange={(e) => selecionadoDepartamento(e.target.value)}
          className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
        >
          <option>Todos os Departamentos</option>
          {departamento.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}
      {Array.isArray(anos) && selecionadoAno && (
        <select
          onChange={(e) => selecionadoAno(e.target.value)}
          className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
        >
          <option>Todos os Anos</option>
          {anos.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}
      {salas && selecionadaSala && (
        <select
          onChange={(e) => selecionadaSala(e.target.value)}
          className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
        >
          <option>Todas as Salas</option>
          {salas.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}
      {selecionadoStatus && (
        <select
          onChange={(e) => selecionadoStatus(e.target.value)}
          className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
        >
          <option>Todos os Status</option>
          {Retornos(tipo).map((tipos) => (
            <option key={tipos}>{tipos}</option>
          ))}
        </select>
      )}
      {selecionadoTurno && (
        <select
          onChange={(e) => selecionadoTurno(e.target.value)}
          className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
        >
          <option>Todos os Turnos</option>
          {Turnos().map((tipos) => (
            <option key={tipos}>{tipos}</option>
          ))}
        </select>
      )}
      {tipo === "Financeiro" &&
      selecionadoPagamento &&
      selecionadoCategorias &&
      selecionadoMeses ? (
        <>
          <select
            onChange={(e) => selecionadoPagamento(e.target.value)}
            className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
          >
            {Retornos("Pagamento").map((tipos) => (
              <option key={tipos}>{tipos}</option>
            ))}
          </select>
          <select
            onChange={(e) => selecionadoCategorias(e.target.value)}
            className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
          >
            {Retornos("Categorias").map((tipos) => (
              <option key={tipos}>{tipos}</option>
            ))}
          </select>
          <select
            onChange={(e) => selecionadoMeses(e.target.value)}
            className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
          >
            {Retornos("Meses").map((tipos) => (
              <option key={tipos}>{tipos}</option>
            ))}
          </select>
        </>
      ) : null}
    </>
  );
};

export default Selects;
