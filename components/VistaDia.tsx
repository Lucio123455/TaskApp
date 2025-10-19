import { Actividad } from '@/data/types';
import { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import CardDia from './CardDia';

interface VistaDiaProps {
  actividades: Actividad[];
}

export default function VistaDia({ actividades }: VistaDiaProps) {
  // Obtener el día actual (en minúsculas para evitar problemas de comparación)
  const diaSemana = new Date().toLocaleDateString('es-AR', { weekday: 'long' }).toLowerCase();

  const tareasDelDia = useMemo(() => {
    return actividades.filter(act => {
      const dias = act.dias.map(d => d.toLowerCase());
      return dias.includes(diaSemana) || dias.includes('todos');
    });
  }, [actividades]);

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
