import { useEffect, useState } from "react";
import CardsAdmin from "../../components/Administracao/CardsAdmin";
import type {
  AtividadeType,
  CalendarioType,
  CardsAdminType,
} from "../../types/types";
import AtividadesRecentesAdmin from "../../components/Administracao/AtividadesAdmin";
import CalendarioCard from "../../components/CalendarioCard";
import GraficoAdmin from "../../components/Administracao/GraficoAdmin";
import { http } from "../../utils/axios";
import toast from "react-hot-toast";
import LayoutLogado from "../LayoutLogado";
import type { AxiosError } from "axios";
import AcoesRapidas from "../../components/AcoesRapidas";
import { useAuth } from "../../context";

const InicioPage = () => {
  const auth = useAuth();
  const cargo = auth.cargo;

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
      .catch(function (err) {
        const error = err as AxiosError;
        const msg = error?.response?.data as string;

        toast.error(msg ?? "Não foi possível pegar os Dados!");
      });

    await http
      .get("api/dashboardadmin/Atividades")
      .then(function (dados) {
        setAtividades(dados.data);
        setLoading(false);
      })
      .catch(function (err) {
        const error = err as AxiosError;
        const msg = error?.response?.data as string;

        toast.error(msg ?? "Não foi possível pegar os Dados!");
      });
  };

  useEffect(() => {
    PegarDados();
  }, []);

  return (
    <LayoutLogado
      titulo="Bem-Vindo"
      desc="Visão geral da Escola e Estatísticas"
      exibirPesquisa={{
        exibir: false,
      }}
      botao={{
        ativo: false,
      }}
      load={loading}
    >
      {(cargo === "Administrador" || cargo === "Funcionário") &&
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6 mb-6">
          {dados.map((item) => (
            <CardsAdmin key={item.dado} dados={item} />
          ))}
        </div>
      }
      <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-3 mb-6">
        <AtividadesRecentesAdmin atividades={atividades} />

        <CalendarioCard calendario={calendario} />
      </div>
      <div className="grid grid-cols-[1.5fr_1fr] gap-3 mb-6">
        <GraficoAdmin />

        <AcoesRapidas />
      </div>
    </LayoutLogado>
  );
};

export default InicioPage;
