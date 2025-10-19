export interface Actividad {
  id: string;
  titulo: string;
  dias: string[];
  diasMes?: number[];
  fechaInicio: string | null;
  horaInicio: string | null;
  horaFin: string | null;
  repeticion: 'ninguna' | 'diaria' | 'semanal' | 'mensual' | 'anual';
  color?: string;

  // nuevas propiedades de visibilidad
  vistaDia: boolean;
  vistaSemanal: boolean;
  vistaMensual: boolean;
}


