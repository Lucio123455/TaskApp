import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ConfigScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️  en Configuración</Text>
      <Text style={styles.subtitle}>Próximamente podrás ajustar tus preferencias acá.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000000ff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#000000ff',
    textAlign: 'center',
  },
});
