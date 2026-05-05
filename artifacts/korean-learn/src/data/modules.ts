// ============================================================
// DATOS EDUCATIVOS — Todo el contenido del curso de coreano
// ============================================================

export type ExerciseType = "multiple-choice" | "matching";

export interface Lesson {
  id: string;
  title: string;
  subtitle?: string;
  content: LessonItem[];
  exercises: Exercise[];
}

export interface LessonItem {
  korean: string;
  romanization: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  note?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question?: string;
  items?: MatchItem[];   // for matching
  options?: MCOption[];  // for multiple-choice
  answer?: string;       // for multiple-choice
}

export interface MatchItem {
  left: string;
  right: string;
}

export interface MCOption {
  text: string;
  correct: boolean;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  emoji: string;
  color: string;
  lessons: Lesson[];
}

// ============================================================
// MÓDULO 1 — Introducción al Hangul
// ============================================================
const module1: Module = {
  id: "hangul",
  number: 1,
  title: "El Alfabeto Coreano (Hangul)",
  description: "Aprende las letras básicas del coreano. ¡No necesitas saber nada previo!",
  emoji: "🔤",
  color: "purple",
  lessons: [
    {
      id: "vowels",
      title: "Vocales Básicas",
      subtitle: "El coreano tiene 10 vocales simples. Aquí están las más importantes:",
      content: [
        { korean: "ㅏ", romanization: "a", meaning: "Como la 'a' en español", example: "아빠", exampleMeaning: "papá" },
        { korean: "ㅓ", romanization: "eo", meaning: "Como la 'o' pero con la boca más abierta", example: "어머니", exampleMeaning: "madre" },
        { korean: "ㅗ", romanization: "o", meaning: "Como la 'o' en español", example: "오빠", exampleMeaning: "hermano mayor (de mujer)" },
        { korean: "ㅜ", romanization: "u", meaning: "Como la 'u' en español", example: "우유", exampleMeaning: "leche" },
        { korean: "ㅡ", romanization: "eu", meaning: "Como la 'i' pero sin mover los labios", example: "으음", exampleMeaning: "hmm..." },
        { korean: "ㅣ", romanization: "i", meaning: "Como la 'i' en español", example: "이", exampleMeaning: "este/esta" },
        { korean: "ㅐ", romanization: "ae", meaning: "Como la 'e' abierta", example: "개", exampleMeaning: "perro" },
        { korean: "ㅔ", romanization: "e", meaning: "Como la 'e' en español", example: "네", exampleMeaning: "sí" },
        { korean: "ㅑ", romanization: "ya", meaning: "Como 'ya' en español", example: "야", exampleMeaning: "¡oye!" },
        { korean: "ㅛ", romanization: "yo", meaning: "Como 'yo' en español", example: "요", exampleMeaning: "(partícula de cortesía)" },
      ],
      exercises: [
        {
          id: "v-mc-1",
          type: "multiple-choice",
          question: "¿Cuál es la vocal coreana que suena como la 'a' en español?",
          options: [
            { text: "ㅜ", correct: false },
            { text: "ㅏ", correct: true },
            { text: "ㅡ", correct: false },
            { text: "ㅔ", correct: false },
          ],
          answer: "ㅏ",
        },
        {
          id: "v-mc-2",
          type: "multiple-choice",
          question: "¿Cómo se pronuncia ㅣ?",
          options: [
            { text: "o", correct: false },
            { text: "u", correct: false },
            { text: "i", correct: true },
            { text: "ae", correct: false },
          ],
          answer: "i",
        },
        {
          id: "v-mc-3",
          type: "multiple-choice",
          question: "¿Cuál de estas vocales suena como 'u'?",
          options: [
            { text: "ㅗ", correct: false },
            { text: "ㅏ", correct: false },
            { text: "ㅜ", correct: true },
            { text: "ㅐ", correct: false },
          ],
          answer: "ㅜ",
        },
        {
          id: "v-match-1",
          type: "matching",
          items: [
            { left: "ㅏ", right: "a" },
            { left: "ㅗ", right: "o" },
            { left: "ㅣ", right: "i" },
            { left: "ㅜ", right: "u" },
          ],
        },
      ],
    },
    {
      id: "consonants",
      title: "Consonantes Básicas",
      subtitle: "El coreano tiene 14 consonantes básicas. Aquí están las principales:",
      content: [
        { korean: "ㄱ", romanization: "g / k", meaning: "Como 'g' o 'k' según la posición", example: "가방", exampleMeaning: "bolso" },
        { korean: "ㄴ", romanization: "n", meaning: "Como la 'n' en español", example: "나", exampleMeaning: "yo" },
        { korean: "ㄷ", romanization: "d / t", meaning: "Como 'd' o 't' según la posición", example: "다", exampleMeaning: "todo" },
        { korean: "ㄹ", romanization: "r / l", meaning: "Mezcla de 'r' y 'l'", example: "라면", exampleMeaning: "ramen" },
        { korean: "ㅁ", romanization: "m", meaning: "Como la 'm' en español", example: "마음", exampleMeaning: "corazón" },
        { korean: "ㅂ", romanization: "b / p", meaning: "Como 'b' o 'p' según la posición", example: "바나나", exampleMeaning: "banana" },
        { korean: "ㅅ", romanization: "s", meaning: "Como la 's' en español", example: "사과", exampleMeaning: "manzana" },
        { korean: "ㅇ", romanization: "ng / silente", meaning: "Al inicio no suena, al final suena como 'ng'", note: "Siempre aparece en las sílabas — es el 'comodín' del Hangul", example: "아이", exampleMeaning: "niño" },
        { korean: "ㅈ", romanization: "j", meaning: "Como la 'y' argentina o 'j' suave", example: "자다", exampleMeaning: "dormir" },
        { korean: "ㅎ", romanization: "h", meaning: "Como la 'j' suave en español", example: "하늘", exampleMeaning: "cielo" },
      ],
      exercises: [
        {
          id: "c-mc-1",
          type: "multiple-choice",
          question: "¿Cuál consonante suena como la 'm' en español?",
          options: [
            { text: "ㄴ", correct: false },
            { text: "ㅁ", correct: true },
            { text: "ㅂ", correct: false },
            { text: "ㄹ", correct: false },
          ],
          answer: "ㅁ",
        },
        {
          id: "c-mc-2",
          type: "multiple-choice",
          question: "¿Cómo se pronuncia ㅎ?",
          options: [
            { text: "n", correct: false },
            { text: "s", correct: false },
            { text: "j", correct: false },
            { text: "h", correct: true },
          ],
          answer: "h",
        },
        {
          id: "c-mc-3",
          type: "multiple-choice",
          question: "¿Qué consonante especial es silenciosa al inicio de una sílaba?",
          options: [
            { text: "ㄱ", correct: false },
            { text: "ㄷ", correct: false },
            { text: "ㅇ", correct: true },
            { text: "ㅅ", correct: false },
          ],
          answer: "ㅇ",
        },
        {
          id: "c-match-1",
          type: "matching",
          items: [
            { left: "ㄴ", right: "n" },
            { left: "ㅅ", right: "s" },
            { left: "ㅁ", right: "m" },
            { left: "ㅎ", right: "h" },
          ],
        },
      ],
    },
    {
      id: "recognition",
      title: "Reconocimiento Visual",
      subtitle: "¡Pon a prueba lo que aprendiste! Identifica letras del Hangul:",
      content: [
        { korean: "ㄱ+ㅏ = 가", romanization: "ga", meaning: "sílaba 'ga'", note: "En coreano, las letras se combinan en bloques cuadrados" },
        { korean: "ㄴ+ㅏ = 나", romanization: "na", meaning: "yo (informal)", note: "Consonante + vocal = bloque sílaba" },
        { korean: "ㄷ+ㅏ = 다", romanization: "da", meaning: "todo", note: "Cada bloque es una sílaba completa" },
        { korean: "ㅇ+ㅏ = 아", romanization: "a", meaning: "¡Oh! / exclamación", note: "ㅇ al inicio es silencioso, solo 'suena' la vocal" },
      ],
      exercises: [
        {
          id: "r-mc-1",
          type: "multiple-choice",
          question: "¿Cómo se lee '나'?",
          options: [
            { text: "ga", correct: false },
            { text: "na", correct: true },
            { text: "da", correct: false },
            { text: "ma", correct: false },
          ],
          answer: "na",
        },
        {
          id: "r-mc-2",
          type: "multiple-choice",
          question: "¿Cómo se lee '가'?",
          options: [
            { text: "na", correct: false },
            { text: "ha", correct: false },
            { text: "ga", correct: true },
            { text: "sa", correct: false },
          ],
          answer: "ga",
        },
        {
          id: "r-match-1",
          type: "matching",
          items: [
            { left: "가", right: "ga" },
            { left: "나", right: "na" },
            { left: "다", right: "da" },
            { left: "아", right: "a" },
          ],
        },
      ],
    },
  ],
};

