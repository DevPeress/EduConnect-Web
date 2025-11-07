const AcoesAdmin = () => {
  const tipos = [
    "Novo Aluno",
    "Lançar Nota",
    "Registrar Presença",
    "Gerar Relatório",
  ];
  const Acao = (tipo: string) => {
    switch (tipo) {
      case "Novo Aluno":
        return "Cadastrar novo Estudante";
      case "Lançar Nota":
        return "Registrar avaliações";
      case "Registrar Presença":
        return "Marcar frequência";
      case "Gerar Relatório":
        return "Visualizar Dados";
    }
  };

  return (
    <div
      className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden"
      style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
    >
      <div
        className="py-5 px-6 border-b-2 border-(--border-color) flex justify-between items-center"
        style={{ background: "rgba(0, 0, 0, 0.2)" }}
      >
        <h2 className="text-[16px] font-semibold text-(--text-primary)">
          Ações Rápidas
        </h2>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-1">
          {tipos.map((item) => (
            <button className="flex items-center gap-3.5 p-3.5 bg-transparent border-2 border-(--border-color) rounded-[10px] cursor-pointer text-left w-full hover:bg-(--bg-hover) hover:border-(--border-light) hover:translate-x-1">
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(59, 130, 246, 0.15)",
                  color: "var(--blue)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="text-[14px] font-semibold text-(--text-primary)">
                  {item}
                </span>
                <span className="text-[12px] text-(--text-muted)">
                  {Acao(item)}
                </span>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcoesAdmin;
