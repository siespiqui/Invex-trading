import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { useProgreso } from "@/lib/progreso";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "Premium · INVEX Trading" },
      {
        name: "description",
        content: "Suscripción Premium de INVEX Trading: cursos avanzados, mentoría en vivo, certificado oficial y vidas ilimitadas.",
      },
      { property: "og:title", content: "Premium · INVEX Trading" },
      { property: "og:description", content: "Desbloquea todo el contenido avanzado de trading con INVEX Trading Premium." },
    ],
  }),
  component: PremiumPagina,
});

const planes = [
  {
    id: "gratis",
    nombre: "Gratis",
    precio: "0 €",
    periodo: "para siempre",
    ventajas: ["3 niveles del curso base", "Quiz interactivos", "Racha e insignias", "Ranking semanal"],
    destacado: false,
  },
  {
    id: "premium",
    nombre: "Premium",
    precio: "9,99 €",
    periodo: "al mes",
    ventajas: [
      "Todo lo del plan gratis",
      "Cursos avanzados y simulador",
      "Mentoría y estrategias en vivo",
      "Certificado oficial verificable",
      "Repeticiones de quiz ilimitadas",
    ],
    destacado: true,
  },
  {
    id: "anual",
    nombre: "Premium anual",
    precio: "79 €",
    periodo: "al año",
    ventajas: ["Todo lo de Premium", "2 meses gratis", "Sesiones grupales mensuales", "Acceso anticipado a nuevos niveles"],
    destacado: false,
  },
];

function PremiumPagina() {
  const { progreso, activarPremium } = useProgreso();

  return (
    <Shell>
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-glow">Suscripción</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Lleva tu trading al siguiente nivel</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Empieza gratis y pasa a Premium cuando quieras contenido avanzado, mentoría y tu certificado oficial.
        </p>

        <div className="mt-8 grid gap-5 text-left md:grid-cols-3">
          {planes.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl p-6 backdrop-blur-xl ${
                p.destacado
                  ? "border border-glow/40 bg-gradient-to-br from-glow/20 to-aurora/10 shadow-[var(--shadow-glow)]"
                  : "glass"
              }`}
            >
              {p.destacado && (
                <span className="rounded-full bg-glow/20 px-2.5 py-0.5 text-[11px] font-semibold text-glow">
                  Más elegido
                </span>
              )}
              <p className="mt-3 font-display text-lg font-semibold">{p.nombre}</p>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold">{p.precio}</span>
                <span className="text-xs text-muted-foreground">{p.periodo}</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {p.ventajas.map((v) => (
                  <li key={v} className="flex gap-2">
                    <span className="text-aurora">◆</span> {v}
                  </li>
                ))}
              </ul>
              {p.id === "gratis" ? (
                <button
                  onClick={() => activarPremium(false)}
                  className="glass mt-6 w-full rounded-xl px-4 py-3 font-display text-sm font-semibold"
                >
                  {progreso.premium ? "Volver al plan gratis" : "Tu plan actual"}
                </button>
              ) : (
                <button
                  onClick={() => activarPremium(true)}
                  className="mt-6 w-full rounded-xl bg-gradient-to-r from-glow to-aurora px-4 py-3 font-display text-sm font-semibold text-ink transition hover:brightness-110"
                >
                  {progreso.premium ? "Plan activo" : "Probar 7 días gratis"}
                </button>
              )}
            </div>
          ))}
        </div>

        {progreso.premium && (
          <p className="mt-6 text-sm text-aurora">Premium activo · gracias por apoyar tu aprendizaje ✦</p>
        )}
        <p className="mt-8 text-xs text-muted-foreground">
          Precios de demostración. INVEX Trading es contenido educativo y no constituye asesoramiento financiero.
        </p>
      </div>
    </Shell>
  );
}
