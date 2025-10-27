import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface Nota {
  id: string;
  titulo: string;
  contenido: string;
}

interface NotaItemProps {
  nota: Nota;
  onPreview: (nota: Nota) => void;
  onEdit: (nota: Nota) => void;
}

export default function NotaItem({ nota, onPreview, onEdit }: NotaItemProps) {
  return (
    <Pressable
      onPress={() => onPreview(nota)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed, // 🔹 pequeña reacción táctil
      ]}
    >
      <View style={styles.leftSection}>
        <Image
          source={require('@/assets/images/agenda.png')}
          style={styles.iconLeft}
          resizeMode="contain"
        />
        <Text style={styles.title} numberOfLines={1}>
          {nota.titulo}
        </Text>
      </View>

      <Pressable
        onPress={() => onEdit(nota)}
        hitSlop={10} // 🔹 área de toque más grande
        style={({ pressed }) => [styles.editButton, pressed && styles.editPressed]}
      >
        <Image
          source={require('@/assets/images/lapiz.png')}
          style={styles.iconEdit}
          resizeMode="contain"
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    backgroundColor: '#f5f5f5',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconLeft: {
    width: 34,
    height: 34,
    marginRight: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1C',
    flexShrink: 1,
  },
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
