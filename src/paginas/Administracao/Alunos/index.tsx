import { useState } from "react";
import Aside from "../../../components/Aside";
import Header from "../../../components/Header";

const AlunosAdmin = () => {
  const [modo, setModo] = useState<boolean>(false);
  return (
    <>
      <Aside />

      <main className="flex-1 ml-72 flex flex-col bg-(--bg-body)">
        <Header />
        <div className="py-2 px-8 max-w-[1600px] m-0 mx-auto w-full">
          <div className="mb-4">
            <h1 className="text-[28px] font-bold mb-1 text-(--text-primary)">
              Gerenciamento de Alunos
            </h1>
            <p className="text-[15px] text-(--text-secondary)">
              Visualize e gerencie informações dos estudantes
            </p>
          </div>

          <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
            <div className="flex gap-3 flex-wrap">
              <select className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)">
                <option>Todas as turmas</option>
                <option>9º A</option>
                <option>9º B</option>
                <option>8º A</option>
                <option>8º B</option>
              </select>
              <select className="bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] py-2.5 px-3.5 text-(--text-primary) text-[14px] cursor-pointer min-w-[180px] hover:border-(--border-light)">
                <option>Todos os status</option>
                <option>Ativo</option>
                <option>Inativo</option>
                <option>Suspenso</option>
              </select>
            </div>

            <div className="flex gap-2 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] p-1.5">
              <button
                className="bg-transparent border-none text-(--text-secondary) cursor-pointer py-2 px-3 rounded-md flex items-center justify-center hover:text-(--text-primary)"
                title="Visualizar como tabela"
                style={{
                  background: !modo ? "var(--primary-color)" : "transparent",
                  color: !modo ? "white" : "var(--text-secondary)",
                }}
                onClick={() => setModo(!modo)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
              <button
                className="border-none cursor-pointer py-2 px-3 rounded-md flex items-center justify-center hover:text-(--text-primary)"
                title="Visualizar como cards"
                style={{
                  background: modo ? "var(--primary-color)" : "transparent",
                  color: modo ? "white" : "var(--text-secondary)",
                }}
                onClick={() => setModo(!modo)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AlunosAdmin;
