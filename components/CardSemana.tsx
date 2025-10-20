import { Actividad } from '@/data/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CardSemanaProps {
  dia: string;
  fecha?: string;
  actividades: Actividad[];
}

export default function CardSemana({ dia, fecha, actividades }: CardSemanaProps) {
  // Ordenar por horaInicio (si existe)
  const actividadesOrdenadas = [...actividades].sort((a, b) => {
    if (!a.horaInicio) return 1;
    if (!b.horaInicio) return -1;
    return a.horaInicio.localeCompare(b.horaInicio);
  });

  const headerColor = '#fab98dff'; // verde menta suave

  return (
    <View style={styles.wrapper}>
      {/* Encabezado del día */}
      <View style={styles.shadowWrapper}>
        <View style={[styles.header, { backgroundColor: headerColor }]}>
          <Text style={styles.diaTexto}>
            {fecha ? `${fecha}  ` : ''}
            {dia.toUpperCase()}
          </Text>
        </View>

        {/* Subtarjetas (actividades) */}
        {actividadesOrdenadas.length > 0 && (
          <View style={styles.subsContainer}>
            {actividadesOrdenadas.map((act) => (
              <View
                key={act.id}
                style={[
                  styles.subCard,
                  { backgroundColor: act.color || headerColor },
                ]}
              >
                <View style={styles.subHeader}>
                  <Text style={styles.hora}>
                    {act.horaInicio
                      ? act.horaFin
                        ? `${act.horaInicio} - ${act.horaFin}`
                        : act.horaInicio
                      : ''}
                  </Text>
                </View>
                <Text style={styles.titulo}>{act.titulo}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  shadowWrapper: {
    width: 320,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diaTexto: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1C1C1C',
  },
  subsContainer: {
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  subCard: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  subHeader: {
    marginBottom: 4,
  },
  hora: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
});
