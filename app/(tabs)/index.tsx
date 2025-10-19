import VistaDia from '@/components/VistaDia';
import VistaSemanal from '@/components/VistaSemanal';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { actividadesData } from '../../data/actividades';

export default function HomeScreen() {
  const [pagina, setPagina] = useState(0);
  const [actividades_lista, setActividadesLista] = useState<any[]>(actividadesData);

  const etiquetas = ['Resumen', 'Día', 'Semana', 'Mes'];

  return (
    <SafeAreaView style={styles.container}>
      <PagerView
        style={styles.pager}
        initialPage={1}
        onPageSelected={e => setPagina(e.nativeEvent.position)}
      >
        <View key="0" style={[styles.pagina, { backgroundColor: '#e0887f' }]}>
          <Text style={styles.texto}>Resumen</Text>
        </View>

        <View key="1" style={[styles.pagina, { backgroundColor: '#e0887f' }]}>
          <VistaDia actividades={actividades_lista} />
        </View>

        <View key="2" style={[styles.pagina, { backgroundColor: '#e0887f' }]}>
          <VistaSemanal actividades={actividades_lista} />
        </View>

        <View key="3" style={[styles.pagina, { backgroundColor: '#e0887f' }]}>
          <Text style={styles.texto}>Vista del Mes 🗓️</Text>
        </View>
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0887f', // 👈 ahora el fondo también pinta el notch
  },
  pager: {
    flex: 1,
  },
  pagina: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 24,
    fontWeight: '600',
  },
});
