// ============================================================
// Ejercicio de Selección Múltiple
// ============================================================
import { useState } from "react";
import type { Exercise } from "@/data/modules";

interface MultipleChoiceProps {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

export function MultipleChoice({ exercise, onAnswer }: MultipleChoiceProps) {
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
      <p className="text-lg font-semibold text-foreground text-center leading-relaxed">
        {exercise.question}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {exercise.options?.map((opt) => {
          let btnClass =
            "w-full py-4 px-5 rounded-2xl border-2 text-base font-medium transition-all duration-150 cursor-pointer text-left korean-char ";

          if (!answered) {
            btnClass += "border-border bg-white hover:border-purple-400 hover:bg-purple-50 active:scale-95";
          } else if (opt.correct) {
            btnClass += "border-emerald-400 bg-emerald-50 text-emerald-700 ";
            if (selected === opt.text) btnClass += "bounce-in";
          } else if (selected === opt.text && !opt.correct) {
            btnClass += "border-red-400 bg-red-50 text-red-700 shake";
          } else {
            btnClass += "border-border bg-gray-50 text-muted-foreground opacity-60";
          }

          return (
            <button
              key={opt.text}
              className={btnClass}
              onClick={() => handleSelect(opt.text, opt.correct)}
              disabled={answered}
            >
              <span className="text-xl">{opt.text}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          className={`mt-4 p-4 rounded-2xl text-center font-semibold text-base pop-in ${
            exercise.options?.find((o) => o.text === selected)?.correct
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {exercise.options?.find((o) => o.text === selected)?.correct ? (
            <span>✅ ¡Correcto! Muy bien.</span>
          ) : (
            <span>
              ❌ Incorrecto. La respuesta era:{" "}
              <strong className="korean-char">{exercise.answer}</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
