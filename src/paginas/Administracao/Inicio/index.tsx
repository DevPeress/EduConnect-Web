import { useEffect, useState } from "react";
import CardsAdmin from "../../../components/Administracao/CardsAdmin";
import type {
  AtividadeType,
  CalendarioType,
  CardsAdminType,
} from "../../../types/types";
import AtividadesRecentesAdmin from "../../../components/Administracao/AtividadesAdmin";
import CalendarioAdmin from "../../../components/Administracao/CalendarioAdmin";
import GraficoAdmin from "../../../components/Administracao/GraficoAdmin";
import AcoesAdmin from "../../../components/Administracao/AcoesAdmin";
import { http } from "../../../utils/axios";
import toast from "react-hot-toast";
import LayoutLogado from "../../LayoutLogado";

const InicioAdm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dados, setDados] = useState<CardsAdminType[]>([]);
  const [atividades, setAtividades] = useState<AtividadeType[]>([]);

  const [calendario] = useState<CalendarioType[]>([
    {
      dia: "24",
      mes: "Out",
      tipo: "Reunião de Pais",
      horario: "19:00 - Auditório Principal",
    },
  ]);

  const PegarDados = async () => {
    await http
      .get("api/dashboardadmin/Cards")
      .then(function (dados) {
        setDados(dados.data);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(
          error.message == "Network Error"
            ? "Não foi possível pegar os Dados!"
            : "Erro inesperado"
        );
      });

    await http
      .get("api/registros/DashBoard")
      .then(function (dados) {
        setAtividades(dados.data);
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
  };

  useEffect(() => {
    PegarDados();
  }, []);

  return (
    <LayoutLogado
      titulo="Bem-Vindo"
      desc="Visão geral da Escola e Estatísticas"
      exibirPesquisa={false}
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
