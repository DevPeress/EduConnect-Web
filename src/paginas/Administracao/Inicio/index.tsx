import { useState } from "react";
import CardsAdmin from "../../../components/Administracao/CardsAdmin";
import NavBarAdmin from "../../../components/Administracao/NavBar/NavBarAdmin";
import Header from "../../../components/Header";
import SidebarFooter from "../../../components/SideBar-Footer";
import type { CardsAdminType } from "../../../types/types";

const InicioAdm = () => {
  const [dados] = useState<CardsAdminType[]>([
    { dado: "Alunos", total: 1245, aumento: 150, porcentagem: 12 },
    { dado: "Professores", total: 87, aumento: 3, porcentagem: 3.5 },
    { dado: "Turmas", total: 42, aumento: 0, porcentagem: 0 },
    { dado: "Presença", total: 94.5, aumento: 94.5, porcentagem: 2.3 }
  ])

  return (
    <div className="flex min-h-full overflow-hidden">
      <aside className="flex flex-col fixed h-full w-72 bg-(--bg-sidebar) border-r-2 border-(--border-color)">
        <div className="px-6 py-6 border-b-2 border-(--border-color)">
          <div className="flex items-center gap-3 text-[18px] font-bold text-(--text-primary)">
            <span>EduManager</span>
          </div>
        </div>

        <NavBarAdmin />
        <SidebarFooter />
      </aside>

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

          <div className="grid grid-cols-4 gap-6 mb-6">
            {dados.map((item) => <CardsAdmin key={item.dado} dados={item} />)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InicioAdm;
