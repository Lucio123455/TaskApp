import Navbar from '@/components/Navbar';
import VistaDia from '@/components/VistaDia';
import VistaSemanal from '@/components/VistaSemanal';
import { useRef, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { actividadesData } from '../../data/actividades';
import ConfigScreen from './config';

export default function HomeScreen() {
  const [pagina, setPagina] = useState(2); // 2 = principal
  const [modalTareaVisible, setModalTareaVisible] = useState(false);
  const [modalNotaVisible, setModalNotaVisible] = useState(false);
  const [actividades_lista] = useState<any[]>(actividadesData);
  const pagerRef = useRef<PagerView>(null);

  // 👇 Cambiamos el comportamiento del lápiz según la página
  const handleChangePage = (index: number | 'modal') => {
    if (index === 'modal') {
      if (pagina === 1) setModalNotaVisible(true); // 📒 crear nota
      else setModalTareaVisible(true); // ✅ crear tarea
    } else {
      pagerRef.current?.setPage(index);
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={2} // arranca en la principal
        onPageSelected={e => setPagina(e.nativeEvent.position)}
      >
        {/* ⚙️ Configuración */}
        <View key="0" style={[styles.pagina, styles.colorFondo]}>
          <ConfigScreen />
        </View>

        {/* 🗒️ Lista de notas */}
        <View key="1" style={[styles.pagina, styles.colorFondo]}>
          <Text style={styles.texto}>🗒️ Lista de notas</Text>
          <Text style={styles.subtexto}>
            Mostrará tus notas creadas o pendientes.
          </Text>
        </View>

        {/* 📆 Principal */}
        <View key="2" style={[styles.pagina, styles.colorFondo]}>
          <VistaDia actividades={actividades_lista} />
        </View>

        {/* 📅 Semana */}
        <View key="3" style={[styles.pagina, styles.colorFondo]}>
          <VistaSemanal actividades={actividades_lista} />
        </View>

        {/* 🗓️ Mes */}
        <View key="4" style={[styles.pagina, styles.colorFondo]}>
          <Text style={styles.texto}>Vista del Mes 🗓️</Text>
        </View>
      </PagerView>

      {/* 🔘 Navbar */}
      <Navbar currentPage={pagina} onChangePage={handleChangePage} />

      {/* ✅ Modal de crear tarea */}
      <Modal
        visible={modalTareaVisible}
        animationType="slide"
        onRequestClose={() => setModalTareaVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Nueva tarea ✏️</Text>
          <Text style={styles.modalText}>
            Aquí podrás agregar una nueva tarea.
          </Text>
          <Text
            onPress={() => setModalTareaVisible(false)}
            style={styles.cerrar}
          >
            Cerrar
          </Text>
        </View>
      </Modal>

      {/* 📝 Modal de crear nota */}
      <Modal
        visible={modalNotaVisible}
        animationType="slide"
        onRequestClose={() => setModalNotaVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Nueva nota 📝</Text>
          <Text style={styles.modalText}>
            Aquí podrás escribir una nota o recordatorio rápido.
          </Text>
          <Text
            onPress={() => setModalNotaVisible(false)}
            style={styles.cerrar}
          >
            Cerrar
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0E1116', // fondo general (oscuro elegante)
    paddingTop: 6,
    paddingBottom: 6,
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
    backgroundColor: '#E8F1ED', // fondo claro de secciones
  },
  texto: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1C1C1C',
  },
  subtexto: {
    fontSize: 16,
    marginTop: 10,
    color: '#5E5E5E',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#E8F1ED',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#5E5E5E',
    textAlign: 'center',
  },
  cerrar: {
    color: '#37C997', // acento verde-menta
    fontWeight: '700',
    fontSize: 18,
    marginTop: 32,
  },
});

