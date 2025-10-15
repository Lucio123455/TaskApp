import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  titulo: string;
  descripcion: string;
  horaInicio: string;
  horaFin: string;
};

export default function Tarea({ titulo, descripcion, horaInicio, horaFin }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.description}>{descripcion}</Text>
      <Text style={styles.time}>
        {horaInicio} - {horaFin}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  time: {
    fontSize: 13,
    color: '#888',
    marginTop: 6,
  },
});
