import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useResponsive } from '@/hooks/use-responsive';
import { ReservaFormulario } from '@/components/reservas/ReservaFormulario';

export default function ReservasScreen() {
  const insets = useSafeAreaInsets();
  const { containerMaxWidth, isPhone, gap } = useResponsive();

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: isPhone ? 16 : 24,
          paddingBottom: 16,
          maxWidth: containerMaxWidth,
          alignSelf: 'center',
          width: '100%',
          gap,
        }}
      >
        <ThemedText type="title" style={{ marginBottom: 8 }}>Reservar viaje</ThemedText>
        <ThemedText style={{ marginBottom: 16 }}>
          Reserva tu viaje con antelación: indica recogida, destino, fecha, hora y plazas.
        </ThemedText>

        <ReservaFormulario
          onReservar={(r) => {
            Alert.alert(
              'Reserva creada',
              `Recogida: ${r.from}\nDestino: ${r.to}\nFecha: ${r.date}\nHora: ${r.time}\nPlazas: ${r.seats}`
            );
          }}
        />
      </ThemedView>
    </ThemedView>
  );
}