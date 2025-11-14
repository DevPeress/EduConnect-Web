import type { CardsAdminType } from "../../../types/types";
import { formatBRL } from "../../../utils/codigos";
import {
  AlunosCard,
  PresencaCard,
  ProfessoresCard,
  TurmasCard,
} from "./Icones";

const CardsAdmin = ({ dados }: { dados: CardsAdminType }) => {
  const tipo: string = dados.dado;
  const porcentagem: boolean = dados.porcentagem > 0;

  // Processa a opção recebida e retorna o título e o ícone SVG de acordo com o tipo informado.
  const Card = (tipo: string) => {
    switch (tipo) {
      case "Alunos":
        return { card: <AlunosCard />, mensagem: "Total de Alunos" };
      case "Professores":
        return { card: <ProfessoresCard />, mensagem: "Professores Ativos" };
      case "Turmas":
        return { card: <TurmasCard />, mensagem: "Turmas Ativas" };
      case "Presença":
        return { card: <PresencaCard />, mensagem: "Taxa de Presença" };
    }
  };

  // Processa a opção recebida e retorna o valor da mensagem para ser exibida
  const Info = (tipo: string, valor: number) => {
    const analise: boolean = valor >= 0;
    switch (tipo) {
      case "Alunos":
        return analise ? "+" + valor + " este mês" : "-" + valor + " este mês";
      case "Professores":
        return analise
          ? valor + " novos contratados"
          : valor + " novas demissões";
      case "Turmas":
        return analise ? valor + " turma nova" : "Sema alterações";
      case "Presença":
        return valor >= 50 ? "Acima da meta" : "Abaixo da meta";
    }
  };

  return (
    <div
      className="bg-(--bg-card) border-2 border-(--border-color) rounded-xl p-6 hover:-translate-y-1 hover:border-(--border-light)"
      style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3" }}
    >
      <div className="flex justify-between items-center mb-2.5">
        {Card(tipo)?.card}
        <span
          className="flex items-center gap-0.5 text-[13px] font-semibold py-1 px-2.5 rounded-[20px]"
          style={{
            background: porcentagem
              ? "rgba(16, 185, 129, 0.15)"
              : "rgba(156, 163, 175, 0.15)",
            color: porcentagem ? "#10b981" : "var(--text-muted)",
          }}
        >
          {porcentagem ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          ) : null}
          {dados.porcentagem}%
        </span>
      </div>

      <div className="flex flex-col">
        <p className="text-[13px] text-(--text-muted) mb-1 font-medium">
          {Card(tipo)?.mensagem}
        </p>
        <h3 className="text-[32px] font-bold mb-1 text-(--text-primary) leading-8">
          {formatBRL(dados.total)}
          {tipo === "Presença" ? "%" : null}
        </h3>
        <span className="text-[13px] text-(--text-secondary)">
          {Info(tipo, dados.aumento)}
        </span>
      </div>
    </div>
  );
};

export default CardsAdmin;
