import { Actividad } from '@/data/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CardSemanaProps {
  dia: string;
  fecha?: string;
  actividades: Actividad[];
}

export default function CardSemana({ dia, fecha, actividades }: CardSemanaProps) {
  const headerColor = '#ccdfcaff';

  return (
    <View style={styles.wrapper}>
      {/* Encabezado del día */}
      <View style={[styles.outerBorder, { backgroundColor: '#000' }]}>
        <View style={[styles.card, { backgroundColor: headerColor }]}>
          <Text style={styles.dia}>
            {fecha}  {dia.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Subtarjetas de actividades */}
      {actividades.length > 0 && (
        <View style={styles.subsContainer}>
          {actividades.map((act) => (
            <View
              key={act.id}
              style={[
                styles.subCard,
                { backgroundColor: act.color || headerColor },
              ]}
            >
              <Text style={styles.titulo}>{act.titulo.toUpperCase()}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  outerBorder: {
    borderRadius: 26,
    padding: 3,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 3, height: 4 },
    elevation: 6,
  },
  card: {
    width: 320,
    height: 80,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dia: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111',
  },
  subsContainer: {
    width: 320,
    marginTop: 8,
    gap: 8,
  },
  subCard: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#111',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111',
  },
});
