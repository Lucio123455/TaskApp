import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

interface NavbarProps {
  onChangePage: (index: number) => void;
  currentPage: number;
}

export default function Navbar({ onChangePage, currentPage }: NavbarProps) {
  const icons = [
    { src: require('@/assets/images/lapiz.png'), target: 1 },
    { src: require('@/assets/images/agenda.png'), target: 1 },
    { src: require('@/assets/images/configuracion.png'), target: 0 },
  ];

  return (
    <View style={styles.navbar}>
      {icons.map((icon, index) => (
        <Pressable
          key={index}
          onPress={() => onChangePage(icon.target)}
          style={[
            styles.button,
            currentPage === icon.target && styles.activeButton,
          ]}
        >
          <Image
            source={icon.src}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#e0887f',
    paddingVertical: 16,
    borderTopWidth: 2,
    borderColor: '#fff',
  },
  button: {
    padding: 10,
    borderRadius: 50,
  },
  activeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: [{ scale: 1.1 }],
  },
  icon: {
    width: 60,
    height: 60,
  },
});
