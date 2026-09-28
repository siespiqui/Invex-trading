import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { totalLecciones } from "@/lib/curso";
import { porcentajeCurso, useProgreso } from "@/lib/progreso";
import logoAsset from "@/assets/invex-logo.png.asset.json";

export const Route = createFileRoute("/certificado")({
  head: () => ({
    meta: [
      { title: "Certificado · INVEX Trading" },
      {
        name: "description",
        content: "Obtén tu certificado de finalización del curso de trading al completar todos los niveles.",
      },
      { property: "og:title", content: "Certificado · INVEX Trading" },
      { property: "og:description", content: "Certificado de finalización del curso de trading de INVEX Trading." },
    ],
  }),
  component: CertificadoPagina,
});

function CertificadoPagina() {
  const { progreso, cambiarNombre } = useProgreso();
  const completo = progreso.completadas.length >= totalLecciones;
  const fecha = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

  return (
    <Shell>
      <div className="mx-auto max-w-3xl">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-aurora">Acreditación</p>
          <h1 className="mt-2 text-3xl font-semibold">Tu certificado</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {completo
              ? "Has completado los tres niveles del curso. Este es tu certificado."
              : `Completa las ${totalLecciones} lecciones para desbloquear tu certificado. Vas por el ${porcentajeCurso(progreso.completadas)}%.`}
          </p>

          <label className="mt-5 block text-xs uppercase tracking-wider text-muted-foreground">
            Nombre en el certificado
            <input
              value={progreso.nombre}
              onChange={(e) => cambiarNombre(e.target.value)}
              className="mt-2 w-full rounded-xl border border-input bg-white/5 px-4 py-2.5 text-sm normal-case tracking-normal text-foreground outline-none focus:border-aurora/60"
              placeholder="Tu nombre completo"
            />
          </label>
        </div>

        <div
          className={`relative mt-6 overflow-hidden rounded-3xl border border-aurora/30 bg-gradient-to-br from-aurora/15 via-glow/10 to-transparent p-8 text-center backdrop-blur-xl sm:p-12 ${
            completo ? "" : "opacity-60"
          }`}
        >
          <img src={logoAsset.url} alt="Logo de INVEX Trading" className="mx-auto size-14 rounded-2xl object-cover" />
          <p className="mt-3 font-display text-xs uppercase tracking-[0.3em] text-aurora">INVEX Trading Academy</p>
          <p className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">Certifica que</p>
          <p className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{progreso.nombre}</p>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-200">
            ha completado el programa <span className="text-aurora">Fundamentos, Análisis Técnico y Gestión del Riesgo</span>,
            con {progreso.completadas.length} de {totalLecciones} lecciones y {progreso.xp.toLocaleString("es-ES")} XP acumulados.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-muted-foreground">
            <span>Fecha: {fecha}</span>
            <span>ID: INV-{(progreso.xp + progreso.completadas.length * 7).toString(36).toUpperCase()}</span>
          </div>
          {!completo && (
            <div className="absolute inset-0 grid place-items-center bg-ink/50">
              <div className="text-center">
                <p className="text-4xl">🔒</p>
                <p className="mt-2 font-display text-sm font-semibold">Bloqueado</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.print()}
            disabled={!completo}
            className="rounded-xl bg-gradient-to-r from-aurora to-mint px-6 py-3 font-display text-sm font-semibold text-ink transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Descargar / imprimir
          </button>
          <Link to="/" className="glass rounded-xl px-6 py-3 font-display text-sm font-semibold">
            Seguir aprendiendo
          </Link>
        </div>
      </div>
    </Shell>
  );
}
