// Botón de pronunciación coreana — usa la API del navegador
import { useState } from "react";
import { speak, isSpeechAvailable } from "@/lib/speech";

interface SpeakButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
}

export function SpeakButton({ text, size = "md" }: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  if (!isSpeechAvailable()) return null;

  function handleSpeak() {
    setSpeaking(true);
    speak(text);
    setTimeout(() => setSpeaking(false), 1200);
  }

  const sizeClass =
    size === "sm" ? "text-base p-1.5 w-7 h-7" :
    size === "lg" ? "text-2xl p-3 w-11 h-11" :
    "text-lg p-2 w-9 h-9";

  return (
    <button
      onClick={handleSpeak}
      title="Escuchar pronunciación"
      className={`${sizeClass} rounded-full flex items-center justify-center transition-all duration-150 flex-shrink-0
        ${speaking
          ? "bg-[#0D1B4B]/10 text-[#0D1B4B] scale-110"
          : "bg-gray-100 hover:bg-[#0D1B4B]/10 hover:text-[#0D1B4B] text-gray-400 active:scale-95"
        }`}
    >
      {speaking ? "🔊" : "🔈"}
    </button>
  );
}
