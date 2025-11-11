import { useEffect, useState } from "react";
import Main from "../../../components/Main";
import Aside from "../../../components/Aside";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Calendario from "../../../components/Calendario";
import type { CalendarioEvento } from "../../../types/types";

const CalendarioAdm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [events] = useState<CalendarioEvento[]>([
    {
      title: "Reunião de equipe",
      start: new Date(2025, 10, 12, 10, 0), // (ano, mês-1, dia, hora, minuto)
      end: new Date(2025, 10, 12, 11, 0),
    },
    {
      title: "Estudar React",
      start: new Date(2025, 10, 13, 14, 0),
      end: new Date(2025, 10, 13, 16, 0),
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Aside />

      <Main
        titulo="Bem-Vindo"
        desc="Visão geral do Calendário"
        botao={{
          ativo: false,
        }}
        load={loading}
      >
        <Calendario eventos={events} />
      </Main>
    </>
  );
};

export default CalendarioAdm;
