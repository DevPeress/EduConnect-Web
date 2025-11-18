import { useEffect, useState } from "react";
import CardsAdmin from "../../../components/Administracao/CardsAdmin";
import type {
  AtividadeType,
  CalendarioType,
  CardsAdminType,
} from "../../../types/types";
import AtividadesRecentesAdmin from "../../../components/Administracao/TabelasAdmin/AtividadesAdmin";
import CalendarioAdmin from "../../../components/Administracao/TabelasAdmin/CalendarioAdmin";
import GraficoAdmin from "../../../components/Administracao/GraficoAdmin";
import AcoesAdmin from "../../../components/Administracao/AcoesAdmin";
import { http } from "../../../utils/axios";
import toast from "react-hot-toast";
import LayoutLogado from "../../LayoutLogado";

const InicioAdm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dados, setDados] = useState<CardsAdminType[]>([
    { dado: "Alunos", total: 1245, aumento: 150, porcentagem: 12 },
    { dado: "Professores", total: 87, aumento: 3, porcentagem: 3.5 },
    { dado: "Turmas", total: 42, aumento: 0, porcentagem: 0 },
    { dado: "Presença", total: 94.5, aumento: 94.5, porcentagem: 2.3 },
  ]);

  const [atividades, setAtividades] = useState<AtividadeType[]>([
    { tipo: "Nota", dado: "Matemática 9º A", horario: 15 },
    { tipo: "Presença", dado: "Turma 8º A", horario: 60 },
    { tipo: "Novo Aluno", dado: "João Silva", horario: 120 },
    { tipo: "Reunião", dado: "Conselho de Classe", horario: 180 },
    { tipo: "Material", dado: "Português", horario: 300 },
  ]);

  const [calendario, setCalendario] = useState<CalendarioType[]>([
    {
      dia: "24",
      mes: "Out",
      tipo: "Reunião de Pais",
      horario: "19:00 - Auditório Principal",
    },
  ]);

  useEffect(() => {
    http
      .get("Administracao/PegarInicio")
      .then(function (dados) {
        setDados(dados.data.cards);
        setAtividades(dados.data.atividades);
        setCalendario(dados.data.calendario);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(
          error.message == "Network Error"
            ? "Não foi possível pegar os Dados!"
            : "Erro inesperado"
        );
      });
  }, []);

  return (
    <LayoutLogado
      titulo="Bem-Vindo"
      desc="Visão geral da Escola e Estatísticas"
      botao={{
        ativo: false,
      }}
      load={loading}
    >
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
    </LayoutLogado>
  );
};

export default InicioAdm;