// ============================================================
// MÓDULO 2 — Sílabas
// ============================================================
const module2: Module = {
  id: "syllables",
  number: 2,
  title: "Cómo Formar Sílabas",
  description: "Las letras coreanas se combinan en bloques. ¡Aprende el secreto del Hangul!",
  emoji: "🧩",
  color: "blue",
  lessons: [
    {
      id: "syllable-basics",
      title: "La Estructura de la Sílaba",
      subtitle: "Cada sílaba coreana sigue uno de estos patrones:",
      content: [
        { korean: "아", romanization: "a", meaning: "Solo vocal (ㅇ silencioso + ㅏ)", note: "Patrón: ㅇ+vocal" },
        { korean: "나", romanization: "na", meaning: "Consonante + vocal", note: "Patrón: consonante + vocal" },
        { korean: "밥", romanization: "bap", meaning: "arroz / comida", note: "Patrón: consonante + vocal + consonante final (받침)" },
        { korean: "한", romanization: "han", meaning: "corea / uno", note: "ㅎ+ㅏ+ㄴ = 한" },
        { korean: "국", romanization: "guk", meaning: "sopa / país", note: "ㄱ+ㅜ+ㄱ = 국" },
      ],
      exercises: [
        {
          id: "sb-mc-1",
          type: "multiple-choice",
          question: "¿Qué significa '밥' (bap)?",
          options: [
            { text: "agua", correct: false },
            { text: "arroz / comida", correct: true },
            { text: "casa", correct: false },
            { text: "persona", correct: false },
          ],
          answer: "arroz / comida",
        },
        {
          id: "sb-mc-2",
          type: "multiple-choice",
          question: "¿Cuántas letras tiene la sílaba '한'?",
          options: [
            { text: "1", correct: false },
            { text: "2", correct: false },
            { text: "3", correct: true },
            { text: "4", correct: false },
          ],
          answer: "3",
        },
        {
          id: "sb-match-1",
          type: "matching",
          items: [
            { left: "아", right: "a" },
            { left: "나", right: "na" },
            { left: "밥", right: "bap" },
            { left: "한", right: "han" },
          ],
        },
      ],
    },
    {
      id: "syllable-examples",
      title: "Sílabas Comunes",
      subtitle: "Practica leyendo estas combinaciones de sílabas:",
      content: [
        { korean: "한국", romanization: "Hanguk", meaning: "Corea", note: "한(han) + 국(guk)" },
        { korean: "사람", romanization: "saram", meaning: "persona", note: "사(sa) + 람(ram)" },
        { korean: "물", romanization: "mul", meaning: "agua", note: "Una sola sílaba con vocal ㅜ" },
        { korean: "밥", romanization: "bap", meaning: "arroz / comida" },
        { korean: "집", romanization: "jip", meaning: "casa" },
        { korean: "학교", romanization: "hakkyo", meaning: "escuela", note: "학(hak) + 교(kyo)" },
        { korean: "책", romanization: "chaek", meaning: "libro" },
        { korean: "사랑", romanization: "sarang", meaning: "amor", note: "¡La palabra más famosa del coreano!" },
      ],
      exercises: [
        {
          id: "se-mc-1",
          type: "multiple-choice",
          question: "¿Cómo se dice 'agua' en coreano?",
          options: [
            { text: "밥", correct: false },
            { text: "집", correct: false },
            { text: "물", correct: true },
            { text: "책", correct: false },
          ],
          answer: "물",
        },
        {
          id: "se-mc-2",
          type: "multiple-choice",
          question: "¿Qué significa '사랑'?",
          options: [
            { text: "escuela", correct: false },
            { text: "persona", correct: false },
            { text: "libro", correct: false },
            { text: "amor", correct: true },
          ],
          answer: "amor",
        },
        {
          id: "se-mc-3",
          type: "multiple-choice",
          question: "¿Cómo se dice 'casa' en coreano?",
          options: [
            { text: "물", correct: false },
            { text: "집", correct: true },
            { text: "책", correct: false },
            { text: "밥", correct: false },
          ],
          answer: "집",
        },
        {
          id: "se-match-1",
          type: "matching",
          items: [
            { left: "사람", right: "persona" },
            { left: "물", right: "agua" },
            { left: "집", right: "casa" },
            { left: "사랑", right: "amor" },
          ],
        },
      ],
    },
  ],
};

