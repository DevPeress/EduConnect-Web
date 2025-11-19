import Header from "../Header";
import Loader from "./Loader";
import PaginaMain from "./Pagina";
import type { MainProps } from "../../types/types";

// A página recebe:
// - Um título para exibição;
// - Uma descrição para ser apresentada;
// - As configurações do botão: se estará ativo, qual função será executada e o texto exibido;
// - A função de loading, utilizada para controlar a exibição do loader.

const Main = ({ titulo, desc, botao, load, children }: MainProps) => {
  return (
    <main className="flex-1 ml-72 flex flex-col bg-(--bg-body)">
      <Header />
      {load ? (
        <Loader />
      ) : (
        <PaginaMain titulo={titulo} desc={desc} botao={botao}>
          {children}
        </PaginaMain>
      )}
    </main>
  );
};

export default Main;
