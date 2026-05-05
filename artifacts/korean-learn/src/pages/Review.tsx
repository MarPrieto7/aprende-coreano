// ============================================================
// Página: Modo Repaso — repasa todo el vocabulario aprendido
// ============================================================
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { MODULES } from "@/data/modules";
import { SpeakButton } from "@/components/SpeakButton";

interface ReviewCard {
  korean: string;
  romanization: string;
  meaning: string;
  moduleTitle: string;
}

function buildReviewCards(): ReviewCard[] {
  const cards: ReviewCard[] = [];
  MODULES.forEach((mod) => {
    mod.lessons.forEach((lesson) => {
      lesson.content.forEach((item) => {
        cards.push({
          korean: item.korean,
          romanization: item.romanization,
          meaning: item.meaning,
          moduleTitle: mod.title,
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

  function handleKnown() {
    setKnown((k) => k + 1);
    next();
  }

  function handleUnknown() {
    setUnknown((u) => u + 1);
    next();
  }

  function next() {
    if (idx + 1 >= allCards.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setFlipped(false);
    }
  }

  if (done) {
    const total = known + unknown;
    const pct = total === 0 ? 0 : Math.round((known / total) * 100);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white rounded-3xl p-8 border border-border shadow-sm text-center bounce-in">
          <div className="text-6xl mb-4">{pct >= 80 ? "🏆" : pct >= 50 ? "🎉" : "💪"}</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">¡Repaso completado!</h2>
          <p className="text-muted-foreground mb-6">
            Recordaste {known} de {total} tarjetas ({pct}%)
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-500">{known}</p>
              <p className="text-xs text-muted-foreground">Lo sabía ✓</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-400">{unknown}</p>
              <p className="text-xs text-muted-foreground">A repasar ✗</p>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => {
                setIdx(0);
                setFlipped(false);
                setKnown(0);
                setUnknown(0);
                setDone(false);
              }}
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all active:scale-95"
            >
              🔄 Repetir repaso
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3.5 border-2 border-border text-foreground font-semibold rounded-2xl hover:bg-muted transition-all active:scale-95"
            >
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Inicio
          </button>
          <div className="text-sm text-muted-foreground">
            {idx + 1} / {allCards.length}
          </div>
        </div>

        <h1 className="text-xl font-bold text-foreground text-center mb-2">🔄 Modo Repaso</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Toca la tarjeta para ver la respuesta
        </p>

        {/* Flashcard */}
        <button
          onClick={() => setFlipped((f) => !f)}
          className="w-full min-h-64 bg-white rounded-3xl border-2 border-border shadow-sm p-8 text-center flex flex-col items-center justify-center gap-4 card-hover transition-all active:scale-95"
        >
          {!flipped ? (
            <>
              <p className="text-5xl korean-char font-bold text-purple-600">{card.korean}</p>
              <p className="text-sm text-muted-foreground italic mt-2">Toca para revelar</p>
            </>
          ) : (
            <div className="space-y-3 pop-in w-full">
              <p className="text-4xl korean-char font-bold text-purple-600">{card.korean}</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-lg text-blue-500 font-medium">{card.romanization}</p>
                <SpeakButton text={card.korean} size="sm" />
              </div>
              <p className="text-xl font-semibold text-foreground">{card.meaning}</p>
              <p className="text-xs text-muted-foreground bg-muted rounded-full px-3 py-1 inline-block">
                {card.moduleTitle}
              </p>
            </div>
          )}
        </button>

        {/* Action buttons (only after flipping) */}
        {flipped && (
          <div className="grid grid-cols-2 gap-3 mt-4 pop-in">
            <button
              onClick={handleUnknown}
              className="py-4 border-2 border-orange-200 bg-orange-50 text-orange-600 font-bold rounded-2xl hover:bg-orange-100 transition-all active:scale-95 text-base"
            >
              ✗ No lo sabía
            </button>
            <button
              onClick={handleKnown}
              className="py-4 border-2 border-emerald-200 bg-emerald-50 text-emerald-600 font-bold rounded-2xl hover:bg-emerald-100 transition-all active:scale-95 text-base"
            >
              ✓ Lo sabía
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <span className="text-emerald-500 font-semibold">✓ {known}</span>
          <span className="text-orange-400 font-semibold">✗ {unknown}</span>
        </div>
      </div>
    </div>
  );
}
