import { useEffect, useState } from "react";
import Main from "../../../components/Main";
import Aside from "../../../components/Aside";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Calendario from "../../../components/Calendario";
import type { CalendarioEvento } from "../../../types/types";

const CalendarioAdm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<CalendarioEvento[]>([
    {
      title: "Reunião de equipe",
      start: new Date(2025, 10, 12, 10, 0), // (ano, mês-1, dia, hora, minuto)
      end: new Date(2025, 10, 12, 11, 0),
    }
  ]);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("Título do evento:");
    if (title) setEvents([...events, { start, end, title }]);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Aside />

      <Main
        titulo="Calendário"
        desc="Visão geral do Calendário"
        botao={{
          ativo: false,
        }}
        load={loading}
      >
        <Calendario eventos={events} adicionarEvento={handleSelectSlot} />
      </Main>
    </>
  );
};

export default CalendarioAdm;
