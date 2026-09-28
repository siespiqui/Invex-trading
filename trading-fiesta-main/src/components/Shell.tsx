import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { iniciales, useProgreso } from "@/lib/progreso";
import logoAsset from "@/assets/invex-logo.png.asset.json";

const enlaces = [
  { to: "/", label: "Ruta" },
  { to: "/insignias", label: "Insignias" },
  { to: "/ranking", label: "Ranking" },
  { to: "/certificado", label: "Certificado" },
  { to: "/premium", label: "Premium" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const { progreso } = useProgreso();

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="aur drift-slow left-[-10%] top-[-15%] h-[420px] w-[520px] bg-aurora/50" />
        <div className="aur drift-slower right-[-8%] top-[10%] h-[460px] w-[480px] bg-glow/50" />
        <div className="aur drift-slowest bottom-[-20%] left-[35%] h-[420px] w-[560px] bg-heat/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-5 pb-24 sm:px-6 lg:px-8 lg:pb-10">
        <header className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="Logo de INVEX Trading"
              className="size-10 rounded-xl object-cover shadow-[var(--shadow-aurora)]"
            />
            <div>
              <p className="font-display text-lg font-semibold leading-none tracking-tight">INVEX Trading</p>
              <p className="text-[11px] text-muted-foreground">Aprende a operar con disciplina.</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
            {enlaces.map((e) => (
              <Link
                key={e.to}
                to={e.to}
                activeOptions={{ exact: e.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                className="transition-colors hover:text-foreground"
              >
                {e.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold">
              <span className="flame text-heat">🔥</span>
              <span>{progreso.racha}</span>
              <span className="hidden text-muted-foreground sm:inline">días</span>
            </div>
            <div className="glass hidden items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold sm:flex">
              <span className="text-aurora">◆</span>
              <span>{progreso.xp.toLocaleString("es-ES")} XP</span>
            </div>
            <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-aurora to-glow font-display text-sm font-bold text-ink">
              {iniciales(progreso.nombre) || "T"}
            </div>
          </div>
        </header>

        <main className="mt-8">{children}</main>

        <footer className="mt-10 border-t border-border pt-5 text-xs text-muted-foreground">
          <p className="flex flex-wrap items-center justify-between gap-2">
            <span>INVEX Trading · Aprende a operar con disciplina, protege tu capital y construyamos juntos resultados sostenibles.</span>
            <span>Contenido educativo. No es asesoramiento financiero.</span>
          </p>
        </footer>
      </div>

      <nav className="glass fixed inset-x-0 bottom-0 z-20 lg:hidden">
        <div className="grid grid-cols-5">
          {enlaces.map((e) => (
            <Link
              key={e.to}
              to={e.to}
              activeOptions={{ exact: e.to === "/" }}
              activeProps={{ className: "text-aurora" }}
              className="py-3 text-center text-[11px] font-medium text-muted-foreground"
            >
              {e.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
