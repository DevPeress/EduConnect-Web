import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { View } from "react-big-calendar";
import { useState } from "react";
import type { CalendarioEvento, SlotInfo } from "../../types/types";

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

const CustomEvent = ({ event }: { event: CalendarioEvento }) => (
  <div className="bg-(--calendario-bg-evento) text-(--calendario-texto-evento) px-2 py-1 rounded-md text-xs font-medium hover:bg-(--calendario-bg-evento-hover) transition-colors">
    {event.title}
  </div>
);

const CustomToolbar = ({
  label,
  onNavigate,
  onView,
}: {
  label: string;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
  onView: (view: View) => void;
}) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-2">
      <button
        onClick={() => onNavigate("PREV")}
        className="px-2 py-1 text-(--calendario-texto-botao) bg-(--calendario-bg-botao) rounded-lg hover:bg-(--calendario-bg-botao-hover)"
      >
        ←
      </button>
      <button
        onClick={() => onNavigate("TODAY")}
        className="px-3 py-1 text-sm bg-(--calendario-bg-botao) text-(--calendario-texto-botao) rounded-lg hover:bg-(--calendario-bg-botao-hover)"
      >
        Hoje
      </button>
      <button
        onClick={() => onNavigate("NEXT")}
        className="px-2 py-1 text-(--calendario-texto-botao) bg-(--calendario-bg-botao) rounded-lg hover:bg-(--calendario-bg-botao-hover)"
      >
        →
      </button>
    </div>
    <h2 className="text-lg font-semibold text-(--calendario-texto-titulo)">{label}</h2>
    <div className="flex gap-2">
      {(["month", "week", "day"] as View[]).map((v) => (
        <button
          key={v}
          onClick={() => onView(v)}
          className="px-3 py-1 text-sm bg-(--calendario-bg-botao) text-(--calendario-texto-botao) rounded-lg hover:bg-(--calendario-bg-botao-hover)"
        >
          {v === "month" ? "Mês" : v === "week" ? "Semana" : "Dia"}
        </button>
      ))}
    </div>
  </div>
);

const Calendario = ({
  eventos,
  adicionarEvento,
}: {
  eventos: CalendarioEvento[];
  adicionarEvento: (slotInfo: SlotInfo) => void;
}) => {
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="h-[76vh]">
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={(v) => setView(v)}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        selectable
        onSelectSlot={adicionarEvento}
        defaultView={Views.MONTH}
        popup
        className="rounded-xl bg-(--calendario-bg-geral) shadow-lg p-4"
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
        }}
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        }}
        style={{
          height: "100%",
          borderRadius: "12px",
        }}
      />
    </div>
  );
};

export default Calendario;
