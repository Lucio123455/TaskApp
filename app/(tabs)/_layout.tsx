import { Tabs, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable } from 'react-native';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const icons = {
    lapiz: require('../../assets/images/lapiz.png'),
    agenda: require('../../assets/images/agenda.png'),
    configuracion: require('../../assets/images/configuracion.png'),
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fcdedc',
        tabBarStyle: {
          backgroundColor: '#e0887f',
          borderTopWidth: 0,
          height: 80,
          paddingTop: 0,
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
              style={{ width: 60, height: 60, resizeMode: 'contain' }}
            />
          ),
        }}
      />

      {/* 📅 Botón central - Agenda / Home */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() => {
                if (pathname === '/(tabs)') {
                  // Si estás en el home, ir a la agenda
                  router.push('/Agenda');
                } else {
                  // Si estás en la agenda, volver al home
                  router.push('/(tabs)');
                }
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: -10, // 🔹 un poquito más arriba
              }}
            >
              <Image
                source={icons.agenda}
                style={{
                  width: 78,
                  height: 78,
                  resizeMode: 'contain',
                }}
              />
            </Pressable>
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
              style={{ width: 60, height: 60, resizeMode: 'contain' }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
