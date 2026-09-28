import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { rankingBase } from "@/lib/curso";
import { iniciales, useProgreso } from "@/lib/progreso";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Ranking semanal · INVEX Trading" },
      { name: "description", content: "Compite con otros estudiantes de trading y sube en el ranking semanal de XP." },
      { property: "og:title", content: "Ranking semanal · INVEX Trading" },
      { property: "og:description", content: "Mira tu posición entre los estudiantes de INVEX Trading." },
    ],
  }),
  component: RankingPagina,
});

function RankingPagina() {
  const { progreso } = useProgreso();
  const filas = [
    ...rankingBase.map((r) => ({ ...r, yo: false })),
    { nombre: `${progreso.nombre} (tú)`, iniciales: iniciales(progreso.nombre) || "T", xp: progreso.xp, yo: true },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <Shell>
      <div className="glass mx-auto max-w-3xl rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-aurora">Comunidad</p>
            <h1 className="mt-2 text-3xl font-semibold">Ranking semanal</h1>
          </div>
          <span className="text-xs text-muted-foreground">Top 10 · se reinicia cada lunes</span>
        </div>

        <div className="mt-6 grid gap-1.5">
          {filas.map((f, i) => (
            <div
              key={f.nombre}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 ${
                f.yo ? "border border-glow/40 bg-glow/10" : "hover:bg-white/5"
              }`}
            >
              <span
                className={`w-6 text-center font-display text-sm font-bold ${
                  i === 0 ? "text-aurora" : f.yo ? "text-glow" : "text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold ${
                  f.yo ? "bg-gradient-to-br from-aurora to-glow text-ink" : "bg-white/10"
                }`}
              >
                {f.iniciales}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{f.nombre}</span>
              <span className={`text-sm font-semibold ${f.yo ? "text-glow" : "text-aurora"}`}>
                {f.xp.toLocaleString("es-ES")} XP
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Cada lección completada suma XP. Repasar una lección ya hecha suma una parte del XP original.
        </p>
      </div>
    </Shell>
  );
}
