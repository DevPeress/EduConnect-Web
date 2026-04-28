import { Link } from "react-router-dom";
import type { AtividadeType, AuditAction } from "../../types/types";

const AtividadesRecentes = ({
  atividades,
}: {
  atividades: AtividadeType[];
}) => {
  const PegarDados = (tipo: AuditAction, dado: string) => {
    switch (tipo) {
      case 7:
        return { emoji: "📝", mensagem: "Nova nota lançada - " + dado };
      case 8:
        return {
          emoji: "✅",
          mensagem: "Presença Registrada - " + dado,
        };
      case 9:
        return {
          emoji: "👤",
          mensagem: "Novo aluno matriculado - " + dado,
        };
      case 10:
        return {
          emoji: "📅",
          mensagem: "Reunião Agendada - " + dado,
        };
      case 11:
        return {
          emoji: "📚",
          mensagem: "Material didático atualizado - " + dado,
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
    <div
      className="bg-(--bg-card) border-2 border-(--border-color) rounded-xl overflow-hidden "
      style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="py-5 px-6 border-b-2 border-b-(--border-color) flex justify-between items-center bg-(--cabecalho)">
        <h2 className="text-[16px] font-semibold text-(--text-primary)">
          Atividades Recentes
        </h2>
        <Link
          to={""}
          className="text-(--primary-color) text-[13px] font-semibold"
        >
          Ver todas
        </Link>
      </div>
      <div className="p-6">
        {atividades.map((item, index) => (
          <div
            key={index}
            className="flex gap-3.5 py-3.5 px-0 border-b-2 border-b-(--border-color)"
          >
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[18px] shrink-0 text-(--blue) bg-(--atividades-recentes)">
              {PegarDados(item.tipo, item.dado)?.emoji}
            </div>
            <div className="flex-1">
              <p className="text-[14px] text-(--text-primary) mb-1 font-medium">
                {PegarDados(item.tipo, item.dado)?.mensagem}
              </p>
              <span className="text-[12px] text-(--text-muted)">
                {ConverterTempo(item.horario)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtividadesRecentes;
