import { Atrasado, Pendente, Recebido, Total } from "../../../assets/HTML";
import type { CardsFinanceiroType } from "../../../types/types";
import { formatBRL } from "../../../utils/codigos";

const CardsFinanceiro = ({ dados }: { dados: CardsFinanceiroType }) => {
  const Card = (tipo: string) => {
    switch (tipo) {
      case "Recebido":
        return {
          svg: <Recebido />,
          text: "text-(--green)",
          bg: "bg-(--professor-card)",
        };
      case "Pendente":
        return {
          svg: <Pendente />,
          text: "text-(--red)",
          bg: "bg-(--presenca-card)",
        };
      case "Atrasado":
        return {
          svg: <Atrasado />,
          text: "text-(--orange)",
          bg: "bg-(--turma-card)",
        };
      case "Total":
        return {
          svg: <Total />,
          text: "text-(--blue)",
          bg: "bg-(--aluno-card)",
        };
    }
  };

  return (
    <div className="bg-(--bg-card) border border-(--border-color) rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1">
      <div
        className={`w-14 h-14 rounded-lg flex items-center justify-center shrink-0 ${
          Card(dados.dado)?.bg
        } ${Card(dados.dado)?.text}`}
      >
        {Card(dados.dado)?.svg}
      </div>
      <div>
        <h3 className="text-[13px] text-(--text-muted) font-medium mb-1">
          {dados.dado}
        </h3>
        <div className="text-2xl font-bold text-(--text-primary)">
          R$ {formatBRL(Number(dados.total ?? 0))}
        </div>
      </div>
    </div>
  );
};

export default CardsFinanceiro;
