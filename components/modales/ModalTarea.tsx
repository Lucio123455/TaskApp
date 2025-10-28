import { Actividad } from '@/data/types';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface ModalTareaProps {
  visible: boolean;
  tarea?: Actividad | null;
  onClose: () => void;
  onSave: (t: Actividad) => void;
}

export default function ModalTarea({ visible, tarea, onClose, onSave }: ModalTareaProps) {
  const [modoAlta, setModoAlta] = useState<'unica' | 'repetitiva'>('unica');
  const [submodo, setSubmodo] = useState<'dias' | 'relativo' | 'numeros'>('dias');

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [dias, setDias] = useState<string[]>([]);
  const [diasMes, setDiasMes] = useState<number[]>([]);
  const [relativo, setRelativo] = useState<{ semana: number; dia: string } | null>(null);
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [color, setColor] = useState('#FDE68A');
  const [vistas, setVistas] = useState({
    vistaDia: true,
    vistaSemanal: true,
    vistaMensual: false,
  });

  const coloresDisponibles = ['#FDE68A', '#A7F3D0', '#BFDBFE', '#FECACA', '#DDD6FE'];
  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const semanasRelativas = [
    { label: 'Primero', value: 1 },
    { label: 'Segundo', value: 2 },
    { label: 'Tercero', value: 3 },
    { label: 'Último', value: -1 },
  ];

  // 🧠 Al abrir el modal, precargar datos si hay tarea
  useEffect(() => {
    if (tarea) {
      setTitulo(tarea.titulo);
      setDescripcion(tarea.descripcion || '');
      setModoAlta(tarea.repeticion === 'una_vez' ? 'unica' : 'repetitiva');
      setFecha(tarea.fechaInicio || '');
      setHoraInicio(tarea.horaInicio || '');
      setHoraFin(tarea.horaFin || '');
      setColor(tarea.color);
      setVistas({
        vistaDia: tarea.vistaDia,
        vistaSemanal: tarea.vistaSemanal,
        vistaMensual: tarea.vistaMensual,
      });

      // Si tiene una regla de repetición relativa
      if (tarea.reglaRepeticion === 'segundo_lunes_mes') {
        setSubmodo('relativo');
        setRelativo({ semana: 2, dia: 'lunes' });
      } else if (tarea.semanaDelMes && tarea.diaDeSemana) {
        setSubmodo('relativo');
        setRelativo({ semana: tarea.semanaDelMes, dia: tarea.diaDeSemana });
      } else {
        setSubmodo('dias');
      }
    } else {
      // Reset si es nueva tarea
      setTitulo('');
      setDescripcion('');
      setModoAlta('unica');
      setSubmodo('dias');
      setFecha('');
      setDias([]);
      setDiasMes([]);
      setRelativo(null);
      setHoraInicio('');
      setHoraFin('');
      setColor('#FDE68A');
      setVistas({ vistaDia: true, vistaSemanal: true, vistaMensual: false });
    }
  }, [tarea, visible]);

  // 🔁 Helpers de selección
  const toggleDia = (d: string) => {
    setDias(prev => (prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]));
  };

  const toggleNumero = (n: number) => {
    setDiasMes(prev => (prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]));
  };

  const toggleVista = (k: keyof typeof vistas) => {
    setVistas(prev => ({ ...prev, [k]: !prev[k] }));
  };

  // 💾 Guardar datos
  const handleGuardar = () => {
    const t: Actividad = {
      id: tarea?.id || Date.now().toString(),
      titulo: titulo.trim() || 'Sin título',
      descripcion: descripcion.trim() || '',
      fechaInicio: null,
      horaInicio: horaInicio || null,
      horaFin: horaFin || null,
      repeticion: 'una_vez',
      reglaRepeticion: null,
      semanaDelMes: null,
      diaDeSemana: null,
      color,
      completada: tarea?.completada ?? false,
      ...vistas,
    };

    // Tipo: única o repetitiva
    if (modoAlta === 'unica') {
      t.fechaInicio = fecha || null;
      t.repeticion = 'una_vez';
    } else {
      // Repetitiva
      t.repeticion = 'mensual'; // base por defecto, se puede ajustar luego
      if (submodo === 'dias') {
        t.repeticion = 'semanal';
        t.reglaRepeticion = 'por_dias';
        t.diaDeSemana = dias.join(',');
      } else if (submodo === 'numeros') {
        t.reglaRepeticion = 'por_dias_mes';
      } else if (submodo === 'relativo' && relativo) {
        t.repeticion = 'mensual';
        t.reglaRepeticion = `${relativo.semana}_semana_${relativo.dia}`.toLowerCase();
        t.semanaDelMes = relativo.semana;
        t.diaDeSemana = relativo.dia.toLowerCase();
      }
    }

    onSave(t);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{tarea ? 'Editar tarea 📝' : 'Nueva tarea ✏️'}</Text>

        {/* 🔹 Título */}
        <TextInput
          style={styles.input}
          placeholder="Título de la tarea"
          placeholderTextColor="#999"
          value={titulo}
          onChangeText={setTitulo}
        />

        {/* 🔹 Descripción */}
        <TextInput
          style={styles.input}
          placeholder="Descripción (opcional)"
          placeholderTextColor="#999"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        {/* 🔹 Tipo */}
        <Text style={styles.label}>Tipo</Text>
        <View style={styles.row}>
          {(['unica', 'repetitiva'] as const).map(m => (
            <Pressable
              key={m}
              onPress={() => setModoAlta(m)}
              style={[styles.option, modoAlta === m && styles.optionSelected]}
            >
              <Text style={[styles.optionText, modoAlta === m && styles.optionTextActive]}>
                {m === 'unica' ? 'Única' : 'Repetitiva'}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 🔹 Campos según tipo */}
        {modoAlta === 'unica' ? (
          <>
            <Text style={styles.label}>Fecha</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: 2025-11-02"
              placeholderTextColor="#999"
              value={fecha}
              onChangeText={setFecha}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>Repetición</Text>
            <View style={styles.row}>
              {(['dias', 'relativo', 'numeros'] as const).map(m => (
                <Pressable
                  key={m}
                  onPress={() => setSubmodo(m)}
                  style={[styles.option, submodo === m && styles.optionSelected]}
                >
                  <Text style={[styles.optionText, submodo === m && styles.optionTextActive]}>
                    {m === 'dias'
                      ? 'Días'
                      : m === 'relativo'
                      ? 'Relativa'
                      : 'Números'}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* 🗓️ Por días */}
            {submodo === 'dias' && (
              <View style={styles.diasContainer}>
                {diasSemana.map(d => (
                  <Pressable
                    key={d}
                    onPress={() => toggleDia(d)}
                    style={[styles.dia, dias.includes(d) && styles.diaActivo]}
                  >
                    <Text style={[styles.diaTexto, dias.includes(d) && styles.diaTextoActivo]}>
                      {d}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}

            {/* 🔁 Relativo */}
            {submodo === 'relativo' && (
              <>
                <View style={styles.diasContainer}>
                  {semanasRelativas.map(s => (
                    <Pressable
                      key={s.value}
                      onPress={() =>
                        setRelativo(prev => ({
                          ...prev,
                          semana: s.value,
                          dia: prev?.dia || 'Lun',
                        }))
                      }
                      style={[styles.dia, relativo?.semana === s.value && styles.diaActivo]}
                    >
                      <Text
                        style={[
                          styles.diaTexto,
                          relativo?.semana === s.value && styles.diaTextoActivo,
                        ]}
                      >
                        {s.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <View style={styles.diasContainer}>
                  {diasSemana.map(d => (
                    <Pressable
                      key={d}
                      onPress={() =>
                        setRelativo(prev => ({
                          ...prev,
                          semana: prev?.semana || 1,
                          dia: d,
                        }))
                      }
                      style={[styles.dia, relativo?.dia === d && styles.diaActivo]}
                    >
                      <Text
                        style={[
                          styles.diaTexto,
                          relativo?.dia === d && styles.diaTextoActivo,
                        ]}
                      >
                        {d}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}

            {/* #️⃣ Por números */}
            {submodo === 'numeros' && (
              <View style={styles.grid}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(n => (
                  <Pressable
                    key={n}
                    onPress={() => toggleNumero(n)}
                    style={[styles.numBox, diasMes.includes(n) && styles.numActivo]}
                  >
                    <Text style={[styles.numTexto, diasMes.includes(n) && styles.numTextoActivo]}>
                      {n}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </>
        )}

        {/* ⏰ Horario */}
        <Text style={styles.label}>Horario (opcional)</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.horaInput]}
            placeholder="Inicio (HH:mm)"
            placeholderTextColor="#999"
            value={horaInicio}
            onChangeText={setHoraInicio}
          />
          <TextInput
            style={[styles.input, styles.horaInput]}
            placeholder="Fin (HH:mm)"
            placeholderTextColor="#999"
            value={horaFin}
            onChangeText={setHoraFin}
          />
        </View>

        {/* 🎨 Color */}
        <Text style={styles.label}>Color</Text>
        <View style={styles.colorRow}>
          {coloresDisponibles.map(c => (
            <Pressable
              key={c}
              onPress={() => setColor(c)}
              style={[styles.colorCircle, { backgroundColor: c }, color === c && styles.colorSelected]}
            />
          ))}
        </View>

        {/* 👁️ Aparece en */}
        <Text style={styles.label}>Aparece en...</Text>
        <View style={styles.vistasRow}>
          {[
            { key: 'vistaDia', label: 'Día' },
            { key: 'vistaSemanal', label: 'Semana' },
            { key: 'vistaMensual', label: 'Mes' },
          ].map(v => (
            <Pressable
              key={v.key}
              onPress={() => toggleVista(v.key as keyof typeof vistas)}
              style={[styles.vistaOption, vistas[v.key as keyof typeof vistas] && styles.vistaActive]}
            >
              <Text style={[styles.vistaText, vistas[v.key as keyof typeof vistas] && styles.vistaTextActive]}>
                {v.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 🔘 Botones */}
        <View style={styles.buttonsRow}>
          <Pressable style={styles.btnCancelar} onPress={onClose}>
            <Text style={styles.btnText}>Cancelar</Text>
          </Pressable>
          <Pressable style={styles.btnGuardar} onPress={handleGuardar}>
            <Text style={[styles.btnText, styles.btnGuardarText]}>Guardar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#E8F1ED', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 16, color: '#1C1C1C' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 8, color: '#1C1C1C' },
  input: {
    borderWidth: 1, borderColor: '#CCC', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, backgroundColor: '#fff', color: '#1C1C1C',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  option: {
    flex: 1, marginHorizontal: 4, borderWidth: 1, borderColor: '#CCC', borderRadius: 10,
    paddingVertical: 8, alignItems: 'center', backgroundColor: '#fff',
  },
  optionSelected: { backgroundColor: '#37C997', borderColor: '#37C997' },
  optionText: { fontSize: 15, color: '#1C1C1C' },
  optionTextActive: { color: '#fff', fontWeight: '600' },
  diasContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  dia: { flex: 1, marginHorizontal: 2, paddingVertical: 8, borderWidth: 1, borderColor: '#CCC', borderRadius: 8, backgroundColor: '#fff', alignItems: 'center' },
  diaActivo: { backgroundColor: '#37C997', borderColor: '#37C997' },
  diaTexto: { fontSize: 15, color: '#1C1C1C' },
  diaTextoActivo: { color: '#fff', fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  numBox: {
    width: '14%', marginVertical: 4, paddingVertical: 8, alignItems: 'center',
    borderWidth: 1, borderColor: '#CCC', borderRadius: 8, backgroundColor: '#fff',
  },
  numActivo: { backgroundColor: '#37C997', borderColor: '#37C997' },
  numTexto: { color: '#1C1C1C' },
  numTextoActivo: { color: '#fff', fontWeight: '600' },
  horaInput: { width: '48%' },
  colorRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  colorCircle: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#fff' },
  colorSelected: { borderColor: '#37C997', transform: [{ scale: 1.1 }] },
  vistasRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  vistaOption: {
    borderWidth: 1, borderColor: '#CCC', borderRadius: 10,
    paddingVertical: 8, paddingHorizontal: 18, backgroundColor: '#fff',
  },
  vistaActive: { backgroundColor: '#37C997', borderColor: '#37C997' },
  vistaText: { fontSize: 16, color: '#1C1C1C' },
  vistaTextActive: { color: '#fff', fontWeight: '600' },
  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  btnCancelar: { flex: 1, marginRight: 10, backgroundColor: '#D0D0D0', paddingVertical: 12, borderRadius: 10 },
  btnGuardar: { flex: 1, marginLeft: 10, backgroundColor: '#37C997', paddingVertical: 12, borderRadius: 10 },
  btnText: { textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#1C1C1C' },
  btnGuardarText: { color: '#fff' },
});
