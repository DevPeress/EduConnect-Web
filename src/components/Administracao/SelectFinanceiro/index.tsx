import type { SelectProps } from "../../../types/types";

const SelectAlunos = ({ salas, selecionada, status }: SelectProps) => {
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
        <option>Ativo</option>
        <option>Inativo</option>
        <option>Suspenso</option>
      </select>
    </>
  );
};

export default SelectAlunos;
