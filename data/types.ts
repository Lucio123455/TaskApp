// En @/data/types.ts
export interface Actividad {
  id: string;
  titulo: string;
  descripcion?: string;
  fechaInicio: string | null;
  horaInicio: string | null;
  horaFin: string | null;
  repeticion: 'una_vez' | 'diaria' | 'semanal' | 'mensual' | 'anual' | 'personalizada';
  reglaRepeticion: string | null;
  semanaDelMes: number | null;
  diaDeSemana: string | null;
  color: string;
  vistaDia: boolean;
  vistaSemanal: boolean;
  vistaMensual: boolean;
  completada: boolean;
}