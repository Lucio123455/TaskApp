import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

export default function TabLayout() {
  const icons = {
    lapiz: require('../../assets/images/lapiz.png'),
    agenda: require('../../assets/images/agenda.png'),
    configuracion: require('../../assets/images/configuracion.png'),
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // ❌ sin texto
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fcdedc',
        tabBarStyle: {
          backgroundColor: '#e0887f',
          borderTopWidth: 0,
          height: 0, // 🔹 barra más alta
        },
      }}
    >
      {/* 📝 Nueva tarea */}
      <Tabs.Screen
        name="NuevaTarea"
        options={{
          tabBarIcon: () => (
            <Image
              source={icons.lapiz}
              style={{
                width: 65, // 🔹 más grande
                height: 65,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />

      {/* 📅 Agenda */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => (
            <Image
              source={icons.agenda}
              style={{
                width: 75, // 🔹 más grande aún (destacado)
                height: 75,
                resizeMode: 'contain',
                marginBottom: 5,
              }}
            />
          ),
        }}
      />

      {/* ⚙️ Configuración */}
      <Tabs.Screen
        name="config"
        options={{
          tabBarIcon: () => (
            <Image
              source={icons.configuracion}
              style={{
                width: 65,
                height: 65,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