// ============================================================
// MÓDULO 3 — Palabras Básicas
// ============================================================
const module3: Module = {
  id: "vocabulary",
  number: 3,
  title: "Palabras Básicas",
  description: "Saludos, números y objetos cotidianos para tu primer vocabulario coreano.",
  emoji: "📚",
  color: "green",
  lessons: [
    {
      id: "greetings",
      title: "Saludos y Expresiones",
      subtitle: "Las palabras más importantes para comenzar una conversación:",
      content: [
        { korean: "안녕하세요", romanization: "Annyeonghaseyo", meaning: "Hola (formal)", note: "Úsalo con adultos o personas que no conoces bien" },
        { korean: "안녕", romanization: "Annyeong", meaning: "Hola / Adiós (informal)", note: "Solo con amigos o personas jóvenes" },
        { korean: "감사합니다", romanization: "Gamsahamnida", meaning: "Gracias (formal)" },
        { korean: "고마워", romanization: "Gomawo", meaning: "Gracias (informal)" },
        { korean: "괜찮아요", romanization: "Gwaenchanayo", meaning: "Está bien / No hay problema" },
        { korean: "네", romanization: "Ne", meaning: "Sí" },
        { korean: "아니요", romanization: "Aniyo", meaning: "No" },
        { korean: "미안해요", romanization: "Mianhaeyo", meaning: "Lo siento (formal)" },
        { korean: "잠깐만요", romanization: "Jamkkanmanyo", meaning: "Un momento, por favor" },
        { korean: "이름이 뭐예요?", romanization: "Ireumi mwoyeyo?", meaning: "¿Cómo te llamas?" },
      ],
      exercises: [
        {
          id: "g-mc-1",
          type: "multiple-choice",
          question: "¿Cómo se dice 'Hola' (formal) en coreano?",
          options: [
            { text: "감사합니다", correct: false },
            { text: "안녕하세요", correct: true },
            { text: "괜찮아요", correct: false },
            { text: "미안해요", correct: false },
          ],
          answer: "안녕하세요",
        },
        {
          id: "g-mc-2",
          type: "multiple-choice",
          question: "¿Qué significa '네'?",
          options: [
            { text: "No", correct: false },
            { text: "Gracias", correct: false },
            { text: "Sí", correct: true },
            { text: "Hola", correct: false },
          ],
          answer: "Sí",
        },
        {
          id: "g-mc-3",
          type: "multiple-choice",
          question: "¿Qué significa '감사합니다'?",
          options: [
            { text: "Lo siento", correct: false },
            { text: "Gracias", correct: true },
            { text: "De nada", correct: false },
            { text: "Hola", correct: false },
          ],
          answer: "Gracias",
        },
        {
          id: "g-match-1",
          type: "matching",
          items: [
            { left: "안녕하세요", right: "Hola (formal)" },
            { left: "감사합니다", right: "Gracias" },
            { left: "네", right: "Sí" },
            { left: "아니요", right: "No" },
          ],
        },
      ],
    },
    {
      id: "numbers",
      title: "Números en Coreano",
      subtitle: "El coreano tiene DOS sistemas de números. Aquí el sistema nativo (sino-coreano):",
      content: [
        { korean: "일 (1)", romanization: "il", meaning: "Uno", note: "Sistema sino-coreano (usado para fechas, dinero, pisos)" },
        { korean: "이 (2)", romanization: "i", meaning: "Dos" },
        { korean: "삼 (3)", romanization: "sam", meaning: "Tres" },
        { korean: "사 (4)", romanization: "sa", meaning: "Cuatro" },
        { korean: "오 (5)", romanization: "o", meaning: "Cinco" },
        { korean: "육 (6)", romanization: "yuk", meaning: "Seis" },
        { korean: "칠 (7)", romanization: "chil", meaning: "Siete" },
        { korean: "팔 (8)", romanization: "pal", meaning: "Ocho" },
        { korean: "구 (9)", romanization: "gu", meaning: "Nueve" },
        { korean: "십 (10)", romanization: "sip", meaning: "Diez" },
      ],
      exercises: [
        {
          id: "n-mc-1",
          type: "multiple-choice",
          question: "¿Cómo se dice '3' en coreano?",
          options: [
            { text: "이", correct: false },
            { text: "사", correct: false },
            { text: "삼", correct: true },
            { text: "오", correct: false },
          ],
          answer: "삼",
        },
        {
          id: "n-mc-2",
          type: "multiple-choice",
          question: "¿Qué número es '오'?",
          options: [
            { text: "4", correct: false },
            { text: "5", correct: true },
            { text: "6", correct: false },
            { text: "7", correct: false },
          ],
          answer: "5",
        },
        {
          id: "n-mc-3",
          type: "multiple-choice",
          question: "¿Cómo se dice '10' en coreano?",
          options: [
            { text: "팔", correct: false },
            { text: "구", correct: false },
            { text: "칠", correct: false },
            { text: "십", correct: true },
          ],
          answer: "십",
        },
        {
          id: "n-match-1",
          type: "matching",
          items: [
            { left: "일", right: "1" },
            { left: "삼", right: "3" },
            { left: "오", right: "5" },
            { left: "십", right: "10" },
          ],
        },
      ],
    },
    {
      id: "objects",
      title: "Objetos Comunes",
      subtitle: "Vocabulario de uso diario:",
      content: [
        { korean: "물", romanization: "mul", meaning: "agua" },
        { korean: "밥", romanization: "bap", meaning: "arroz / comida" },
        { korean: "커피", romanization: "keopi", meaning: "café", note: "¡Préstamo del inglés!" },
        { korean: "책", romanization: "chaek", meaning: "libro" },
        { korean: "핸드폰", romanization: "haendeupon", meaning: "teléfono móvil", note: "Del inglés 'handphone'" },
        { korean: "컴퓨터", romanization: "keompyuteo", meaning: "computadora", note: "Del inglés 'computer'" },
        { korean: "집", romanization: "jip", meaning: "casa" },
        { korean: "학교", romanization: "hakkyo", meaning: "escuela" },
        { korean: "돈", romanization: "don", meaning: "dinero" },
        { korean: "시간", romanization: "sigan", meaning: "tiempo / hora" },
      ],
      exercises: [
        {
          id: "o-mc-1",
          type: "multiple-choice",
          question: "¿Cómo se dice 'libro' en coreano?",
          options: [
            { text: "물", correct: false },
            { text: "커피", correct: false },
            { text: "책", correct: true },
            { text: "집", correct: false },
          ],
          answer: "책",
        },
        {
          id: "o-mc-2",
          type: "multiple-choice",
          question: "¿Qué significa '커피'?",
          options: [
            { text: "agua", correct: false },
            { text: "café", correct: true },
            { text: "comida", correct: false },
            { text: "libro", correct: false },
          ],
          answer: "café",
        },
        {
          id: "o-match-1",
          type: "matching",
          items: [
            { left: "물", right: "agua" },
            { left: "책", right: "libro" },
            { left: "집", right: "casa" },
            { left: "돈", right: "dinero" },
          ],
        },
      ],
    },
  ],
};

