import type { ReactNode } from "react";
import Header from "../Header";

const Main = ({
  titulo,
  desc,
  botao,
  children,
}: {
  titulo: string;
  desc: string;
  children: ReactNode;
  botao: { ativo: boolean, adicionar: () => void , mensagem?: string };
}) => {
  return (
    <main className="flex-1 ml-72 flex flex-col bg-(--bg-body)">
      <Header />
      <div className="py-2 px-8 max-w-[1600px] m-0 mx-auto w-full">
        <div className="flex justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-[20px] font-bold text-(--text-primary)">
              {titulo}
            </h1>
            <p className="text-[15px] text-(--text-secondary)">{desc}</p>
          </div>

          <button
            onClick={botao.adicionar}
            className="items-center gap-2.5 py-3 px-6 bg-(--primary-color) text-white border-none rounded-[10px] text-[14px] cursor-pointer hover:bg-(--primary-hover) hover:-translate-y-0.5"
            style={{ boxShadow: " 0 4px 12px rgba(59, 130, 246, 0.3)", display: botao.ativo ? "flex" : "none" }}
          >
            <svg
              className="shrink-0"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            {botao.mensagem}
          </button>
        </div>

        {children}
      </div>
    </main>
  );
};

export default Main;
