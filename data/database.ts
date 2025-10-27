import * as SQLite from 'expo-sqlite';

// Abrir o crear la base
export const db = SQLite.openDatabaseSync('notas.db');

// Crear tabla si no existe
db.execAsync(`
  CREATE TABLE IF NOT EXISTS notas (
    id TEXT PRIMARY KEY NOT NULL,
    titulo TEXT NOT NULL,
    contenido TEXT
  );
`);
