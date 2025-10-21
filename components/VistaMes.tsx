import Calendario from '@/components/Calendario';
import VistaDia from '@/components/VistaDia';
import { Actividad } from '@/data/types';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function VistaMes({ actividades }: { actividades: Actividad[] }) {
  const [actividadesDia, setActividadesDia] = useState<Actividad[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number | null>(null);
  const [mesSeleccionado, setMesSeleccionado] = useState<number | null>(null);
  const [anioSeleccionado, setAnioSeleccionado] = useState<number | null>(null);

  const hoy = new Date();
  const mesActual = hoy.getMonth();
  const anioActual = hoy.getFullYear();

  // 🔹 Generar los próximos 3 meses
  const meses = Array.from({ length: 3 }, (_, i) => {
    const nuevoMes = (mesActual + i) % 12;
    const nuevoAnio = anioActual + Math.floor((mesActual + i) / 12);
    return { mes: nuevoMes, anio: nuevoAnio };
  });

  // 📅 Si hay un día seleccionado → mostrar vista del día
  if (diaSeleccionado !== null && actividadesDia.length > 0) {
    const fecha = new Date(anioSeleccionado!, mesSeleccionado!, diaSeleccionado);

    return (
      <View style={styles.vistaDiaContainer}>
        <TouchableOpacity
          onPress={() => {
            setDiaSeleccionado(null);
            setActividadesDia([]);
          }}
          style={styles.botonVolver}
          activeOpacity={0.7}
        >
          <Text style={styles.flecha}>←</Text>
        </TouchableOpacity>

        <Text style={styles.fecha}>
          {fecha.toLocaleDateString('es-AR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          }).toUpperCase()}
        </Text>

        <VistaDia
          actividades={actividadesDia}
          fecha={fecha}
        />
      </View>
    );
  }

  // 🗓️ Render del calendario con scroll
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {meses.map(({ mes, anio }) => (
          <Calendario
            key={`${mes}-${anio}`}
            mes={mes}
            anio={anio}
            actividades={actividades}
            onSelectDay={(dia, acts) => {
              setDiaSeleccionado(dia);
              setMesSeleccionado(mes);
              setAnioSeleccionado(anio);
              setActividadesDia(acts);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingBottom: 100, // espacio final para no cortar con el navbar
  },
  vistaDiaContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 25,
    alignItems: 'center',
  },
  fecha: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 10,
  },
  botonVolver: {
    position: 'absolute',
    bottom: 85,
    alignSelf: 'center',
    backgroundColor: '#f0bdb7ff',
    borderWidth: 2,
    borderColor: '#111',
    borderRadius: 40,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    zIndex: 10,
  },
  flecha: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111',
    top: -2,
  },
});
