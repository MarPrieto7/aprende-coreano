// ============================================================
// Pronunciación — Usa la API de síntesis de voz del navegador
// para pronunciar palabras en coreano (sin archivos ni backend)
// ============================================================

export function speak(text: string) {
  if (!window.speechSynthesis) return;

  // Cancelar cualquier pronunciación en curso
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  // Intentar usar una voz coreana si está disponible
  const voices = window.speechSynthesis.getVoices();
  const koreanVoice = voices.find(
    (v) => v.lang === "ko-KR" || v.lang === "ko"
  );
  if (koreanVoice) {
    utterance.voice = koreanVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function isSpeechAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
