import Navbar from '@/components/Navbar';
import VistaDia from '@/components/VistaDia';
import VistaSemanal from '@/components/VistaSemanal';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { actividadesData } from '../../data/actividades';

export default function HomeScreen() {
  const [pagina, setPagina] = useState(0);
  const [actividades_lista, setActividadesLista] = useState<any[]>(actividadesData);

  const etiquetas = ['Resumen', 'Día', 'Semana', 'Mes'];
  const pagerRef = useRef<PagerView>(null);

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef} // ✅ AGREGALO AQUÍ

        style={styles.pager}
        initialPage={1}
        onPageSelected={e => setPagina(e.nativeEvent.position)}
      >
        <View key="0" style={[styles.pagina, styles.colorFondo]}>
          <Text style={styles.texto}>Resumen</Text>
        </View>

        <View key="1" style={[styles.pagina, styles.colorFondo]}>
          <VistaDia actividades={actividades_lista} />
        </View>

        <View key="2" style={[styles.pagina, styles.colorFondo]}>
          <VistaSemanal actividades={actividades_lista} />
        </View>

        <View key="3" style={[styles.pagina, styles.colorFondo]}>
          <Text style={styles.texto}>Vista del Mes 🗓️</Text>
        </View>
      </PagerView>
      <Navbar
        currentPage={pagina}
        onChangePage={(index) => pagerRef.current?.setPage(index)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0887f', // color base de fondo
  },
  pager: {
    flex: 1,
  },
  pagina: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorFondo: {
    backgroundColor: '#e0887f',
  },
  texto: {
    fontSize: 24,
    fontWeight: '600',
  },
});
