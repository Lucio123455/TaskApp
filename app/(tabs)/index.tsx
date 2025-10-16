import VistaDia from '@/components/VistaDia';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { actividadesData } from '../../data/actividades';


export default function HomeScreen() {
  const [pagina, setPagina] = useState(0);
  const [actividades_lista, setActividadesLista] = useState<any[]>(actividadesData);

  const etiquetas = ['Día', 'Semana', 'Mes'];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{etiquetas[pagina]}</Text>

      <PagerView
        style={styles.pager}
        initialPage={1}
        onPageSelected={e => setPagina(e.nativeEvent.position)}
      >
        <View key="0" style={[styles.pagina, { backgroundColor: '#fde68a' }]}>
          <Text style={styles.texto}>Resumen general 📋</Text>
        </View>
        
        <View key="1" style={[styles.pagina, { backgroundColor: '#fef3c7' }]}>
          <VistaDia actividades={actividades_lista} />
        </View>

        <View key="2" style={[styles.pagina, { backgroundColor: '#d1fae5' }]}>
          <Text style={styles.texto}>Vista de la Semana 📅</Text>
        </View>

        <View key="3" style={[styles.pagina, { backgroundColor: '#bfdbfe' }]}>
          <Text style={styles.texto}>Vista del Mes 🗓️</Text>
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    paddingVertical: 12,
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