// ============================================================
// MÓDULO 4 — Frases Simples
// ============================================================
const module4: Module = {
  id: "phrases",
  number: 4,
  title: "Frases Simples",
  description: "¡Empieza a hablar! Aprende a presentarte y expresarte en situaciones cotidianas.",
  emoji: "💬",
  color: "pink",
  lessons: [
    {
      id: "introductions",
      title: "Presentarse",
      subtitle: "Aprende a decir quién eres:",
      content: [
        { korean: "저는 ... 입니다", romanization: "Jeoneun ... imnida", meaning: "Yo soy ... (formal)", note: "저는 = yo (formal), 입니다 = soy/es" },
        { korean: "제 이름은 ... 입니다", romanization: "Je ireumeun ... imnida", meaning: "Mi nombre es ... (formal)" },
        { korean: "나는 ... 이야", romanization: "Naneun ... iya", meaning: "Yo soy ... (informal)", note: "Usa esto solo con amigos cercanos" },
        { korean: "저는 스페인 사람입니다", romanization: "Jeoneun Seupein saramimnida", meaning: "Soy español/a", note: "스페인 = España, 사람 = persona" },
        { korean: "저는 학생입니다", romanization: "Jeoneun haksaengimnida", meaning: "Soy estudiante" },
        { korean: "만나서 반갑습니다", romanization: "Mannaseo bangapseumnida", meaning: "Encantado/a de conocerte (formal)" },
        { korean: "잘 부탁드립니다", romanization: "Jal butakdeurimnida", meaning: "Por favor, cuídame (en presentaciones)", note: "Expresión muy usada en Korea al conocer a alguien" },
      ],
      exercises: [
        {
          id: "i-mc-1",
          type: "multiple-choice",
          question: "¿Cómo se dice 'Yo soy estudiante' en coreano?",
          options: [
            { text: "저는 학생입니다", correct: true },
            { text: "제 이름은 입니다", correct: false },
            { text: "만나서 반갑습니다", correct: false },
            { text: "저는 스페인 사람입니다", correct: false },
          ],
          answer: "저는 학생입니다",
        },
        {
          id: "i-mc-2",
          type: "multiple-choice",
          question: "¿Qué significa '만나서 반갑습니다'?",
          options: [
            { text: "Soy español/a", correct: false },
            { text: "Mi nombre es...", correct: false },
            { text: "Encantado/a de conocerte", correct: true },
            { text: "Adiós", correct: false },
          ],
          answer: "Encantado/a de conocerte",
        },
        {
          id: "i-match-1",
          type: "matching",
          items: [
            { left: "저는", right: "yo (formal)" },
            { left: "이름", right: "nombre" },
            { left: "학생", right: "estudiante" },
            { left: "사람", right: "persona" },
          ],
        },
      ],
    },
    {
      id: "daily-phrases",
      title: "Expresiones Cotidianas",
      subtitle: "Frases que usarás todos los días:",
      content: [
        { korean: "이것은 뭐예요?", romanization: "Igeoseun mwoyeyo?", meaning: "¿Qué es esto?", note: "이것 = esto, 뭐 = qué, 예요 = es" },
        { korean: "얼마예요?", romanization: "Eolmayeyo?", meaning: "¿Cuánto cuesta?", note: "Muy útil de compras" },
        { korean: "어디예요?", romanization: "Eodiyeyo?", meaning: "¿Dónde está?" },
        { korean: "배고파요", romanization: "Baegopayo", meaning: "Tengo hambre" },
        { korean: "목말라요", romanization: "Mongmallayo", meaning: "Tengo sed" },
        { korean: "피곤해요", romanization: "Pigonhaeyo", meaning: "Estoy cansado/a" },
        { korean: "좋아요", romanization: "Joayo", meaning: "Está bien / Me gusta" },
        { korean: "모르겠어요", romanization: "Moreugeseoyo", meaning: "No lo sé / No entiendo" },
        { korean: "천천히 말해주세요", romanization: "Cheoncheonhi malhaejuseyo", meaning: "Habla más despacio, por favor" },
        { korean: "다시 한번 말해주세요", romanization: "Dasi hanbeon malhaejuseyo", meaning: "¿Puedes repetirlo?" },
      ],
      exercises: [
        {
          id: "d-mc-1",
          type: "multiple-choice",
          question: "¿Cómo se dice '¿Cuánto cuesta?' en coreano?",
          options: [
            { text: "어디예요?", correct: false },
            { text: "이것은 뭐예요?", correct: false },
            { text: "얼마예요?", correct: true },
            { text: "배고파요", correct: false },
          ],
          answer: "얼마예요?",
        },
        {
          id: "d-mc-2",
          type: "multiple-choice",
          question: "¿Qué significa '좋아요'?",
          options: [
            { text: "Tengo hambre", correct: false },
            { text: "Está bien / Me gusta", correct: true },
            { text: "Estoy cansado/a", correct: false },
            { text: "No lo sé", correct: false },
          ],
          answer: "Está bien / Me gusta",
        },
        {
          id: "d-mc-3",
          type: "multiple-choice",
          question: "¿Qué significa '배고파요'?",
          options: [
            { text: "Tengo sed", correct: false },
            { text: "Estoy cansado/a", correct: false },
            { text: "Tengo hambre", correct: true },
            { text: "No entiendo", correct: false },
          ],
          answer: "Tengo hambre",
        },
        {
          id: "d-match-1",
          type: "matching",
          items: [
            { left: "배고파요", right: "Tengo hambre" },
            { left: "피곤해요", right: "Estoy cansado/a" },
            { left: "좋아요", right: "Está bien" },
            { left: "얼마예요?", right: "¿Cuánto cuesta?" },
          ],
        },
      ],
    },
  ],
};

export const MODULES: Module[] = [module1, module2, module3, module4];

export const MODULE_COLORS: Record<string, { bg: string; text: string; border: string; light: string }> = {
  purple: {
    bg: "bg-purple-600",
    text: "text-purple-600",
    border: "border-purple-200",
    light: "bg-purple-50",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-500",
    border: "border-blue-200",
    light: "bg-blue-50",
  },
  green: {
    bg: "bg-emerald-500",
    text: "text-emerald-500",
    border: "border-emerald-200",
    light: "bg-emerald-50",
  },
  pink: {
    bg: "bg-pink-500",
    text: "text-pink-500",
    border: "border-pink-200",
    light: "bg-pink-50",
  },
};
