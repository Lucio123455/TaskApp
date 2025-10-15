import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

interface AgregarTareaProps {
  onAgregar: (tarea: { titulo: string; descripcion: string; desde: string; hasta: string }) => void;
}

export default function AgregarTarea({ onAgregar }: AgregarTareaProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  const manejarAgregar = () => {
    if (!titulo.trim()) return;
    onAgregar({ titulo, descripcion, desde, hasta });
    setTitulo('');
    setDescripcion('');
    setDesde('');
    setHasta('');
    setMostrarFormulario(false);
  };

  return (
    <View style={styles.container}>
      <Button
        title={mostrarFormulario ? 'Cancelar' : '➕ Agregar tarea'}
        onPress={() => setMostrarFormulario(!mostrarFormulario)}
      />

      {mostrarFormulario && (
        <View style={styles.formulario}>
          <TextInput
            placeholder="Título"
            value={titulo}
            onChangeText={setTitulo}
            style={styles.input}
          />
          <TextInput
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            style={styles.input}
          />
          <TextInput
            placeholder="Desde (ej. 10:00)"
            value={desde}
            onChangeText={setDesde}
            style={styles.input}
          />
          <TextInput
            placeholder="Hasta (ej. 11:00)"
            value={hasta}
            onChangeText={setHasta}
            style={styles.input}
          />
          <Button title="Guardar tarea" onPress={manejarAgregar} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  formulario: {
    marginVertical: 10,
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
});
