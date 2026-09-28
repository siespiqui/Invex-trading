import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { niveles } from "@/lib/curso";
import { nivelActual, porcentajeCurso, siguienteLeccion, useProgreso } from "@/lib/progreso";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INVEX Trading · Aprende a operar con disciplina" },
      {
        name: "description",
        content:
          "Curso de trading gamificado: lecciones por niveles, quiz interactivos, rachas diarias, insignias, ranking y certificado.",
      },
      { property: "og:title", content: "INVEX Trading · Aprende a operar con disciplina" },
      {
        property: "og:description",
        content: "Domina el trading paso a paso con lecciones cortas, quiz y rachas diarias.",
      },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const { progreso, estaDesbloqueada } = useProgreso();
  const nivel = nivelActual(progreso.completadas);
  const siguiente = siguienteLeccion(progreso.completadas);
  const hechasNivel = nivel.lecciones.filter((l) => progreso.completadas.includes(l.id)).length;
  const pct = Math.round((hechasNivel / nivel.lecciones.length) * 100);

  return (
    <Shell>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-aurora">
                  Nivel {nivel.numero} · {nivel.etiqueta}
                </p>
                <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                  {progreso.racha > 0 ? `Continúa tu racha, ${progreso.nombre}` : `Empieza hoy, ${progreso.nombre}`}
                </h1>
                <p className="mt-3 max-w-md text-sm font-medium text-aurora">
                  Aprende a operar con disciplina, protege tu capital y construyamos juntos resultados sostenibles.
                </p>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  {siguiente
                    ? `Tu siguiente paso es «${siguiente.titulo}». Completa una lección al día para mantener la racha viva.`
                    : "Has completado todo el curso. Descarga tu certificado y repasa cuando quieras."}
                </p>
              </div>
              <div className="glass rounded-2xl px-4 py-3 text-center">
                <p className="font-display text-2xl font-bold text-heat">{progreso.racha}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">días seguidos</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progreso del nivel</span>
                <span className="text-foreground">
                  {hechasNivel} de {nivel.lecciones.length} lecciones
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-aurora to-glow transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {siguiente ? (
                <Link
                  to="/leccion/$leccionId"
                  params={{ leccionId: siguiente.id }}
                  className="rounded-xl bg-gradient-to-r from-aurora to-mint px-6 py-3 font-display text-sm font-semibold text-ink shadow-[var(--shadow-aurora)] transition hover:brightness-110"
                >
                  Comenzar lección
                </Link>
              ) : (
                <Link
                  to="/certificado"
                  className="rounded-xl bg-gradient-to-r from-aurora to-mint px-6 py-3 font-display text-sm font-semibold text-ink shadow-[var(--shadow-aurora)] transition hover:brightness-110"
                >
                  Ver certificado
                </Link>
              )}
              <Link
                to="/ranking"
                className="glass rounded-xl px-6 py-3 font-display text-sm font-semibold transition hover:bg-white/10"
              >
                Ver ranking
              </Link>
            </div>

            <div className="mt-7">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Hoja de ruta</p>
              <div className="grid gap-6">
                {niveles.map((n) => (
                  <div key={n.id}>
                    <p className="mb-2 font-display text-sm font-semibold">
                      Nivel {n.numero} · {n.titulo}
                    </p>
                    <div className="grid gap-3">
                      {n.lecciones.map((l, i) => {
                        const completada = progreso.completadas.includes(l.id);
                        const abierta = estaDesbloqueada(l.id);
                        const numero = i + 1;
                        if (!abierta) {
                          return (
                            <div key={l.id} className="glass flex items-center gap-4 rounded-2xl p-4 opacity-70">
                              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 font-display font-bold text-muted-foreground">
                                {numero}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-display text-sm font-semibold">{l.titulo}</p>
                                <p className="truncate text-xs text-muted-foreground">{l.resumen}</p>
                              </div>
                              <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-muted-foreground">
                                🔒 Bloqueada
                              </span>
                            </div>
                          );
                        }
                        return (
                          <Link
                            key={l.id}
                            to="/leccion/$leccionId"
                            params={{ leccionId: l.id }}
                            className={`flex items-center gap-4 rounded-2xl border p-4 transition hover:brightness-110 ${
                              completada
                                ? "border-mint/30 bg-mint/10"
                                : "border-aurora/30 bg-aurora/10 shadow-[var(--shadow-aurora)]"
                            }`}
                          >
                            <div
                              className={`grid size-11 shrink-0 place-items-center rounded-xl font-display font-bold ${
                                completada ? "bg-mint/20 text-mint" : "bg-aurora/20 text-aurora"
                              }`}
                            >
                              {completada ? "✓" : numero}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-display text-sm font-semibold">{l.titulo}</p>
                              <p className="truncate text-xs text-muted-foreground">{l.resumen}</p>
                            </div>
                            <span
                              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                                completada ? "bg-mint/20 text-mint" : "bg-aurora/20 text-aurora"
                              }`}
                            >
                              {completada ? "Completada" : "En curso"}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-5">
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Tu progreso</h2>
              <span className="text-xs text-muted-foreground">{porcentajeCurso(progreso.completadas)}% del curso</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="glass rounded-2xl px-3 py-4">
                <p className="font-display text-xl font-bold text-aurora">{progreso.completadas.length}</p>
                <p className="text-[11px] text-muted-foreground">Lecciones</p>
              </div>
              <div className="glass rounded-2xl px-3 py-4">
                <p className="font-display text-xl font-bold text-glow">{progreso.xp.toLocaleString("es-ES")}</p>
                <p className="text-[11px] text-muted-foreground">XP</p>
              </div>
              <div className="glass rounded-2xl px-3 py-4">
                <p className="font-display text-xl font-bold text-heat">{progreso.racha}</p>
                <p className="text-[11px] text-muted-foreground">Racha</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Cada lección incluye teoría breve y un quiz interactivo. Al acertar todas las preguntas desbloqueas la
              siguiente lección.
            </p>
          </div>

          <div className="glass mt-6 rounded-3xl p-6">
            <h2 className="font-display text-lg font-semibold">Cómo funciona</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-aurora">◆</span> Aprende con lecciones de 3 minutos y quiz inmediato.
              </li>
              <li className="flex gap-3">
                <span className="text-aurora">◆</span> Mantén la racha completando al menos una lección al día.
              </li>
              <li className="flex gap-3">
                <span className="text-aurora">◆</span> Gana XP, sube en el ranking y consigue insignias.
              </li>
              <li className="flex gap-3">
                <span className="text-aurora">◆</span> Termina el curso y descarga tu certificado.
              </li>
            </ul>
          </div>

          <div className="mt-6 rounded-3xl border border-glow/30 bg-gradient-to-br from-glow/15 to-aurora/10 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold uppercase tracking-wider text-glow">INVEX Trading Premium</p>
              <span className="rounded-full bg-glow/20 px-2.5 py-0.5 text-[11px] font-semibold text-glow">Nuevo</span>
            </div>
            <p className="mt-3 font-display text-xl font-semibold leading-snug">
              Certificado oficial + cursos avanzados
            </p>
            <Link
              to="/premium"
              className="mt-5 block rounded-xl bg-gradient-to-r from-glow to-aurora px-4 py-3 text-center font-display text-sm font-semibold text-ink shadow-[var(--shadow-glow)] transition hover:brightness-110"
            >
              Probar 7 días gratis
            </Link>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
