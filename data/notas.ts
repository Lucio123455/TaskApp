import { db } from './database';

export async function obtenerNotas() {
  const result = await db.getAllAsync('SELECT * FROM notas ORDER BY id DESC');
  return result;
}

export async function guardarNota(id: string, titulo: string, contenido: string) {
  await db.runAsync(
    'INSERT OR REPLACE INTO notas (id, titulo, contenido) VALUES (?, ?, ?)',
    [id, titulo, contenido]
  );
}

export async function eliminarNota(id: string) {
  await db.runAsync('DELETE FROM notas WHERE id = ?', [id]);
}
