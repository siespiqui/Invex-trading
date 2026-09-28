export type Opcion = { texto: string; correcta: boolean };

export type Pregunta = {
  enunciado: string;
  ayuda?: string;
  opciones: Opcion[];
  explicacion: string;
};

export type Leccion = {
  id: string;
  titulo: string;
  resumen: string;
  xp: number;
  teoria: string[];
  preguntas: Pregunta[];
};

export type Nivel = {
  id: string;
  numero: number;
  titulo: string;
  etiqueta: string;
  descripcion: string;
  lecciones: Leccion[];
};

export type Insignia = {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  meta: number;
  tipo: "lecciones" | "racha" | "xp" | "nivel";
};

export const niveles: Nivel[] = [
  {
    id: "fundamentos",
    numero: 1,
    titulo: "Fundamentos del mercado",
    etiqueta: "Principiante",
    descripcion: "Qué se negocia, quién participa y cómo se mueve el precio.",
    lecciones: [
      {
        id: "que-es-trading",
        titulo: "¿Qué es el trading?",
        resumen: "Diferencias entre invertir y operar a corto plazo",
        xp: 40,
        teoria: [
          "El trading es la actividad de comprar y vender activos financieros con el objetivo de obtener ganancias aprovechando las variaciones de precio en períodos relativamente cortos.",
          "El precio se forma por el cruce entre órdenes de compra (demanda) y de venta (oferta) en el libro de órdenes.",
          "(**Herramienta + Conocimiento + Disciplina = Trader Rentable**)",
        ],
        preguntas: [
          {
            enunciado: "¿Cuál es la diferencia principal entre trading e inversión?",
            opciones: [
              { texto: "El trading es solo comprar casas para guardarlas siempre y la inversión es vender acciones en segundos para no tener riesgo.", correcta: false },
              { texto: "El trading busca ganancias rápidas en corto tiempo aprovechando la variación de precios; la inversión busca rentabilidad a largo plazo basándose en el valor del activo.", correcta: true },
              { texto: "Son exactamente lo mismo: guardar dinero en una cuenta de ahorros para ganar intereses sin comprar ni vender nada.", correcta: false },
            ],
            explicacion:
              "El trading opera en horizontes cortos buscando aprovechar movimientos de precio; la inversión busca rentabilidad a largo plazo a partir del valor del activo.",
          },
          {
            enunciado: "¿Qué determina el precio de un activo en el mercado?",
            opciones: [
              { texto: "El cruce entre oferta y demanda", correcta: true },
              { texto: "El valor que fija el gobierno", correcta: false },
              { texto: "La media de los últimos 200 días", correcta: false },
            ],
            explicacion:
              "El precio es el punto donde compradores y vendedores acuerdan intercambiar en ese instante.",
          },
        ],
      },
      {
        id: "activos-y-mercados",
        titulo: "Activos y mercados",
        resumen: "Acciones, divisas, índices y cripto",
        xp: 40,
        teoria: [
          "Las acciones representan propiedad de una empresa; las divisas (forex) cotizan en pares como EUR/USD.",
          "Los índices agrupan varias acciones y suelen ser menos volátiles que un valor individual.",
          "La liquidez indica con qué facilidad entras y sales sin mover el precio.",
        ],
        preguntas: [
          {
            enunciado: "En el par EUR/USD, ¿qué compras cuando abres una posición larga?",
            opciones: [
              { texto: "Euros pagando con dólares", correcta: true },
              { texto: "Dólares pagando con euros", correcta: false },
              { texto: "Una acción europea", correcta: false },
            ],
            explicacion: "En un par, comprar significa adquirir la divisa base (EUR) vendiendo la cotizada (USD).",
          },
          {
            enunciado: "Un mercado muy líquido normalmente ofrece…",
            opciones: [
              { texto: "Spreads más estrechos", correcta: true },
              { texto: "Ganancias garantizadas", correcta: false },
              { texto: "Ausencia total de volatilidad", correcta: false },
            ],
            explicacion: "A mayor liquidez, menor diferencia entre compra y venta (spread) y mejor ejecución.",
          },
        ],
      },
      {
        id: "velas-japonesas",
        titulo: "Velas japonesas",
        resumen: "Cuerpo, mechas y lectura de una vela",
        xp: 50,
        teoria: [
          "Cada vela muestra apertura, cierre, máximo y mínimo del periodo.",
          "El cuerpo es la distancia entre apertura y cierre; las mechas marcan los extremos alcanzados.",
          "Una mecha inferior larga indica que los compradores defendieron ese nivel.",
        ],
        preguntas: [
          {
            enunciado: "¿Qué representa el cuerpo de una vela?",
            opciones: [
              { texto: "La distancia entre apertura y cierre", correcta: true },
              { texto: "El máximo del día", correcta: false },
              { texto: "El volumen negociado", correcta: false },
            ],
            explicacion: "El cuerpo une apertura y cierre; las mechas muestran máximo y mínimo.",
          },
          {
            enunciado: "Una mecha inferior larga en una vela alcista sugiere que…",
            opciones: [
              { texto: "Los compradores rechazaron precios más bajos", correcta: true },
              { texto: "El activo perdió toda su liquidez", correcta: false },
              { texto: "El precio cerró en mínimos", correcta: false },
            ],
            explicacion: "El precio bajó, pero la demanda lo devolvió arriba: señal de fuerza compradora.",
          },
        ],
      },
    ],
  },
  {
    id: "analisis-tecnico",
    numero: 2,
    titulo: "Análisis técnico",
    etiqueta: "Intermedio",
    descripcion: "Estructura de mercado, niveles clave e indicadores.",
    lecciones: [
      {
        id: "soportes-resistencias",
        titulo: "Soportes y resistencias",
        resumen: "Identifica zonas clave en el gráfico",
        xp: 60,
        teoria: [
          "Un soporte es una zona donde la demanda ha frenado varias caídas; una resistencia, donde la oferta frenó subidas.",
          "Son zonas, no líneas exactas: espera reacciones en un rango de precio.",
          "Cuando una resistencia se rompe con fuerza, suele actuar después como soporte.",
        ],
        preguntas: [
          {
            enunciado: "¿Qué indica que el precio rebota dos veces en el mismo nivel inferior?",
            opciones: [
              { texto: "Un soporte activo", correcta: true },
              { texto: "Una ruptura confirmada", correcta: false },
              { texto: "Una resistencia débil", correcta: false },
              { texto: "Un gap alcista", correcta: false },
            ],
            explicacion: "Dos rebotes en la misma zona confirman presencia de compradores: es un soporte.",
          },
          {
            enunciado: "Tras romper una resistencia con volumen, ese nivel suele…",
            opciones: [
              { texto: "Convertirse en soporte", correcta: true },
              { texto: "Desaparecer del gráfico", correcta: false },
              { texto: "Invertir la tendencia principal", correcta: false },
            ],
            explicacion: "Es el cambio de polaridad: la antigua resistencia pasa a defender el precio por abajo.",
          },
        ],
      },
      {
        id: "tendencias",
        titulo: "Tendencias y estructura",
        resumen: "Máximos y mínimos crecientes",
        xp: 60,
        teoria: [
          "Una tendencia alcista encadena máximos y mínimos cada vez más altos.",
          "La estructura se rompe cuando el precio deja de respetar ese patrón.",
          "Operar a favor de la tendencia mejora la probabilidad, no la certeza.",
        ],
        preguntas: [
          {
            enunciado: "¿Cómo se define una tendencia bajista?",
            opciones: [
              { texto: "Máximos y mínimos decrecientes", correcta: true },
              { texto: "Precio plano durante semanas", correcta: false },
              { texto: "Volumen creciente sin dirección", correcta: false },
            ],
            explicacion: "Cada impulso hace un mínimo más bajo y cada rebote un máximo más bajo.",
          },
          {
            enunciado: "Operar a favor de la tendencia sirve para…",
            opciones: [
              { texto: "Mejorar la probabilidad de la operación", correcta: true },
              { texto: "Eliminar el riesgo de pérdida", correcta: false },
              { texto: "Garantizar el objetivo de beneficio", correcta: false },
            ],
            explicacion: "Ninguna técnica elimina el riesgo; la tendencia solo pone las probabilidades a favor.",
          },
        ],
      },
      {
        id: "medias-moviles",
        titulo: "Medias móviles",
        resumen: "Cruces, filtros y señales",
        xp: 60,
        teoria: [
          "Una media móvil suaviza el precio para leer la dirección dominante.",
          "El cruce de una media rápida sobre una lenta es una señal clásica de impulso alcista.",
          "Las medias van con retraso: confirman, no adelantan.",
        ],
        preguntas: [
          {
            enunciado: "El cruce de la media de 50 sobre la de 200 se conoce como…",
            opciones: [
              { texto: "Cruce dorado", correcta: true },
              { texto: "Cruce de la muerte", correcta: false },
              { texto: "Divergencia bajista", correcta: false },
            ],
            explicacion: "El cruce dorado (golden cross) se interpreta como señal alcista de medio plazo.",
          },
          {
            enunciado: "La principal limitación de las medias móviles es…",
            opciones: [
              { texto: "Que son indicadores retrasados", correcta: true },
              { texto: "Que solo funcionan en cripto", correcta: false },
              { texto: "Que no pueden graficarse", correcta: false },
            ],
            explicacion: "Se calculan con precios pasados, así que confirman movimientos ya iniciados.",
          },
        ],
      },
    ],
  },
  {
    id: "gestion-riesgo",
    numero: 3,
    titulo: "Gestión del riesgo",
    etiqueta: "Avanzado",
    descripcion: "Proteger el capital antes de buscar rentabilidad.",
    lecciones: [
      {
        id: "stop-loss",
        titulo: "Stop-loss y tamaño de posición",
        resumen: "Cuánto arriesgar en cada operación",
        xp: 70,
        teoria: [
          "El stop-loss define de antemano la pérdida máxima aceptable de una operación.",
          "Una regla común es arriesgar como máximo el 1-2% de la cuenta por operación.",
          "El tamaño de posición se calcula desde la distancia al stop, no desde la intuición.",
        ],
        preguntas: [
          {
            enunciado: "Con una cuenta de 5.000 € y riesgo del 1%, ¿cuánto arriesgas por operación?",
            opciones: [
              { texto: "50 €", correcta: true },
              { texto: "500 €", correcta: false },
              { texto: "5 €", correcta: false },
            ],
            explicacion: "El 1% de 5.000 € son 50 €: esa es la pérdida máxima si salta el stop.",
          },
          {
            enunciado: "El tamaño de la posición debe calcularse a partir de…",
            opciones: [
              { texto: "La distancia entre entrada y stop", correcta: true },
              { texto: "La confianza que sientes hoy", correcta: false },
              { texto: "El saldo de la cuenta del vecino", correcta: false },
            ],
            explicacion: "Riesgo en euros dividido entre la distancia al stop determina el volumen.",
          },
        ],
      },
      {
        id: "ratio-riesgo-beneficio",
        titulo: "Ratio riesgo/beneficio",
        resumen: "Por qué puedes ganar acertando poco",
        xp: 70,
        teoria: [
          "El ratio R:B compara lo que arriesgas con lo que esperas ganar.",
          "Con ratio 1:3 puedes ser rentable acertando solo un tercio de las veces.",
          "La esperanza matemática combina el porcentaje de acierto con el ratio medio.",
        ],
        preguntas: [
          {
            enunciado: "Arriesgas 100 € para ganar 300 €. ¿Cuál es tu ratio?",
            opciones: [
              { texto: "1:3", correcta: true },
              { texto: "3:1", correcta: false },
              { texto: "1:1", correcta: false },
            ],
            explicacion: "Una unidad de riesgo frente a tres de beneficio potencial: 1:3.",
          },
          {
            enunciado: "Con ratio 1:3 y 40% de aciertos, tu sistema…",
            opciones: [
              { texto: "Tiene esperanza positiva", correcta: true },
              { texto: "Pierde dinero seguro", correcta: false },
              { texto: "Es imposible de evaluar", correcta: false },
            ],
            explicacion: "0,4 × 3 − 0,6 × 1 = +0,6R por operación: esperanza positiva.",
          },
        ],
      },
      {
        id: "psicologia",
        titulo: "Psicología del trader",
        resumen: "Disciplina, sesgos y diario de operaciones",
        xp: 80,
        teoria: [
          "El mayor enemigo no es el mercado, es operar fuera del plan.",
          "El sesgo de confirmación te hace buscar solo datos que apoyan tu idea.",
          "Un diario de operaciones convierte errores repetidos en información útil.",
        ],
        preguntas: [
          {
            enunciado: "Mover el stop-loss para no asumir la pérdida es un ejemplo de…",
            opciones: [
              { texto: "Aversión a la pérdida", correcta: true },
              { texto: "Gestión activa correcta", correcta: false },
              { texto: "Análisis fundamental", correcta: false },
            ],
            explicacion: "Alargar la pérdida por no aceptarla es el error más caro y frecuente.",
          },
          {
            enunciado: "¿Para qué sirve el diario de operaciones?",
            opciones: [
              { texto: "Detectar patrones de error propios", correcta: true },
              { texto: "Predecir el precio de mañana", correcta: false },
              { texto: "Sustituir al plan de trading", correcta: false },
            ],
            explicacion: "Registrar contexto, emoción y resultado revela qué te cuesta dinero de forma repetida.",
          },
        ],
      },
    ],
  },
];

