// en VistaDia.tsx o un archivo types.ts
export interface Actividad {
  id: string;
  tipo: 'tarea' | 'recordatorio' | 'reunion';
  titulo: string;
  descripcion: string;
  dias: string[];
  fechaInicio: string | null;
  horaInicio: string | null;
  horaFin: string | null;
  categoria: string;
  repeticion: 'ninguna' | 'diaria' | 'semanal' | 'mensual' | 'anual';
}
