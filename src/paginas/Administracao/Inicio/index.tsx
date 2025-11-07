import { useState } from "react";
import CardsAdmin from "../../../components/Administracao/CardsAdmin";
import Header from "../../../components/Header";
import type {
  AtividadeType,
  CalendarioType,
  CardsAdminType,
} from "../../../types/types";
import AsideAdmin from "../../../components/Administracao/AsideAdmin";
import AtividadesRecentesAdmin from "../../../components/Administracao/TabelasAdmin/AtividadesAdmin";
import CalendarioAdmin from "../../../components/Administracao/TabelasAdmin/CalendarioAdmin";

const InicioAdm = () => {
  const [dados] = useState<CardsAdminType[]>([
    { dado: "Alunos", total: 1245, aumento: 150, porcentagem: 12 },
    { dado: "Professores", total: 87, aumento: 3, porcentagem: 3.5 },
    { dado: "Turmas", total: 42, aumento: 0, porcentagem: 0 },
    { dado: "Presença", total: 94.5, aumento: 94.5, porcentagem: 2.3 },
  ]);

  const [atividades] = useState<AtividadeType[]>([
    { tipo: "Nota", dado: "Matemática 9º A", horario: 15 },
    { tipo: "Presença", dado: "Turma 8º A", horario: 60 },
    { tipo: "Novo Aluno", dado: "João Silva", horario: 120 },
    { tipo: "Reunião", dado: "Conselho de Classe", horario: 180 },
    { tipo: "Material", dado: "Português", horario: 300 },
  ]);

  const [calendario] = useState<CalendarioType[]>([
    {
      dia: "24",
      mes: "Out",
      tipo: "Reunião de Pais",
      horario: "19:00 - Auditório Principal",
    },
  ]);

  return (
    <div className="flex min-h-full">
      <AsideAdmin />

      <main className="flex-1 ml-72 flex flex-col bg-(--bg-body)">
        <Header />

        <div className="py-2 px-8 max-w-[1600px] m-0 mx-auto w-full">
          <div className="mb-4">
            <h1 className="text-[28px] font-bold mb-1 text-(--text-primary)">
              Bem-Vindo
            </h1>
            <p className="text-[15px] text-(--text-secondary)">
              Visão geral da Escola e Estatísticas
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6 mb-6">
            {dados.map((item) => (
              <CardsAdmin key={item.dado} dados={item} />
            ))}
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-3 mb-6">
            <AtividadesRecentesAdmin atividades={atividades} />

            <CalendarioAdmin calendario={calendario} />
          </div>

          <div className="grid grid-cols[repeat(auto-fit,minmax(1.5fr,1fr))] gap-6 mb-8">
            <div
              className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden"
              style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
            >
              <div
                className="py-5 px-6 border-b-2 border-(--border-color) flex justify-between items-center"
                style={{ background: "rgba(0, 0, 0, 0.2)" }}
              >
                <h2 className="text-[16px] font-semibold text-(--text-primary)">
                  Desempenho Acadêmico
                </h2>
                <select className="bg-(--bg-input) border-2 border-(--border-color) rounded-md py-1.5 px-3 text-(--text-primary) text-[13px] cursor-pointer outline-none">
                  <option>Último mês</option>
                  <option>Último trimestre</option>
                  <option>Último ano</option>
                </select>
              </div>
              <div className="p-6">
                <div className="m-6 p-6 bg-(--bg-input) rounded-[10px]">
                  <svg width="100%" height="200" viewBox="0 0 600 200">
                    <polyline
                      points="0,150 60,140 120,145 180,120 240,130 300,100 360,110 420,80 480,90 540,60 600,70"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      fill="none"
                    />
                    <polyline
                      points="0,180 60,170 120,165 180,150 240,155 300,140 360,135 420,120 480,115 540,100 600,95"
                      stroke="#10b981"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="flex gap-6 justify-center">
                  <div className="flex items-center gap-2 text-[13px] text-(--text-secondary)">
                    <span
                      className="w-3 h-3 rounded-[3px]"
                      style={{ background: "#3b82f6" }}
                    ></span>
                    <span className="">Média Geral</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-(--text-secondary)">
                    <span
                      className="w-3 h-3 rounded-[3px]"
                      style={{ background: "#10b981" }}
                    ></span>
                    <span className="">Meta</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InicioAdm;
