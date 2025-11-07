import type { ReactNode } from "react";
import Header from "../Header";

const Main = ({ titulo, desc, children }: { titulo: string, desc: string, children: ReactNode }) => {
  return (
    <main className="flex-1 ml-72 flex flex-col bg-(--bg-body)">
      <Header />
      <div className="py-2 px-8 max-w-[1600px] m-0 mx-auto w-full">
        <div className="mb-4">
          <h1 className="text-[28px] font-bold mb-1 text-(--text-primary)">
            {titulo}
          </h1>
          <p className="text-[15px] text-(--text-secondary)">
            {desc}
          </p>
        </div>

        {children}
      </div>
    </main>
  );
};

export default Main;
