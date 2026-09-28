import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { insigniasObtenidas, useProgreso } from "@/lib/progreso";

export const Route = createFileRoute("/insignias")({
  head: () => ({
    meta: [
      { title: "Insignias · INVEX Trading" },
      { name: "description", content: "Consigue insignias por tus rachas, XP y lecciones completadas en INVEX Trading." },
      { property: "og:title", content: "Insignias · INVEX Trading" },
      { property: "og:description", content: "Colecciona insignias mientras aprendes trading." },
    ],
  }),
  component: InsigniasPagina,
});

function InsigniasPagina() {
  const { progreso } = useProgreso();
  const lista = insigniasObtenidas(progreso);
  const conseguidas = lista.filter((i) => i.obtenida).length;

  return (
    <Shell>
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-aurora">Logros</p>
            <h1 className="mt-2 text-3xl font-semibold">Tus insignias</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {conseguidas} de {lista.length} conseguidas
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((i) => (
            <div
              key={i.id}
              className={`glass rounded-2xl p-5 ${i.obtenida ? "border-aurora/40 bg-aurora/10" : "opacity-70"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`grid size-12 shrink-0 place-items-center rounded-full text-2xl ${
                    i.obtenida ? "bg-aurora/20" : "bg-white/10 grayscale"
                  }`}
                >
                  {i.icono}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold">{i.nombre}</p>
                  <p className="text-xs text-muted-foreground">{i.descripcion}</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-aurora to-glow"
                  style={{ width: `${Math.min(100, Math.round((i.valor / i.meta) * 100))}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {Math.min(i.valor, i.meta)} / {i.meta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
