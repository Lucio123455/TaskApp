import { Actividad } from '@/data/types';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

dayjs.extend(isoWeek);

interface CalendarioProps {
  mes: number;
  anio: number;
  actividades: Actividad[];
  onSelectDay: (dia: number, acts: Actividad[]) => void;
}

export default function Calendario({ mes, anio, actividades, onSelectDay }: CalendarioProps) {
  const [diaSeleccionado, setDiaSeleccionado] = useState<number | null>(null);

  const startOfMonth = dayjs(new Date(anio, mes, 1));
  const startDate = startOfMonth.startOf('week'); // lunes como inicio
  const endOfMonth = dayjs(new Date(anio, mes + 1, 0));
  const endDate = endOfMonth.endOf('week'); // domingo final

  // 🔹 Generar todas las fechas visibles (42 máx)
  const dias = useMemo(() => {
    const result: dayjs.Dayjs[] = [];
    let current = startDate;
    while (current.isBefore(endDate) || current.isSame(endDate)) {
      result.push(current);
      current = current.add(1, 'day');
    }
    return result;
  }, [mes, anio]);

  // 🔹 Mapa de actividades por día (solo las que aplican a este mes)
  const actividadesPorDia = useMemo(() => {
    const mapa: Record<number, Actividad[]> = {};
    for (const act of actividades) {
      if (!act.vistaMensual || !act.diasMes) continue;
      for (const d of act.diasMes) {
        if (!mapa[d]) mapa[d] = [];
        mapa[d].push(act);
      }
    }
    return mapa;
  }, [actividades]);

  const nombreMes = startOfMonth.format('MMMM').toUpperCase();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{`${nombreMes} ${anio}`}</Text>

      {/* Cabecera de días */}
      <View style={styles.weekHeader}>
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => (
          <Text key={d} style={styles.weekDay}>{d}</Text>
        ))}
      </View>

      {/* Grilla */}
      <View style={styles.grid}>
        {dias.map((fecha) => {
          const dia = fecha.date();
          const esDelMes = fecha.month() === mes;
          const acts = esDelMes ? actividadesPorDia[dia] : undefined;
          const tieneAct = !!acts;
          const esSeleccionado = esDelMes && diaSeleccionado === dia;

          return (
            <TouchableOpacity
              key={fecha.toString()}
              onPress={() => {
                if (esDelMes && tieneAct) {
                  setDiaSeleccionado(dia);
                  onSelectDay(dia, acts);
                }
              }}
              activeOpacity={esDelMes && tieneAct ? 0.8 : 1}
              style={[
                styles.dayCell,
                !esDelMes && styles.outsideMonth,
                tieneAct && styles.dayWithEvent,
                esSeleccionado && styles.daySelected,
              ]}
            >
              <Text style={[styles.dayText, !esDelMes && styles.outsideText]}>
                {dia}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const CELL_SIZE = 42;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
    width: '90%',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
    color: '#111',
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 6,
  },
  weekDay: {
    width: CELL_SIZE,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayWithEvent: {
    backgroundColor: 'rgba(183, 240, 199, 0.7)',
  },
  daySelected: {
    backgroundColor: '#b8e8c9',
    borderWidth: 2,
  },
  outsideMonth: {
    backgroundColor: 'rgba(240,240,240,0.6)',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  outsideText: {
    color: '#999',
  },
});
