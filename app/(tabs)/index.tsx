import ModalNota from '@/components/modales/ModalNota';
import ModalTarea from '@/components/modales/ModalTarea';
import ModalVistaPrevia from '@/components/modales/ModalVistaPrevia';
import Navbar from '@/components/Navbar';
import ConfigScreen from '@/components/secciones/config';
import ListaDeNotas from '@/components/secciones/ListaDeNotas';
import VistaDia from '@/components/secciones/Vistas/VistaDia';
import VistaMes from '@/components/secciones/Vistas/VistaMes';
import VistaSemanal from '@/components/secciones/Vistas/VistaSemanal';

import { eliminarNota, guardarNota, obtenerNotas } from '@/data/notas';
import { guardarTarea, obtenerTareas } from '@/data/tareas';

import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  // 🌐 Estados
  const [pagina, setPagina] = useState(2);
  const pagerRef = useRef<PagerView>(null);
  const [modalTareaVisible, setModalTareaVisible] = useState(false);
  const [modalNotaVisible, setModalNotaVisible] = useState(false);
  const [modalVistaVisible, setModalVistaVisible] = useState(false);

  const [notaSeleccionada, setNotaSeleccionada] = useState<any | null>(null);
  const [notas, setNotas] = useState<any[]>([]);
  const [tareas, setTareas] = useState<any[]>([]);

  // 🧭 Cargar datos al iniciar
  useEffect(() => {
    (async () => {
      const [dataNotas, dataTareas] = await Promise.all([
        obtenerNotas(),
        obtenerTareas(),
      ]);
      setNotas(dataNotas);
      setTareas(dataTareas);
    })();
  }, []);

  // 💾 Guardar nota
  const handleSaveNota = async (nota: any) => {
    await guardarNota(nota.id, nota.titulo, nota.contenido);
    const actualizadas = await obtenerNotas();
    setNotas(actualizadas);
  };

  // 💾 Guardar tarea
  const handleSaveTarea = async (tarea: any) => {
    await guardarTarea(tarea);
    const actualizadas = await obtenerTareas();
    setTareas(actualizadas);
  };

  // 🗑️ Eliminar nota
  const handleNotaEliminada = async (id: string) => {
    try {
      await eliminarNota(id);
      setNotas(prev => prev.filter(n => n.id !== id));
      setModalVistaVisible(false);
      setModalNotaVisible(false);
      setNotaSeleccionada(null);
    } catch (error) {
      console.error('Error eliminando nota:', error);
      const actualizadas = await obtenerNotas();
      setNotas(actualizadas);
    }
  };

  // 🔄 Cambio de página o apertura de modal
  const handleChangePage = (index: number | 'modal') => {
    if (index === 'modal') {
      if (pagina === 1) {
        setNotaSeleccionada(null);
        setModalNotaVisible(true);
      } else {
        setModalTareaVisible(true);
      }
    } else {
      pagerRef.current?.setPage(index);
    }
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

        {/* 🗒️ Notas */}
        <View key="1" style={[styles.pagina, styles.colorFondo]}>
          <ListaDeNotas
            notas={notas}
            onPreview={nota => {
              setNotaSeleccionada(nota);
              setModalVistaVisible(true);
            }}
            onEdit={nota => {
              setNotaSeleccionada(nota);
              setModalNotaVisible(true);
            }}
          />
        </View>

        {/* 📆 Día */}
        <View key="2" style={[styles.pagina, styles.colorFondo]}>
          <VistaDia actividades={tareas} />
        </View>

        {/* 📅 Semana */}
        <View key="3" style={[styles.pagina, styles.colorFondo]}>
          <VistaSemanal actividades={tareas} />
        </View>

        {/* 🗓️ Mes */}
        <View key="4" style={[styles.pagina, styles.colorFondo]}>
          <VistaMes actividades={tareas} />
        </View>
      </PagerView>

      {/* 🔘 Navbar */}
      <Navbar currentPage={pagina} onChangePage={handleChangePage} />

      {/* 📝 Modal Nota */}
      <ModalNota
        visible={modalNotaVisible}
        nota={notaSeleccionada}
        onClose={() => {
          setModalNotaVisible(false);
          setNotaSeleccionada(null);
        }}
        onSave={handleSaveNota}
      />

      {/* ✅ Modal Tarea */}
      <ModalTarea
        visible={modalTareaVisible}
        onClose={() => setModalTareaVisible(false)}
        onSave={handleSaveTarea}
      />

      {/* 🔍 Vista previa */}
      <ModalVistaPrevia
        visible={modalVistaVisible}
        nota={notaSeleccionada}
        onClose={() => {
          setModalVistaVisible(false);
          setNotaSeleccionada(null);
        }}
        onEliminar={handleNotaEliminada}
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

