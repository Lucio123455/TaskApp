import { Actividad } from '@/data/types';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CalendarioProps {
  mes: number; // 0–11
  anio: number;
  actividades: Actividad[];
  onSelectDay: (dia: number, acts: Actividad[]) => void;
}

export default function Calendario({ mes, anio, actividades, onSelectDay }: CalendarioProps) {
  const [diaSeleccionado, setDiaSeleccionado] = useState<number | null>(null);

  const diasEnMes = new Date(anio, mes + 1, 0).getDate();
  const primerDiaSemana = new Date(anio, mes, 1).getDay(); // 0=Domingo

  // Agrupar actividades por día (solo las que se muestran en vista mensual)
  const actividadesPorDia = useMemo(() => {
    const mapa: Record<number, Actividad[]> = {};
    actividades
      .filter((a) => a.vistaMensual)
      .forEach((act) => {
        if (act.diasMes && act.diasMes.length > 0) {
          act.diasMes.forEach((d) => {
            if (!mapa[d]) mapa[d] = [];
            mapa[d].push(act);
          });
        }
      });
    return mapa;
  }, [actividades]);

  const diasTotales = Array.from({ length: diasEnMes }, (_, i) => i + 1);

  const nombreMes = new Date(anio, mes).toLocaleString('es-AR', {
    month: 'long',
  });

  return (
    <View style={styles.container}>
      {/* Encabezado del mes */}
      <Text style={styles.header}>
        {nombreMes.toUpperCase()} {anio}
      </Text>

      {/* Encabezado de días */}
      <View style={styles.weekHeader}>
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => (
          <Text key={i} style={styles.weekDay}>
            {d}
          </Text>
        ))}
      </View>

      {/* Grilla */}
      <View style={styles.grid}>
        {Array.from({ length: (primerDiaSemana + 6) % 7 }).map((_, i) => (
          <View key={`empty-${i}`} style={styles.dayCell} />
        ))}

        {diasTotales.map((dia) => {
          const acts = actividadesPorDia[dia];
          const tieneActividades = !!acts;
          const esSeleccionado = diaSeleccionado === dia;

          return (
            <TouchableOpacity
              key={dia}
              onPress={() => {
                if (tieneActividades) {
                  setDiaSeleccionado(dia);
                  onSelectDay(dia, acts);
                }
              }}
              style={[
                styles.dayCell,
                tieneActividades && styles.dayWithEvent,
                esSeleccionado && styles.daySelected,
              ]}
              activeOpacity={tieneActividades ? 0.8 : 1}
            >
              <Text
                style={[
                  styles.dayNumber,
                  tieneActividades && styles.dayNumberActive,
                ]}
              >
                {dia}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.1)', // transparente con leve brillo
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
    marginBottom: 4,
  },
  weekDay: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    width: 40,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 6,
  },
  dayCell: {
    width: 40,
    height: 40,
    margin: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dayWithEvent: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2,
  },
  daySelected: {
    backgroundColor: '#b8e8c9',
    borderWidth: 2,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  dayNumberActive: {
    fontWeight: '800',
    color: '#000',
  },
});
