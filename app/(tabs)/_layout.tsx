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
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fcdedc',
        tabBarStyle: {
          backgroundColor: '#e0887f',
          borderTopWidth: 0,
          height: 85, // 🔹 más alto para íconos grandes
          paddingBottom: 12,
          paddingTop: 8,
          elevation: 0, // 🔹 sin sombra blanca
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 14,
        },
      }}
    >

      {/* 🟣 Izquierda - Lápiz */}
      <Tabs.Screen
        name="editar"
        options={{
          title: 'Editar',
          tabBarIcon: () => (
            <Image
              source={icons.lapiz}
              style={{
                width: 36,
                height: 36,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />

      {/* 🔵 Centro - Agenda */}
      <Tabs.Screen
        name="agenda"
        options={{
          title: 'Agenda',
          tabBarIcon: () => (
            <Image
              source={icons.agenda}
              style={{
                width: 42,
                height: 42,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />

      {/* 🟢 Derecha - Configuración */}
      <Tabs.Screen
        name="config"
        options={{
          title: 'Config',
          tabBarIcon: () => (
            <Image
              source={icons.configuracion}
              style={{
                width: 36,
                height: 36,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
