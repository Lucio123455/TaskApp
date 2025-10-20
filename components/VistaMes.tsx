import Calendario from '@/components/Calendario';
import { Actividad } from '@/data/types';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function VistaMes({ actividades }: { actividades: Actividad[] }) {
  const [actividadesDia, setActividadesDia] = useState<Actividad[]>([]);

  const hoy = new Date();
  const mesActual = hoy.getMonth();
  const anioActual = hoy.getFullYear();

  // 🔹 Generar sólo los próximos 3 meses
  const meses = Array.from({ length: 3 }, (_, i) => {
    const nuevoMes = (mesActual + i) % 12;
    const nuevoAnio = anioActual + Math.floor((mesActual + i) / 12);
    return { mes: nuevoMes, anio: nuevoAnio };
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        {meses.map(({ mes, anio }) => (
          <Calendario
            key={`${mes}-${anio}`}
            mes={mes}
            anio={anio}
            actividades={actividades}
            onSelectDay={(_, acts) => setActividadesDia(acts)}
          />
        ))}

        {/* Lista de actividades del día seleccionado */}
        {actividadesDia.length > 0 && (
          <View style={styles.lista}>
            <Text style={styles.subtitulo}>🗓️ Actividades del día</Text>
            {actividadesDia.map((a) => (
              <View
                key={a.id}
                style={[styles.item, { backgroundColor: a.color || '#fff' }]}
              >
                <Text style={styles.textTitulo}>{a.titulo}</Text>
                {a.horaInicio && (
                  <Text style={styles.textHora}>
                    {a.horaInicio} - {a.horaFin || '...'}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  inner: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  lista: {
    marginTop: 25,
    alignItems: 'center',
    paddingBottom: 40,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 10,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 8,
    width: 290,
    borderWidth: 1.5,
    borderColor: '#000',
  },
  textTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
  textHora: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});
