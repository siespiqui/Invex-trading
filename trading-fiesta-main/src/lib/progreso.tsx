import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { insignias, leccionesPlanas, niveles, totalLecciones } from "./curso";
import api from '../api';

export type Progreso = {
  nombre: string;
  completadas: string[];
  xp: number;
  racha: number;
  ultimoDia: string | null;
  premium: boolean;
};

const CLAVE = "tradego-progreso-v1";

const inicial: Progreso = {
  nombre: "Estudiante",
  completadas: [],
  xp: 0,
  racha: 0,
  ultimoDia: null,
  premium: false,
};

function hoy() {
  return new Date().toISOString().slice(0, 10);
}

function ayer() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

type Ctx = {
  progreso: Progreso;
  hidratado: boolean;
  completarLeccion: (id: string, xp: number) => void;
  estaDesbloqueada: (id: string) => boolean;
  reiniciar: () => void;
  activarPremium: (valor: boolean) => void;
  cambiarNombre: (nombre: string) => void;
};

const ProgresoContext = createContext<Ctx | null>(null);

export function ProgresoProvider({ children }: { children: ReactNode }) {
  const [progreso, setProgreso] = useState<Progreso>(inicial);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (guardado) setProgreso({ ...inicial, ...(JSON.parse(guardado) as Partial<Progreso>) });
    } catch {
      /* almacenamiento no disponible */
    }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(progreso));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [progreso, hidratado]);

const completarLeccion = useCallback((id: string, xp: number) => {
    setProgreso((p) => {
      const yaHecha = p.completadas.includes(id);
      const dia = hoy();
      let racha = p.racha;
      if (p.ultimoDia !== dia) racha = p.ultimoDia === ayer() ? p.racha + 1 : 1;
      
      const nuevoProgreso = {
        ...p,
        completadas: yaHecha ? p.completadas : [...p.completadas, id],
        xp: p.xp + (yaHecha ? Math.round(xp / 4) : xp),
        racha,
        ultimoDia: dia,
      };

      // Le avisamos a Django que el usuario avanzó
      api.post('progresos/', {
        // Ajusta estos campos según lo que pida tu modelo ProgresoUsuario en Django
        leccion_id: id,
        xp_actual: nuevoProgreso.xp,
        racha_actual: nuevoProgreso.racha
      }).catch(err => console.error("Fallo al guardar progreso en Django:", err));

      return nuevoProgreso;
    });
  }, []);

  const estaDesbloqueada = useCallback(
    (id: string) => {
      const indice = leccionesPlanas.findIndex((l) => l.id === id);
      if (indice <= 0) return true;
      const anterior = leccionesPlanas[indice - 1];
      return anterior ? progreso.completadas.includes(anterior.id) : true;
    },
    [progreso.completadas],
  );

  const valor = useMemo<Ctx>(
    () => ({
      progreso,
      hidratado,
      completarLeccion,
      estaDesbloqueada,
      reiniciar: () => setProgreso(inicial),
      activarPremium: (v: boolean) => setProgreso((p) => ({ ...p, premium: v })),
      cambiarNombre: (nombre: string) => setProgreso((p) => ({ ...p, nombre: nombre || "Estudiante" })),
    }),
    [progreso, hidratado, completarLeccion, estaDesbloqueada],
  );

  return <ProgresoContext.Provider value={valor}>{children}</ProgresoContext.Provider>;
}

export function useProgreso() {
  const ctx = useContext(ProgresoContext);
  if (!ctx) throw new Error("useProgreso debe usarse dentro de ProgresoProvider");
  return ctx;
}

export function nivelActual(completadas: string[]) {
  // Si los niveles aún no han cargado o están vacíos, retornamos un nivel por defecto para que no colapse la app
  if (!niveles || niveles.length === 0) {
    return { numero: 1, etiqueta: "Principiante", titulo: "Fundamentos", lecciones: [] };
  }
  for (const nivel of niveles) {
    if (nivel.lecciones.some((l) => !completadas.includes(l.id))) return nivel;
  }
  return niveles[niveles.length - 1]!;
}

export function siguienteLeccion(completadas: string[]) {
  return leccionesPlanas.find((l) => !completadas.includes(l.id)) ?? null;
}

export function insigniasObtenidas(p: Progreso) {
  const nivel = nivelActual(p.completadas).numero;
  return insignias.map((i) => {
    const valor =
      i.tipo === "lecciones" ? p.completadas.length : i.tipo === "racha" ? p.racha : i.tipo === "xp" ? p.xp : nivel;
    return { ...i, valor, obtenida: valor >= i.meta };
  });
}

export function porcentajeCurso(completadas: string[]) {
  return Math.round((completadas.length / totalLecciones) * 100);
}

export function iniciales(nombre: string) {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
