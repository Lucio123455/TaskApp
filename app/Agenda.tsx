import { StyleSheet, Text, View } from 'react-native';

export default function Agenda() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📖 Estás en la Agenda</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e0887f', justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
});
