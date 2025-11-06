import { useState } from "react";
import CardsAdmin from "../../../components/Administracao/CardsAdmin";
import Header from "../../../components/Header";
import type { AtividadeType, CardsAdminType } from "../../../types/types";
import AsideAdmin from "../../../components/Administracao/Aside";
import TabelasAdmin from "../../../components/Administracao/TabelasAdmin";
import { Link } from "react-router-dom";

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

  return (
    <div className="flex min-h-full overflow-hidden">
      <AsideAdmin />

      <main className="flex-1 ml-72 flex flex-col bg-(--bg-body)">
        <Header />

        <div className="p-8 max-w-[1600px] my-0 mx-auto w-full">
          <div className="mb-8">
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default InicioAdm;
