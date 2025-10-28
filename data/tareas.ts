import { db } from './database';

export async function obtenerTareas() {
  try {
    const result = await db.getAllAsync(
      'SELECT * FROM tareas ORDER BY fechaInicio ASC, horaInicio ASC'
    );
    console.log('✅ [obtenerTareas] Tareas obtenidas:', result.length);
    return result;
  } catch (error) {
    console.error('❌ [obtenerTareas] Error al obtener tareas:', error);
    return [];
  }
}

// Insertar o editar una tarea
export async function guardarTarea(tarea: any) {
  try {
    console.log('🟡 [guardarTarea] Intentando guardar tarea:', tarea);

    const {
      id,
      titulo,
      descripcion,
      fechaInicio,
      horaInicio,
      horaFin,
      repeticion,
      reglaRepeticion,
      semanaDelMes,
      diaDeSemana,
      color,
      vistaDia,
      vistaSemanal,
      vistaMensual,
      completada
    } = tarea;

    const query = `
      INSERT OR REPLACE INTO tareas 
      (id, titulo, descripcion, fechaInicio, horaInicio, horaFin, repeticion, reglaRepeticion, semanaDelMes, diaDeSemana, color, vistaDia, vistaSemanal, vistaMensual, completada)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      id,
      titulo,
      descripcion || '',
      fechaInicio || null,
      horaInicio || null,
      horaFin || null,
      repeticion || 'una_vez',
      reglaRepeticion || null,
      semanaDelMes || null,
      diaDeSemana || null,
      color || '#E9D5FF',
      vistaDia ? 1 : 0,
      vistaSemanal ? 1 : 0,
      vistaMensual ? 1 : 0,
      completada ? 1 : 0
    ];

    await db.runAsync(query, params);
    console.log('✅ [guardarTarea] Tarea guardada correctamente:', titulo || id);
  } catch (error) {
    console.error('❌ [guardarTarea] Error al guardar tarea:', error);
  }
}

// Marcar como completada / no completada
export async function marcarTarea(id: string, completada: boolean) {
  try {
    await db.runAsync('UPDATE tareas SET completada = ? WHERE id = ?', [completada ? 1 : 0, id]);
    console.log(`🔄 [marcarTarea] Tarea ${id} marcada como ${completada ? 'completada' : 'pendiente'}`);
  } catch (error) {
    console.error('❌ [marcarTarea] Error al actualizar tarea:', error);
  }
}

// Eliminar una tarea
export async function eliminarTarea(id: string) {
  try {
    await db.runAsync('DELETE FROM tareas WHERE id = ?', [id]);
    console.log('🗑️ [eliminarTarea] Tarea eliminada:', id);
  } catch (error) {
    console.error('❌ [eliminarTarea] Error al eliminar tarea:', error);
  }
}
