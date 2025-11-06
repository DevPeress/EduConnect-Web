import type { AtividadeType } from "../../../types/types";

const TabelasAdmin = ({ valores }: { valores: AtividadeType }) => {
  const PegarDados = (tipo: string) => {
    switch (tipo) {
      case "Nota":
        return { emoji: "📝", mensagem: "Nova nota lançada - " + valores.dado };
      case "Presença":
        return {
          emoji: "✅",
          mensagem: "Presença Registrada - " + valores.dado,
        };
      case "Novo Aluno":
        return {
          emoji: "👤",
          mensagem: "Novo aluno matriculado - " + valores.dado,
        };
      case "Reunião":
        return {
          emoji: "📅",
          mensagem: "Reunião Agendada - " + valores.dado,
        };
      case "Material":
        return {
          emoji: "📚",
          mensagem: "Material didático atualizado - " + valores.dado,
        };
    }
  };

  const ConverterTempo = (tempo: number) => {
    if (tempo <= 59) {
      return "Há " + tempo + " minutos";
    } else {
      const valor: number = Math.round(tempo / 60);
      return "Há " + valor + " horas";
    }
  };

  return (
    <div className="flex gap-3.5 py-3.5 px-0 border-b-2 border-b-(--border-color)">
      <div
        className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[18px] shrink-0"
        style={{
          color: "var(--blue)",
          background: "rgba(59, 130, 246, 0.15)",
        }}
      >
        {PegarDados(valores.tipo)?.emoji}
      </div>
      <div className="flex-1">
        <p className="text-[14px] text-(--text-primary) mb-1 font-medium">
          {PegarDados(valores.tipo)?.mensagem}
        </p>
        <span className="text-[12px] text-(--text-muted)">
          {ConverterTempo(valores.horario)}
        </span>
      </div>
    </div>
  );
};

export default TabelasAdmin;
