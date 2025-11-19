// Botão responsável por alternar o layout da página entre tabela e cards.

import { ExibirTabela, ExibirCards } from "../../assets/HTML";

const ModoExibicao = ({
  modoExibir,
  trocarModo,
}: {
  modoExibir: boolean;
  trocarModo: () => void;
}) => {
  return (
    <>
      <button
        className="bg-transparent border-none text-(--text-secondary) cursor-pointer py-2 px-3 rounded-md flex items-center justify-center hover:text-(--text-primary)"
        title="Visualizar como tabela"
        style={{
          background: !modoExibir ? "var(--primary-color)" : "transparent",
          color: !modoExibir ? "white" : "var(--text-secondary)",
        }}
        onClick={trocarModo}
      >
        <ExibirTabela />
      </button>
      <button
        className="border-none cursor-pointer py-2 px-3 rounded-md flex items-center justify-center hover:text-(--text-primary)"
        title="Visualizar como cards"
        style={{
          background: modoExibir ? "var(--primary-color)" : "transparent",
          color: modoExibir ? "white" : "var(--text-secondary)",
        }}
        onClick={trocarModo}
      >
        <ExibirCards />
      </button>
    </>
  );
};

export default ModoExibicao;
