// ============================================================
// Ejercicio de Emparejar — estética coreana premium
// ============================================================
import { useState, useEffect } from "react";
import type { MatchItem } from "@/data/modules";

interface MatchingGameProps {
  items: MatchItem[];
  onComplete: (allCorrect: boolean) => void;
  accentColor?: string;
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

export function MatchingGame({ items, onComplete, accentColor = "#0D1B4B" }: MatchingGameProps) {
  const [leftTiles, setLeftTiles] = useState<Tile[]>([]);
  const [rightTiles, setRightTiles] = useState<Tile[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setLeftTiles(shuffle(items.map((it) => ({ id: it.left, text: it.left, side: "left" as const, matched: false }))));
    setRightTiles(shuffle(items.map((it) => ({ id: it.left, text: it.right, side: "right" as const, matched: false }))));
    setErrors(0);
    setCompleted(false);
  }, [items]);

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const matchItem = items.find((it) => it.left === selectedLeft);
      const correct = matchItem?.right === selectedRight;

      if (correct) {
        setLeftTiles((prev) => prev.map((t) => (t.id === selectedLeft ? { ...t, matched: true } : t)));
        setRightTiles((prev) => prev.map((t) => (t.id === selectedLeft ? { ...t, matched: true } : t)));
        setSelectedLeft(null);
        setSelectedRight(null);

        const remainingLeft = leftTiles.filter((t) => !t.matched && t.id !== selectedLeft);
        if (remainingLeft.length === 0) {
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

  if (completed) {
    return (
      <div className="text-center py-8 bounce-in">
        <div className="text-5xl mb-3">{errors === 0 ? "🏆" : "🎉"}</div>
        <p className="text-xl font-bold" style={{ color: errors === 0 ? "#1a6b3a" : accentColor }}>
          {errors === 0 ? "¡Perfecto! 0 errores" : `¡Completado! (${errors} error${errors !== 1 ? "es" : ""})`}
        </p>
      </div>
    );
  }

  function getTileStyle(tile: Tile, isSelected: boolean, isWrong: boolean) {
    if (tile.matched) {
      return {
        borderColor: "#22c55e",
        background: "#f0fdf4",
        color: "#16a34a",
        opacity: 0.7,
        cursor: "default" as const,
      };
    }
    if (isWrong) {
      return { borderColor: "#ef4444", background: "#fef2f2", color: "#dc2626" };
    }
    if (isSelected) {
      return { borderColor: accentColor, background: `${accentColor}12`, color: accentColor };
    }
    return { borderColor: "#e2e0dc", background: "white", color: "#0D1B4B" };
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400 text-center">Toca una carta de cada columna para emparejarlas</p>
      <div className="grid grid-cols-2 gap-3">
        {/* Columna izquierda */}
        <div className="space-y-2">
          {leftTiles.map((tile) => {
            const isSelected = selectedLeft === tile.id;
            const isWrong = wrongPair?.[0] === tile.id;
            const tStyle = getTileStyle(tile, isSelected, !!isWrong);
            return (
              <button
                key={tile.id}
                className={`w-full py-4 px-3 rounded-2xl border-2 text-base font-bold korean-char text-center transition-all duration-150
                  ${isWrong ? "shake" : ""}
                  ${isSelected ? "scale-105" : ""}
                  ${tile.matched ? "cursor-default" : "active:scale-97"}`}
                style={tStyle}
                onClick={() => !tile.matched && setSelectedLeft(tile.id)}
                disabled={tile.matched}
              >
                {tile.text}
              </button>
            );
          })}
        </div>
        {/* Columna derecha */}
        <div className="space-y-2">
          {rightTiles.map((tile) => {
            const isSelected = selectedRight === tile.text;
            const isWrong = wrongPair?.[1] === tile.text;
            const tStyle = getTileStyle(tile, isSelected, !!isWrong);
            return (
              <button
                key={tile.id + "-right"}
                className={`w-full py-4 px-3 rounded-2xl border-2 text-base font-bold text-center transition-all duration-150
                  ${isWrong ? "shake" : ""}
                  ${isSelected ? "scale-105" : ""}
                  ${tile.matched ? "cursor-default" : "active:scale-97"}`}
                style={tStyle}
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
        <p className="text-center text-sm text-gray-400">
          Errores: <span className="font-bold" style={{ color: "#C41E3A" }}>{errors}</span>
        </p>
      )}
    </div>
  );
}
