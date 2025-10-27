import React from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Nota {
  id: string;
  titulo: string;
  contenido: string;
}

interface ModalVistaPreviaProps {
  visible: boolean;
  nota?: Nota | null;
  onClose: () => void;
  onEliminar?: (id: string) => void; // Nueva prop para eliminar
}

export default function ModalVistaPrevia({ visible, nota, onClose, onEliminar }: ModalVistaPreviaProps) {
  if (!nota) return null;

  const handleEliminar = () => {
    Alert.alert(
      'Eliminar nota',
      `¿Estás seguro de que quieres eliminar "${nota.titulo}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            onEliminar?.(nota.id);
            onClose(); // Cerrar el modal después de eliminar
          },
        },
      ]
    );
  };

  return (
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
            onPress={handleEliminar} 
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
});