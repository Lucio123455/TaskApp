import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ConfigScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Estás en Configuración</Text>
      <Text style={styles.subtitle}>Próximamente podrás ajustar tus preferencias acá.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0887f',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fcdedc',
    textAlign: 'center',
  },
});
