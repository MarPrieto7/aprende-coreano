// ============================================================
// Página: Home / Dashboard
// ============================================================
import { useLocation } from "wouter";
import { MODULES, MODULE_COLORS } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "@/components/ProgressBar";

export function Home() {
  const [, navigate] = useLocation();
  const { progress, getOverallProgress, getModuleProgress } = useProgress();

  const overall = getOverallProgress();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🇰🇷</div>
          <h1 className="text-3xl font-bold text-foreground">Aprende Coreano</h1>
          <p className="text-muted-foreground mt-1">Desde cero, paso a paso</p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-border text-center shadow-sm">
            <p className="text-2xl font-bold text-purple-600">{overall}%</p>
            <p className="text-xs text-muted-foreground mt-0.5">Avance total</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-border text-center shadow-sm">
            <p className="text-2xl font-bold text-orange-500">{progress.streak ?? 0} 🔥</p>
            <p className="text-xs text-muted-foreground mt-0.5">Días seguidos</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-border text-center shadow-sm">
            <p className="text-2xl font-bold text-emerald-500">{progress.totalXP ?? 0}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Puntos XP</p>
          </div>
        </div>

        {/* Overall progress bar */}
        {overall > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-border mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-foreground">Progreso del curso</p>
              <p className="text-sm text-purple-600 font-semibold">{overall}%</p>
            </div>
            <ProgressBar percentage={overall} color="bg-purple-500" height="h-2.5" />
          </div>
        )}

        {/* Guide Banner */}
        <button
          onClick={() => navigate("/guide")}
          className="w-full mb-6 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-2xl p-4 flex items-center gap-4 hover:from-purple-200 hover:to-blue-200 transition-all text-left card-hover shadow-sm"
        >
          <span className="text-3xl">📖</span>
          <div>
            <p className="font-semibold text-foreground">¿Qué es el coreano?</p>
            <p className="text-sm text-muted-foreground">Guía inicial para principiantes absolutos</p>
          </div>
          <span className="ml-auto text-muted-foreground text-lg">→</span>
        </button>

        {/* Modules */}
        <h2 className="text-lg font-bold text-foreground mb-3">Módulos de aprendizaje</h2>
        <div className="space-y-3 mb-6">
          {MODULES.map((mod) => {
            const colors = MODULE_COLORS[mod.color];
            const modProg = getModuleProgress(mod.id);
            const totalLessons = mod.lessons.length;
            const completedLessons = progress.modules[mod.id]
              ? Object.values(progress.modules[mod.id].lessons).filter((l) => l.completed).length
              : 0;
            const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            const isCompleted = completedLessons === totalLessons && completedLessons > 0;

            return (
              <button
                key={mod.id}
                onClick={() => navigate(`/module/${mod.id}`)}
                className={`w-full bg-white rounded-2xl p-5 border-2 ${colors.border} shadow-sm text-left card-hover transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${colors.bg} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`}>
                    {isCompleted ? "✅" : mod.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Módulo {mod.number}
                      </span>
                      {isCompleted && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                          Completado
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-foreground">{mod.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{mod.description}</p>
                    {completedLessons > 0 && (
                      <div className="mt-2">
                        <ProgressBar
                          percentage={percent}
                          color={colors.bg}
                          height="h-1.5"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {completedLessons}/{totalLessons} lecciones
                        </p>
                      </div>
                    )}
                  </div>
                  <span className="text-muted-foreground text-lg flex-shrink-0">→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Review button */}
        {overall > 0 && (
          <button
            onClick={() => navigate("/review")}
            className="w-full py-4 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold text-base rounded-2xl transition-all active:scale-95 shadow-sm mb-3"
          >
            🔄 Modo Repaso
          </button>
        )}

        <p className="text-center text-xs text-muted-foreground mt-4">
          Tu progreso se guarda automáticamente en este navegador
        </p>
      </div>
    </div>
  );
}
