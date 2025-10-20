import { Actividad } from '@/data/types';
import { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import CardDia from './CardDia';

interface VistaDiaProps {
  actividades: Actividad[];
}

export default function VistaDia({ actividades }: VistaDiaProps) {
  // Día actual (en minúsculas)
  const diaSemana = new Date()
    .toLocaleDateString('es-AR', { weekday: 'long' })
    .toLowerCase();

  const tareasDelDia = useMemo(() => {
    // Filtrar actividades que correspondan al día actual
    const filtradas = actividades.filter(act => {
      const dias = act.dias.map(d => d.toLowerCase());
      return dias.includes(diaSemana) || dias.includes('todos');
    });

    // Ordenar por horaInicio (las que no tienen hora al final)
    const ordenadas = [...filtradas].sort((a, b) => {
      if (!a.horaInicio && !b.horaInicio) return 0;
      if (!a.horaInicio) return 1;
      if (!b.horaInicio) return -1;
      return a.horaInicio.localeCompare(b.horaInicio);
    });

    return ordenadas;
  }, [actividades, diaSemana]);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      {tareasDelDia.length === 0 ? (
        <Text>No hay actividades hoy 🎉</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tareasDelDia}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CardDia actividad={item} />}
        />
      )}
    </View>
  );
}

