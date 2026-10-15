import api from '../api';

// Tipos de datos
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
  nivelId?: string;
  nivelNumero?: number;
  nivelTitulo?: string;
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

// Exportamos estructuras base vacías para evitar errores de importación en otros archivos
export const niveles: Nivel[] = [];
export const leccionesPlanas: Leccion[] = [];
export const totalLecciones: number = 0;

// Consulta asíncrona a Django
export async function buscarLeccion(id: string) {
  try {
    const response = await api.get(`lecciones/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error cargando la lección desde Django:", error);
    return null;
  }
}

export const insignias: Insignia[] = [
  { id: "primeros-pasos", nombre: "Primeros pasos", descripcion: "Completa tu primera lección", icono: "🚀", meta: 1, tipo: "lecciones" },
  { id: "constante", nombre: "Constante", descripcion: "Racha de 3 días seguidos", icono: "🔥", meta: 3, tipo: "racha" },
  { id: "analista", nombre: "Analista", descripcion: "Completa 5 lecciones", icono: "📊", meta: 5, tipo: "lecciones" },
  { id: "mil-xp", nombre: "Mil XP", descripcion: "Acumula 1.000 XP", icono: "◆", meta: 1000, tipo: "xp" },
  { id: "gestor", nombre: "Gestor de riesgo", descripcion: "Desbloquea el nivel 3", icono: "🛡️", meta: 3, tipo: "nivel" },
  { id: "graduado", nombre: "Graduado", descripcion: "Completa todo el curso", icono: "🎓", meta: 9, tipo: "lecciones" },
];

export const rankingBase = [
  { nombre: "Diego R.", iniciales: "DR", xp: 3940 },
  { nombre: "Lucía M.", iniciales: "LM", xp: 3710 },
  { nombre: "Aitana C.", iniciales: "AC", xp: 3280 },
];