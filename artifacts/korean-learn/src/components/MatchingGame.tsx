// ============================================================
// Ejercicio de Emparejar (Matching)
// ============================================================
import { useState, useEffect } from "react";
import type { MatchItem } from "@/data/modules";

interface MatchingGameProps {
  items: MatchItem[];
  onComplete: (allCorrect: boolean) => void;
}

interface Tile {
  id: string;
  text: string;
  side: "left" | "right";
  matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function MatchingGame({ items, onComplete }: MatchingGameProps) {
  const [leftTiles, setLeftTiles] = useState<Tile[]>([]);
  const [rightTiles, setRightTiles] = useState<Tile[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const lefts: Tile[] = shuffle(
      items.map((it) => ({ id: it.left, text: it.left, side: "left" as const, matched: false }))
    );
    const rights: Tile[] = shuffle(
      items.map((it) => ({ id: it.left, text: it.right, side: "right" as const, matched: false }))
    );
    setLeftTiles(lefts);
    setRightTiles(rights);
    setErrors(0);
    setCompleted(false);
  }, [items]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const matchItem = items.find((it) => it.left === selectedLeft);
      const correct = matchItem?.right === selectedRight;

      if (correct) {
        setLeftTiles((prev) =>
          prev.map((t) => (t.id === selectedLeft ? { ...t, matched: true } : t))
        );
        setRightTiles((prev) =>
          prev.map((t) => (t.id === selectedLeft ? { ...t, matched: true } : t))
        );
        setSelectedLeft(null);
        setSelectedRight(null);

        // Check all matched
        const allMatched =
          leftTiles.filter((t) => t.id !== selectedLeft).every((t) => t.matched) &&
          rightTiles.filter((t) => t.id !== selectedLeft).every((t) => t.matched);
        if (allMatched || leftTiles.filter((t) => !t.matched).length === 1) {
          setCompleted(true);
          onComplete(errors === 0);
        }
      } else {
        setWrongPair([selectedLeft, selectedRight]);
        setErrors((e) => e + 1);
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setWrongPair(null);
        }, 700);
      }
    }
  }, [selectedLeft, selectedRight]);

  function tileClass(tile: Tile, isSelected: boolean, isWrong: boolean): string {
    let base =
      "flex items-center justify-center rounded-2xl border-2 py-4 px-3 text-base font-semibold cursor-pointer transition-all duration-150 select-none korean-char ";
    if (tile.matched) {
      return base + "border-emerald-300 bg-emerald-50 text-emerald-700 opacity-60 cursor-default";
    }
    if (isWrong) return base + "border-red-400 bg-red-50 text-red-700 shake";
    if (isSelected) return base + "border-purple-500 bg-purple-50 text-purple-700 scale-105";
    return base + "border-border bg-white hover:border-purple-300 hover:bg-purple-50 active:scale-95";
  }

  if (completed) {
    return (
      <div className="text-center py-8 bounce-in">
        <div className="text-5xl mb-3">{errors === 0 ? "🏆" : "🎉"}</div>
        <p className="text-xl font-bold text-emerald-600">
          {errors === 0 ? "¡Perfecto! 0 errores" : `¡Completado! (${errors} error${errors !== 1 ? "es" : ""})`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground text-center">Toca una carta de cada columna para emparejarlas</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          {leftTiles.map((tile) => {
            const isSelected = selectedLeft === tile.id;
            const isWrong = wrongPair?.[0] === tile.id;
            return (
              <button
                key={tile.id}
                className={tileClass(tile, isSelected, !!isWrong)}
                onClick={() => !tile.matched && setSelectedLeft(tile.id)}
                disabled={tile.matched}
              >
                {tile.text}
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          {rightTiles.map((tile) => {
            const isSelected = selectedRight === tile.text;
            const isWrong = wrongPair?.[1] === tile.text;
            return (
              <button
                key={tile.id + "-right"}
                className={tileClass(tile, isSelected, !!isWrong)}
                onClick={() => !tile.matched && setSelectedRight(tile.text)}
                disabled={tile.matched}
              >
                {tile.text}
              </button>
            );
          })}
        </div>
      </div>
      {errors > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Errores: <span className="text-red-500 font-semibold">{errors}</span>
        </p>
      )}
    </div>
  );
}
