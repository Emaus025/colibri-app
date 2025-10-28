import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import styles from '@/components/reservas/style/reserva-formulario.styles';

export type DatosReserva = {
  from: string;
  to: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  seats: string; // número de plazas
};

export function ReservaFormulario({
  onReservar,
}: {
  onReservar: (datos: DatosReserva) => void;
}) {
  const [form, setForm] = useState<DatosReserva>({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: '1',
  });

  const setCampo = (campo: keyof DatosReserva, valor: string) => {
    setForm((f) => ({ ...f, [campo]: valor }));
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.fila}>
        <View style={{ flex: 1 }}>
          <ThemedText type="subtitle">Lugar de recogida</ThemedText>
          <TextInput
            placeholder="Ej: Calle 123"
            value={form.from}
            onChangeText={(t) => setCampo('from', t)}
            style={styles.input}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ThemedText type="subtitle">Destino</ThemedText>
          <TextInput
            placeholder="Ej: Centro"
            value={form.to}
            onChangeText={(t) => setCampo('to', t)}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.fila}>
        <View style={{ flex: 1 }}>
          <ThemedText type="subtitle">Fecha</ThemedText>
          <TextInput
            placeholder="YYYY-MM-DD"
            value={form.date}
            onChangeText={(t) => setCampo('date', t)}
            style={styles.input}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ThemedText type="subtitle">Hora</ThemedText>
          <TextInput
            placeholder="HH:mm"
            value={form.time}
            onChangeText={(t) => setCampo('time', t)}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.fila}>
        <View style={{ flex: 1 }}>
          <ThemedText type="subtitle">Plazas</ThemedText>
          <TextInput
            placeholder="1"
            keyboardType="number-pad"
            value={form.seats}
            onChangeText={(t) => setCampo('seats', t)}
            style={styles.input}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.boton} onPress={() => onReservar(form)}>
        <ThemedText type="defaultSemiBold" style={styles.textoBoton}>Reservar</ThemedText>
      </TouchableOpacity>
    </View>
  );
}