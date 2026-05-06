// ============================================================
// Página: Vista de Lección — estética coreana premium
// ============================================================
import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { MODULES } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";
import { MultipleChoice } from "@/components/MultipleChoice";
import { MatchingGame } from "@/components/MatchingGame";
import { SpeakButton } from "@/components/SpeakButton";

type Phase = "learn" | "exercises" | "result";

const MODULE_STYLES = [
  { gradient: "from-[#0D1B4B] to-[#1a2d6b]", light: "bg-[#eef1ff]", text: "text-[#0D1B4B]", barColor: "#0D1B4B", btn: "bg-[#0D1B4B] hover:bg-[#1a2d6b]" },
  { gradient: "from-[#C41E3A] to-[#a51830]", light: "bg-[#fff0f2]", text: "text-[#C41E3A]", barColor: "#C41E3A", btn: "bg-[#C41E3A] hover:bg-[#a51830]" },
  { gradient: "from-[#1a6b3a] to-[#145c30]", light: "bg-[#f0fdf4]", text: "text-[#1a6b3a]", barColor: "#1a6b3a", btn: "bg-[#1a6b3a] hover:bg-[#145c30]" },
  { gradient: "from-[#B8910A] to-[#9a7808]", light: "bg-[#fffbeb]", text: "text-[#B8910A]", barColor: "#B8910A", btn: "bg-[#B8910A] hover:bg-[#9a7808]" },
  { gradient: "from-[#c2460a] to-[#a83808]", light: "bg-[#fff7ed]", text: "text-[#c2460a]", barColor: "#c2460a", btn: "bg-[#c2460a] hover:bg-[#a83808]" },
];

