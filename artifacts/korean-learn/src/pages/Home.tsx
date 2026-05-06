// ============================================================
// Página: Home / Dashboard — Diseño con estética coreana
// ============================================================
import { useLocation } from "wouter";
import { MODULES } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "@/components/ProgressBar";
import logoUrl from "@/assets/logo.png";

const MODULE_STYLES = [
  { gradient: "from-[#0D1B4B] to-[#1a2d6b]", light: "bg-[#eef1ff]", text: "text-[#0D1B4B]", border: "border-[#0D1B4B]/20", dot: "bg-[#0D1B4B]" },
  { gradient: "from-[#C41E3A] to-[#a51830]", light: "bg-[#fff0f2]", text: "text-[#C41E3A]", border: "border-[#C41E3A]/20", dot: "bg-[#C41E3A]" },
  { gradient: "from-[#1a6b3a] to-[#145c30]", light: "bg-[#f0fdf4]", text: "text-[#1a6b3a]", border: "border-[#1a6b3a]/20", dot: "bg-[#1a6b3a]" },
  { gradient: "from-[#B8910A] to-[#9a7808]", light: "bg-[#fffbeb]", text: "text-[#B8910A]", border: "border-[#B8910A]/20", dot: "bg-[#B8910A]" },
  { gradient: "from-[#c2460a] to-[#a83808]", light: "bg-[#fff7ed]", text: "text-[#c2460a]", border: "border-[#c2460a]/20", dot: "bg-[#c2460a]" },
  { gradient: "from-[#6d28d9] to-[#5b21b6]", light: "bg-[#f5f3ff]", text: "text-[#6d28d9]", border: "border-[#6d28d9]/20", dot: "bg-[#6d28d9]" },
];

export function Home() {
  const [, navigate] = useLocation();
  const { progress, getOverallProgress } = useProgress();
  const overall = getOverallProgress();

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* ── Hero Header ── */}
      <div className="korean-header text-white pb-10 pt-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <img
            src={logoUrl}
            alt="Aprende Coreano"
            className="w-20 h-20 mx-auto mb-4 rounded-full shadow-lg border-2 border-white/20"
          />
          <h1 className="text-3xl font-bold tracking-tight">한국어 배우기</h1>
          <p className="text-base text-white/70 mt-1 font-medium">Aprende Coreano desde Cero</p>

          {/* Barra de progreso global */}
          {overall > 0 && (
            <div className="mt-5 max-w-sm mx-auto">
              <div className="flex justify-between text-xs text-white/60 mb-1.5">
                <span>Tu progreso</span>
                <span className="font-bold text-white">{overall}%</span>
              </div>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${overall}%`,
                    background: "linear-gradient(90deg, #C41E3A, #B8910A)",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Separador decorativo 단청 */}
      <div className="dancheong-divider" />

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { value: `${overall}%`, label: "Avance", icon: "📈", color: "text-[#0D1B4B]" },
            { value: `${progress.streak ?? 0}🔥`, label: "Racha", icon: "", color: "text-[#C41E3A]" },
            { value: `${progress.totalXP ?? 0}`, label: "Puntos XP", icon: "⭐", color: "text-[#B8910A]" },
          ].map((s, i) => (
            <div key={i} className="k-card p-4 text-center">
              <p className={`text-xl font-black ${s.color} korean-char`}>{s.value}</p>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Guía inicial ── */}
        <button
          onClick={() => navigate("/guide")}
          className="w-full mb-6 rounded-2xl border-2 border-[#0D1B4B]/15 p-4 flex items-center gap-4 bg-white hover:bg-[#eef1ff] transition-all text-left group"
          style={{ boxShadow: "0 2px 12px rgba(13,27,75,0.08)" }}
        >
          <div className="w-12 h-12 rounded-xl bg-[#0D1B4B] flex items-center justify-center text-2xl flex-shrink-0">
            📖
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#0D1B4B]">¿Qué es el coreano?</p>
            <p className="text-sm text-gray-500">Guía inicial para principiantes absolutos</p>
          </div>
          <span className="text-[#0D1B4B]/40 group-hover:text-[#0D1B4B] transition-colors text-lg">→</span>
        </button>

        {/* ── Módulos ── */}
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-base font-bold text-[#0D1B4B] uppercase tracking-widest">Módulos</h2>
          <div className="flex-1 h-px bg-[#0D1B4B]/10" />
        </div>

        <div className="space-y-3 mb-6">
          {MODULES.map((mod, idx) => {
            const style = MODULE_STYLES[idx % MODULE_STYLES.length];
            const modData = progress.modules[mod.id];
            const completedLessons = modData
              ? Object.values(modData.lessons).filter((l) => l.completed).length
              : 0;
            const totalLessons = mod.lessons.length;
            const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            const isCompleted = completedLessons === totalLessons && totalLessons > 0;

            return (
              <button
                key={mod.id}
                onClick={() => navigate(`/module/${mod.id}`)}
                className={`w-full k-card p-5 text-left border-2 ${style.border} group`}
              >
                <div className="flex items-center gap-4">
                  {/* Ícono del módulo */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}>
                    {isCompleted ? "✅" : mod.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`module-badge ${style.light} ${style.text}`}>
                        Módulo {mod.number}
                      </span>
                      {isCompleted && (
                        <span className="module-badge bg-emerald-100 text-emerald-700">
                          ✓ Completado
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-[#0D1B4B] text-base leading-tight">{mod.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5 leading-snug">{mod.description}</p>

                    {completedLessons > 0 && (
                      <div className="mt-2">
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${style.gradient} transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">{completedLessons}/{totalLessons} lecciones</p>
                      </div>
                    )}
                  </div>

                  <span className="text-gray-300 group-hover:text-[#0D1B4B] transition-colors text-lg flex-shrink-0">→</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Modo Repaso ── */}
        {overall > 0 && (
          <button
            onClick={() => navigate("/review")}
            className="w-full py-4 rounded-2xl font-bold text-base text-white mb-4 transition-all active:scale-97"
            style={{
              background: "linear-gradient(135deg, #C41E3A 0%, #B8910A 100%)",
              boxShadow: "0 4px 16px rgba(196,30,58,0.35)",
            }}
          >
            🔄 Modo Repaso — Repasa todo el vocabulario
          </button>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-2">
          한국어 배우기 · Tu progreso se guarda automáticamente
        </p>
      </div>
    </div>
  );
}
