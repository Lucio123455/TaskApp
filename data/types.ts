// /data/types.ts

export interface Actividad {
  id: string;
  titulo: string;
  dias: string[];
  fechaInicio: string | null;
  horaInicio: string | null;
  horaFin: string | null;
  repeticion: 'ninguna' | 'diaria' | 'semanal' | 'mensual' | 'anual';
  color?: string; 
}

