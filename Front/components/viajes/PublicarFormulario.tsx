import { TextInput, View, TouchableOpacity } from 'react-native';
import styles from '@/components/viajes/style/publicar-formulario.styles';
import { ThemedText } from '@/components/themed-text';
import type { NuevoViaje } from '@/types/viaje';

export function PublicarFormulario({ nuevoViaje, setCampo, onPublicar }: { nuevoViaje: NuevoViaje; setCampo: (campo: keyof NuevoViaje, valor: string) => void; onPublicar: () => void }) {
  return (
    <View style={styles.contenedor}>
      <ThemedText type="title">Publicar un Viaje</ThemedText>

      <View style={styles.grupo}>
        <ThemedText type="subtitle">Información del Viaje</ThemedText>
        <TextInput style={styles.input} placeholder="Origen" value={nuevoViaje.from} onChangeText={(t) => setCampo('from', t)} />
        <TextInput style={styles.input} placeholder="Destino" value={nuevoViaje.to} onChangeText={(t) => setCampo('to', t)} />
        <TextInput style={styles.input} placeholder="Fecha (YYYY-MM-DD)" value={nuevoViaje.date} onChangeText={(t) => setCampo('date', t)} />
        <TextInput style={styles.input} placeholder="Precio (€)" value={nuevoViaje.price} onChangeText={(t) => setCampo('price', t)} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Plazas disponibles" value={nuevoViaje.seats} onChangeText={(t) => setCampo('seats', t)} keyboardType="numeric" />
      </View>

      <View style={styles.grupo}>
        <ThemedText type="subtitle">Información del Conductor y Vehículo</ThemedText>
        <TextInput style={styles.input} placeholder="Tu nombre" value={nuevoViaje.driver} onChangeText={(t) => setCampo('driver', t)} />
        <TextInput style={styles.input} placeholder="Placa del vehículo" value={nuevoViaje.licensePlate} onChangeText={(t) => setCampo('licensePlate', t)} />
        <TextInput style={styles.input} placeholder="Modelo del coche" value={nuevoViaje.car} onChangeText={(t) => setCampo('car', t)} />
      </View>

      <TouchableOpacity style={styles.boton} onPress={onPublicar}>
        <ThemedText style={styles.textoBoton}>Publicar Viaje</ThemedText>
      </TouchableOpacity>
    </View>
  );
}