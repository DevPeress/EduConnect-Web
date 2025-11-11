import { useEffect, useState } from "react";
import Main from "../../../components/Main";
import Aside from "../../../components/Aside";

const CalendarioAdm = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <Aside />

      <Main
        titulo="Bem-Vindo"
        desc="Visão geral da Escola e Estatísticas"
        botao={{
          ativo: false,
        }}
        load={loading}
      >
        a
      </Main>
    </>
  );
};

export default CalendarioAdm;
