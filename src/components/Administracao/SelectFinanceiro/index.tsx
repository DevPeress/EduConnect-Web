interface SelectProps {
  Categoria: (valor: string) => void;
  Meses: (valor: string) => void;
  Status: (valor: string) => void;
}

const SelectFinanceiro = ({ Categoria, Meses, Status }: SelectProps) => {
  const Opcoes = (tipo: string) => {
    switch (tipo) {
      case "Status":
        return ["Todos os Status", "Pago", "Pendente", "Atrasado", "Cancelado"];
      case "Categorias":
        return ["Todas as Categorias", "Mensalidade", "Material", "Extra"];
      case "Meses":
        return ["Todos os Meses", "Janeiro"];
      default:
        return [];
    }
  };
  return (
    <>
      <select
        onChange={(e) => Status(e.target.value)}
        className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
      >
        {Opcoes("Status").map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select
        onChange={(e) => Categoria(e.target.value)}
        className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
      >
        {Opcoes("Categorias").map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <select
        onChange={(e) => Meses(e.target.value)}
        className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
      >
        {Opcoes("Meses").map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </>
  );
};

export default SelectFinanceiro;