export const leccionesPlanas = niveles.flatMap((n) =>
  n.lecciones.map((l) => ({ ...l, nivelId: n.id, nivelNumero: n.numero, nivelTitulo: n.titulo })),
);

export function buscarLeccion(id: string) {
  return leccionesPlanas.find((l) => l.id === id);
}

export const totalLecciones = leccionesPlanas.length;

export const insignias: Insignia[] = [
  { id: "primeros-pasos", nombre: "Primeros pasos", descripcion: "Completa tu primera lección", icono: "🚀", meta: 1, tipo: "lecciones" },
  { id: "constante", nombre: "Constante", descripcion: "Racha de 3 días seguidos", icono: "🔥", meta: 3, tipo: "racha" },
  { id: "analista", nombre: "Analista", descripcion: "Completa 5 lecciones", icono: "📊", meta: 5, tipo: "lecciones" },
  { id: "mil-xp", nombre: "Mil XP", descripcion: "Acumula 1.000 XP", icono: "◆", meta: 1000, tipo: "xp" },
  { id: "gestor", nombre: "Gestor de riesgo", descripcion: "Desbloquea el nivel 3", icono: "🛡️", meta: 3, tipo: "nivel" },
  { id: "graduado", nombre: "Graduado", descripcion: "Completa todo el curso", icono: "🎓", meta: totalLecciones, tipo: "lecciones" },
];

export const rankingBase = [
  { nombre: "Diego R.", iniciales: "DR", xp: 3940 },
  { nombre: "Lucía M.", iniciales: "LM", xp: 3710 },
  { nombre: "Aitana C.", iniciales: "AC", xp: 3280 },
  { nombre: "Joaquín R.", iniciales: "JR", xp: 2960 },
  { nombre: "Tomás N.", iniciales: "TN", xp: 2410 },
  { nombre: "Sara V.", iniciales: "SV", xp: 1980 },
  { nombre: "Martín P.", iniciales: "MP", xp: 1540 },
  { nombre: "Elena G.", iniciales: "EG", xp: 1120 },
  { nombre: "Bruno L.", iniciales: "BL", xp: 760 },
];
