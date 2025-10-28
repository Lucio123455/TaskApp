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

db.execAsync(`
  CREATE TABLE IF NOT EXISTS tareas (
    id TEXT PRIMARY KEY NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fechaInicio TEXT,       -- formato ISO: YYYY-MM-DD
    horaInicio TEXT,        -- "10:00"
    horaFin TEXT,           -- "11:00"
    repeticion TEXT,        -- 'una_vez', 'diaria', 'semanal', 'mensual', 'anual', 'personalizada'
    reglaRepeticion TEXT,   -- ej: 'segundo_lunes_mes'
    semanaDelMes INTEGER,   -- 1=primera, 2=segunda, 3=tercera, 4=cuarta, -1=última
    diaDeSemana TEXT,       -- 'lunes', 'martes', etc.
    color TEXT,
    vistaDia INTEGER,       -- 0 o 1 (boolean)
    vistaSemanal INTEGER,   -- 0 o 1 (boolean)
    vistaMensual INTEGER,   -- 0 o 1 (boolean)
    completada INTEGER      -- 0 o 1
  );
`);