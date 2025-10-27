import React from 'react';
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
}

export default function ModalVistaPrevia({ visible, nota, onClose }: ModalVistaPreviaProps) {
  if (!nota) return null;

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

        <Pressable onPress={onClose} style={styles.botonCerrar}>
          <Text style={styles.textoCerrar}>Cerrar</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1ED', // fondo de la hoja
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
  },
  pageContent: {
    padding: 20,
  },
  texto: {
    fontSize: 17,
    color: '#2A2A2A',
    lineHeight: 28, // renglones
    borderLeftWidth: 4,
    borderColor: '#E0E0E0',
    paddingLeft: 12,
  },
  botonCerrar: {
    marginTop: 20,
    backgroundColor: '#37C997',
    borderRadius: 10,
    paddingVertical: 12,
  },
  textoCerrar: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});
