import { useEffect, useState } from "react";
import Main from "../../../components/Main";
import Aside from "../../../components/Aside";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarioAdm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState([
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

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("Título do evento:");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

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
        desc="Visão geral do Calendário"
        botao={{
          ativo: false,
        }}
        load={loading}
      >
        <div className="h-[80vh] p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            defaultView="month"
            views={["month", "week", "day"]}
            popup
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
            messages={{
              next: "Próximo",
              previous: "Anterior",
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
            }}
          />
        </div>
      </Main>
    </>
  );
};

export default CalendarioAdm;
