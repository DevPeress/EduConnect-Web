interface SelectProps {
  Turno: (valor: string) => void;
  Status: (valor: string) => void;
}

const SelectTurmas = ({ Turno, Status }: SelectProps) => {
  return (
    <>
      <select
        onChange={(e) => Turno(e.target.value)}
        className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
      >
        <option>Todos os Turnos</option>
        <option>Matinal</option>
        <option>Vespertino</option>
        <option>Noturno</option>
      </select>
      <select
        onChange={(e) => Status(e.target.value)}
        className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)"
      >
        <option>Todos os Status</option>
        <option>Ativa</option>
        <option>Inativa</option>
        <option>Concluída</option>
      </select>
    </>
  );
};

export default SelectTurmas;
