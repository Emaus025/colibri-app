import { Modal, View } from 'react-native';
import styles from '@/components/viajes/style/detalle-modal.styles';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { EstrellasValoracion } from '@/components/viajes/EstrellasValoracion';
import type { Viaje } from '@/types/viaje';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '@/hooks/use-responsive';

export function DetalleModal({ visible, viaje, onCerrar }: { visible: boolean; viaje: Viaje | null; onCerrar: () => void }) {
  const insets = useSafeAreaInsets();
  const { isTablet, isLarge, width } = useResponsive();
  const maxWidth = isLarge ? 800 : isTablet ? 680 : width * 0.9;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCerrar}>
      <View style={styles.overlay}>
        <ThemedView style={[styles.content, { maxWidth, width: '100%', paddingBottom: insets.bottom, paddingTop: insets.top }]}>
          <ThemedText type="title">Detalles del Viaje</ThemedText>
          {viaje && (
            <>
              <View style={styles.rutaGrande}>
                <ThemedText>
                  <ThemedText type="defaultSemiBold">{viaje.from}</ThemedText> → <ThemedText type="defaultSemiBold">{viaje.to}</ThemedText>
                </ThemedText>
              </View>

              <View style={styles.seccion}>
                <ThemedText type="subtitle">Información del Viaje</ThemedText>
                <ThemedText>Fecha: {viaje.date}</ThemedText>
                <ThemedText>Precio: {viaje.price}€</ThemedText>
                <ThemedText>Plazas disponibles: {viaje.seats}</ThemedText>
              </View>

              <View style={styles.seccion}>
                <ThemedText type="subtitle">Información del Conductor</ThemedText>
                <View style={styles.perfilConductor}>
                  <Image source={{ uri: viaje.driverPhoto }} style={styles.fotoPerfil} />
                  <View>
                    <ThemedText>Conductor: {viaje.driver}</ThemedText>
                    <View style={styles.filaRating}>
                      <EstrellasValoracion rating={viaje.rating} />
                      <ThemedText style={{ marginLeft: 6 }}>({viaje.rating})</ThemedText>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.seccion}>
                <ThemedText type="subtitle">Información del Vehículo</ThemedText>
                <Image source={{ uri: viaje.carPhoto }} style={styles.fotoCoche} />
                <ThemedText>Modelo: {viaje.car}</ThemedText>
                <ThemedText>Placa: {viaje.licensePlate}</ThemedText>
              </View>

              <View style={styles.acciones}>
                <View style={styles.botonReserva}>
                  <ThemedText style={styles.textoBoton}>Reservar</ThemedText>
                </View>
                <View style={styles.botonVolver}>
                  <ThemedText style={styles.textoBoton} onPress={onCerrar}>Volver</ThemedText>
                </View>
              </View>
            </>
          )}
        </ThemedView>
      </View>
    </Modal>
  );
}