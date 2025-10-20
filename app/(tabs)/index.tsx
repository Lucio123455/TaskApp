import Navbar from '@/components/Navbar';
import VistaDia from '@/components/VistaDia';
import VistaSemanal from '@/components/VistaSemanal';
import { useRef, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { actividadesData } from '../../data/actividades';
import ConfigScreen from './config';

export default function HomeScreen() {
  const [pagina, setPagina] = useState(1); // empieza en Agenda (1)
  const [modalVisible, setModalVisible] = useState(false); // para el modal del lápiz
  const [actividades_lista] = useState<any[]>(actividadesData);
  const pagerRef = useRef<PagerView>(null);

  const handleChangePage = (index: number | 'modal') => {
    if (index === 'modal') {
      setModalVisible(true);
    } else {
      pagerRef.current?.setPage(index);
    }
  };

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={1}
        onPageSelected={e => setPagina(e.nativeEvent.position)}
      >
        <View key="0" style={[styles.pagina, styles.colorFondo]}>
          <ConfigScreen />
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

      <Navbar currentPage={pagina} onChangePage={handleChangePage} />

      {/* Modal del botón lápiz */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Nueva tarea ✏️</Text>
          {/* Acá iría tu componente de creación de tarea */}
          <Text onPress={() => setModalVisible(false)} style={styles.cerrar}>
            Cerrar
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0887f',
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#fbe9e7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  cerrar: {
    color: '#e0887f',
    fontWeight: '600',
    fontSize: 16,
  },
});
