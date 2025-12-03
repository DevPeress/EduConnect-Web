interface Props {
  Selecionada: (valor: string) => void;
}

const SelectFuncionarios = ({ Selecionada }: Props) => {
  return (
    <>
      <select
        onChange={(e) => Selecionada(e.target.value)}
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

export default SelectFuncionarios;
