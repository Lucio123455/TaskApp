import { Actividad } from '@/data/types';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface CardDiaProps {
  actividad: Actividad;
  onEdit?: (actividad: Actividad) => void;
}

export default function CardDia({ actividad, onEdit }: CardDiaProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.shadowWrapper}>
        <View style={[styles.card, { backgroundColor: actividad.color || '#FDE68A' }]}>
          {/* 🕓 Horarios */}
          <View style={styles.horaContainer}>
            <Text style={styles.hora}>{actividad.horaInicio || '--:--'}</Text>
            {actividad.horaFin ? (
              <Text style={styles.horaFin}>{actividad.horaFin}</Text>
            ) : null}
          </View>

          {/* 🏷️ Título */}
          <View style={styles.centerContent}>
            <Text style={styles.titulo} numberOfLines={2}>
              {actividad.titulo}
            </Text>
          </View>

          {/* ✏️ Botón de edición */}
          <Pressable onPress={() => onEdit?.(actividad)} style={styles.editButton}>
            <Image
              source={require('@/assets/images/lapiz.png')}
              style={styles.iconEdit}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 18,
  },
  shadowWrapper: {
    borderRadius: 26,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 4 },
    elevation: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 22,
    width: 330,
    minHeight: 100,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  horaContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  hora: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  horaFin: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  editButton: {
    padding: 6,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEdit: {
    width: 32,
    height: 32,
  },
});

