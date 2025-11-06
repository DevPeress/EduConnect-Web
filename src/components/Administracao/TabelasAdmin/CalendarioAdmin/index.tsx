import { Link } from "react-router-dom";
import type { CalendarioType } from "../../../../types/types";

const CalendarioAdmin = ({ calendario }: { calendario: CalendarioType[] }) => {
  return (
    <div
      className="bg-(--bg-card) border-2 border-(--border-color) rounded-xl overflow-hidden "
      style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
    >
      <div
        className="py-5 px-6 border-b-2 border-b-(--border-color) flex justify-between items-center"
        style={{ background: "rgba(0, 0, 0, 0.2)" }}
      >
        <h2 className="text-[16px] font-semibold text-(--text-primary)">
          Próximos Eventos
        </h2>
        <Link
          to={""}
          className="text-(--primary-color) text-[13px] font-semibold"
        >
          Ver calendário
        </Link>
      </div>
      <div className="p-6">
        {calendario.map((item, index) => (
          <div
            key={index}
            className="flex gap-3.5 py-3.5 px-0 border-b-2 border-b-(--border-color)"
          >
            <div
              className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[18px] shrink-0"
              style={{
                color: "var(--blue)",
                background: "rgba(59, 130, 246, 0.15)",
              }}
            >
              {item.dia}
            </div>
            <div className="flex-1">
              <p className="text-[14px] text-(--text-primary) mb-1 font-medium">
                {item.tipo}
              </p>
              <span className="text-[12px] text-(--text-muted)">
                {item.horario}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarioAdmin;
