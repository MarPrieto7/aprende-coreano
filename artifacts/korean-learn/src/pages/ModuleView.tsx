// ============================================================
// Página: Vista del Módulo — estética coreana premium
// ============================================================
import { useLocation, useParams } from "wouter";
import { MODULES } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";
import logoUrl from "@/assets/logo.png";

const MODULE_STYLES = [
  { gradient: "from-[#0D1B4B] to-[#1a2d6b]", light: "bg-[#eef1ff]", text: "text-[#0D1B4B]", border: "border-[#0D1B4B]/20", barColor: "#0D1B4B" },
  { gradient: "from-[#C41E3A] to-[#a51830]", light: "bg-[#fff0f2]", text: "text-[#C41E3A]", border: "border-[#C41E3A]/20", barColor: "#C41E3A" },
  { gradient: "from-[#1a6b3a] to-[#145c30]", light: "bg-[#f0fdf4]", text: "text-[#1a6b3a]", border: "border-[#1a6b3a]/20", barColor: "#1a6b3a" },
  { gradient: "from-[#B8910A] to-[#9a7808]", light: "bg-[#fffbeb]", text: "text-[#B8910A]", border: "border-[#B8910A]/20", barColor: "#B8910A" },
];

export function ModuleView() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { progress } = useProgress();

  const modIdx = MODULES.findIndex((m) => m.id === id);
  const mod = MODULES[modIdx];
  if (!mod) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
        <div className="text-center">
          <p className="text-xl font-bold text-[#0D1B4B]">Módulo no encontrado</p>
          <button onClick={() => navigate("/")} className="mt-4 text-[#C41E3A] underline">Volver al inicio</button>
        </div>
      </div>
    );
  }

  const style = MODULE_STYLES[modIdx % MODULE_STYLES.length];
  const modProgress = progress.modules[mod.id];

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* Header */}
      <div className="korean-header text-white pt-8 pb-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-5 transition-colors text-sm font-medium"
          >
            ← Inicio
          </button>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-3xl shadow-lg border-2 border-white/20`}>
              {mod.emoji}
            </div>
            <div>
              <span className={`module-badge ${style.light} ${style.text} mb-2 inline-block`}>
                Módulo {mod.number}
              </span>
              <h1 className="text-xl font-bold text-white">{mod.title}</h1>
              <p className="text-white/60 text-sm mt-0.5">{mod.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dancheong-divider" />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-base font-bold text-[#0D1B4B] uppercase tracking-widest">Lecciones</h2>
          <div className="flex-1 h-px bg-[#0D1B4B]/10" />
        </div>

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
                className={`w-full k-card p-5 text-left border-2 transition-all
                  ${isLocked ? "opacity-50 cursor-not-allowed border-gray-100" : `${style.border} group`}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 font-bold
                      ${isCompleted
                        ? "bg-emerald-100 text-emerald-600"
                        : isLocked
                        ? "bg-gray-100 text-gray-400"
                        : `${style.light} ${style.text}`
                      }`}
                  >
                    {isLocked ? "🔒" : isCompleted ? "✅" : idx + 1}
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-[#0D1B4B]">{lesson.title}</p>
                    {lesson.subtitle && (
                      <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{lesson.subtitle}</p>
                    )}
                    {isCompleted && score !== undefined && (
                      <div className="mt-2">
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${score}%`, background: style.barColor }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {score}% · {attempts} intento{attempts !== 1 ? "s" : ""}
                        </p>
                      </div>
                    )}
                    {!isCompleted && attempts > 0 && (
                      <p className="text-xs text-[#C41E3A] mt-1 font-medium">
                        Intenta de nuevo para completar ({attempts} intento{attempts !== 1 ? "s" : ""})
                      </p>
                    )}
                  </div>

                  {!isLocked && (
                    <span className="text-gray-300 group-hover:text-[#0D1B4B] transition-colors text-lg flex-shrink-0">→</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Módulo completado */}
        {modProgress?.completed && (
          <div
            className="mt-6 rounded-2xl p-6 text-center bounce-in text-white"
            style={{ background: "linear-gradient(135deg, #1a6b3a, #145c30)" }}
          >
            <div className="text-4xl mb-2">🏆</div>
            <p className="font-bold text-lg">¡Módulo completado!</p>
            <p className="text-white/70 text-sm mt-1">Has terminado todas las lecciones de este módulo.</p>
          </div>
        )}
      </div>
    </div>
  );
}
