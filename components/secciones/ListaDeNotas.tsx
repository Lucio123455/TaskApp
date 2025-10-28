import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import NotaItem from '../Cards/NotaItem';
interface Nota {
  id: string;
  titulo: string;
  contenido: string;
}

interface ListaDeNotasProps {
  notas: Nota[];
  onPreview: (nota: Nota) => void;
  onEdit: (nota: Nota) => void;
}

export default function ListaDeNotas({ notas, onPreview, onEdit }: ListaDeNotasProps) {
  return (
    <View style={styles.container}>
      {notas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🗒️ No hay notas todavía</Text>
          <Text style={styles.subtexto}>
            Tocá el lápiz abajo para crear tu primera nota.
          </Text>
        </View>
      ) : (
        <FlatList
          data={notas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotaItem nota={item} onPreview={onPreview} onEdit={onEdit} />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 8,
  },
  subtexto: {
    fontSize: 15,
    color: '#5E5E5E',
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 10,
  },
});
