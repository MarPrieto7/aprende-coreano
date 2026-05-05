// ============================================================
// Ejercicio de Selección Múltiple — estética coreana
// ============================================================
import { useState } from "react";
import type { Exercise } from "@/data/modules";

interface MultipleChoiceProps {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
  accentColor?: string;
}

export function MultipleChoice({ exercise, onAnswer, accentColor = "#0D1B4B" }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  function handleSelect(text: string, correct: boolean) {
    if (answered) return;
    setSelected(text);
    setAnswered(true);
    onAnswer(correct);
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold text-[#0D1B4B] text-center leading-relaxed korean-char">
        {exercise.question}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {exercise.options?.map((opt) => {
          let extraClass = "";
          let borderColor = "#e2e0dc";
          let bgColor = "white";
          let textColor = "#0D1B4B";

          if (answered) {
            if (opt.correct) {
              borderColor = "#22c55e";
              bgColor = "#f0fdf4";
              textColor = "#16a34a";
              if (selected === opt.text) extraClass = "bounce-in";
            } else if (selected === opt.text && !opt.correct) {
              borderColor = "#ef4444";
              bgColor = "#fef2f2";
              textColor = "#dc2626";
              extraClass = "shake";
            } else {
              bgColor = "#fafafa";
              textColor = "#9ca3af";
            }
          }

          return (
            <button
              key={opt.text}
              className={`exercise-option ${extraClass}`}
              style={{
                borderColor,
                background: bgColor,
                color: textColor,
                opacity: answered && !opt.correct && selected !== opt.text ? 0.55 : 1,
              }}
              onMouseEnter={(e) => {
                if (!answered) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = accentColor;
                  (e.currentTarget as HTMLButtonElement).style.background = `${accentColor}10`;
                }
              }}
              onMouseLeave={(e) => {
                if (!answered) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = borderColor;
                  (e.currentTarget as HTMLButtonElement).style.background = bgColor;
                }
              }}
              onClick={() => handleSelect(opt.text, opt.correct)}
              disabled={answered}
            >
              <span className="text-xl korean-char">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className="mt-4 p-4 rounded-2xl text-center font-semibold text-sm pop-in border"
          style={
            exercise.options?.find((o) => o.text === selected)?.correct
              ? { background: "#f0fdf4", color: "#16a34a", borderColor: "#bbf7d0" }
              : { background: "#fef2f2", color: "#dc2626", borderColor: "#fecaca" }
          }
        >
          {exercise.options?.find((o) => o.text === selected)?.correct ? (
            <span>✅ ¡Correcto! Muy bien.</span>
          ) : (
            <span>
              ❌ Incorrecto. La respuesta correcta era:{" "}
              <strong className="korean-char">{exercise.answer}</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
