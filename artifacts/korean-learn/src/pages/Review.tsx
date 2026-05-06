// ============================================================
// Página: Modo Repaso — Flashcards con estética coreana
// ============================================================
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { MODULES } from "@/data/modules";
import { SpeakButton } from "@/components/SpeakButton";
import logoUrl from "@/assets/logo.png";

interface ReviewCard {
  korean: string;
  romanization: string;
  meaning: string;
  moduleTitle: string;
  moduleColor: string;
}

const MODULE_COLORS = ["#0D1B4B", "#C41E3A", "#1a6b3a", "#B8910A", "#c2460a"];

function buildReviewCards(): ReviewCard[] {
  const cards: ReviewCard[] = [];
  MODULES.forEach((mod, idx) => {
    mod.lessons.forEach((lesson) => {
      lesson.content.forEach((item) => {
        cards.push({
          korean: item.korean,
          romanization: item.romanization,
          meaning: item.meaning,
          moduleTitle: mod.title,
          moduleColor: MODULE_COLORS[idx % MODULE_COLORS.length],
        });
      });
    });
  });
  return cards;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function Review() {
  const [, navigate] = useLocation();
  const allCards = useMemo(() => shuffle(buildReviewCards()), []);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [unknown, setUnknown] = useState(0);
  const [done, setDone] = useState(false);

  const card = allCards[idx];

  function handleKnown() { setKnown((k) => k + 1); next(); }
  function handleUnknown() { setUnknown((u) => u + 1); next(); }
  function next() {
    if (idx + 1 >= allCards.length) setDone(true);
    else { setIdx((i) => i + 1); setFlipped(false); }
  }

  if (done) {
    const total = known + unknown;
    const pct = total === 0 ? 0 : Math.round((known / total) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
        <div className="max-w-md w-full mx-4 k-card p-8 text-center bounce-in border border-[#0D1B4B]/10">
          <div className="text-6xl mb-4">{pct >= 80 ? "🏆" : pct >= 50 ? "🎉" : "💪"}</div>
          <h2 className="text-2xl font-bold text-[#0D1B4B] mb-2">¡Repaso completado!</h2>
          <p className="text-gray-500 mb-6">Recordaste {known} de {total} tarjetas</p>

          {/* Score ring */}
          <div className="relative w-28 h-28 mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0D1B4B" strokeWidth="8"
                strokeLinecap="round" strokeDasharray={`${pct * 2.51} 251`}
                className="transition-all duration-700" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black text-[#0D1B4B]">{pct}%</span>
            </div>
          </div>

          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-500">{known}</p>
              <p className="text-xs text-gray-400">Lo sabía ✓</p>
            </div>
            <div className="w-px bg-gray-100" />
            <div className="text-center">
              <p className="text-2xl font-black text-[#C41E3A]">{unknown}</p>
              <p className="text-xs text-gray-400">A repasar ✗</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => { setIdx(0); setFlipped(false); setKnown(0); setUnknown(0); setDone(false); }}
              className="w-full py-3.5 rounded-2xl font-bold text-white transition-all active:scale-97"
              style={{ background: "linear-gradient(135deg, #0D1B4B, #1a2d6b)" }}
            >
              🔄 Repetir repaso
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3.5 border-2 border-[#0D1B4B]/15 text-[#0D1B4B] font-semibold rounded-2xl hover:bg-[#eef1ff] transition-all active:scale-97"
            >
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPct = Math.round((idx / allCards.length) * 100);

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>
      {/* Header */}
      <div className="korean-header text-white pt-8 pb-10 px-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-5 transition-colors text-sm font-medium"
          >
            ← Inicio
          </button>
          <div className="flex items-center gap-4">
            <img src={logoUrl} alt="Logo" className="w-11 h-11 rounded-full border-2 border-white/20" />
            <div>
              <h1 className="text-xl font-bold">🔄 Modo Repaso</h1>
              <p className="text-white/60 text-sm">Tarjeta {idx + 1} de {allCards.length}</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #C41E3A, #B8910A)" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="dancheong-divider" />

      <div className="max-w-md mx-auto px-4 py-6">
        <p className="text-sm text-gray-400 text-center mb-4">
          Toca la tarjeta para ver la respuesta
        </p>

        {/* Flashcard */}
        <button
          onClick={() => setFlipped((f) => !f)}
          className="w-full k-card min-h-56 p-8 text-center flex flex-col items-center justify-center gap-3 border-2 transition-all active:scale-98"
          style={{ borderColor: `${card.moduleColor}25` }}
        >
          {!flipped ? (
            <>
              <p
                className="text-6xl korean-char font-black"
                style={{ color: card.moduleColor }}
              >
                {card.korean}
              </p>
              <p className="text-sm text-gray-300 italic mt-2">Toca para revelar →</p>
            </>
          ) : (
            <div className="space-y-3 pop-in w-full">
              <p
                className="text-5xl korean-char font-black"
                style={{ color: card.moduleColor }}
              >
                {card.korean}
              </p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-base font-bold text-gray-500">{card.romanization}</p>
                <SpeakButton text={card.korean} size="sm" />
              </div>
              <p className="text-xl font-bold text-[#0D1B4B]">{card.meaning}</p>
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white"
                style={{ background: card.moduleColor }}
              >
                {card.moduleTitle}
              </span>
            </div>
          )}
        </button>

        {/* Botones after flip */}
        {flipped && (
          <div className="grid grid-cols-2 gap-3 mt-4 pop-in">
            <button
              onClick={handleUnknown}
              className="py-4 rounded-2xl font-bold text-[#C41E3A] bg-[#fff0f2] border-2 border-[#C41E3A]/25 hover:bg-[#C41E3A]/10 transition-all active:scale-97 text-base"
            >
              ✗ No lo sabía
            </button>
            <button
              onClick={handleKnown}
              className="py-4 rounded-2xl font-bold text-emerald-600 bg-emerald-50 border-2 border-emerald-200 hover:bg-emerald-100 transition-all active:scale-97 text-base"
            >
              ✓ Lo sabía
            </button>
          </div>
        )}

        {/* Estadísticas en vivo */}
        <div className="flex justify-center gap-8 mt-5 text-sm">
          <span className="font-bold text-emerald-500">✓ {known} sabidas</span>
          <span className="font-bold text-[#C41E3A]">✗ {unknown} por repasar</span>
        </div>
      </div>
    </div>
  );
}
