import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Nota {
  id: string;
  titulo: string;
  contenido: string;
}

interface ModalVistaPreviaProps {
  visible: boolean;
  nota?: Nota | null;
  onClose: () => void;
  onEliminar?: (id: string) => void;
}

export default function ModalVistaPrevia({ visible, nota, onClose, onEliminar }: ModalVistaPreviaProps) {
  const [modalConfirmacionVisible, setModalConfirmacionVisible] = useState(false);

  const handleEliminarConfirmado = () => {
    onEliminar?.(nota!.id);
    onClose();
    setModalConfirmacionVisible(false);
  };

  const abrirConfirmacion = () => {
    setModalConfirmacionVisible(true);
  };

  const cerrarConfirmacion = () => {
    setModalConfirmacionVisible(false);
  };

  if (!nota) return null;

  return (
    <>
      {/* Modal principal de vista previa */}
      <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{nota.titulo}</Text>
          </View>

          <ScrollView
            style={styles.page}
            contentContainerStyle={styles.pageContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.texto}>{nota.contenido || 'Sin contenido.'}</Text>
          </ScrollView>

          <View style={styles.botonesContainer}>
            <Pressable 
              onPress={abrirConfirmacion} 
              style={[styles.boton, styles.botonEliminar]}
            >
              <Text style={styles.textoEliminar}>Eliminar</Text>
            </Pressable>
            
            <Pressable 
              onPress={onClose} 
              style={[styles.boton, styles.botonCerrar]}
            >
              <Text style={styles.textoCerrar}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal de confirmación personalizado */}
      <Modal
        visible={modalConfirmacionVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cerrarConfirmacion}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalConfirmacion}>
            {/* Icono de advertencia */}
            <View style={styles.iconoContainer}>
              <Text style={styles.icono}>🗑️</Text>
            </View>

            {/* Título */}
            <Text style={styles.confirmacionTitulo}>
              ¿Eliminar nota?
            </Text>

            {/* Botones */}
            <View style={styles.confirmacionBotones}>
              <Pressable 
                onPress={cerrarConfirmacion}
                style={[styles.confirmacionBoton, styles.botonCancelar]}
              >
                <Text style={styles.textoCancelar}>Cancelar</Text>
              </Pressable>
              
              <Pressable 
                onPress={handleEliminarConfirmado}
                style={[styles.confirmacionBoton, styles.botonConfirmar]}
              >
                <Text style={styles.textoConfirmar}>Sí, Eliminar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1ED',
    padding: 24,
    justifyContent: 'flex-start',
  },
  header: {
    borderBottomWidth: 2,
    borderColor: '#37C997',
    marginBottom: 16,
    paddingBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1C',
    textAlign: 'center',
  },
  page: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    elevation: 3,
    marginBottom: 16,
  },
  pageContent: {
    padding: 20,
  },
  texto: {
    fontSize: 17,
    color: '#2A2A2A',
    lineHeight: 28,
    borderLeftWidth: 4,
    borderColor: '#E0E0E0',
    paddingLeft: 12,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  boton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonEliminar: {
    backgroundColor: '#FFF5F5',
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  botonCerrar: {
    backgroundColor: '#37C997',
  },
  textoEliminar: {
    color: '#FF3B30',
    fontWeight: '700',
    fontSize: 16,
  },
  textoCerrar: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  // Estilos para el modal de confirmación personalizado
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalConfirmacion: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  iconoContainer: {
    marginBottom: 16,
  },
  icono: {
    fontSize: 48,
  },
  confirmacionTitulo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1C1C1C',
    textAlign: 'center',
    marginBottom: 12,
  },
  confirmacionMensaje: {
    fontSize: 16,
    color: '#5E5E5E',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  notaNombre: {
    fontWeight: '700',
    color: '#1C1C1C',
  },
  confirmacionAdvertencia: {
    fontSize: 14,
    color: '#FF3B30',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 24,
  },
  confirmacionBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
  confirmacionBoton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonCancelar: {
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  botonConfirmar: {
    backgroundColor: '#FF3B30',
  },
  textoCancelar: {
    color: '#5E5E5E',
    fontWeight: '700',
    fontSize: 16,
  },
  textoConfirmar: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});