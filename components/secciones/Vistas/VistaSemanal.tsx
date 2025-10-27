import { Actividad } from '@/data/types';
import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import CardSemana from '../../Cards/CardSemana';

interface VistaSemanalProps {
  actividades: Actividad[];
}

export default React.memo(function VistaSemanal({ actividades }: VistaSemanalProps) {
  // 🔹 Calcular los próximos 7 días solo una vez (memoizado)
  const proximosDias = useMemo(() => {
    const hoy = new Date();
    const nombres = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

    return Array.from({ length: 7 }).map((_, i) => {
      const f = new Date(hoy);
      f.setDate(hoy.getDate() + i);
      const nombre = nombres[f.getDay()];
      const numero = f.getDate();
      const mes = f.getMonth() + 1;

      return {
        nombre,
        numeroDia: numero,
        fechaTexto: `${String(numero).padStart(2, '0')}/${String(mes).padStart(2, '0')}`,
      };
    });
  }, []);

  // 🔁 Calcular actividades por día (memoizado)
  const datosSemana = useMemo(() => {
    return proximosDias.map((dia) => {
      const acts = actividades.filter((a) => {
        if (!a.vistaSemanal) return false;

        const byNombre = (a.dias ?? [])
          .map((d) => d.toLowerCase())
          .some((d) => d === dia.nombre.toLowerCase() || d === 'todos');

        const byDiaMes = (a.diasMes ?? []).includes(dia.numeroDia);

        return byNombre || byDiaMes;
      });

      return { ...dia, actividades: acts };
    });
  }, [actividades, proximosDias]);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={datosSemana}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <CardSemana
            dia={item.nombre}
            fecha={item.fechaTexto}
            actividades={item.actividades}
          />
        )}
      />
    </View>
  );
});
