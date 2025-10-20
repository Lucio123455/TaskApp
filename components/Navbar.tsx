import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

interface NavbarProps {
  onChangePage: (index: number | 'modal') => void;
  currentPage: number;
}

export default function Navbar({ onChangePage, currentPage }: NavbarProps) {
  const icons: { src: any; target: number | 'modal' }[] = [
    { src: require('@/assets/images/configuracion.png'), target: 0 },
    { src: require('@/assets/images/agenda.png'), target: 1 },
    { src: require('@/assets/images/lapiz.png'), target: 'modal' },
  ];

  return (
    <View style={styles.navbar}>
      {icons.map((icon, index) => {
        const isActive =
          currentPage === icon.target ||
          ((currentPage === 2 || currentPage === 3) && icon.target === 1);

        return (
          <Pressable
            key={index}
            onPress={() => onChangePage(icon.target)}
            style={styles.button}
          >
            <Image
              source={icon.src}
              style={[
                styles.icon,
                isActive && styles.iconActive,
              ]}
              resizeMode="contain"
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between', // ⚙️ izquierda, 📒 centro, ✏️ derecha
    alignItems: 'center',
    backgroundColor: '#e0887f',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderColor: '#fff',
  },
  button: {
    padding: 0,
  },
  icon: {
    width: 60,
    height: 60,
    transform: [{ scale: 1 }],
  },
  iconActive: {
    transform: [{ scale: 1.2 }], // 🔹 crece suavemente cuando está activo
  },
});
