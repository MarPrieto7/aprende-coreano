// ============================================================
// Página: Guía Inicial — ¿Qué es el coreano?
// ============================================================
import { useLocation } from "wouter";

export function Guide() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          ← Volver al inicio
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🇰🇷</div>
          <h1 className="text-3xl font-bold text-foreground">¿Qué es el coreano?</h1>
          <p className="text-muted-foreground mt-2">Todo lo que necesitas saber antes de empezar</p>
        </div>

        <div className="space-y-5">
          {/* Sección 1 */}
          <section className="bg-white rounded-3xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-bold text-purple-600 mb-3">🌏 El idioma coreano</h2>
            <p className="text-foreground leading-relaxed">
              El coreano (한국어, <em>Hangugeo</em>) es el idioma oficial de Corea del Sur y Corea del Norte.
              Lo hablan más de <strong>80 millones de personas</strong> en todo el mundo.
            </p>
            <p className="text-foreground leading-relaxed mt-3">
              Es famoso gracias al <strong>K-Pop</strong>, los <strong>doramas</strong> (series coreanas),
              el <strong>cine</strong> (como "Parasite") y la <strong>cultura coreana</strong> en general.
            </p>
          </section>

          {/* Sección 2 */}
          <section className="bg-white rounded-3xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-bold text-blue-500 mb-3">🔤 El Hangul — el alfabeto coreano</h2>
            <p className="text-foreground leading-relaxed">
              El coreano tiene su propio alfabeto llamado <strong>Hangul (한글)</strong>.
              Fue creado en 1443 por el rey Sejong para que todos pudieran aprender a leer y escribir.
            </p>
            <p className="text-foreground leading-relaxed mt-3">
              El Hangul tiene solo <strong>24 letras básicas</strong> (14 consonantes + 10 vocales)
              que se combinan para formar bloques o sílabas. ¡En pocos días puedes aprender a leerlo!
            </p>
            <div className="mt-4 p-4 bg-purple-50 rounded-2xl">
              <p className="text-center text-3xl korean-char tracking-widest text-purple-700">
                한글 → han + geul
              </p>
              <p className="text-center text-sm text-purple-500 mt-1">
                Así se combina: letra + letra = bloque de sílaba
              </p>
            </div>
          </section>

          {/* Sección 3 */}
          <section className="bg-white rounded-3xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-bold text-emerald-600 mb-3">📊 Datos curiosos</h2>
            <ul className="space-y-3">
              {[
                { icon: "⏱️", text: "Según la FSI, para un hablante de inglés toma ~2,200 horas aprenderlo a nivel avanzado. Para hispanohablantes puede ser similar." },
                { icon: "🔄", text: "El orden de las palabras es diferente: en español decimos 'Yo como arroz', en coreano es 'Yo arroz como' (sujeto + objeto + verbo)." },
                { icon: "🎭", text: "El coreano tiene niveles de cortesía — hablas diferente con tu jefe que con tus amigos." },
                { icon: "🔢", text: "Tiene dos sistemas de números: uno nativo coreano y otro de origen chino (sino-coreano)." },
                { icon: "✍️", text: "No hay espacios entre letras dentro de una palabra, pero sí entre palabras." },
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="text-foreground leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Sección 4 */}
          <section className="bg-white rounded-3xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-bold text-pink-500 mb-3">💡 ¿Cómo está organizada esta app?</h2>
            <div className="space-y-3">
              {[
                { num: "1", title: "Hangul — El alfabeto", desc: "Aprende las vocales y consonantes. La base de todo." },
                { num: "2", title: "Sílabas", desc: "Entiende cómo se combinan las letras en bloques." },
                { num: "3", title: "Palabras básicas", desc: "Saludos, números y objetos cotidianos." },
                { num: "4", title: "Frases simples", desc: "Empieza a hablar y comunicarte." },
              ].map((m) => (
                <div key={m.num} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    {m.num}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{m.title}</p>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold rounded-2xl transition-colors active:scale-95"
          >
            ¡Empezar a aprender! →
          </button>
        </div>
      </div>
    </div>
  );
}
