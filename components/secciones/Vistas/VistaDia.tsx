import { Actividad } from '@/data/types';
import React, { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import CardDia from '../../Cards/CardDia';

interface VistaDiaProps {
  actividades: Actividad[];
  fecha?: Date;
  onEditTarea?: (tarea: Actividad) => void;
}

export default React.memo(function VistaDia({ actividades, fecha, onEditTarea }: VistaDiaProps) {
  const fechaReferencia = fecha || new Date();

  // 🔥 Corregir el tipo de diaSemana
  const diaSemana: string = fechaReferencia
    .toLocaleDateString('es-AR', { weekday: 'long' })
    .toLowerCase();

  const diaMes: number = fechaReferencia.getDate();

  const tareasDelDia = useMemo(() => {
    console.log('📆 [VistaDia] Renderizando día:', diaSemana, '(', diaMes, ')');
    console.log('📋 [VistaDia] Actividades recibidas:', actividades.length);

    const filtradas = actividades.filter((act: Actividad) => {
      try {
        const diaActualCorto: string = diaSemana.slice(0, 3);
        const diaCapitalizado: string = diaActualCorto.charAt(0).toUpperCase() + diaActualCorto.slice(1);

        // 🟢 Caso 1: repetición semanal con campo diaDeSemana
        if (act.repeticion === 'semanal' && typeof act.diaDeSemana === 'string') {
          const dias: string[] = act.diaDeSemana
            .split(',')
            .map((d: string) => d.trim().toLowerCase());
          if (dias.some((d: string) => d.startsWith(diaCapitalizado.toLowerCase()))) {
            console.log('✅ [VistaDia] Coincide (semanal):', act.titulo);
            return true;
          }
        }

        // 🟢 Caso 2: regla personalizada "por_dias"
        if (act.reglaRepeticion === 'por_dias' && typeof act.diaDeSemana === 'string') {
          const dias: string[] = act.diaDeSemana
            .split(',')
            .map((d: string) => d.trim().toLowerCase());
          if (dias.some((d: string) => d.startsWith(diaCapitalizado.toLowerCase()))) {
            console.log('✅ [VistaDia] Coincide (por_dias):', act.titulo);
            return true;
          }
        }

        // 🟢 Caso 3: tarea con fecha única (no repetitiva)
        if (act.fechaInicio) {
          const fechaAct = new Date(act.fechaInicio);
          if (
            fechaAct.getDate() === diaMes &&
            fechaAct.getMonth() === fechaReferencia.getMonth() &&
            fechaAct.getFullYear() === fechaReferencia.getFullYear()
          ) {
            console.log('✅ [VistaDia] Coincide (fecha única):', act.titulo);
            return true;
          }
        }

        // 🟢 Caso 4: visible en vista del día
        if (act.vistaDia) {
          console.log('✅ [VistaDia] Coincide (vistaDia=true):', act.titulo);
          return true;
        }

        return false;
      } catch (err) {
        console.error('❌ [VistaDia] Error filtrando tarea:', act, err);
        return false;
      }
    });

    // 🔄 Ordenar por horaInicio
    const ordenadas = [...filtradas].sort((a: Actividad, b: Actividad) => {
      const horaA = a.horaInicio || '';
      const horaB = b.horaInicio || '';
      
      if (!horaA && !horaB) return 0;
      if (!horaA) return 1;
      if (!horaB) return -1;
      return horaA.localeCompare(horaB);
    });

    console.log('📊 [VistaDia] Tareas del día encontradas:', ordenadas.length);
    return ordenadas;
  }, [actividades, diaSemana, diaMes, fechaReferencia]);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      {tareasDelDia.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#555', marginTop: 20 }}>
          No hay actividades este día 🎉
        </Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tareasDelDia}
          keyExtractor={(item: Actividad) => item.id.toString()}
          renderItem={({ item }: { item: Actividad }) => (
            <CardDia 
              actividad={item} 
              onEdit={onEditTarea} // 🔥 Esto debería funcionar ahora
            />
          )}
        />
      )}
    </View>
  );
});