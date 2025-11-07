import { useState } from "react";
import CardsAdmin from "../../../components/Administracao/CardsAdmin";
import type {
  AtividadeType,
  CalendarioType,
  CardsAdminType,
} from "../../../types/types";
import AsideAdmin from "../../../components/Administracao/AsideAdmin";
import AtividadesRecentesAdmin from "../../../components/Administracao/TabelasAdmin/AtividadesAdmin";
import CalendarioAdmin from "../../../components/Administracao/TabelasAdmin/CalendarioAdmin";
import GraficoAdmin from "../../../components/Administracao/GraficoAdmin";
import AcoesAdmin from "../../../components/Administracao/AcoesAdmin";
import Main from "../../../components/Main";

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
    <div>
      <AsideAdmin />

      <Main titulo="Bem-Vindo" desc="Visão geral da Escola e Estatísticas"> 
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6 mb-6">
            {dados.map((item) => (
              <CardsAdmin key={item.dado} dados={item} />
            ))}
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-3 mb-6">
            <AtividadesRecentesAdmin atividades={atividades} />

            <CalendarioAdmin calendario={calendario} />
          </div>

          <div className="grid grid-cols-[1.5fr_1fr] gap-3 mb-6">
            <GraficoAdmin />

            <AcoesAdmin />
          </div>
      </Main>
    </div>
  );
};

export default InicioAdm;
