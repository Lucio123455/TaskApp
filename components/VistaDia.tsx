import { Actividad } from '@/data/types';
import { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import Tarea from './Tarea';

interface VistaDiaProps {
  actividades: Actividad[];
}

export default function VistaDia({ actividades }: VistaDiaProps) {

  const diaSemana = new Date().toLocaleDateString('es-AR', { weekday: 'long' });

  const tareasDelDia = useMemo(() => {
    return actividades.filter(act => {
      if (act.dias.includes(diaSemana)) return true;
      if (act.fechaInicio === new Date().toISOString().slice(0,10)) return true;
      if (act.repeticion === 'diaria') return true;
      return false;
    });
  }, [actividades]);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      {tareasDelDia.length === 0 ? (
        <Text>No hay actividades hoy 🎉</Text>
      ) : (
        <FlatList
          data={tareasDelDia}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
  <Tarea
    titulo={item.titulo}
    descripcion={item.descripcion}
    horaInicio={item.horaInicio ?? ''}
    horaFin={item.horaFin ?? ''}
  />
)}

        />
      )}
    </View>
  );
}
