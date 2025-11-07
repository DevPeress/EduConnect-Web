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
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
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
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>
    </>
  );
};

export default ModoExibicao;
