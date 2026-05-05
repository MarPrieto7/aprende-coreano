// ============================================================
// Página: Vista del Módulo — lista de lecciones
// ============================================================
import { useLocation, useParams } from "wouter";
import { MODULES, MODULE_COLORS } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "@/components/ProgressBar";

export function ModuleView() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { progress } = useProgress();

  const mod = MODULES.find((m) => m.id === id);
  if (!mod) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold">Módulo no encontrado</p>
          <button onClick={() => navigate("/")} className="mt-4 text-purple-600 underline">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const colors = MODULE_COLORS[mod.color];
  const modProgress = progress.modules[mod.id];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          ← Volver al inicio
        </button>

        {/* Module header */}
        <div className={`${colors.light} border-2 ${colors.border} rounded-3xl p-6 mb-6`}>
          <div className="flex items-center gap-4 mb-3">
            <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center text-3xl`}>
              {mod.emoji}
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Módulo {mod.number}
              </p>
              <h1 className="text-xl font-bold text-foreground">{mod.title}</h1>
            </div>
          </div>
          <p className="text-muted-foreground">{mod.description}</p>
        </div>

        {/* Lessons list */}
        <h2 className="text-lg font-bold text-foreground mb-3">Lecciones</h2>
        <div className="space-y-3">
          {mod.lessons.map((lesson, idx) => {
            const lp = modProgress?.lessons[lesson.id];
            const isCompleted = lp?.completed;
            const score = lp?.score;
            const attempts = lp?.attempts ?? 0;
            const isLocked = idx > 0 && !modProgress?.lessons[mod.lessons[idx - 1].id]?.completed;

            return (
              <button
                key={lesson.id}
                onClick={() => !isLocked && navigate(`/module/${mod.id}/lesson/${lesson.id}`)}
                disabled={isLocked}
                className={`w-full bg-white rounded-2xl p-5 border-2 text-left transition-all
                  ${isLocked
                    ? "border-border opacity-50 cursor-not-allowed"
                    : `${colors.border} card-hover shadow-sm hover:shadow-md`
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0
                      ${isCompleted ? "bg-emerald-100" : isLocked ? "bg-gray-100" : `${colors.light}`}`}
                  >
                    {isLocked ? "🔒" : isCompleted ? "✅" : `${idx + 1}`}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{lesson.title}</p>
                    {lesson.subtitle && (
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{lesson.subtitle}</p>
                    )}
                    {isCompleted && score !== undefined && (
                      <div className="mt-2">
                        <ProgressBar percentage={score} color={colors.bg} height="h-1.5" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Puntuación: {score}% · {attempts} intento{attempts !== 1 ? "s" : ""}
                        </p>
                      </div>
                    )}
                    {!isCompleted && attempts > 0 && (
                      <p className="text-xs text-orange-500 mt-1 font-medium">
                        Intenta de nuevo para completar ({attempts} intento{attempts !== 1 ? "s" : ""})
                      </p>
                    )}
                  </div>
                  {!isLocked && (
                    <span className={`${colors.text} text-lg flex-shrink-0`}>→</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Module completed banner */}
        {modProgress?.completed && (
          <div className="mt-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 text-center pop-in">
            <div className="text-4xl mb-2">🏆</div>
            <p className="font-bold text-emerald-700 text-lg">¡Módulo completado!</p>
            <p className="text-emerald-600 text-sm mt-1">Has terminado todas las lecciones de este módulo.</p>
          </div>
        )}
      </div>
    </div>
  );
}
