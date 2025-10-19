import { Actividad } from '@/data/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CardDiaProps {
  actividad: Actividad;
}

export default function CardDia({ actividad }: CardDiaProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.outerBorder, { backgroundColor: '#000' }]}>
        <View style={[styles.card, { backgroundColor: actividad.color || '#FDE68A' }]}>
          {/* Horario */}
          <View style={styles.horaContainer}>
            <Text style={styles.hora}>{actividad.horaInicio}</Text>
            <Text style={styles.horaFin}>{actividad.horaFin}</Text>
          </View>

          {/* Título */}
          <Text style={styles.titulo}>{actividad.titulo.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 22,
  },
  outerBorder: {
    borderRadius: 26,
    padding: 3, // el grosor del borde negro
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 3, height: 4 },
    elevation: 6,
  },
  card: {
    width: 320,
    height: 100,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  horaContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  hora: {
    fontSize: 17,
    fontWeight: '900',
    color: '#111',
  },
  horaFin: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111',
  },
  titulo: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#111',
  },
});
