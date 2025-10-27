import ModalNota from '@/components/modales/ModalNota';
import ModalTarea from '@/components/modales/ModalTarea';
import ModalVistaPrevia from '@/components/modales/ModalVistaPrevia';
import Navbar from '@/components/Navbar';
import ListaDeNotas from '@/components/secciones/ListaDeNotas';
import VistaDia from '@/components/secciones/Vistas/VistaDia';
import VistaMes from '@/components/secciones/Vistas/VistaMes';
import VistaSemanal from '@/components/secciones/Vistas/VistaSemanal';
import { guardarNota, obtenerNotas } from '@/data/notas';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfigScreen from '../../components/secciones/config';
import { actividadesData } from '../../data/actividades';

export default function HomeScreen() {
  const [pagina, setPagina] = useState(2); // 2 = principal
  const [modalTareaVisible, setModalTareaVisible] = useState(false);
  const [modalNotaVisible, setModalNotaVisible] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);
  const [notas, setNotas] = useState<any[]>([]);
  const [actividades_lista] = useState<any[]>(actividadesData);
  const pagerRef = useRef<PagerView>(null);
  const [modalVistaVisible, setModalVistaVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await obtenerNotas();
      setNotas(data);
    })();
  }, []);

  // 🔁 Manejo de navegación
  const handleChangePage = (index: number | 'modal') => {
    if (index === 'modal') {
      if (pagina === 1) {
        setNotaSeleccionada(null); // nueva nota
        setModalNotaVisible(true);
      } else {
        setModalTareaVisible(true); // crear tarea
      }
    } else {
      pagerRef.current?.setPage(index);
    }
  };

  // 💾 Guardar nota (nueva o editada)
  const handleSaveNota = async (nota: any) => {
    await guardarNota(nota.id, nota.titulo, nota.contenido);
    const actualizadas = await obtenerNotas();
    setNotas(actualizadas);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={2}
        onPageSelected={e => setPagina(e.nativeEvent.position)}
      >
        {/* ⚙️ Configuración */}
        <View key="0" style={[styles.pagina, styles.colorFondo]}>
          <ConfigScreen />
        </View>

        {/* 🗒️ Lista de notas */}
        <View key="1" style={[styles.pagina, styles.colorFondo]}>
          <ListaDeNotas
            notas={notas}
            onPreview={(nota: any) => {
              setNotaSeleccionada(nota);
              setModalVistaVisible(true);
            }}
            onEdit={(nota: any) => {
              setNotaSeleccionada(nota);
              setModalNotaVisible(true);
            }}
          />
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
          <VistaMes actividades={actividades_lista} />
        </View>
      </PagerView>

      {/* 🔘 Navbar */}
      <Navbar currentPage={pagina} onChangePage={handleChangePage} />

      {/* ✅ Modal de crear tarea */}
      <ModalTarea
        visible={modalTareaVisible}
        onClose={() => setModalTareaVisible(false)}
        onSave={(nuevaTarea) => {
          console.log('Tarea guardada:', nuevaTarea);
          setModalTareaVisible(false);
        }}
      />


      {/* 📝 Modal de nota (crear o editar) */}
      <ModalNota
        visible={modalNotaVisible}
        nota={notaSeleccionada}
        onClose={() => {
          setModalNotaVisible(false);
          setNotaSeleccionada(null);
        }}
        onSave={handleSaveNota}
      />

      <ModalVistaPrevia
        visible={modalVistaVisible}
        nota={notaSeleccionada}
        onClose={() => {
          setModalVistaVisible(false);
          setNotaSeleccionada(null);
        }}
      />
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
  notaItem: {
    fontSize: 18,
    color: '#1C1C1C',
    marginVertical: 6,
    paddingHorizontal: 10,
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

