import { Link } from "react-router-dom";
import type { AtividadeType } from "../../../../types/types";
import TabelasAdmin from "..";

const CalendarioAdmin = ({ atividades }: { atividades: AtividadeType[] }) => {
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
          <TabelasAdmin key={index} valores={item} />
        ))}
      </div>
    </div>
  );
};

export default CalendarioAdmin;
