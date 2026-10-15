import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { buscarLeccion, leccionesPlanas } from "@/lib/curso";
import { useProgreso } from "@/lib/progreso";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/leccion/$leccionId")({
  head: () => {
    const titulo = "Lección · INVEX Trading";
    const desc = "Lección de trading con quiz interactivo.";
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: LeccionPagina,
});

function LeccionPagina() {
  const { leccionId } = Route.useParams();
  const navigate = useNavigate();
  const { progreso, completarLeccion, estaDesbloqueada } = useProgreso();

  // 1. Nuevos estados para manejar los datos que vienen de Django
  const [leccion, setLeccion] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  // 2. Estados que ya tenías para el quiz
  const [indice, setIndice] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [terminada, setTerminada] = useState(false);
  const [parteSeleccionada, setParteSeleccionada] = useState("cuerpo");

  // 3. Efecto para buscar la lección en Django al entrar a la pantalla
  useEffect(() => {
    buscarLeccion(leccionId)
      .then((data) => {
        setLeccion(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar lección", err);
        setCargando(false);
      });
  }, [leccionId]);

  // 4. Pantalla de carga temporal
  if (cargando) {
    return (
      <Shell>
        <div className="glass rounded-3xl p-8 text-center text-aurora">
          Cargando lección desde el servidor...
        </div>
      </Shell>
    );
  }

  if (!leccion) {
    return (
      <Shell>
        <div className="glass rounded-3xl p-8 text-center">
          <h1 className="text-2xl font-semibold">Lección no encontrada</h1>
          <Link to="/" className="mt-4 inline-block text-sm text-aurora">
            Volver a la ruta
          </Link>
        </div>
      </Shell>
    );
  }
  if (!estaDesbloqueada(leccion.id)) {
    return (
      <Shell>
        <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
          <p className="text-4xl">🔒</p>
          <h1 className="mt-3 text-2xl font-semibold">Lección bloqueada</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Completa la lección anterior para desbloquear «{leccion.titulo}».
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-gradient-to-r from-aurora to-mint px-6 py-3 font-display text-sm font-semibold text-ink"
          >
            Volver a la ruta
          </Link>
        </div>
      </Shell>
    );
  }

  const pregunta = leccion.preguntas[indice]!;
  const indiceGlobal = leccionesPlanas.findIndex((l) => l.id === leccion.id);
  const siguiente = leccionesPlanas[indiceGlobal + 1] ?? null;
  const acerto = elegida !== null && pregunta.opciones[elegida]?.correcta === true;

  function responder(i: number) {
    if (elegida !== null) return;
    setElegida(i);
    if (pregunta.opciones[i]?.correcta) setAciertos((a) => a + 1);
  }

  function avanzar() {
    if (indice + 1 < leccion!.preguntas.length) {
      setIndice(indice + 1);
      setElegida(null);
      return;
    }
    completarLeccion(leccion!.id, leccion!.xp);
    setTerminada(true);
  }

  if (terminada) {
    const total = leccion.preguntas.length;
    return (
      <Shell>
        <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
          <p className="text-5xl">🎉</p>
          <h1 className="mt-4 text-2xl font-semibold">¡Lección completada!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Acertaste {aciertos} de {total} preguntas y ganaste XP.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="glass rounded-2xl px-3 py-4">
              <p className="font-display text-xl font-bold text-aurora">+{leccion.xp}</p>
              <p className="text-[11px] text-muted-foreground">XP</p>
            </div>
            <div className="glass rounded-2xl px-3 py-4">
              <p className="font-display text-xl font-bold text-heat">{progreso.racha}</p>
              <p className="text-[11px] text-muted-foreground">Racha</p>
            </div>
            <div className="glass rounded-2xl px-3 py-4">
              <p className="font-display text-xl font-bold text-glow">{progreso.completadas.length}</p>
              <p className="text-[11px] text-muted-foreground">Lecciones</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {siguiente ? (
              <button
                onClick={() => {
                  navigate({ to: "/leccion/$leccionId", params: { leccionId: siguiente.id } });
                  setIndice(0);
                  setElegida(null);
                  setAciertos(0);
                  setTerminada(false);
                }}
                className="rounded-xl bg-gradient-to-r from-aurora to-mint px-6 py-3 font-display text-sm font-semibold text-ink shadow-[var(--shadow-aurora)]"
              >
                Siguiente lección
              </button>
            ) : (
              <Link
                to="/certificado"
                className="rounded-xl bg-gradient-to-r from-aurora to-mint px-6 py-3 font-display text-sm font-semibold text-ink"
              >
                Ver certificado
              </Link>
            )}
            <Link to="/" className="glass rounded-xl px-6 py-3 font-display text-sm font-semibold">
              Volver a la ruta
            </Link>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-aurora">
              Nivel {leccion.nivelNumero} · {leccion.nivelTitulo}
            </p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{leccion.titulo}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{leccion.resumen}</p>
            <div className="mt-6 space-y-4">
              {leccion.teoria.map((parrafo) => (
                <p key={parrafo} className="text-sm leading-relaxed text-slate-200">
                  {parrafo}
                </p>
              ))}
                        </div>
            {leccion.id === "velas-japonesas" && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <h2 className="font-display text-lg font-semibold">Anatomía de una vela</h2>
                                <p className="mt-1 text-xs text-muted-foreground">Selecciona cada parte de la vela para identificarla en el gráfico.</p>

                <svg viewBox="0 0 560 300" role="img" aria-label="Gráfico de la anatomía de una vela japonesa" className="mt-4 h-auto w-full">
                                    <line x1="250" y1="35" x2="250" y2="95" onClick={() => setParteSeleccionada("pabilo-superior")} stroke={parteSeleccionada === "pabilo-superior" ? "hsl(var(--aurora))" : "hsl(var(--muted-foreground))"} strokeWidth="6" strokeLinecap="round" className="cursor-pointer" />
                  <line x1="250" y1="215" x2="250" y2="265" onClick={() => setParteSeleccionada("pabilo-inferior")} stroke={parteSeleccionada === "pabilo-inferior" ? "hsl(var(--aurora))" : "hsl(var(--muted-foreground))"} strokeWidth="6" strokeLinecap="round" className="cursor-pointer" />

                                    <rect x="205" y="95" width="90" height="120" rx="8" onClick={() => setParteSeleccionada("cuerpo")} fill={parteSeleccionada === "cuerpo" ? "hsl(var(--mint))" : "hsl(var(--mint) / 0.45)"} stroke={parteSeleccionada === "cuerpo" ? "hsl(var(--aurora))" : "hsl(var(--glow))"} strokeWidth="3" className="cursor-pointer" />

                  <line x1="295" y1="95" x2="420" y2="95" stroke="hsl(var(--glow))" strokeWidth="2" />
                  <line x1="295" y1="215" x2="420" y2="215" stroke="hsl(var(--glow))" strokeWidth="2" />
                  <line x1="250" y1="35" x2="145" y2="35" stroke="hsl(var(--heat))" strokeWidth="2" />
                  <line x1="250" y1="265" x2="145" y2="265" stroke="hsl(var(--heat))" strokeWidth="2" />
                  <line x1="205" y1="95" x2="95" y2="95" stroke="hsl(var(--mint))" strokeWidth="2" />
                  <line x1="205" y1="215" x2="95" y2="215" stroke="hsl(var(--mint))" strokeWidth="2" />
                                    <text x="428" y="100" onClick={() => setParteSeleccionada("cierre")} fill={parteSeleccionada === "cierre" ? "hsl(var(--aurora))" : "hsl(var(--foreground))"} fontSize="16" fontWeight="600" className="cursor-pointer">Cierre</text>
                  <text x="428" y="220" onClick={() => setParteSeleccionada("apertura")} fill={parteSeleccionada === "apertura" ? "hsl(var(--aurora))" : "hsl(var(--foreground))"} fontSize="16" fontWeight="600" className="cursor-pointer">Apertura</text>

                                    <text x="20" y="40" onClick={() => setParteSeleccionada("máximo")} fill={parteSeleccionada === "máximo" ? "hsl(var(--aurora))" : "hsl(var(--foreground))"} fontSize="16" fontWeight="600" className="cursor-pointer">Máximo</text>
                  <text x="20" y="270" onClick={() => setParteSeleccionada("mínimo")} fill={parteSeleccionada === "mínimo" ? "hsl(var(--aurora))" : "hsl(var(--foreground))"} fontSize="16" fontWeight="600" className="cursor-pointer">Mínimo</text>

                  <text x="20" y="100" fill="hsl(var(--foreground))" fontSize="16" fontWeight="600">Cuerpo</text>
                  <text x="20" y="220" fill="hsl(var(--foreground))" fontSize="16" fontWeight="600">Cuerpo</text>
                  <text x="335" y="55" fill="hsl(var(--muted-foreground))" fontSize="14">Mecha superior</text>
                  <text x="335" y="285" fill="hsl(var(--muted-foreground))" fontSize="14">Mecha inferior</text>
                                </svg>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {["pabilo-superior", "pabilo-inferior", "cuerpo", "apertura", "cierre", "máximo", "mínimo"].map((parte) => (
                    <button key={parte} type="button" onClick={() => setParteSeleccionada(parte)} className={`rounded-lg border px-3 py-2 text-xs capitalize transition ${parteSeleccionada === parte ? "border-aurora bg-aurora/15 text-aurora" : "border-border bg-white/5 text-muted-foreground hover:bg-white/10"}`}>
                      {parte.replace("-", " ")}
                    </button>
                  ))}
                </div>
                <p className="mt-3 rounded-lg bg-white/5 px-3 py-2 text-xs text-muted-foreground">Parte seleccionada: <span className="font-semibold capitalize text-foreground">{parteSeleccionada.replace("-", " ")}</span></p>
              </div>

            )}
          </div>
        </section>

        <aside className="lg:col-span-5">
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Quiz</h2>
              <span className="text-xs text-muted-foreground">
                Pregunta {indice + 1} de {leccion.preguntas.length}
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-aurora to-glow transition-all"
                style={{ width: `${((indice + (elegida !== null ? 1 : 0)) / leccion.preguntas.length) * 100}%` }}
              />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-100">{pregunta.enunciado}</p>

            <div className="mt-4 grid gap-2.5">
              {pregunta.opciones.map((o, i) => {
                const seleccionada = elegida === i;
                const revelada = elegida !== null;
                const base = "rounded-xl border px-4 py-3 text-left text-sm transition";
                let estilo = "border-border bg-white/5 text-slate-300 hover:bg-white/10";
                if (revelada && o.correcta) estilo = "border-mint/50 bg-mint/15 text-mint font-medium";
                else if (revelada && seleccionada) estilo = "border-heat/50 bg-heat/15 text-heat font-medium";
                else if (revelada) estilo = "border-border bg-white/5 text-muted-foreground";
                return (
                  <button key={o.texto} onClick={() => responder(i)} className={`${base} ${estilo}`}>
                    {o.texto}
                  </button>
                );
              })}
            </div>

            {elegida !== null && (
              <div
                className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                  acerto ? "border-mint/40 bg-mint/10 text-slate-100" : "border-heat/40 bg-heat/10 text-slate-100"
                }`}
              >
                <p className="font-display font-semibold">{acerto ? "¡Correcto!" : "Casi"}</p>
                <p className="mt-1 text-muted-foreground">{pregunta.explicacion}</p>
              </div>
            )}

            <button
              onClick={avanzar}
              disabled={elegida === null}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-aurora to-mint px-4 py-3 font-display text-sm font-semibold text-ink transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {indice + 1 < leccion.preguntas.length ? "Siguiente pregunta" : "Terminar lección"}
            </button>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
