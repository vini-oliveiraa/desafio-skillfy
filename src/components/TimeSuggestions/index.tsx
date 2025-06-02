import type { FC } from "react";
import moment from "moment";

interface TimeSuggestionsProps {
  taskId: string | number;
  suggestions: {
    task_id: string | number;
    suggested_times: {
      start: string;
      end: string;
      score: number;
    }[];
  }[];
}

export const TimeSuggestions: FC<TimeSuggestionsProps> = ({ taskId, suggestions }) => {
  const suggestion = suggestions.find(s => String(s.task_id) === String(taskId));

  if (!suggestion || suggestion.suggested_times.length === 0) {
    return <p>Sem sugestão disponível</p>;
  }

  // Ordena sugestões pelo score decrescente
  const orderedSuggestions = [...suggestion.suggested_times].sort((a, b) => b.score - a.score);

  return (
    <div>
      <h3>Horários sugeridos</h3>
      <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
        {orderedSuggestions.map((time, index) => {
          const start = moment(time.start).format("HH:mm");
          const end = moment(time.end).format("HH:mm");
          const duration = moment(time.end).diff(moment(time.start), "minutes");

          return (
            <li key={index}>
              {start} - {end} ({duration} min)
            </li>
          );
        })}
      </ul>
    </div>
  );
};
