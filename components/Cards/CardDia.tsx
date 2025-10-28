import { Actividad } from '@/data/types';
import { Audio } from 'expo-av';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface CardDiaProps {
  actividad: Actividad;
  onToggleComplete?: (actividad: Actividad, completada: boolean) => void;
  onEdit?: (actividad: Actividad) => void; // 🔥 AGREGAR ESTA LÍNEA
}

export default function CardDia({ actividad, onToggleComplete, onEdit }: CardDiaProps) {
  const [completada, setCompletada] = useState(actividad.completada || false);
  const anim = useRef(new Animated.Value(0)).current;

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/sounds/lapiz.mp3')
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

    if (newState) await playSound();
  };

  const handleEdit = () => {
    console.log('Botón de editar presionado - Solo para ver el diseño');
    onEdit?.(actividad); // 🔥 LLAMAR A LA PROP onEdit
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
      <Pressable onPress={toggleComplete} style={styles.mainPressable}>
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

          {/* ✏️ Botón de editar - EXACTAMENTE IGUAL AL NOTAITEM */}
          <Pressable
            onPress={handleEdit}
            hitSlop={10}
            style={({ pressed }) => [styles.editButton, pressed && styles.editPressed]}
          >
            <Image
              source={require('@/assets/images/lapiz.png')}
              style={styles.iconEdit}
              resizeMode="contain"
            />
          </Pressable>
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
  mainPressable: {
    width: '100%',
    alignItems: 'center',
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
    minWidth: 60,
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
    marginHorizontal: 10,
    letterSpacing: 0.5,
  },
  tituloCompletado: {
    textDecorationLine: 'line-through',
    opacity: 0.4,
  },
  // 🎯 ESTILOS EXACTAMENTE IGUALES AL NOTAITEM
  editButton: {
    padding: 6,
    borderRadius: 50,
  },
  editPressed: {
    transform: [{ scale: 0.95 }],
  },
  iconEdit: {
    width: 34,
    height: 34,
  },
});