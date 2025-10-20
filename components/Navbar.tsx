import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

interface NavbarProps {
  onChangePage: (index: number | 'modal') => void;
  currentPage: number;
}

export default function Navbar({ onChangePage, currentPage }: NavbarProps) {
  // 📊 Determina en qué zona estás
  const isInNotes = currentPage === 0 || currentPage === 1;
  const isInConfig = currentPage === 0;

  // 🔁 Definimos íconos dinámicos
  const icons: { src: any; target: number | 'modal'; key: string }[] = [];

  // ⚙️ Agregar botón de configuración solo si no estás en configuración
  if (!isInConfig) {
    icons.push({
      src: require('@/assets/images/configuracion.png'),
      target: 0,
      key: 'config',
    });
  }

  // 📒 / ✅ Central dinámico
  icons.push({
    src: isInNotes
      ? require('@/assets/images/task.png') // en notas/config → volver a tareas
      : require('@/assets/images/agenda.png'), // en tareas → volver a notas
    target: isInNotes ? 2 : 1,
    key: 'central',
  });

  // ✏️ / 📒 Derecho dinámico
  icons.push({
    src: isInConfig
      ? require('@/assets/images/agenda.png') // en config → notas
      : require('@/assets/images/lapiz.png'), // en resto → modal
    target: isInConfig ? 1 : 'modal',
    key: 'right',
  });

  return (
    <View
      style={[
        styles.navbar,
        isInConfig && styles.navbarCentered, // centra si hay solo 2 íconos
      ]}
    >
      {icons.map((icon) => {
        const isActive =
          currentPage === icon.target ||
          ((currentPage >= 2 && currentPage <= 4) &&
            icon.target === (isInNotes ? 2 : 1));

        return (
          <Pressable
            key={icon.key}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E2329', // tono oscuro elegante
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderTopWidth: 1.5,
    borderColor: '#2E3339', // sutil separación
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  navbarCentered: {
    justifyContent: 'space-evenly', // 🔹 centra los dos íconos
  },
  button: {
    padding: 4,
    borderRadius: 50,
  },
  icon: {
    width: 58,
    height: 58,
    transform: [{ scale: 1 }],
  },
  iconActive: {
    transform: [{ scale: 1.2 }],
  },
});
