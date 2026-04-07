interface GraficoDados {
  mediaGeral: number[];
  meta: number[];
}

interface GraficoAdminProps {
  dados: GraficoDados;
  periodoOptions?: string[];
}

const GraficoAdmin: React.FC<GraficoAdminProps> = ({ dados, periodoOptions = ["Último mês", "Último trimestre", "Último ano"] }) => {
  /**
  * dados = {
  *   mediaGeral: [150, 140, 145, ...],
  *   meta: [180, 170, 165, ...]
  * }
  */

  const gerarPolyline = (valores: number[]): string => {
    return valores
      .map((y, i) => {
        const x = (600 / (valores.length - 1)) * i; // distribui pontos uniformemente no eixo X
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div
      className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden"
      style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="py-5 px-6 border-b-2 border-(--border-color) flex justify-between items-center bg-(--cabecalho)">
        <h2 className="text-[16px] font-semibold text-(--text-primary)">
          Desempenho Acadêmico
        </h2>
        <select className="bg-(--bg-input) border-2 border-(--border-color) rounded-md py-1.5 px-3 text-(--text-primary) text-[13px] cursor-pointer outline-none">
          {periodoOptions.map((opcao, index) => (
            <option key={index}>{opcao}</option>
          ))}
        </select>
      </div>
      <div className="p-6">
        <div className="m-6 p-6 bg-(--bg-input) rounded-[10px]">
          <svg width="100%" height="200" viewBox="0 0 600 200">
            {dados.mediaGeral && (
              <polyline
                points={gerarPolyline(dados.mediaGeral)}
                stroke="#3b82f6"
                strokeWidth="3"
                fill="none"
              />
            )}
            {dados.meta && (
              <polyline
                points={gerarPolyline(dados.meta)}
                stroke="#10b981"
                strokeWidth="3"
                fill="none"
              />
            )}
          </svg>
        </div>
        <div className="flex gap-6 justify-center">
          <div className="flex items-center gap-2 text-[13px] text-(--text-secondary)">
            <span className="w-3 h-3 rounded-[3px] bg-(--blue)"></span>
            <span>Média Geral</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-(--text-secondary)">
            <span className="w-3 h-3 rounded-[3px] bg-(--green)"></span>
            <span>Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficoAdmin;