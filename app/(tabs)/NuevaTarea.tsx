import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function NuevaTarea() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/lapiz.png')}
        style={styles.icon}
      />
      <Text style={styles.title}>✏️ Nueva Tarea</Text>
      <Text style={styles.subtitle}>Acá vas a poder crear tus tareas personalizadas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // fondo blanco limpio
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    width: 90,
    height: 90,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});