export function LessonView() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const [, navigate] = useLocation();
  const { updateLessonProgress, getLessonProgress } = useProgress();

  const modIdx = MODULES.findIndex((m) => m.id === moduleId);
  const mod = MODULES[modIdx];
  const lesson = mod?.lessons.find((l) => l.id === lessonId);

  const [phase, setPhase] = useState<Phase>("learn");
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [currentAnswered, setCurrentAnswered] = useState(false);
  const [currentCorrect, setCurrentCorrect] = useState<boolean | null>(null);
  const [matchCompleted, setMatchCompleted] = useState(false);

  if (!mod || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
        <div className="text-center">
          <p className="text-xl font-bold text-[#0D1B4B]">Lección no encontrada</p>
          <button onClick={() => navigate("/")} className="mt-4 text-[#C41E3A] underline">Volver</button>
        </div>
      </div>
    );
  }

  const style = MODULE_STYLES[modIdx % MODULE_STYLES.length];
  const exercises = lesson.exercises;
  const currentExercise = exercises[exerciseIdx];

  // ── LEARN PHASE ──
  if (phase === "learn") {
    return (
      <div className="min-h-screen" style={{ background: "#FAF7F2" }}>
        {/* Header */}
        <div className="korean-header text-white pt-8 pb-10 px-4">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => navigate(`/module/${mod.id}`)}
              className="flex items-center gap-2 text-white/60 hover:text-white mb-5 transition-colors text-sm font-medium"
            >
              ← {mod.title}
            </button>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-2xl border-2 border-white/20`}>
                {mod.emoji}
              </div>
              <div>
                <span className={`module-badge ${style.light} ${style.text} inline-block mb-1`}>
                  Módulo {mod.number}
                </span>
                <h1 className="text-xl font-bold text-white">{lesson.title}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="dancheong-divider" />

        <div className="max-w-2xl mx-auto px-4 py-6">
          {lesson.subtitle && (
            <p className="text-gray-500 text-sm mb-4 text-center">{lesson.subtitle}</p>
          )}

          <div className="space-y-3 mb-6">
            {lesson.content.map((item, i) => (
              <div key={i} className="k-card p-4 border border-[#0D1B4B]/08 flex items-start gap-4 fade-up"
                style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                  <span className={`text-3xl korean-char font-black ${style.text}`}>
                    {item.korean}
                  </span>
                  <SpeakButton text={item.korean} size="sm" />
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold uppercase tracking-wider ${style.text} mb-0.5`}>{item.romanization}</p>
                  <p className="text-[#0D1B4B] font-semibold">{item.meaning}</p>
                  {item.example && (
                    <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                      <span className="korean-char text-gray-500 text-sm">{item.example}</span>
                      <span className="text-gray-400 text-xs">→ {item.exampleMeaning}</span>
                      <SpeakButton text={item.example} size="sm" />
                    </div>
                  )}
                  {item.note && (
                    <p className="text-xs text-gray-400 mt-1 italic">💡 {item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase("exercises")}
            className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all active:scale-97"
            style={{
              background: `linear-gradient(135deg, ${style.barColor}, ${style.barColor}cc)`,
              boxShadow: `0 4px 20px ${style.barColor}44`,
            }}
          >
            ¡Practicar ahora! →
          </button>
          <p className="text-center text-xs text-gray-400 mt-2">
            {exercises.length} ejercicio{exercises.length !== 1 ? "s" : ""} en esta lección
          </p>
        </div>
      </div>
    );
  }

  // ── RESULT PHASE ──
  if (phase === "result") {
    const correct = answers.filter(Boolean).length;
    const total = answers.length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= 60;

    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
        <div className="max-w-md w-full mx-4">
          <div className="k-card p-8 text-center bounce-in border border-[#0D1B4B]/10">
            <div className="text-6xl mb-4">{score === 100 ? "🏆" : passed ? "🎉" : "😅"}</div>
            <h2 className="text-2xl font-bold text-[#0D1B4B] mb-1">
              {score === 100 ? "¡Perfecto!" : passed ? "¡Bien hecho!" : "Sigue practicando"}
            </h2>
            <p className="text-gray-500 mb-6">{correct} de {total} correctas</p>

            {/* Score ring */}
            <div className="relative w-28 h-28 mx-auto mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={passed ? "#22c55e" : "#f59e0b"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${score * 2.51} 251`}
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-black ${passed ? "text-emerald-600" : "text-amber-500"}`}>
                  {score}%
                </span>
              </div>
            </div>

            {!passed && (
              <p className="text-sm text-gray-500 mb-4">
                Necesitas al menos 60% para completar. ¡Tú puedes!
              </p>
            )}

            <div className="space-y-3">
              <button
                onClick={() => {
                  updateLessonProgress(mod.id, lesson.id, score);
                  navigate(`/module/${mod.id}`);
                }}
                className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-97"
                style={{ background: `linear-gradient(135deg, #0D1B4B, #1a2d6b)` }}
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
                className="w-full py-3.5 border-2 border-[#0D1B4B]/15 text-[#0D1B4B] font-semibold rounded-2xl hover:bg-[#eef1ff] transition-all active:scale-97"
              >
                🔄 Repetir ejercicios
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── EXERCISE PHASE ──
  const progressPct = Math.round((exerciseIdx / exercises.length) * 100);

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
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Progress header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(`/module/${mod.id}`)}
            className="text-gray-400 hover:text-[#0D1B4B] transition-colors text-xl w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
          <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: `linear-gradient(90deg, ${style.barColor}, ${style.barColor}99)` }}
            />
          </div>
          <span className="text-sm font-bold text-[#0D1B4B] whitespace-nowrap">
            {exerciseIdx + 1}/{exercises.length}
          </span>
        </div>

        {/* Exercise card */}
        <div className="k-card p-6 border border-[#0D1B4B]/08 min-h-64">
          <div className="flex items-center gap-2 mb-4">
            <span className={`module-badge ${style.light} ${style.text}`}>
              {currentExercise.type === "multiple-choice" ? "Selección múltiple" : "Emparejar"}
            </span>
          </div>

          {currentExercise.type === "multiple-choice" && (
            <MultipleChoice
              exercise={currentExercise}
              onAnswer={handleMCAnswer}
              accentColor={style.barColor}
            />
          )}

          {currentExercise.type === "matching" && currentExercise.items && (
            <div>
              <p className="text-base font-bold text-[#0D1B4B] text-center mb-4">
                Empareja cada elemento con su significado
              </p>
              <MatchingGame
                items={currentExercise.items}
                onComplete={handleMatchComplete}
                accentColor={style.barColor}
              />
            </div>
          )}
        </div>

        {(currentAnswered || matchCompleted) && (
          <div className="mt-4 pop-in">
            <button
              onClick={goNext}
              className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all active:scale-97"
              style={{
                background: `linear-gradient(135deg, ${style.barColor}, ${style.barColor}cc)`,
                boxShadow: `0 4px 16px ${style.barColor}44`,
              }}
            >
              {exerciseIdx + 1 >= exercises.length ? "Ver resultado →" : "Siguiente →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
