import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

interface Nota {
  id?: string;
  titulo: string;
  contenido: string;
}

interface ModalNotaProps {
  visible: boolean;
  nota?: Nota | null;
  onClose: () => void;
  onSave: (nota: Nota) => void;
}

export default function ModalNota({ visible, nota, onClose, onSave }: ModalNotaProps) {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  // Si se pasa una nota, completar los campos al abrir
  useEffect(() => {
    if (nota) {
      setTitulo(nota.titulo);
      setContenido(nota.contenido);
    } else {
      setTitulo('');
      setContenido('');
    }
  }, [nota, visible]);

  const handleSave = () => {
    const nuevaNota: Nota = {
      id: nota?.id || Date.now().toString(),
      titulo: titulo.trim() || 'Sin título',
      contenido: contenido.trim(),
    };
    onSave(nuevaNota);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            {nota ? 'Editar nota 📝' : 'Nueva nota ✏️'}
          </Text>

          <TextInput
            style={styles.inputTitulo}
            placeholder="Título"
            placeholderTextColor="#999"
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            style={styles.inputContenido}
            placeholder="Escribí tu nota..."
            placeholderTextColor="#999"
            value={contenido}
            onChangeText={setContenido}
            multiline
          />

          <View style={styles.buttonsRow}>
            <Pressable style={styles.btnCancelar} onPress={onClose}>
              <Text style={styles.btnText}>Cancelar</Text>
            </Pressable>

            <Pressable style={styles.btnGuardar} onPress={handleSave}>
              <Text style={[styles.btnText, styles.btnGuardarText]}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#E8F1ED', // fondo claro
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
    textAlign: 'center',
  },
  inputTitulo: {
    borderBottomWidth: 1.5,
    borderColor: '#37C997',
    fontSize: 18,
    marginBottom: 16,
    color: '#1C1C1C',
    paddingVertical: 6,
  },
  inputContenido: {
    height: 150,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#1C1C1C',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  btnCancelar: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#D0D0D0',
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnGuardar: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#37C997',
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  btnGuardarText: {
    color: '#fff',
  },
});
