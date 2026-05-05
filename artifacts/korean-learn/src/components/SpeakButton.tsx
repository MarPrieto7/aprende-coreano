// Botón para pronunciar texto en coreano usando la API del navegador
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

  const sizeClass = size === "sm" ? "text-lg p-1.5" : size === "lg" ? "text-3xl p-3" : "text-xl p-2";

  return (
    <button
      onClick={handleSpeak}
      title="Escuchar pronunciación"
      className={`${sizeClass} rounded-full transition-all duration-150 ${
        speaking
          ? "bg-purple-100 text-purple-600 scale-110"
          : "bg-gray-100 hover:bg-purple-100 hover:text-purple-600 text-gray-500 active:scale-95"
      }`}
    >
      {speaking ? "🔊" : "🔈"}
    </button>
  );
}
