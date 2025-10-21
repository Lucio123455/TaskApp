import { Actividad } from '@/data/types';
import { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import CardDia from './CardDia';

interface VistaDiaProps {
  actividades: Actividad[];
  fecha?: Date; // opcional: fecha específica (usada por VistaMes)
}

export default function VistaDia({ actividades, fecha }: VistaDiaProps) {
  // Si se pasa una fecha específica, usamos esa. Si no, usamos la actual.
  const fechaReferencia = fecha || new Date();

  const diaSemana = fechaReferencia
    .toLocaleDateString('es-AR', { weekday: 'long' })
    .toLowerCase();

  const diaMes = fechaReferencia.getDate();

  const tareasDelDia = useMemo(() => {
    const filtradas = actividades.filter(act => {
      // Si tiene días definidos (semanales)
      if (act.dias && act.dias.length > 0) {
        const dias = act.dias.map(d => d.toLowerCase());
        if (dias.includes(diaSemana) || dias.includes('todos')) return true;
      }

      // Si tiene días del mes definidos (mensuales)
      if (act.diasMes && act.diasMes.includes(diaMes)) return true;

      // Si tiene una fecha única (no repetitiva)
      if (act.fechaInicio) {
        const fechaAct = new Date(act.fechaInicio);
        return (
          fechaAct.getDate() === diaMes &&
          fechaAct.getMonth() === fechaReferencia.getMonth() &&
          fechaAct.getFullYear() === fechaReferencia.getFullYear()
        );
      }

      return false;
    });

    // Ordenar por horaInicio (las que no tienen hora al final)
    const ordenadas = [...filtradas].sort((a, b) => {
      if (!a.horaInicio && !b.horaInicio) return 0;
      if (!a.horaInicio) return 1;
      if (!b.horaInicio) return -1;
      return a.horaInicio.localeCompare(b.horaInicio);
    });

    return ordenadas;
  }, [actividades, diaSemana, diaMes]);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      {tareasDelDia.length === 0 ? (
        <Text>No hay actividades este día 🎉</Text>
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

