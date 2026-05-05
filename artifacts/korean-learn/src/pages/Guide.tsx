// ============================================================
// Página: Guía Inicial — Diseño coreano premium
// ============================================================
import { useLocation } from "wouter";
import logoUrl from "@/assets/logo.png";

export function Guide() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* Header navy */}
      <div className="korean-header text-white pt-8 pb-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-5 transition-colors text-sm font-medium"
          >
            ← Volver al inicio
          </button>
          <div className="flex items-center gap-4">
            <img src={logoUrl} alt="Logo" className="w-14 h-14 rounded-full border-2 border-white/20 shadow-lg" />
            <div>
              <h1 className="text-2xl font-bold">¿Qué es el coreano?</h1>
              <p className="text-white/60 text-sm mt-0.5">Guía para principiantes absolutos</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dancheong-divider" />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Tarjeta 1 */}
        <div className="k-card p-6 border border-[#0D1B4B]/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🌏</span>
            <h2 className="text-lg font-bold text-[#0D1B4B]">El idioma coreano</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            El coreano (<span className="korean-char font-bold text-[#C41E3A]">한국어</span>, <em>Hangugeo</em>) es el
            idioma oficial de Corea del Sur y Corea del Norte. Lo hablan más de{" "}
            <strong className="text-[#0D1B4B]">80 millones de personas</strong> en todo el mundo.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            Es famoso gracias al <strong>K-Pop</strong>, los <strong>doramas</strong> (series coreanas),
            el <strong>cine</strong> (como «Parasite» y «Squid Game») y la cultura coreana en general.
          </p>
        </div>

        {/* Tarjeta 2 — Hangul */}
        <div className="k-card p-6 border border-[#C41E3A]/15">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🔤</span>
            <h2 className="text-lg font-bold text-[#C41E3A]">El Hangul — el alfabeto coreano</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            El coreano usa su propio alfabeto llamado <strong className="text-[#0D1B4B]">Hangul (한글)</strong>.
            Fue creado en 1443 por el rey Sejong el Grande para que todos pudieran aprender a leer y escribir.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            Solo tiene <strong>24 letras básicas</strong> (14 consonantes + 10 vocales) que se combinan en bloques cuadrados. ¡Puedes aprenderlo en pocos días!
          </p>
          <div className="mt-4 rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, #0D1B4B, #1a2d6b)" }}>
            <p className="text-4xl korean-char font-black text-white tracking-widest mb-2">한 글</p>
            <p className="text-white/60 text-sm">han + geul → Hangul</p>
            <p className="text-white/40 text-xs mt-1">Consonante + vocal = bloque sílaba</p>
          </div>
        </div>

        {/* Tarjeta 3 — Datos curiosos */}
        <div className="k-card p-6 border border-[#B8910A]/15">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📊</span>
            <h2 className="text-lg font-bold text-[#B8910A]">Datos curiosos</h2>
          </div>
          <div className="space-y-3">
            {[
              { icon: "⏱️", text: "En pocos días puedes aprender a leer el Hangul. El alfabeto es muy lógico y fonético." },
              { icon: "🔄", text: "El orden de las frases es diferente: en español «Yo como arroz», en coreano «Yo arroz como» (SOV)." },
              { icon: "🎭", text: "Tiene niveles de cortesía — hablas diferente con tu jefe que con tus amigos." },
              { icon: "🔢", text: "Hay dos sistemas de números: el nativo coreano y el sino-coreano (de origen chino)." },
              { icon: "🇰🇷", text: "La bandera de Corea tiene el Taeguk (태극), símbolo del equilibrio, rodeado de trigramas." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-[#fffbeb]/70">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <span className="text-gray-600 leading-relaxed text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tarjeta 4 — Estructura del curso */}
        <div className="k-card p-6 border border-[#0D1B4B]/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🗺️</span>
            <h2 className="text-lg font-bold text-[#0D1B4B]">Cómo está organizada esta app</h2>
          </div>
          <div className="space-y-3">
            {[
              { num: "1", title: "Hangul — El alfabeto", desc: "Vocales, consonantes y reconocimiento visual.", color: "#0D1B4B" },
              { num: "2", title: "Sílabas", desc: "Cómo se combinan las letras en bloques.", color: "#C41E3A" },
              { num: "3", title: "Palabras básicas", desc: "Saludos, números y objetos cotidianos.", color: "#1a6b3a" },
              { num: "4", title: "Frases simples", desc: "Preséntate y exprésate en situaciones reales.", color: "#B8910A" },
            ].map((m) => (
              <div key={m.num} className="flex gap-3 items-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                  style={{ background: m.color }}
                >
                  {m.num}
                </div>
                <div>
                  <p className="font-bold text-[#0D1B4B] text-sm">{m.title}</p>
                  <p className="text-xs text-gray-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all active:scale-97"
          style={{
            background: "linear-gradient(135deg, #0D1B4B, #1a2d6b)",
            boxShadow: "0 4px 20px rgba(13,27,75,0.3)",
          }}
        >
          ¡Empezar a aprender! →
        </button>
      </div>
    </div>
  );
}
