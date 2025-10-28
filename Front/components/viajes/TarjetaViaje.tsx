import { View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { EstrellasValoracion } from '@/components/viajes/EstrellasValoracion';
import type { Viaje } from '@/types/viaje';



export function TarjetaViaje({ viaje, onVerDetalles }: { viaje: Viaje; onVerDetalles: (v: Viaje) => void }) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.ruta}>
        <ThemedText>
          <ThemedText type="defaultSemiBold">{viaje.from}</ThemedText> → <ThemedText type="defaultSemiBold">{viaje.to}</ThemedText>
        </ThemedText>
      </View>
      <View style={styles.detalles}>
        <ThemedText>Fecha: {viaje.date}</ThemedText>
        <ThemedText>Precio: {viaje.price}€</ThemedText>
        <ThemedText>Plazas: {viaje.seats}</ThemedText>
        <ThemedText>Conductor: {viaje.driver}</ThemedText>
        <View style={styles.margenTop4}>
          <EstrellasValoracion rating={viaje.rating} />
        </View>
      </View>
      <TouchableOpacity style={styles.boton} onPress={() => onVerDetalles(viaje)}>
        <ThemedText style={styles.textoBoton}>Ver Detalles</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

import styles from '@/components/viajes/style/tarjeta-viaje.styles';