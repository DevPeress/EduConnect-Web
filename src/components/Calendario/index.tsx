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
  <div className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium hover:bg-blue-600 transition-colors">
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
        onClick={() => onNavigate("TODAY")}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Hoje
      </button>
      <button
        onClick={() => onNavigate("PREV")}
        className="px-2 py-1 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        ←
      </button>
      <button
        onClick={() => onNavigate("NEXT")}
        className="px-2 py-1 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        →
      </button>
    </div>
    <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
    <div className="flex gap-2">
      {(["month", "week", "day"] as View[]).map((v) => (
        <button
          key={v}
          onClick={() => onView(v)}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          {v === "month" ? "Mês" : v === "week" ? "Semana" : "Dia"}
        </button>
      ))}
    </div>
  </div>
);

const Calendario = ({ eventos, adicionarEvento }: { eventos: CalendarioEvento[], adicionarEvento: (slotInfo: SlotInfo) => void }) => {
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="h-[85vh] p-6 bg-gray-50 rounded-xl shadow-inner">
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
        className="rounded-xl bg-white shadow-lg p-4"
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
