import { Actividad } from '@/data/types';
import { Audio } from 'expo-av';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface CardDiaProps {
  actividad: Actividad;
  onToggleComplete?: (actividad: Actividad, completada: boolean) => void;
}

export default function CardDia({ actividad, onToggleComplete }: CardDiaProps) {
  const [completada, setCompletada] = useState(actividad.completada || false);
  const anim = useRef(new Animated.Value(0)).current;

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/sounds/lapiz.mp3') // ✏️ sonido de lápiz o tachado
    );
    await sound.playAsync();
  };

  const toggleComplete = async () => {
    const newState = !completada;
    setCompletada(newState);
    onToggleComplete?.(actividad, newState);

    Animated.timing(anim, {
      toValue: newState ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();

    // 🔊 Reproduce el sonido solo al completar
    if (newState) await playSound();
  };
  // Interpolaciones para efectos suaves
  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.97],
  });

  const background = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [actividad.color || '#FDE68A', '#d3d3d3'],
  });

  const shadow = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 1],
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { transform: [{ scale }] },
      ]}
    >
      <Pressable onPress={toggleComplete}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: background,
              shadowOpacity: 0.25,
              elevation: shadow,
            },
          ]}
        >
          {/* 🕓 Horario */}
          <View style={styles.horaContainer}>
            <Text style={styles.hora}>{actividad.horaInicio}</Text>
            {actividad.horaFin && (
              <Text style={styles.horaFin}>{actividad.horaFin}</Text>
            )}
          </View>

          {/* 🏷️ Título */}
          <Text
            style={[
              styles.titulo,
              completada && styles.tituloCompletado,
            ]}
            numberOfLines={2}
          >
            {actividad.titulo}
          </Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 20,
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
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 4 },
  },
  horaContainer: {
    alignItems: 'flex-start',
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
  },
  titulo: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  tituloCompletado: {
    textDecorationLine: 'line-through',
    opacity: 0.4,
  },
});
