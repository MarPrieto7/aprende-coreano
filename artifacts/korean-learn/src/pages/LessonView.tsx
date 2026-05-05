// ============================================================
// Página: Vista de Lección — contenido + ejercicios
// ============================================================
import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { MODULES, MODULE_COLORS } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";
import { MultipleChoice } from "@/components/MultipleChoice";
import { MatchingGame } from "@/components/MatchingGame";
import { SpeakButton } from "@/components/SpeakButton";
import { ProgressBar } from "@/components/ProgressBar";

type Phase = "learn" | "exercises" | "result";

export function LessonView() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const [, navigate] = useLocation();
  const { updateLessonProgress, getLessonProgress } = useProgress();

  const mod = MODULES.find((m) => m.id === moduleId);
  const lesson = mod?.lessons.find((l) => l.id === lessonId);

  const [phase, setPhase] = useState<Phase>("learn");
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [currentAnswered, setCurrentAnswered] = useState(false);
  const [currentCorrect, setCurrentCorrect] = useState<boolean | null>(null);
  const [matchCompleted, setMatchCompleted] = useState(false);

  if (!mod || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold">Lección no encontrada</p>
          <button onClick={() => navigate("/")} className="mt-4 text-purple-600 underline">Volver</button>
        </div>
      </div>
    );
  }

  const colors = MODULE_COLORS[mod.color];
  const exercises = lesson.exercises;
  const currentExercise = exercises[exerciseIdx];
  const prevProgress = getLessonProgress(mod.id, lesson.id);

  // ---- LEARN PHASE ----
  if (phase === "learn") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(`/module/${mod.id}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            ← {mod.title}
          </button>

          <div className={`${colors.light} border-2 ${colors.border} rounded-3xl p-5 mb-6`}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              Módulo {mod.number} · Lección
            </p>
            <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
            {lesson.subtitle && (
              <p className="text-muted-foreground mt-1 text-sm">{lesson.subtitle}</p>
            )}
          </div>

          <div className="space-y-3 mb-8">
            {lesson.content.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-border shadow-sm flex items-start gap-4"
              >
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className={`text-3xl korean-char ${colors.text} font-bold`}>
                    {item.korean}
                  </span>
                  <SpeakButton text={item.korean} size="sm" />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${colors.text} text-sm`}>{item.romanization}</p>
                  <p className="text-foreground font-medium">{item.meaning}</p>
                  {item.example && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="korean-char text-muted-foreground text-sm">{item.example}</span>
                      <span className="text-muted-foreground text-xs">→ {item.exampleMeaning}</span>
                      <SpeakButton text={item.example} size="sm" />
                    </div>
                  )}
                  {item.note && (
                    <p className="text-xs text-muted-foreground mt-1 italic">💡 {item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase("exercises")}
            className={`w-full py-4 ${colors.bg} hover:opacity-90 text-white text-lg font-bold rounded-2xl transition-all active:scale-95 shadow-sm`}
          >
            ¡Practicar ahora! →
          </button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            {exercises.length} ejercicio{exercises.length !== 1 ? "s" : ""} en esta lección
          </p>
        </div>
      </div>
    );
  }

  // ---- RESULT PHASE ----
  if (phase === "result") {
    const correct = answers.filter(Boolean).length;
    const total = answers.length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= 60;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-3xl p-8 border border-border shadow-sm text-center bounce-in">
            <div className="text-6xl mb-4">{score === 100 ? "🏆" : passed ? "🎉" : "😅"}</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {score === 100 ? "¡Perfecto!" : passed ? "¡Bien hecho!" : "Sigue practicando"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {correct} de {total} correctas
            </p>

            <div className="mb-6">
              <ProgressBar percentage={score} color={passed ? "bg-emerald-500" : "bg-orange-400"} height="h-4" />
              <p className={`mt-2 text-2xl font-bold ${passed ? "text-emerald-600" : "text-orange-500"}`}>
                {score}%
              </p>
            </div>

            {!passed && (
              <p className="text-sm text-muted-foreground mb-4">
                Necesitas al menos 60% para completar la lección. ¡Tú puedes!
              </p>
            )}

            <div className="space-y-3">
              <button
                onClick={() => {
                  updateLessonProgress(mod.id, lesson.id, score);
                  navigate(`/module/${mod.id}`);
                }}
                className={`w-full py-3.5 ${colors.bg} text-white font-bold rounded-2xl hover:opacity-90 transition-all active:scale-95`}
              >
                {passed ? "✓ Guardar y continuar" : "Volver al módulo"}
              </button>
              <button
                onClick={() => {
                  setPhase("exercises");
                  setExerciseIdx(0);
                  setAnswers([]);
                  setCurrentAnswered(false);
                  setCurrentCorrect(null);
                  setMatchCompleted(false);
                }}
                className="w-full py-3.5 border-2 border-border text-foreground font-semibold rounded-2xl hover:bg-muted transition-all active:scale-95"
              >
                🔄 Repetir ejercicios
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- EXERCISE PHASE ----
  const progress = Math.round((exerciseIdx / exercises.length) * 100);

  function handleMCAnswer(correct: boolean) {
    setCurrentAnswered(true);
    setCurrentCorrect(correct);
  }

  function handleMatchComplete(allCorrect: boolean) {
    setMatchCompleted(true);
    setCurrentAnswered(true);
    setCurrentCorrect(allCorrect);
  }

  function goNext() {
    const newAnswers = [...answers, currentCorrect ?? false];
    if (exerciseIdx + 1 >= exercises.length) {
      setAnswers(newAnswers);
      setPhase("result");
    } else {
      setAnswers(newAnswers);
      setExerciseIdx((i) => i + 1);
      setCurrentAnswered(false);
      setCurrentCorrect(null);
      setMatchCompleted(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(`/module/${mod.id}`)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
          <div className="flex-1">
            <ProgressBar percentage={progress} color={colors.bg} height="h-2" />
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {exerciseIdx + 1}/{exercises.length}
          </span>
        </div>

        {/* Exercise card */}
        <div className="bg-white rounded-3xl p-6 border border-border shadow-sm min-h-64">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.light} ${colors.text}`}>
              {currentExercise.type === "multiple-choice" ? "Selección múltiple" : "Emparejar"}
            </span>
          </div>

          {currentExercise.type === "multiple-choice" && (
            <MultipleChoice
              exercise={currentExercise}
              onAnswer={handleMCAnswer}
            />
          )}

          {currentExercise.type === "matching" && currentExercise.items && (
            <div>
              <p className="text-lg font-semibold text-foreground text-center mb-4">
                Empareja cada elemento con su significado
              </p>
              <MatchingGame
                items={currentExercise.items}
                onComplete={handleMatchComplete}
              />
            </div>
          )}
        </div>

        {/* Next button */}
        {(currentAnswered || matchCompleted) && (
          <div className="mt-4 pop-in">
            <button
              onClick={goNext}
              className={`w-full py-4 ${colors.bg} hover:opacity-90 text-white text-base font-bold rounded-2xl transition-all active:scale-95`}
            >
              {exerciseIdx + 1 >= exercises.length ? "Ver resultado →" : "Siguiente →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
