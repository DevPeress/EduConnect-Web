import type { ReactNode } from "react";
import Aside from "../components/Aside";
import Main from "../components/Main";

const LayoutLogado = ({
  children,
  titulo,
  desc,
  botao,
  load,
}: {
  children: ReactNode;
  titulo: string;
  desc: string;
  botao: { ativo: boolean; adicionar?: () => void; mensagem?: string };
  load: boolean;
}) => {
  const BotaoAtivo: boolean = botao.ativo;
  const BotaoMensagem: string = botao.mensagem || "";
  const BotaoAdicionar = botao.adicionar;
  return (
    <>
      <Aside />
      <Main
        titulo={titulo}
        desc={desc}
        botao={{
          ativo: BotaoAtivo,
          mensagem: BotaoMensagem,
          adicionar: BotaoAdicionar,
        }}
        load={load}
      >
        {children}
      </Main>
    </>
  );
};

export default LayoutLogado;
